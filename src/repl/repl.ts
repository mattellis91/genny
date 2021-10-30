import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";
import { Util } from "../util/util";
import { SyntaxTree } from "../syntax/syntaxTree";
import { Compilation } from "../compilation/compilation";

export class Repl implements IRepl{
    constructor() {}

    main():void {
        let showTree = false;
        const variables = {} as Record<string, object>;

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

            const compilation = new Compilation(syntaxTree, variables);
            const result = compilation.evaluate(variables);
            const diagnostics = result.diagnostics;

            if(showTree) {
                Util.prettyPrint(syntaxTree.root);
            }

            if(diagnostics.length) {
              console.log(diagnostics);
                for(const diagnostic of diagnostics) {
                    Util.logErrorMessage(input, diagnostic);
                }
            } else {
                console.log(result.value);
            }
        }
    }
}
