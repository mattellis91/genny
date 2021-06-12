import { Diagnostic } from "../../compilation/diagnostic";
import { DiagnosticBag } from "../../compilation/diagnosticBag";
import { SyntaxToken } from "../../syntax/syntax-token";

export interface ILexer {
    diagnosticBag:DiagnosticBag;
    lex():SyntaxToken;
}