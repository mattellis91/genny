import { BoundExpression, BoundNodeType } from ".";
import { IBoundAssignmentExpression } from "..";
import { VariableSymbol } from "../compilation/variableSymbol";

export class BoundAssignmentExpression extends BoundExpression implements IBoundAssignmentExpression {
    public type:string;
    public variable:VariableSymbol;
    public expression:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.AssignmentExpression;

    constructor(variable:VariableSymbol, expression:BoundExpression) {
        super();
        this.variable = variable;
        this.type = expression.type;
        this.expression = expression;
    }
}