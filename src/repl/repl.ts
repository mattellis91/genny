import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";
import { Lexer, SyntaxType } from "../lexer";

export class Repl implements IRepl{
    constructor() {}

    main():void {
        while(true) {
            const input = readlineSync.question(">:");

            const lexer = new Lexer(input);
            while(true) {
                const token = lexer.nextToken();
                if(token.type === SyntaxType.EOFToken) {
                    break;
                }
                console.log("Token Type: " + token.type + ", Token Text: " + token.text);
                if(token.value) {
                    console.log("Token Value: " + token.value);
                }
            }
            if(input === 'q') {
                return;
            }
        }
    }
}