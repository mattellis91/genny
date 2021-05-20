import { INumberExpressionSyntax } from "../interfaces";
import { SyntaxToken, SyntaxType } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";

export class NumberExpressionSyntax extends ExpressionSyntax implements INumberExpressionSyntax {
    public type = SyntaxType.NumberExpression
    constructor(number: SyntaxToken) {
        super();
    }
} 