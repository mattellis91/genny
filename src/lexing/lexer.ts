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
        return /^\d+$/.test(char);
    }

    public nextToken() : SyntaxToken {

        //End of file
        if(this._position >= this._text.length) {
            return new SyntaxToken(SyntaxType.EOFToken, this._position, "\0", null);
        }

        //get number token
        if(this.charIsDigit(this.getCurrentChar())) {
            const start = this._position;
            while(this.charIsDigit(this.getCurrentChar())) {
                this.next();
            }
            
            const length = this._position - start;
            const text = this._text.substring(start, start + length);
            const value = Number.parseInt(text);
            return new SyntaxToken(SyntaxType.NumberToken, start, text, value);
        }

        //get white space token
        let ch = this.getCurrentChar();
        if ((ch === ' ') || (ch === '\t') || (ch === '\n')) {
            const start = this._position;
            while((ch ===  ' ') || (ch === '\t') || (ch === '\n')) {
                this.next();
                ch = this.getCurrentChar();
            }
            const length = this._position - start;
            
            const text = this._text.substring(start, start + length);
            const value = Number.parseInt(text);
            return new SyntaxToken(SyntaxType.WhitespaceToken, start, text, null);
        }

        if(this.getCurrentChar() === '+') {           
            return new SyntaxToken(SyntaxType.PlusToken, this._position++, "+", null);
        }
        if(this.getCurrentChar() === '-') {           
            return new SyntaxToken(SyntaxType.MinusToken, this._position++, "-", null);
        }
        if(this.getCurrentChar() === '*') {           
            return new SyntaxToken(SyntaxType.StarToken, this._position++, "*", null);
        }
        if(this.getCurrentChar() === '/') {           
            return new SyntaxToken(SyntaxType.SlashToken, this._position++, "/", null);
        }
        if(this.getCurrentChar() === '(') {           
            return new SyntaxToken(SyntaxType.OpenParenthesisToken, this._position++, "(", null);
        }
        if(this.getCurrentChar() === ')') {           
            return new SyntaxToken(SyntaxType.CloseParenthesisToken, this._position++, ")", null);
        }
        if(this.getCurrentChar() === '%') {           
            return new SyntaxToken(SyntaxType.ModToken, this._position++, "%", null);
        }

        //unknown token
        return new SyntaxToken(SyntaxType.UnknownToken, this._position++, this._text.substring(this._position - 1, 1), null);
    }
}