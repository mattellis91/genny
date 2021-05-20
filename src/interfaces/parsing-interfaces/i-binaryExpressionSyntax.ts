import { ExpressionSyntax, SyntaxNode } from "../../parsing";

export interface IBinaryExpressionSyntax {
    left:ExpressionSyntax;
    operator:SyntaxNode;
    right:ExpressionSyntax;
}