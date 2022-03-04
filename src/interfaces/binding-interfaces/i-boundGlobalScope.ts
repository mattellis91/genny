import { BoundGlobalScope, BoundExpression } from "../../binding";
import { Diagnostic, VariableSymbol } from "../../compilation";

export interface IBoundGlobalScope {
    previous:BoundGlobalScope | null;
    diagnostics:Diagnostic[];
    variables:VariableSymbol[];
    expression:BoundExpression;
}