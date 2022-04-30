import { Diagnostic, VariableSymbol } from "../compilation";
import { IBoundGlobalScope } from "../interfaces";
import { BoundExpression } from "./boundExpression";
import { BoundStatement } from "./boundStatement";

export class BoundGlobalScope implements IBoundGlobalScope {
    
    public previous:BoundGlobalScope | null;
    public diagnostics:Diagnostic[];
    public variables:VariableSymbol[];
    public statement:BoundStatement;

    constructor(previous:BoundGlobalScope | null, diagnostics:Diagnostic[], variables:VariableSymbol[], statement:BoundStatement) {
        this.previous = previous;
        this.diagnostics = diagnostics;
        this.variables = variables;
        this.statement = statement;
    }
}