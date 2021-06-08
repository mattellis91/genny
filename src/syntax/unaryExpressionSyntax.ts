import { IUnaryExpressionSyntax } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class UnaryExpressionSyntax extends ExpressionSyntax implements IUnaryExpressionSyntax {
    public type = SyntaxType.UnaryExpression
    public operatorToken:SyntaxNode;
    public operand:ExpressionSyntax;
    constructor(operatorToken:SyntaxNode, operand:ExpressionSyntax) {
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