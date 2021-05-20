import { IBinaryExpressionSyntax } from "../interfaces";
import { SyntaxType } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";
import { SyntaxNode } from "./syntaxNode";

export class BinaryExpressionSyntax extends ExpressionSyntax implements IBinaryExpressionSyntax {
    public type = SyntaxType.BinaryExpression
    public left:ExpressionSyntax;
    public operator:SyntaxNode;
    public right:ExpressionSyntax;
    constructor(left:ExpressionSyntax, operator:SyntaxNode, right:ExpressionSyntax) {
        super();
        this.left = left;
        this.operator = operator;
        this.right = right;
    }
}  