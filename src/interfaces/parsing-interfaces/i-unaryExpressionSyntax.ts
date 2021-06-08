import { ExpressionSyntax, SyntaxNode } from "../../parsing";

export interface IUnaryExpressionSyntax {
    operatorToken:SyntaxNode;
    operand:ExpressionSyntax;
}