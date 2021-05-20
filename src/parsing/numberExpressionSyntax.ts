import { INumberExpressionSyntax } from "../interfaces";
import { SyntaxToken, SyntaxType } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";

export class NumberExpressionSyntax extends ExpressionSyntax implements INumberExpressionSyntax {
    public type = SyntaxType.NumberExpression
    public numberToken:SyntaxToken;
    constructor(numberToken: SyntaxToken) {
        super();
        this.numberToken = numberToken;
    }
} 