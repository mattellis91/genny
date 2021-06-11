import { IBoundUnraryExpression } from "../interfaces/binding-interfaces/i-boundUnaryExpression";
import { BoundExpression } from "./boundExpression";
import { BoundNodeType } from "./boundNodeType";
import { BoundUnaryOperatorType } from "./boundUnaryOperatorType";

export class BoundUnaryExpression extends BoundExpression implements IBoundUnraryExpression{

    public operatorType:BoundUnaryOperatorType;
    public operand:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.UnaryExpression;
    public type:string;

    constructor(operatorType:BoundUnaryOperatorType, operand:BoundExpression) {
        super();
        this.operatorType = operatorType;
        this.operand = operand;
        this.type = this.getType(operand);
    }

    
}