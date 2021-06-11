import { ILiteralExpressionSyntax } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class    LiteralExpressionSyntax extends ExpressionSyntax implements ILiteralExpressionSyntax {
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