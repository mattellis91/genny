import { SyntaxToken } from "../../lexing/syntax-token";
import { ExpressionSyntax } from "../../parsing/expressionSyntax";

export interface IParenthesizedExpressionSyntax {
    openParenthesisToken:SyntaxToken;
    expression:ExpressionSyntax;
    closedParenthesisToken:SyntaxToken;
}