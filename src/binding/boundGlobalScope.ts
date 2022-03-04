import { Diagnostic, VariableSymbol } from "../compilation";
import { IBoundGlobalScope } from "../interfaces";
import { BoundExpression } from "./boundExpression";

export class BoundGlobalScope implements IBoundGlobalScope {
    
    public previous:BoundGlobalScope | null;
    public diagnostics:Diagnostic[];
    public variables:VariableSymbol[];
    public expression:BoundExpression;

    constructor(previous:BoundGlobalScope | null, diagnostics:Diagnostic[], variables:VariableSymbol[], expression:BoundExpression) {
        this.previous = previous;
        this.diagnostics = diagnostics;
        this.variables = variables;
        this.expression = expression;
    }
}