import { IParser } from "../interfaces/parsing-interfaces/i-parser";
import { Lexer, SyntaxToken, SyntaxType } from "../lexing";

export class Parser implements IParser {

    private readonly _tokens:SyntaxToken[];
    private _position:number = 0;

    constructor(text:string) {
        const tokens:SyntaxToken[] =  [];
        const lexer = new Lexer(text);
        let token:SyntaxToken;
        do {
            token = lexer.nextToken();
            if(token.type !== SyntaxType.WhitespaceToken && token.type !== SyntaxType.UnknownToken) {
                tokens.push(token);
            }
        } while(token.type !== SyntaxType.EOFToken);

        this._tokens = tokens;
    }

    private peek(offset:number):SyntaxToken {
        const index = this._position + offset;
        //return last token if out of bounds
        if(index >= this._tokens.length) {
            return this._tokens[this._tokens.length - 1];
        } else {
            return this._tokens[index];
        }
    }

    private current():SyntaxToken { return this.peek(0); }
}