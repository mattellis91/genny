
import { AssignmentExpressionSyntax, compilationUnitSyntax, NameExpressionSyntax } from ".";
import { SourceText } from "..";
import { DiagnosticBag } from "../compilation/diagnosticBag";
import { IParser } from "../interfaces/syntax-interfaces/i-parser";
import { BinaryExpressionSyntax } from "./binaryExpressionSyntax";
import { BlockStatementSyntax } from "./blockStatementSyntax";
import { ExpressionStatementSyntax } from "./expressionStatementSyntax";
import { ExpressionSyntax } from "./expressionSyntax";
import { Lexer } from "./lexer";
import { LiteralExpressionSyntax } from "./literalExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./parenthesizedExpressionSyntax";
import { StatementSyntax } from "./statementSyntax";
import { SyntaxToken } from "./syntax-token";
import { SyntaxType } from "./syntax-type";
import { SyntaxHelper } from "./syntaxHelper";
import { SyntaxTree } from "./syntaxTree";
import { UnaryExpressionSyntax } from "./unaryExpressionSyntax";

export class Parser implements IParser {

    private readonly _tokens:SyntaxToken[];
    private _position:number = 0;
    public diagnosticBag:DiagnosticBag = new DiagnosticBag();
    private _text:SourceText;

    constructor(text:SourceText) {
        this._text = text;
        const tokens:SyntaxToken[] =  [];
        const lexer = new Lexer(text);
        let token:SyntaxToken;
        do {
            token = lexer.lex();
            if(token.type !== SyntaxType.WhitespaceToken && token.type !== SyntaxType.UnknownToken) {
                tokens.push(token);
            }
        } while(token.type !== SyntaxType.EOFToken);

        this._tokens = tokens;
        this.diagnosticBag.addRange(lexer.diagnosticBag);
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

        switch(this.getCurrent().type) {
            case SyntaxType.OpenParenthesisToken:
                return this.parseParenthesizedExpression();
            case SyntaxType.TrueKeyword:
            case SyntaxType.FalseKeyword:
                return this.parseBooleanLiteral();
            case SyntaxType.NumberToken:
                return this.parseNumberLiteral();
            case SyntaxType.IdentifierToken:
            default:
                return this.parseNameExpression();

        }
    }

    private parseParenthesizedExpression() {
        const left = this.match(SyntaxType.OpenParenthesisToken);
        const expression = this.parseExpression();
        const right = this.match(SyntaxType.CloseParenthesisToken);
        return new ParenthesizedExpressionSyntax(left, expression, right);
    }

    private parseBooleanLiteral() {
        const isTrue = this.getCurrent().type === SyntaxType.TrueKeyword
        const keywordToken = isTrue ? this.match(SyntaxType.TrueKeyword) : this.match(SyntaxType.FalseKeyword);
        return new LiteralExpressionSyntax(keywordToken, isTrue);
    }

    private parseNameExpression() {
        const identifierToken = this.match(SyntaxType.IdentifierToken);
        return new NameExpressionSyntax(identifierToken);
    }

    private parseNumberLiteral() {
        const numberToken = this.match(SyntaxType.NumberToken);
        return new LiteralExpressionSyntax(numberToken)
    }

    private match(type:SyntaxType): SyntaxToken {
        const current = this.getCurrent();
        if(current.type === type) {
            return this.nextToken();
        }

        this.diagnosticBag.reportUnexpectedToken(current.span, current.type, type);
        return new SyntaxToken(type, this.getCurrent().position, null, null)
    }


    private parseBinaryExpression(parentPrecedence:number = 0): ExpressionSyntax {

        let left:ExpressionSyntax;
        const unaryOperatorPrecedence = SyntaxHelper.getUnaryOperatorPrecedence(this.getCurrent().type);
        if(unaryOperatorPrecedence !== 0 && unaryOperatorPrecedence >= parentPrecedence) {
            const operatorToken = this.nextToken();
            const operand = this.parseBinaryExpression(unaryOperatorPrecedence);
            left = new UnaryExpressionSyntax(operatorToken,operand);
        } else {
            left = this.parsePrimaryExpression();
        }

        while(true) {
            const precedence = SyntaxHelper.getBinaryOperatorPrecedence(this.getCurrent().type);
            if(precedence === 0 || precedence <= parentPrecedence) {
                break;
            }

            const operatorToken = this.nextToken();
            const right = this.parseBinaryExpression(precedence);
            left = new BinaryExpressionSyntax(left, operatorToken, right);
        }

        return left;
    }

    private parseAssignmentExpression() : ExpressionSyntax {

        if(this.peek(0).type === SyntaxType.IdentifierToken &&
           this.peek(1).type === SyntaxType.EqualsToken 
        ) {
            const identifierToken = this.nextToken();
            const operatorToken = this.nextToken();
            const right = this.parseAssignmentExpression();
            return new AssignmentExpressionSyntax(identifierToken, operatorToken, right);
        }

        return this.parseBinaryExpression();

    }

    private parseExpression() : ExpressionSyntax {
        return this.parseAssignmentExpression();
    }

    private parseStatement(): StatementSyntax {
        if(this.getCurrent().type === SyntaxType.OpenBraceToken) {
            return this.parseBlockStatement();
        }
        return this.parseExpressionStatement();
    }

    private parseBlockStatement(): StatementSyntax {
        const statements:StatementSyntax[] = [];

        const openBraceToken = this.match(SyntaxType.OpenBraceToken);
        
        while(this.getCurrent().type !== SyntaxType.EOFToken && this.getCurrent().type !== SyntaxType.CloseBraceToken) {
             
            const statement = this.parseStatement();
            statements.push(statement);
        }

        const closeBraceToken = this.match(SyntaxType.CloseBraceToken);
        return new BlockStatementSyntax(openBraceToken, statements, closeBraceToken);
    }

    private parseExpressionStatement() : StatementSyntax {
        const expression = this.parseExpression();
        return new ExpressionStatementSyntax(expression);
    }

    public parseCompilationUnit(): compilationUnitSyntax {
        const statement = this.parseStatement();
        const eof = this.match(SyntaxType.EOFToken);
        return new compilationUnitSyntax(statement, eof);
    }

    //gets the final list of tokens that the lexer produces for the parsing step. 
    //only use in unit test to test lexing where there are multiple tokens in the input text
    public getTokenListForTests(text:string) {
        const sourceText = SourceText.from(text);
        return this.getTokenListForTestsFromSourceText(sourceText);
    }

    public getTokenListForTestsFromSourceText(text:SourceText) {
        const tokens:SyntaxToken[] =  [];
        const lexer = new Lexer(text);
        let token:SyntaxToken;
        do {
            token = lexer.lex();
            if(token.type !== SyntaxType.WhitespaceToken && token.type !== SyntaxType.UnknownToken) {
                tokens.push(token);
            }
        } while(token.type !== SyntaxType.EOFToken);
        return tokens;
    }
}
