import { ExpressionSyntax, SyntaxNode, SyntaxToken, SyntaxType } from ".";
import { IAssignmentExpressionSyntax } from "../interfaces/syntax-interfaces/i-assignmentExpressionSyntax";

export class AssignmentExpressionSyntax extends ExpressionSyntax implements IAssignmentExpressionSyntax {

  public identifierToken:SyntaxToken;
  public equalsToken:SyntaxToken;
  public expression:ExpressionSyntax;
  public type = SyntaxType.AssignmentExpression;

  constructor(identifierToken:SyntaxToken, equalsToken:SyntaxToken, expression: ExpressionSyntax) {
    super();
    this.identifierToken = identifierToken;
    this.equalsToken = equalsToken;
    this.expression = expression;
  }

  public getChildren():SyntaxNode[]  {
    return [
        this.identifierToken,
        this.equalsToken,
        this.expression
    ];
}

}
