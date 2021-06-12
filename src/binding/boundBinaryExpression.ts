import { IBoundBinaryExpression } from "../interfaces/binding-interfaces/i-boundBinaryExpression";
import { BoundBinaryOperator } from "./boundBinaryOperator";
import { BoundBinaryOperatorType } from "./boundBinaryOperatorType";
import { BoundExpression } from "./boundExpression";
import { BoundNodeType } from "./boundNodeType";

export class BoundBinaryExpression extends BoundExpression implements IBoundBinaryExpression{

    public operator:BoundBinaryOperator;
    public left:BoundExpression;
    public right:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.BinaryExpression;
    public type:string;
    
    constructor(left:BoundExpression, operator:BoundBinaryOperator, right:BoundExpression) {
        super();
        this.operator = operator;
        this.left = left;
        this.right = right;
        this.type = this.getType(left);
    }
   
}