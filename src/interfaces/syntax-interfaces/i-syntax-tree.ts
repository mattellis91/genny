import { SourceText } from "../..";
import { Diagnostic } from "../../compilation/diagnostic";
import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { SyntaxToken } from "../../syntax/syntax-token";

export interface ISyntaxTree {
    root:ExpressionSyntax;
    diagnostics:Diagnostic[];
    text:SourceText;
}