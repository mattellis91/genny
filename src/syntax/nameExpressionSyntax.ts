import { ExpressionSyntax, SyntaxNode, SyntaxToken, SyntaxType } from ".";
import { INameExpressionSyntax } from "../interfaces";

export class NameExpressionSyntax extends ExpressionSyntax implements INameExpressionSyntax {

  public identifierToken:SyntaxToken;
  public type = SyntaxType.NameExpression;

  constructor(identifierToken:SyntaxToken) {
    super();
    this.identifierToken = identifierToken;
  }

  public getChildren():SyntaxNode[]  {
    return [this.identifierToken];
}

}
