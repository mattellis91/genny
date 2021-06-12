import { Binder } from "../binding/binder";
import { Evaluator } from "../evaluation";
import { ICompilation } from "../interfaces/compilation-interfaces/i-compilation";
import { SyntaxTree } from "../syntax";
import { EvaluationResult } from "./evaluationResult";

export class Compilation implements ICompilation {
    public syntaxTree:SyntaxTree;

    constructor(syntaxTree:SyntaxTree) {
        this.syntaxTree = syntaxTree;
    }

    public evaluate(): EvaluationResult {
        const binder = new Binder();
        const boundExpression = binder.bindExpression(this.syntaxTree.root);

        const diagnostics = [
            ...this.syntaxTree.diagnostics,
            ...binder.diagnosticBag.diagnostics,
        ];

        if(diagnostics.length > 0) {
            return new EvaluationResult(diagnostics, null);
        }

        const evaluator = new Evaluator(boundExpression);
        const value = evaluator.evaluate();

        return new EvaluationResult([],value);
    }
}