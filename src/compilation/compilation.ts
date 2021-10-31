import { Binder } from "../binding/binder";
import { Evaluator } from "../evaluation";
import { ICompilation } from "../interfaces/compilation-interfaces/i-compilation";
import { SyntaxTree } from "../syntax";
import { EvaluationResult } from "./evaluationResult";
import { VariableSymbol } from "./variableSymbol";

export class Compilation implements ICompilation {
    public syntaxTree:SyntaxTree;

    //TODO: use Map instead of record for varaibles inorder to use variable symbol as key
    constructor(syntaxTree:SyntaxTree, variables:Map<VariableSymbol, object>) {
        this.syntaxTree = syntaxTree;
    }

    public evaluate(variables: Map<VariableSymbol, object>): EvaluationResult {
        const binder = new Binder(variables);
        const boundExpression = binder.bindExpression(this.syntaxTree.root);

        const diagnostics = [
            ...this.syntaxTree.diagnostics,
            ...binder.diagnosticBag.diagnostics,
        ];

        if(diagnostics.length > 0) {
            return new EvaluationResult(diagnostics, null);
        }

        const evaluator = new Evaluator(boundExpression, variables);
        const value = evaluator.evaluate();

        return new EvaluationResult([],value);
    }
}