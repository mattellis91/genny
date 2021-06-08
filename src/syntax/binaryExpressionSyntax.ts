import { IBinaryExpressionSyntax } from "../interfaces/syntax-interfaces/i-binaryExpressionSyntax";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class BinaryExpressionSyntax extends ExpressionSyntax implements IBinaryExpressionSyntax {
    public type = SyntaxType.BinaryExpression
    public left:ExpressionSyntax;
    public operatorToken:SyntaxNode;
    public right:ExpressionSyntax;
    constructor(left:ExpressionSyntax, operatorToken:SyntaxNode, right:ExpressionSyntax) {
        super();
        this.left = left;
        this.operatorToken = operatorToken;
        this.right = right;
    }

    public getChildren():SyntaxNode[] {
        return [
            this.left,
            this.operatorToken,
            this.right
        ]
    }
}  