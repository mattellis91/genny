import { IBoundUnraryExpression } from "../interfaces/binding-interfaces/i-boundUnaryExpression";
import { BoundExpression } from "./boundExpression";
import { BoundNodeType } from "./boundNodeType";
import { BoundUnaryOperator } from "./boundUnaryOperator";

export class BoundUnaryExpression extends BoundExpression implements IBoundUnraryExpression{

    public operator:BoundUnaryOperator;
    public operand:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.UnaryExpression;
    public type:string;

    constructor(operator:BoundUnaryOperator, operand:BoundExpression) {
        super();
        this.operator = operator;
        this.operand = operand;
        this.type = this.getType(operand);
    }

    
}