import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxNode } from "../../syntax/syntaxNode";


export interface IUnaryExpressionSyntax {
    operatorToken:SyntaxNode;
    operand:ExpressionSyntax;
}