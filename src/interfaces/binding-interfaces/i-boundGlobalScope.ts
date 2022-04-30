import { BoundGlobalScope, BoundExpression, BoundStatement } from "../../binding";
import { Diagnostic, VariableSymbol } from "../../compilation";

export interface IBoundGlobalScope {
    previous:BoundGlobalScope | null;
    diagnostics:Diagnostic[];
    variables:VariableSymbol[];
    statement:BoundStatement;
}