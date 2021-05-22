import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";
import { Lexer } from "../lexing";
import { Parser } from "../parsing/parser";
import { Util } from "../util/util";

export class Repl implements IRepl{
    constructor() {}

    main():void {
        while(true) {
            const input = readlineSync.question(">:");

            const lexer = new Lexer(input);
            const parser = new Parser(input); 
            const expression = parser.parse();
            Util.prettyPrint(expression);
            if(parser.diagnostics.length) {
                for(const diagnostic of parser.diagnostics) {
                    Util.logErrorMessage(diagnostic);
                }
            }
            if(input === 'q') {
                return;
            }
        }
    }
}