import { BoundGlobalScope } from "../binding";
import { Binder } from "../binding/binder";
import { Evaluator } from "../evaluation";
import { ICompilation } from "../interfaces/compilation-interfaces/i-compilation";
import { SyntaxTree } from "../syntax";
import { EvaluationResult } from "./evaluationResult";
import { VariableSymbol } from "./variableSymbol";

export class Compilation implements ICompilation {
    public syntaxTree:SyntaxTree;
    private _globalScope:BoundGlobalScope | null = null;
    public previous:Compilation | null = null;

    constructor(syntaxTree:SyntaxTree, previous?:Compilation) {
        this.syntaxTree = syntaxTree;
        if(previous) {
            this.previous = previous;
        }
    }

    public evaluate(variables: Map<VariableSymbol, object>): EvaluationResult {
        const globalScope = this.getGlobalScope();
        
        const diagnostics = [
            ...this.syntaxTree.diagnostics,
            ...globalScope.diagnostics,
        ];

        if(diagnostics.length > 0) {
            return new EvaluationResult(diagnostics, null);
        }

        const evaluator = new Evaluator(globalScope.expression, variables);
        const value = evaluator.evaluate();

        return new EvaluationResult([],value);
    }

    public continueWith(syntaxTree:SyntaxTree):Compilation {
        return new Compilation(syntaxTree, this);
    }

    public getGlobalScope(): BoundGlobalScope {
        if(this._globalScope === null) {
            this._globalScope = Binder.bindGlobalScope(this.previous? this.previous._globalScope : null, this.syntaxTree.root);
        }
        return this._globalScope;
    }
}