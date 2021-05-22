import { SyntaxToken } from "../../lexing/syntax-token";

export interface ILexer {
    diagnostics:string[];
    nextToken():SyntaxToken;
}