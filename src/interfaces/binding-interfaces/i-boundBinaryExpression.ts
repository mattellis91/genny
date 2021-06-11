import { BoundBinaryOperatorType } from "../../binding/boundBinaryOperatorType";
import { BoundExpression } from "../../binding/boundExpression";
import { BoundUnaryOperatorType } from "../../binding/boundUnaryOperatorType";

export interface IBoundBinaryExpression {
    operatorType:BoundBinaryOperatorType;
    left:BoundExpression;
    right:BoundExpression;
}