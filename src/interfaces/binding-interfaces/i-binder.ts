import { BoundExpression } from "../../binding/boundExpression";
import { DiagnosticBag } from "../../compilation/diagnosticBag";
import { ExpressionSyntax } from "../../syntax/expressionSyntax";
import { StatementSyntax } from "../../syntax/statementSyntax";

export interface IBinder {
    diagnosticBag:DiagnosticBag;
}