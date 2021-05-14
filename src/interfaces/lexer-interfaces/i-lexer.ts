import { SyntaxToken } from "../../lexer/syntax-token";

export interface ILexer {
    nextToken():SyntaxToken;
}