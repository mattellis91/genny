import { BoundExpression } from "../../binding/boundExpression";
import { DiagnosticBag } from "../../compilation/diagnosticBag";
import { ExpressionSyntax } from "../../syntax/expressionSyntax";

export interface IBinder {
    bindExpression(syntax:ExpressionSyntax) : BoundExpression;
    diagnosticBag:DiagnosticBag;
}