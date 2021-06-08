import { SyntaxType } from "./syntax-type";

export class SyntaxSettings {
    public static getBinaryOperatorPrecedence(type: SyntaxType) {
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

    public static getUnaryOperatorPrecedence(type: SyntaxType) {
        switch(type) {
            case SyntaxType.PlusToken:
            case SyntaxType.MinusToken:
                return 3; 
            default:
                return 0;
        }
    }
}