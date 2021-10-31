import { EvaluationResult } from "../../compilation/evaluationResult";
import { VariableSymbol } from "../../compilation/variableSymbol";
import { SyntaxTree } from "../../syntax";

export interface ICompilation { 
    syntaxTree:SyntaxTree;
    evaluate(variables: Map<VariableSymbol, object>): EvaluationResult;
}