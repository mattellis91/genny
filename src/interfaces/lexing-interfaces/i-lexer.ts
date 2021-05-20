import { SyntaxToken } from "../../lexing/syntax-token";

export interface ILexer {
    nextToken():SyntaxToken;
}