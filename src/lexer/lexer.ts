import { ILexer } from "../interfaces";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";

export class Lexer implements ILexer{

    private readonly _text:string;
    private _position:number = 0;

    constructor(text:string) {
        this._text = text;
    }

    private getCurrentChar(): string {
        if(this._position >= this._text.length) {
            return '\0';
        } else {
            return this._text[this._position];
        }
    }

    private next(): void {
        this._position++;
    }

    private charIsDigit(char:string) : boolean{
        return Number.isInteger(Number(char));
    }

    public nextToken() : SyntaxToken {

        //get number token
        if(this.charIsDigit(this.getCurrentChar())) {
            const start = this._position;
            while(this.charIsDigit(this.getCurrentChar())) {
                this.next();
            }v
            const length = this._position - start;
            const text = this._text.substring(start, length);
            const value = Number.parseInt(text);
            return new SyntaxToken(SyntaxType.NumberToken, start, text, value);
        }

        //get white space token
        if(this.getCurrentChar() === " ") {

        }
    }
}