import { BoundExpression, BoundNodeType } from ".";
import { IBoundAssignmentExpression } from "..";

export class BoundAssignmentExpression extends BoundExpression implements IBoundAssignmentExpression {
    public name:string;
    public type:string;
    public expression:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.AssignmentExpression;

    constructor(name:string, expression:BoundExpression) {
        super();
        this.name = name;
        this.type = expression.type;
        this.expression = expression;
    }
}