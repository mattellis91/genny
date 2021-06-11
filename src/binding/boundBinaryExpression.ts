import { IBoundBinaryExpression } from "../interfaces/binding-interfaces/i-boundBinaryExpression";
import { BoundBinaryOperatorType } from "./boundBinaryOperatorType";
import { BoundExpression } from "./boundExpression";
import { BoundNodeType } from "./boundNodeType";

export class BoundBinaryExpression extends BoundExpression implements IBoundBinaryExpression{

    public operatorType:BoundBinaryOperatorType;
    public left:BoundExpression;
    public right:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.BinaryExpression;
    public type:string;
    
    constructor(left:BoundExpression, operatorType:BoundBinaryOperatorType, right:BoundExpression) {
        super();
        this.operatorType = operatorType;
        this.left = left;
        this.right = right;
        this.type = this.getType(left);
    }
   
}