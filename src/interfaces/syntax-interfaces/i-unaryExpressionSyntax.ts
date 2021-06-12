import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxToken } from "../../syntax/syntax-token";
import { SyntaxNode } from "../../syntax/syntaxNode";


export interface IUnaryExpressionSyntax {
    operatorToken:SyntaxToken;
    operand:ExpressionSyntax;
}