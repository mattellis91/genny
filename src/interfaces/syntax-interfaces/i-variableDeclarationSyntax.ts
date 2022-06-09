import { ExpressionSyntax, SyntaxToken } from "../../syntax";

export interface IVariableDeclarationSyntax {
    keyword: SyntaxToken;
    identifier:SyntaxToken;
     equalsToken:SyntaxToken;
      initializer: ExpressionSyntax;
    
}