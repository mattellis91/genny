import { BoundGlobalScope } from "../../binding";
import { Compilation } from "../../compilation";
import { EvaluationResult } from "../../compilation/evaluationResult";
import { VariableSymbol } from "../../compilation/variableSymbol";
import { SyntaxTree } from "../../syntax";

export interface ICompilation { 
    syntaxTree:SyntaxTree;
    previous:Compilation | null;
    evaluate(variables: Map<VariableSymbol, object>): EvaluationResult;
    getGlobalScope(): BoundGlobalScope;
    continueWith(syntaxTree:SyntaxTree):Compilation;
}