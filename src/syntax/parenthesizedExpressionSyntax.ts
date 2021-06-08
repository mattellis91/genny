import { IParenthesizedExpressionSyntax } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class ParenthesizedExpressionSyntax extends ExpressionSyntax implements IParenthesizedExpressionSyntax {
    public type: SyntaxType = SyntaxType.ParenthesizedExpression;
    public openParenthesisToken:SyntaxToken;
    public expression:ExpressionSyntax;
    public closedParenthesisToken:SyntaxToken;
    constructor(openParenthesisToken:SyntaxToken, expression: ExpressionSyntax, closedParenthesisToken:SyntaxToken) {
        super();
        this.openParenthesisToken = openParenthesisToken;
        this.expression = expression;
        this.closedParenthesisToken = closedParenthesisToken;
    }

    public getChildren() : SyntaxNode[]{
        return [this.openParenthesisToken, this.expression, this.closedParenthesisToken];
    }

}