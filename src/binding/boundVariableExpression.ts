import { BoundExpression, BoundNodeType } from ".";
import { IBoundVariableExpression } from "../interfaces/binding-interfaces/i-boundVariableExpression";

export class BoundVariableExpression extends BoundExpression implements IBoundVariableExpression {

    public name:string;
    public type:string;
    public boundNodeType:BoundNodeType = BoundNodeType.VariableExpression;

    constructor(name:string, type:string) {
        super();
        this.name = name;
        this.type = type;
    }
}