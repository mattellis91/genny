import { SyntaxType } from "./syntax-type";

export class SyntaxHelper {
    public static getBinaryOperatorPrecedence(type: SyntaxType): number {
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

    public static getUnaryOperatorPrecedence(type: SyntaxType): number {
        switch(type) {
            case SyntaxType.PlusToken:
            case SyntaxType.MinusToken:
                return 3; 
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