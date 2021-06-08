import { ILexer } from "../interfaces/syntax-interfaces/i-lexer";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";

export class Lexer implements ILexer{

    private readonly _text:string;
    private _position:number = 0;
    public diagnostics:string[] = [];

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

    private charIsBlank(charCode:number) : boolean{
        return (
            charCode == 9 ||
            charCode == 11 ||
            charCode == 12 ||
            charCode == 32 ||
            charCode == 160
          );
    }

    private charIsAlpha(charCode:number) : boolean {
        return (
            charCode >= 65 && charCode <= 90 ||
            charCode >= 97 && charCode <= 122 ||
            charCode == 95
          );
    }

    private charIsNumber(charCode:number) : boolean {
        return (
            charCode >= 48 && charCode <= 57
          );
    }

    public nextToken() : SyntaxToken {

        //End of file
        if(this._position >= this._text.length) {
            return new SyntaxToken(SyntaxType.EOFToken, this._position, "\0", null);
        }

        //get number token
        if(this.charIsNumber(this.getCurrentChar().charCodeAt(0))) {
            const start = this._position;
            while(this.charIsNumber(this.getCurrentChar().charCodeAt(0))) {
                this.next();
            }
            
            const length = this._position - start;
            const text = this._text.substring(start, start + length);
            const value = Number.parseInt(text);
            if(isNaN(value)) {
                this.diagnostics.push("ERROR: The number " + text + " cannot be represented as a number");
            }

            return new SyntaxToken(SyntaxType.NumberToken, start, text, value);
        }

        //get white space token
        if (this.charIsBlank(this.getCurrentChar().charCodeAt(0))) {
            const start = this._position;
            while(this.charIsBlank(this.getCurrentChar().charCodeAt(0))) {
                this.next();
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
        this.diagnostics.push("ERROR: bad character in input: " + this.getCurrentChar());
        return new SyntaxToken(SyntaxType.UnknownToken, this._position++, this._text.substring(this._position - 1, 1), null);
    }
}