import { IBoundBlockStatement, IBoundExpressionStatement, IBoundStatement } from "../interfaces";
import { ExpressionSyntax, StatementSyntax } from "../syntax";
import { BoundExpression } from "./boundExpression";
import { BoundNode } from "./boundNode";
import { BoundNodeType } from "./boundNodeType";
import { BoundStatement } from "./boundStatement";

export class BoundExpressionStatement extends BoundStatement implements IBoundExpressionStatement{
    public boundNodeType: BoundNodeType = BoundNodeType.ExpressionStatement;
    public expression: BoundExpression;

    constructor(expression:BoundExpression) {
        super();
        this.expression = expression;
    }
}               