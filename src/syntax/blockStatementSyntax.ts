import { IBlockStatementSyntax } from "../interfaces";
import { StatementSyntax } from "./statementSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class BlockStatementSyntax extends StatementSyntax implements IBlockStatementSyntax {
public type: SyntaxType = SyntaxType.BlockStatement;
public openBraceToken:SyntaxToken;
public statements:StatementSyntax[];
public closeBraceToken:SyntaxToken;

constructor(openBraceToken: SyntaxToken, statements:StatementSyntax[], closeBraceToken:SyntaxToken) {
    super();
    this.openBraceToken = openBraceToken;
    this.statements = statements;
    this.closeBraceToken = closeBraceToken;
}

 public getChildren(): SyntaxNode[] {
     return [
         this.openBraceToken,
         this.closeBraceToken
     ];
 }   
}