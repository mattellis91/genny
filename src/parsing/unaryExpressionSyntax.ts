import { IBinaryExpressionSyntax, IUnaryExpressionSyntax } from "../interfaces";
import { SyntaxType } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";
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