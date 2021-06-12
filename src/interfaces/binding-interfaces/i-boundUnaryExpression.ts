import { BoundExpression } from "../../binding/boundExpression";
import { BoundNodeType } from "../../binding/boundNodeType";
import { BoundUnaryOperator } from "../../binding/boundUnaryOperator";

export interface IBoundUnraryExpression {
    operator:BoundUnaryOperator;
    operand:BoundExpression;
    boundNodeType:BoundNodeType;
}