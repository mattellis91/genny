import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxToken } from "../../syntax/syntax-token";

export interface ISyntaxTree {
    root:ExpressionSyntax;
    EOFToken: SyntaxToken;
    diagnostics:string[];
}