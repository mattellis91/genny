import { expect } from 'chai';
import { Parser, SyntaxHelper, SyntaxToken, SyntaxTree, SyntaxType } from '../src';

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

    const binaryOperatorPairs = getBinaryOperatorPairs();

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

    it(`should honour precedence for binary expressions (${binaryOperatorPairs.length} tests)`, () => {
        for(const pair of binaryOperatorPairs) {
            const op1Precedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.op1 as SyntaxType);
            const op2Precedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.op2 as SyntaxType);
            const op1Text = SyntaxHelper.getTextForFixedTokens(pair.op1 as SyntaxType);
            const op2Text = SyntaxHelper.getTextForFixedTokens(pair.op2 as SyntaxType);
            const text = `a ${op1Text} b ${op2Text} c`;

            const expression = SyntaxTree.parse(text).root;
            const flattenedNode = SyntaxHelper.flattenSyntaxNode(expression);
            
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
})