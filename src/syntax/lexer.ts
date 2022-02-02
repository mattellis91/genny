import { DiagnosticBag } from "../compilation/diagnosticBag";
import { TextSpan } from "../compilation/textSpan";
import { ILexer } from "../interfaces/syntax-interfaces/i-lexer";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxHelper } from "./syntaxHelper";

export class Lexer implements ILexer{

    private readonly _text:string;
    private _position:number = 0;
    public diagnosticBag:DiagnosticBag = new DiagnosticBag();

    constructor(text:string) {
        this._text = text;
    }

    private getCurrentChar(): string {
        return this.peek(0);
    }

    private lookAhead(): string {
        return this.peek(1);
    }

    private next(): void {
        this._position++;
    }

    private peek(offset:number): string {
        const index = this._position + offset;
        if(index >= this._text.length) {
            return '\0';
        } else {
            return this._text[index];
        }
    }

    private charIsBlank(charCode:number) : boolean{
        return (
            charCode == 9 ||
            charCode == 11 ||
            charCode == 10 ||
            charCode == 13 ||
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


    public lex() : SyntaxToken {

        //End of file
        if(this._position >= this._text.length) {
            return new SyntaxToken(SyntaxType.EOFToken, this._position, "\0", null);
        }

        let start = this._position;

        //get number token
        if(this.charIsNumber(this.getCurrentChar().charCodeAt(0))) {
            while(this.charIsNumber(this.getCurrentChar().charCodeAt(0))) {
                this.next();
            }

            const length = this._position - start;
            const text = this._text.substring(start, start + length);
            const value = Number.parseInt(text);
            if(isNaN(value)) {
                this.diagnosticBag.reportInvalidNumber(new TextSpan(start,length), this._text, typeof(1));
            }
            return new SyntaxToken(SyntaxType.NumberToken, start, text, value);
        }

        //get white space token
        if (this.charIsBlank(this.getCurrentChar().charCodeAt(0))) {

            while(this.charIsBlank(this.getCurrentChar().charCodeAt(0))) {
                this.next();
            }
            const length = this._position - start;

            const text = this._text.substring(start, start + length);
            return new SyntaxToken(SyntaxType.WhitespaceToken, start, text, null);
        }

        //get keyword token
        if(this.charIsAlpha(this.getCurrentChar().charCodeAt(0))) {

            while(this.charIsAlpha(this.getCurrentChar().charCodeAt(0))){
                this.next();
            }
            const length = this._position - start;
            const text = this._text.substring(start, start + length);
            const keywordType = SyntaxHelper.getKeywordType(text);
            return new SyntaxToken(keywordType,start,text, null);
        }

        switch(this.getCurrentChar()) {
            case '+':
                return new SyntaxToken(SyntaxType.PlusToken, this._position++, "+", null);
            case '-':
                return new SyntaxToken(SyntaxType.MinusToken, this._position++, "-", null);
            case '*':
                return new SyntaxToken(SyntaxType.StarToken, this._position++, "*", null);
            case '/':
                return new SyntaxToken(SyntaxType.SlashToken, this._position++, "/", null);
            case '(':
                return new SyntaxToken(SyntaxType.OpenParenthesisToken, this._position++, "(", null);
            case ')':
                return new SyntaxToken(SyntaxType.CloseParenthesisToken, this._position++, ")", null);
            case '%':
                return new SyntaxToken(SyntaxType.ModToken, this._position++, "%", null);
            case '&':
                if(this.lookAhead() === '&') {
                    this._position += 2;
                    return new SyntaxToken(SyntaxType.AmpersandAmpersandToken, start, '&&', null);
                }
                break;
            case '|':
                if(this.lookAhead() === '|') {
                    this._position += 2;
                    return new SyntaxToken(SyntaxType.PipePipeToken, start, '||', null);
                }
                break;
            case '=':
                if(this.lookAhead() === '=') {
                    this._position += 2;
                    return new SyntaxToken(SyntaxType.EqualsEqualsToken, start, '==', null);
                }
                this._position += 1;
                return new SyntaxToken(SyntaxType.EqualsToken, start, '=', null);
            case '!':
                if(this.lookAhead() === '=') {
                    this._position += 2;
                    return new SyntaxToken(SyntaxType.BangEqualsToken, start, '!=', null);
                }
                this._position += 1;
                return new SyntaxToken(SyntaxType.BangToken, start, '!', null);
        }

        //unknown token
        this.diagnosticBag.reportUnkownCharacter(this._position, this.getCurrentChar());
        return new SyntaxToken(SyntaxType.UnknownToken, this._position++, this._text.substring(this._position - 1, 1), null);
    }
}
