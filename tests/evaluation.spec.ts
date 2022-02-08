import { expect } from "chai";
import { Compilation, SyntaxTree, VariableSymbol } from "../src";

describe('Evaluation tests', () => {

    const evaluationTestExpressions = [
        {expression:'1', expectedResult:1},
        {expression:'+1', expectedResult:1},
        {expression:'-1', expectedResult:-1},
        {expression:'14 + 12', expectedResult:26},
        {expression:'12 - 3', expectedResult:9},
        {expression:'4 * 2', expectedResult:8},
        {expression:'9 / 3', expectedResult:3},
        {expression:'(10)', expectedResult:10},

        {expression:'12 == 3', expectedResult:false},
        {expression:'3 == 3', expectedResult:true},
        {expression:'12 != 3', expectedResult:true},
        {expression:'3 != 3', expectedResult:false},

        {expression:'true', expectedResult:true},
        {expression:'false', expectedResult:false},
        {expression:'!true', expectedResult:false},
        {expression:'!false', expectedResult:true},
        {expression:'false == false', expectedResult:true},
        {expression:'true == false', expectedResult:false},
        {expression:'false != false', expectedResult:false},
        {expression:'true != false', expectedResult:true},  

        {expression:'(a = 10) * a', expectedResult:100} 
    ]

    it(`should correctly evaluate test expressions (${evaluationTestExpressions.length} tests)`, () => {
        
        for(const test of evaluationTestExpressions) {
            const text = test.expression;
            const expression = SyntaxTree.parse(text);
            const vars = new Map<VariableSymbol, object>();
            const compilation = new Compilation(expression, vars);
            const result = compilation.evaluate(vars);

            expect(result.diagnostics).to.be.an('array').that.is.empty;

            expect(result.value).to.equal(test.expectedResult);
        }
    });
});