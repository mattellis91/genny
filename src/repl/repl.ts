import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";
import { Util } from "../util/util";
import { Evaluator } from "../evaluation/evaluator";
import { SyntaxTree } from "../syntax/syntaxTree";
import { Binder } from "../binding/binder";

export class Repl implements IRepl{
    constructor() {}

    main():void {
        let showTree = false;
        while(true) {
            const input = readlineSync.question(">:");
            if(input === 'q') return;
            if(input === '$showTree') {
                showTree = !showTree;
                console.log(showTree ? "Showing parse trees" : "Hiding parse trees");
                continue;
            }

            if(input === '$cls') {
                console.clear();
                continue;
            }

            const syntaxTree = SyntaxTree.parse(input);
            const binder = new Binder();
            const boundExpression= binder.bindExpression(syntaxTree.root);
            const diagnostics = [...syntaxTree.diagnostics, ...binder.diagnostics]; 
            
            if(showTree) {
                Util.prettyPrint(syntaxTree.root);
            }

            if(diagnostics.length) {
                for(const diagnostic of diagnostics) {
                    Util.logErrorMessage(diagnostic);
                }
            } else {
                const evaluator = new Evaluator(boundExpression); 
                const result = evaluator.evaluate();
                console.log(result);
            }
        }
    }
}