import { expect } from 'chai';
import { ExpressionStatementSyntax, Parser, SyntaxHelper, SyntaxToken, SyntaxTree, SyntaxType } from '../src';

describe('Parser Tests', () => {

    const getBinaryOperatorPairs = () => {
        const binaryOperatorTypes = SyntaxHelper.getBinaryOperatorTypes();
        const binaryOperatorPairs = [];
        for(const op1 of binaryOperatorTypes) {
            for(const op2 of binaryOperatorTypes) {
                binaryOperatorPairs.push({op1:op1, op2:op2});
            }
        }
        return binaryOperatorPairs;
    }

    const getUnaryOperatorPairs = () => {
        const unaryOperatorPairs = [];
        for(const unaryOp of SyntaxHelper.getUnaryOperatorTypes()) {
            for(const binaryOp of SyntaxHelper.getBinaryOperatorTypes()) {
                unaryOperatorPairs.push({unaryOp: unaryOp, binaryOp: binaryOp});
            }
        }
        return unaryOperatorPairs;
    }

    const binaryOperatorPairs = getBinaryOperatorPairs();
    const unaryOperatorPairs = getUnaryOperatorPairs();

    const assertToken = (type:SyntaxType, text:string, flattenedNode:any[], idx:number) => {
        expect(flattenedNode[idx]).to.not.be.undefined;
        expect(flattenedNode[idx] instanceof SyntaxToken).to.be.true;
        expect(flattenedNode[idx].type).to.equal(type);
        expect(flattenedNode[idx].text).to.equal(text);
    }

    const assertNode = (type:SyntaxType, flattenedNode:any[], idx:number) => {
        expect(flattenedNode[idx]).to.not.be.undefined;
        expect(flattenedNode[idx] instanceof SyntaxToken).to.be.false;
        expect(flattenedNode[idx].type).to.equal(type);
    }

    it(`should honor precedence for binary expressions (${binaryOperatorPairs.length} tests)`, () => {
        for(const pair of binaryOperatorPairs) {
            const op1Precedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.op1 as SyntaxType);
            const op2Precedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.op2 as SyntaxType);
            const op1Text = SyntaxHelper.getTextForFixedTokens(pair.op1 as SyntaxType);
            const op2Text = SyntaxHelper.getTextForFixedTokens(pair.op2 as SyntaxType);
            const text = `a ${op1Text} b ${op2Text} c`;

            const CompilationUnit = SyntaxTree.parse(text).root;
            const flattenedNode = SyntaxHelper.flattenSyntaxNode((CompilationUnit.statement as ExpressionStatementSyntax).expression);
            

            // console.log(text);
            // console.log(expression);
            
            if(op1Precedence >= op2Precedence) {
                //      op2
                //    /   \
                //   op1   c
                //  /  \
                // a   b
                assertNode(SyntaxType.BinaryExpression, flattenedNode, 0);
                assertNode(SyntaxType.BinaryExpression, flattenedNode, 1);
                assertNode(SyntaxType.NameExpression, flattenedNode, 2);
                assertToken(SyntaxType.IdentifierToken, 'a', flattenedNode, 3);
                assertToken(pair.op1, op1Text, flattenedNode, 4);
                assertNode(SyntaxType.NameExpression, flattenedNode, 5);
                assertToken(SyntaxType.IdentifierToken, 'b', flattenedNode, 6);
                assertToken(pair.op2, op2Text, flattenedNode, 7);
                assertNode(SyntaxType.NameExpression, flattenedNode, 8);
                assertToken(SyntaxType.IdentifierToken, 'c', flattenedNode, 9);
            } else {
                //   op1 
                //  /  \
                // a   op2
                //    /  \
                //   b    c
                assertNode(SyntaxType.BinaryExpression, flattenedNode, 0);
                assertNode(SyntaxType.NameExpression, flattenedNode, 1);
                assertToken(SyntaxType.IdentifierToken, 'a', flattenedNode, 2);
                assertToken(pair.op1, op1Text, flattenedNode, 3);
                assertNode(SyntaxType.BinaryExpression, flattenedNode, 4);
                assertNode(SyntaxType.NameExpression, flattenedNode, 5);
                assertToken(SyntaxType.IdentifierToken, 'b', flattenedNode, 6);
                assertToken(pair.op2, op2Text, flattenedNode, 7);
                assertNode(SyntaxType.NameExpression, flattenedNode, 8);
                assertToken(SyntaxType.IdentifierToken, 'c', flattenedNode, 9);
            }
        }
    });

    it(`should honor precedence for unary expressions (${unaryOperatorPairs.length} tests)`, () => {
        for(const pair of unaryOperatorPairs) {
            const unaryPrecedence = SyntaxHelper.getUnaryOperatorPrecedence(pair.unaryOp as SyntaxType);
            const binaryPrecedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.binaryOp as SyntaxType);
            const unaryText = SyntaxHelper.getTextForFixedTokens(pair.unaryOp as SyntaxType);
            const binaryText = SyntaxHelper.getTextForFixedTokens(pair.binaryOp as SyntaxType);
            const text = `${unaryText} a ${binaryText} b`;

            const CompilationUnit = SyntaxTree.parse(text).root;
            const flattenedNode = SyntaxHelper.flattenSyntaxNode((CompilationUnit.statement as ExpressionStatementSyntax).expression);
            
            
            if(unaryPrecedence >= binaryPrecedence) {
                //      binary
                //    /     \
                //  unary    b
                //  /  
                // a  
                assertNode(SyntaxType.BinaryExpression, flattenedNode, 0);
                assertNode(SyntaxType.UnaryExpression, flattenedNode, 1);
                assertToken(pair.unaryOp, unaryText, flattenedNode, 2);
                assertNode(SyntaxType.NameExpression, flattenedNode, 3);
                assertToken(SyntaxType.IdentifierToken, 'a', flattenedNode, 4);
                assertToken(pair.binaryOp, binaryText, flattenedNode, 5);
                assertNode(SyntaxType.NameExpression, flattenedNode, 6);
                assertToken(SyntaxType.IdentifierToken, 'b', flattenedNode, 7);
            } else {
                //      unary
                //    /   
                //   binary   
                //  /  \
                // a   b
                assertNode(SyntaxType.UnaryExpression, flattenedNode, 0);
                assertToken(pair.unaryOp, unaryText, flattenedNode, 1);
                assertNode(SyntaxType.BinaryExpression, flattenedNode, 2);
                assertNode(SyntaxType.NameExpression, flattenedNode, 3);
                assertToken(SyntaxType.IdentifierToken, 'a', flattenedNode, 4);
                assertToken(pair.binaryOp, binaryText, flattenedNode, 5);
                assertNode(SyntaxType.NameExpression, flattenedNode, 6);
                assertToken(SyntaxType.IdentifierToken, 'b', flattenedNode, 7);
            }
        }
    });
})