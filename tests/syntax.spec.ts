import { expect } from 'chai';
import {Lexer, SyntaxType} from '../src';

describe('Syntax Tests', () => {
    it('Should correctly identify syntax types', () => {
        const typesToCheck = [
            {type: SyntaxType.PlusToken, value: '+'},
            {type: SyntaxType.MinusToken, value: '-'},
            {type: SyntaxType.StarToken, value: '*'},
            {type: SyntaxType.SlashToken, value: '/'},
            {type: SyntaxType.BangToken, value: '!'},
            {type: SyntaxType.EqualsToken, value: '='},
            {type: SyntaxType.AmpersandAmpersandToken, value: '&&'},
            {type: SyntaxType.PipePipeToken, value: '||'},
            {type: SyntaxType.EqualsEqualsToken, value: '=='},
            {type: SyntaxType.BangEqualsToken, value: '!='},
            {type: SyntaxType.OpenParenthesisToken, value: '('},
            {type: SyntaxType.CloseParenthesisToken, value: ')'},
            {type: SyntaxType.FalseKeyword, value: 'false'},
            {type: SyntaxType.TrueKeyword, value: 'true'},
            {type: SyntaxType.WhitespaceToken, value: ' '},
            {type: SyntaxType.NumberToken, value: '1'},
            {type: SyntaxType.NumberToken, value: '1123'},
            {type: SyntaxType.IdentifierToken, value: 'a'},
            {type: SyntaxType.IdentifierToken, value: 'abc'}
        ];
        for(const item of typesToCheck) {
            const lexer = new Lexer(item.value);
            const token = lexer.lex();
            expect(token.type).to.equal(item.type);
        }
    });
});