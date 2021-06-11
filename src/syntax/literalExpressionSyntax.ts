import { ILiteralExpressionSyntax } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class LiteralExpressionSyntax extends ExpressionSyntax implements ILiteralExpressionSyntax {
    public type = SyntaxType.LiteralExpression
    public literalToken:SyntaxToken;
    public value:any;
    constructor(literalToken: SyntaxToken, value:any = null) {
        super();
        this.literalToken = literalToken;
        this.value = value;
    }

    public getChildren():SyntaxNode[]  {
        return [this.literalToken];
    }
} 