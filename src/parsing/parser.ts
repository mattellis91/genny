import { IParser } from "../interfaces/parsing-interfaces/i-parser";
import { Lexer, SyntaxToken, SyntaxType } from "../lexing";
import { BinaryExpressionSyntax } from "./binaryExpressionSyntax";
import { ExpressionSyntax } from "./expressionSyntax";
import { NumberExpressionSyntax } from "./numberExpressionSyntax";

export class Parser implements IParser {

    private readonly _tokens:SyntaxToken[];
    private _position:number = 0;
    public diagnostics:string[] = [];

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
        this.diagnostics = [...lexer.diagnostics];
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

    private getCurrent():SyntaxToken { return this.peek(0); }

    private  nextToken():SyntaxToken {
        const current = this.getCurrent();
        this._position++;
        return current;
    }
    
    private parsePrimaryExpression(): ExpressionSyntax{
        const numberToken = this.match(SyntaxType.NumberToken);
        return new NumberExpressionSyntax(numberToken);
    }

    private match(type:SyntaxType): SyntaxToken {
        if(this.getCurrent().type === type) {
            return this.nextToken();
        }

        this.diagnostics.push("ERROR: Unexpected token <" + this.getCurrent().type + ">, expected <" + type + ">"5)
        return new SyntaxToken(type, this.getCurrent().position, null, null)
    }

    public parse(): ExpressionSyntax {
        let left =  this.parsePrimaryExpression();
        while(this.getCurrent().type === SyntaxType.PlusToken || this.getCurrent().type === SyntaxType.MinusToken) {
            const operatorToken = this.nextToken();
            const right = this.parsePrimaryExpression(); 
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }
}    