import { VariableSymbol } from "../../compilation";

export interface IBoundScope {
    parent:IBoundScope | null;
    tryDeclare(variable:VariableSymbol): VariableSymbol | null;
    tryLookup(name:string): VariableSymbol | null;
    getDeclaredVariables() :VariableSymbol[];
}