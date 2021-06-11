import { BoundExpression } from "../../binding/boundExpression";
import { BoundNodeType } from "../../binding/boundNodeType";
import { BoundUnaryOperatorType } from "../../binding/boundUnaryOperatorType";

export interface IBoundUnraryExpression {
    operatorType:BoundUnaryOperatorType;
    operand:BoundExpression;
    boundNodeType:BoundNodeType;
}