import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxNode } from "../../syntax/syntaxNode";


export interface IBinaryExpressionSyntax {
    left:ExpressionSyntax;
    operatorToken:SyntaxNode;
    right:ExpressionSyntax;
}