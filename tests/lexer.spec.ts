import { expect } from 'chai';
import { type } from 'os';
import {Lexer, Parser, SourceText, SyntaxHelper, SyntaxTree, SyntaxType} from '../src';

describe('Lexer Tests', () => {

    interface Token {
        type:SyntaxType,
        value:string
    }

    const dynamicTokens:Token[] = [
        {type: SyntaxType.NumberToken, value: '123'},
        {type: SyntaxType.IdentifierToken, value: 'a'},
        {type: SyntaxType.IdentifierToken, value: 'abc'}
    ];

    const separators:Token[] = [
        {type: SyntaxType.WhitespaceToken, value: ' '},
        {type: SyntaxType.WhitespaceToken, value: '  '},
        {type: SyntaxType.WhitespaceToken, value: '\r'},
        {type: SyntaxType.WhitespaceToken, value: '\n'},
        {type: SyntaxType.WhitespaceToken, value: '\r\n'},
    ];

    
    const requiresSeparator = (t1:Token, t2:Token) => {
        const t1IsKeyword = t1.type.endsWith('Keyword');
        const t2IsKeyword = t2.type.endsWith('Keyword');

        if(t1.type === SyntaxType.IdentifierToken && t2.type === SyntaxType.IdentifierToken) return true;
        if(t1.type === SyntaxType.NumberToken && t2.type === SyntaxType.NumberToken) return true;
        if(t1.type === SyntaxType.BangToken && t2.type === SyntaxType.EqualsToken) return true;
        if(t1.type === SyntaxType.BangToken && t2.type === SyntaxType.EqualsEqualsToken) return true;
        if(t1.type === SyntaxType.EqualsToken && t2.type === SyntaxType.EqualsToken) return true;
        if(t1.type === SyntaxType.EqualsToken && t2.type === SyntaxType.EqualsEqualsToken) return true;
        if(t1IsKeyword && t2IsKeyword) return true;
        if(t1IsKeyword && t2.type === SyntaxType.IdentifierToken) return true;
        if(t1.type === SyntaxType.IdentifierToken && t2IsKeyword) return true;

        return false;
    }


    const getTokenPairs = () => {
        const tokenPairs = [];
        for(const t1 of singleTokensWithoutSeps) {
            for(const t2 of singleTokensWithoutSeps) {
                if(!requiresSeparator(t1, t2)) {
                    tokenPairs.push({t1Type: t1.type, t1Value: t1.value, t2Type: t2.type, t2Value: t2.value});
                }
            
            }
        }
        return tokenPairs;
    }

    const getTokenPairsWithSeparator = () => {
        const tokenPairs = [];
        for(const t1 of singleTokensWithoutSeps) {
            for(const t2 of singleTokensWithoutSeps) {
                if(requiresSeparator(t1, t2)) {
                    for(const sep of separators){
                        tokenPairs.push({
                            t1Type: t1.type, 
                            t1Value: t1.value, 
                            sepType: sep.type,
                            sepValue: sep.value,
                            t2Type: t2.type, 
                            t2Value: t2.value
                        });
                    }
                }
            
            }
        }
        return tokenPairs;
    }

    const getTokensWithFixedText = () => {
        return SyntaxHelper.getSyntaxTypes().filter((type) => {
            return SyntaxHelper.getTextForFixedTokens(type);
        }).map((type)=> {return {type:type, value: SyntaxHelper.getTextForFixedTokens(type)}});
    }

    const getAllTokenTypes = () => {
        return SyntaxHelper.getSyntaxTypes().filter((type) => {
            return (type.toString().endsWith('Token') || type.toString().endsWith('Keyword')) &&
                type !== SyntaxType.UnknownToken && type !== SyntaxType.EOFToken
        });
    }

    const fixedTokens = getTokensWithFixedText();
    const allTokenTypes = getAllTokenTypes();

    const singleTokens = [...dynamicTokens, ...separators, ...fixedTokens];
    const singleTokensWithoutSeps = [...dynamicTokens, ...fixedTokens];
    const singleTokensLength = singleTokens.length;

    const tokenPairs = getTokenPairs();
    const tokenPairsLength = tokenPairs.length;

    const tokenSepPairs = getTokenPairsWithSeparator();
    const tokenSepPairsLength = tokenSepPairs.length;

    it(`Should correctly identify syntax types (${singleTokensLength} tests)`, () => {
        for(const item of singleTokens) {
            const lexer = new Lexer(SourceText.from(item.value));
            const token = lexer.lex();
            expect(token.type).to.equal(item.type);
        }
    });

    it(`Should correctly parse token pairs (${tokenPairsLength} tests)`, () => {
        for(const tokenPair of tokenPairs) {
            const pairText = SourceText.from(tokenPair.t1Value + tokenPair.t2Value);
            const parserTokens = new Parser(pairText).getTokenListForTestsFromSourceText(pairText);
            expect(parserTokens.length).to.equal(3);
            expect(parserTokens[2].type).to.equal(SyntaxType.EOFToken);
            expect(parserTokens[0].type).to.equal(tokenPair.t1Type);
            expect(parserTokens[1].type).to.equal(tokenPair.t2Type);
        }
    });

    it(`Should correctly parse token pairs with separators (${tokenSepPairsLength} tests)`, () => {
        for(const tokenPair of tokenSepPairs) {
            const pairText = SourceText.from(tokenPair.t1Value + tokenPair.sepValue + tokenPair.t2Value);
            const parserTokens = new Parser(pairText).getTokenListForTestsFromSourceText(pairText);
            expect(parserTokens.length).to.equal(3);
            expect(parserTokens[2].type).to.equal(SyntaxType.EOFToken);
            expect(parserTokens[0].type).to.equal(tokenPair.t1Type);
            expect(parserTokens[1].type).to.equal(tokenPair.t2Type);
        }
    });

    it(`Should test all token types`, () => {
        const testedTokens:string[] = [];
        for(const token of singleTokens) {
            if(testedTokens.includes(token.type)) {
                continue;
            } else if(allTokenTypes.includes(token.type)) {
                testedTokens.push(token.type);
            }
        }
        expect(allTokenTypes.length).to.equal(testedTokens.length);
    });
});