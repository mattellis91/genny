import { SyntaxToken } from "../../lexing/syntax-token";
import { ExpressionSyntax } from "../../parsing/expressionSyntax";

export interface ISyntaxTree {
    root:ExpressionSyntax;
    EOFToken: SyntaxToken;
    diagnostics:string[];
}