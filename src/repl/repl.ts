import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";
import { Util } from "../util/util";
import { Evaluator, SyntaxTree } from "../parsing";

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

            if(showTree) {
                Util.prettyPrint(syntaxTree.root);
            }

            if(syntaxTree.diagnostics.length) {
                for(const diagnostic of syntaxTree.diagnostics) {
                    Util.logErrorMessage(diagnostic);
                }
            } else {
                const evaluator = new Evaluator(syntaxTree.root); 
                const result = evaluator.evaluate();
                console.log(result);
            }
        }
    }
}