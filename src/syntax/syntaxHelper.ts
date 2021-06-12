import { SyntaxType } from "./syntax-type";

export class SyntaxHelper {

    public static getUnaryOperatorPrecedence(type: SyntaxType): number {
        switch(type) {
            case SyntaxType.PlusToken:
            case SyntaxType.MinusToken:
            case SyntaxType.BangToken: 
                return 6; 
            default:
                return 0;
        }
    }

    public static getBinaryOperatorPrecedence(type: SyntaxType): number {
        switch(type) {
            case SyntaxType.StarToken:
            case SyntaxType.SlashToken:
            case SyntaxType.ModToken:
                return 5;
            case SyntaxType.PlusToken:
            case SyntaxType.MinusToken:
                return 4;
            case SyntaxType.EqualsEqualsToken:
            case SyntaxType.BangEqualsToken:
                return 3;
            case SyntaxType.AmpersandAmpersandToken:
                return 2;
            case SyntaxType.PipePipeToken:
                return 1;
            default:
                return 0;                
        }
    }

    public static getKeywordType(text:string): SyntaxType {
        switch(text) {
            case "true":
                return SyntaxType.TrueKeyword;
            case "false":
                return SyntaxType.FalseKeyword;
            default:
                return SyntaxType.IndetifierToken;
        }
    }

    public static getSyntaxTypeText(type:SyntaxType): string {
        switch(type) {
            case SyntaxType.MinusToken:
                return '-';
            case SyntaxType.PlusToken:
                return '+';
            case SyntaxType.StarToken:
                return '*';
            case SyntaxType.ModToken:
                return '%';
            case SyntaxType.SlashToken:
                return '/';
            default:
                return type;
        }
    }
}