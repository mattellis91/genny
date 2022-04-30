import { StatementSyntax, SyntaxToken } from "../../syntax";

export interface IBlockStatementSyntax {
    openBraceToken:SyntaxToken;
    statements:StatementSyntax[];
     closeBraceToken:SyntaxToken;
}