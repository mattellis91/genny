import { IVariableDeclarationSyntax } from "../interfaces/syntax-interfaces/i-variableDeclarationSyntax";
import { ExpressionSyntax } from "./expressionSyntax";
import { StatementSyntax } from "./statementSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class variableDeclarationSyntax extends StatementSyntax implements IVariableDeclarationSyntax{
    public type  = SyntaxType.VariableDeclaration;
    public keyword: SyntaxToken;
    public identifier:SyntaxToken;
    public equalsToken: SyntaxToken;
    public initializer: ExpressionSyntax;

    constructor(keyword:SyntaxToken, identifier:SyntaxToken, equalsToken:SyntaxToken, initializer: ExpressionSyntax){
        super();
        this.keyword = keyword;
        this.identifier = identifier;
        this.equalsToken = equalsToken;
        this.initializer = initializer;
    }

    public getChildren(): SyntaxNode[] {
        return [
            this.keyword,
            this.identifier,
            this.equalsToken,
            this.initializer
        ]
    }
}