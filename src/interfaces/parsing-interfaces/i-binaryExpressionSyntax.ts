import { ExpressionSyntax, SyntaxNode } from "../../parsing";

export interface IBinaryExpressionSyntax {
    left:ExpressionSyntax;
    operatorToken:SyntaxNode;
    right:ExpressionSyntax;
}