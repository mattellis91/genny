import { IParser } from "../interfaces/parsing-interfaces/i-parser";
import { Lexer, SyntaxToken, SyntaxType } from "../lexing";
import { BinaryExpressionSyntax } from "./binaryExpressionSyntax";
import { ExpressionSyntax } from "./expressionSyntax";
import { LiteralExpressionSyntax } from "./literalExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./parenthesizedExpressionSyntax";
import { SyntaxTree } from "./syntaxTree";

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

        if(this.getCurrent().type === SyntaxType.OpenParenthesisToken) {
            const left = this.nextToken();
            const expression = this.parseExpression();
            const right = this.match(SyntaxType.CloseParenthesisToken);
            return new ParenthesizedExpressionSyntax(left,expression,right);
        }
        const numberToken = this.match(SyntaxType.NumberToken);
        return new LiteralExpressionSyntax(numberToken);
    }

    private match(type:SyntaxType): SyntaxToken {
        if(this.getCurrent().type === type) {
            return this.nextToken();
        }

        this.diagnostics.push("ERROR: Unexpected token <" + this.getCurrent().type + ">, expected <" + type + ">");
        return new SyntaxToken(type, this.getCurrent().position, null, null)
    }


    private parseExpression(parentPrecedence:number = 0): ExpressionSyntax {
        let left = this.parsePrimaryExpression();
        while(true) {
            const precedence = this.getBinaryOperatorPrecedence(this.getCurrent().type);
            if(precedence === 0 || precedence <= parentPrecedence) {
                break;
            }

            const operatorToken = this.nextToken();
            const right = this.parseExpression(precedence);
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private getBinaryOperatorPrecedence(type: SyntaxType) {
        switch(type) {
            case SyntaxType.StarToken:
            case SyntaxType.SlashToken:
                return 2;
            case SyntaxType.PlusToken:
            case SyntaxType.MinusToken:
                return 1;
            default:
                return 0;                
        }
    }


    public parse(): SyntaxTree {
        const expression = this.parseExpression();
        const eof = this.match(SyntaxType.EOFToken);
        return new SyntaxTree(expression, eof, this.diagnostics);
    }
}    