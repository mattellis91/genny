import { IUnaryExpressionSyntax } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class UnaryExpressionSyntax extends ExpressionSyntax implements IUnaryExpressionSyntax {
    public type = SyntaxType.UnaryExpression
    public operatorToken:SyntaxToken;
    public operand:ExpressionSyntax;
    constructor(operatorToken:SyntaxToken, operand:ExpressionSyntax) {
        super();
        this.operatorToken = operatorToken;
        this.operand = operand;
    }

    public getChildren():SyntaxNode[] {
        return [
            this.operatorToken,
            this.operand
        ]
    }
}  