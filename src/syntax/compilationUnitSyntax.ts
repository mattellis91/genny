import { ExpressionSyntax, SyntaxNode, SyntaxToken, SyntaxType } from ".";
import { ICompilationUnitSyntax } from "..";

export class compilationUnitSyntax extends SyntaxNode implements ICompilationUnitSyntax {
    public expression:ExpressionSyntax;
    public type = SyntaxType.CompilationUnit;
    constructor(expression: ExpressionSyntax, eofToken:SyntaxToken) {
        super();
        this.expression = expression;
    }

    public getChildren():SyntaxNode[] {
        return []
    }
}