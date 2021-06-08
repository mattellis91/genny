import { SyntaxToken } from "../../syntax/syntax-token";

export interface ILexer {
    diagnostics:string[];
    nextToken():SyntaxToken;
}