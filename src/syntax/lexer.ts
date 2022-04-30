import { DiagnosticBag } from "../compilation/diagnosticBag";
import { TextSpan } from "../text/textSpan";
import { ILexer } from "../interfaces/syntax-interfaces/i-lexer";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxHelper } from "./syntaxHelper";
import { SourceText } from "..";

export class Lexer implements ILexer{

    private readonly _text:SourceText;
    private _position:number = 0;
    public diagnosticBag:DiagnosticBag = new DiagnosticBag();

    private _type:SyntaxType = SyntaxType.UnknownToken;
    private _start:number = 0;
    private _end:number = 0;
    private _value:any;

    constructor(text:SourceText) {
        this._text = text;
    }

    private getCurrentChar(): string {
        return this.peek(0);
    }

    private lookAhead(): string {
        return this.peek(1);
    }

    private peek(offset:number): string {
        const index = this._position + offset;
        if(index >= this._text.getLength()) {
            return '\0';
        } else {
            return this._text.getCharAtIndex(index);
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

        this._start = this._position;
        this._type = SyntaxType.UnknownToken;
        this._value = null;

        switch(this.getCurrentChar()) {
            case '\0':
                this._type = SyntaxType.EOFToken;
                break;
            case '+':
                this._type = SyntaxType.PlusToken;
                this._position++;
                break;
            case '-':
                this._type = SyntaxType.MinusToken;
                this._position++
                break;
            case '*':
                this._type = SyntaxType.StarToken;
                this._position++
                break;
            case '/':
                this._type = SyntaxType.SlashToken;
                this._position++
                break;
            case '(':
                this._type = SyntaxType.OpenParenthesisToken;
                this._position++;
                break;
            case ')':
                this._type = SyntaxType.CloseParenthesisToken;
                this._position++;
                break;
            case '{':
                this._type = SyntaxType.OpenBraceToken;
                this._position++;
                break;
            case '}':
                this._type = SyntaxType.CloseBraceToken;
                this._position++;
                break;
            case '%':
                this._type = SyntaxType.ModToken;
                this._position++;
                break;
            case '&':
                if(this.lookAhead() === '&') {
                    this._position += 2;
                    this._type = SyntaxType.AmpersandAmpersandToken;
                }
                break;
            case '|':
                if(this.lookAhead() === '|') {
                    this._position += 2;
                    this._type = SyntaxType.PipePipeToken;
                }
                break;
            case '=':
                if(this.lookAhead() === '=') {
                    this._position += 2;
                    this._type = SyntaxType.EqualsEqualsToken;
                    break;
                }
                this._position += 1;
                this._type = SyntaxType.EqualsToken;
                break;
            case '!':
                if(this.lookAhead() === '=') {
                    this._position += 2;
                    this._type = SyntaxType.BangEqualsToken;
                    break;
                }
                this._position += 1;
                this._type = SyntaxType.BangToken;
                break;
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9': 
                this.readNumberToken();
                break;
            case ' ': case '\t': case '\n': case '\r':
                this.readWhiteSpaceToken();
                break;
            default:
                //keyword / identifier token
                if(this.charIsAlpha(this.getCurrentChar().charCodeAt(0))) {
                    this.readIdentifierOrKeywordToken();
                }

                //whitespace token for with non common white space char
                else if (this.charIsBlank(this.getCurrentChar().charCodeAt(0))) {
                    this.readWhiteSpaceToken();
                }

                //unknown token
                else {
                    this.diagnosticBag.reportUnkownCharacter(this._position, this.getCurrentChar());
                    this._position += 1;
                }
                break;
        }

        const length = this._position - this._start;
        let text = SyntaxHelper.getTextForFixedTokens(this._type);
        if(!text) {
            text = this._text.toSubString(this._start, this._start + length);
        }
        return new SyntaxToken(this._type, this._start, text, this._value);
    }

    private readNumberToken():void {
        while(this.charIsNumber(this.getCurrentChar().charCodeAt(0))) {
            this._position++;
        }

        const length = this._position - this._start;
        const text = this._text.toSubString(this._start, this._start + length);
        const value = Number.parseInt(text);
        if(isNaN(value)) {
            this.diagnosticBag.reportInvalidNumber(new TextSpan(this._start,length), text, typeof(1));
        }

        this._value = value;
        this._type = SyntaxType.NumberToken;
    }

    private readWhiteSpaceToken():void {
        while(this.charIsBlank(this.getCurrentChar().charCodeAt(0))) {
            this._position++;
        }

        this._type = SyntaxType.WhitespaceToken;
    }

    private readIdentifierOrKeywordToken():void {
        while(this.charIsAlpha(this.getCurrentChar().charCodeAt(0))){
            this._position++;
        }
        const length = this._position - this._start;
        const text = this._text.toSubString(this._start, this._start + length);
        this._type = SyntaxHelper.getKeywordType(text);
    }
}
