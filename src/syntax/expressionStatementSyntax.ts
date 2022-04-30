import { IBlockStatementSyntax, IExpressionStatementSyntax } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { StatementSyntax } from "./statementSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class ExpressionStatementSyntax extends StatementSyntax implements IExpressionStatementSyntax {
public type: SyntaxType = SyntaxType.ExpressionStatement;
public expression:ExpressionSyntax;

constructor(expression:ExpressionSyntax) {
    super();
    this.expression = expression;
}

 public getChildren(): SyntaxNode[] {
     return [];
 }   
}