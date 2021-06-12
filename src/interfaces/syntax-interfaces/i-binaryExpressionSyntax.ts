import { BoundNodeType } from "../../binding/boundNodeType";
import { SyntaxToken } from "../../syntax";
import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxNode } from "../../syntax/syntaxNode";


export interface IBinaryExpressionSyntax {
    left:ExpressionSyntax;
    operatorToken:SyntaxToken;
    right:ExpressionSyntax;
}