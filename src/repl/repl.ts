import { IRepl } from "../interfaces/repl-interaces";
import * as readlineSync from "readline-sync";

export class Repl implements IRepl{
    constructor() {}

    main():void {
        while(true) {
            const input = readlineSync.question(">:");
            console.log(input+"\n");
            if(input === 'q') {
                return;
            }
        }
    }
}