import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxToken } from "../../syntax/syntax-token";

export interface IParenthesizedExpressionSyntax {
    openParenthesisToken:SyntaxToken;
    expression:ExpressionSyntax;
    closedParenthesisToken:SyntaxToken;
}