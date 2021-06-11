import { BoundExpression } from "../../binding/boundExpression";
import { ExpressionSyntax } from "../../syntax/expressionSyntax";

export interface IBinder {
    bindExpression(syntax:ExpressionSyntax) : BoundExpression;
    diagnostics:string[];
}