import { IBoundScope, VariableSymbol } from "..";

export class BoundScope implements IBoundScope {
    private _variables:Map<string, VariableSymbol> = new Map<string, VariableSymbol>();
    public parent:BoundScope | null;

    constructor(parent:BoundScope | null) {
        this.parent = parent;
    }

    public tryDeclare(variable:VariableSymbol): VariableSymbol | null {
        if(this._variables.has(variable.name)) {
            return null;
        }
        this._variables.set(variable.name, variable);
        return variable;
    }

    public tryLookup(name:string): VariableSymbol | null {
        if(this._variables.has(name)) {
            return this._variables.get(name) as VariableSymbol;
        }
        if(this.parent === null) {
            return null;
        }
        return this.parent.tryLookup(name);
    }

    public getDeclaredVariables() :VariableSymbol[] {
        return Array.from(this._variables.values());
    }

}