import { INumberExpressionSyntax } from "../interfaces";
import { SyntaxToken, SyntaxType } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxNode } from "./syntaxNode";

export class NumberExpressionSyntax extends ExpressionSyntax implements INumberExpressionSyntax {
    public type = SyntaxType.NumberExpression
    public numberToken:SyntaxToken;
    constructor(numberToken: SyntaxToken) {
        super();
        this.numberToken = numberToken;
    }

    public getChildren():SyntaxNode[]  {
        return [this.numberToken];
    }
} 