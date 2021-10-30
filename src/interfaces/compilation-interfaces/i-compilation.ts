import { EvaluationResult } from "../../compilation/evaluationResult";
import { SyntaxTree } from "../../syntax";

export interface ICompilation { 
    syntaxTree:SyntaxTree;
    evaluate(variables: Record<string, object>): EvaluationResult;
}