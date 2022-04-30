import { ExpressionSyntax, SyntaxNode, SyntaxToken, SyntaxType } from ".";
import { ICompilationUnitSyntax } from "..";
import { StatementSyntax } from "./statementSyntax";

export class compilationUnitSyntax extends SyntaxNode implements ICompilationUnitSyntax {
    public statement:StatementSyntax;
    public type = SyntaxType.CompilationUnit;
    constructor(statement: StatementSyntax, eofToken:SyntaxToken) {
        super();
        this.statement = statement;
    }

    public getChildren():SyntaxNode[] {
        return []
    }
}