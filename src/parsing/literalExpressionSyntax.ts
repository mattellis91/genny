import { ILiteralExpressionSyntax } from "../interfaces";
import { SyntaxToken, SyntaxType } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxNode } from "./syntaxNode";

export class LiteralExpressionSyntax extends ExpressionSyntax implements ILiteralExpressionSyntax {
    public type = SyntaxType.LiteralExpression
    public literalToken:SyntaxToken;
    constructor(literalToken: SyntaxToken) {
        super();
        this.literalToken = literalToken;
    }

    public getChildren():SyntaxNode[]  {
        return [this.literalToken];
    }
} 