import { BoundBinaryOperator } from "../../binding/boundBinaryOperator";
import { BoundBinaryOperatorType } from "../../binding/boundBinaryOperatorType";
import { BoundExpression } from "../../binding/boundExpression";
import { BoundUnaryOperatorType } from "../../binding/boundUnaryOperatorType";

export interface IBoundBinaryExpression {
    operator:BoundBinaryOperator;
    left:BoundExpression;
    right:BoundExpression;
}