import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";
import { Util } from "../util/util";
import { SyntaxTree } from "../syntax/syntaxTree";
import { Compilation } from "../compilation/compilation";
import { VariableSymbol } from "../compilation/variableSymbol";

export class Repl implements IRepl{
    constructor() {}

    main():void {
        let showTree = false;
        const variables = new Map<VariableSymbol, object>();
        let text = '';

        while(true) {

            if(!text.length) {
                process.stdout.write(">: ");
            } else {
                console.log("| ");
            }
            
            const input = readlineSync.question();
            const isBlank = !input;

            if(!text.length) {

                if(isBlank) {
                    break;
                }

                else if(input === 'q') return;
                else if(input === '$showTree') {
                    showTree = !showTree;
                    console.log(showTree ? "Showing parse trees" : "Hiding parse trees");
                    continue;
                }

                else if(input === '$cls') {
                    console.clear();
                    continue;
                }
            }

            text += input;

            const syntaxTree = SyntaxTree.parse(text);

            if(!isBlank && syntaxTree.diagnostics.length) {
                continue;
            }

            const compilation = new Compilation(syntaxTree, variables);
            const result = compilation.evaluate(variables);
            const diagnostics = result.diagnostics;

            if(showTree) {
                Util.prettyPrint(syntaxTree.root);
            }

            if(diagnostics.length) {
                const text = syntaxTree.text;
                for(const diagnostic of diagnostics) {
                    Util.logErrorMessage(input, text, diagnostic);
                }
            } else {
                console.log(result.value);
            }

            text = '';
        }
    }
}
