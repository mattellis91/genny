import { BoundExpression, BoundNodeType } from ".";
import { VariableSymbol } from "../compilation/variableSymbol";
import { IBoundVariableExpression } from "../interfaces/binding-interfaces/i-boundVariableExpression";

export class BoundVariableExpression extends BoundExpression implements IBoundVariableExpression {

    public type:string;
    public variable:VariableSymbol;
    public boundNodeType:BoundNodeType = BoundNodeType.VariableExpression;

    constructor(variable:VariableSymbol) {
        super();
        this.variable = variable;
        this.type = variable.type; 
    }
}