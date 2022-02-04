import { expect } from 'chai';
import { Parser, SyntaxHelper, SyntaxTree, SyntaxType } from '../src';

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

    it('should honour precedence for binary expressions', () => {
        for(const pair of getBinaryOperatorPairs()) {
            const op1Precedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.op1 as SyntaxType);
            const op2Precedence = SyntaxHelper.getBinaryOperatorPrecedence(pair.op2 as SyntaxType);
            const op1Text = SyntaxHelper.getTextForFixedTokens(pair.op1 as SyntaxType);
            const op2Text = SyntaxHelper.getTextForFixedTokens(pair.op2 as SyntaxType);
            const text = `a ${op1Text} b ${op2Text} c`;
            
            if(op1Precedence >= op2Precedence) {
                //      op2
                //    /   \
                //   op1   c
                //  /  \
                // a   b
            } else {
                //   op1 
                //  /  \
                // a   op2
                //    /  \
                //   b    c
            }
        }
    });
})