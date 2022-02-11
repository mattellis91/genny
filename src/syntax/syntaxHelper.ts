import { SyntaxNode } from ".";
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
                return SyntaxType.IdentifierToken;
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

    public static getSyntaxTypes(): SyntaxType[] {
        return Object.keys(SyntaxType) as SyntaxType[];
    }

    public static getBinaryOperatorTypes(): SyntaxType[] {
        const binaryOperators = [];
        for(const type of this.getSyntaxTypes()) {
            if(this.getBinaryOperatorPrecedence(type) > 0) {
                binaryOperators.push(type as SyntaxType);
            }
        }
        return binaryOperators;
    }

    public static getUnaryOperatorTypes(): SyntaxType[] {
        const unaryOperators = [];
        for(const type of this.getSyntaxTypes()) {
            if(this.getUnaryOperatorPrecedence(type) > 0) {
                unaryOperators.push(type as SyntaxType);
            }
        }
        return unaryOperators;
    }
 
    public static getTextForFixedTokens(type: SyntaxType): string {
        switch(type) {
         case SyntaxType.PlusToken:
             return '+';
        case SyntaxType.MinusToken:
            return '-';
        case SyntaxType.ModToken:
            return '%';
        case SyntaxType.StarToken:
            return '*';
        case SyntaxType.SlashToken:
            return '/';
        case SyntaxType.BangToken:
            return '!';
        case SyntaxType.EqualsToken:
            return '=';
        case SyntaxType.AmpersandAmpersandToken:
            return '&&';
        case SyntaxType.PipePipeToken:
            return '||';
        case SyntaxType.EqualsEqualsToken:
            return '==';
        case SyntaxType.BangEqualsToken:
            return '!=';
        case SyntaxType.OpenParenthesisToken:
            return '(';
        case SyntaxType.CloseParenthesisToken:
            return ')';
        case SyntaxType.FalseKeyword:
            return 'false';
        case SyntaxType.TrueKeyword:
            return 'true';
        default:
            return '';
        }
    }

    public static flattenSyntaxNode(node:SyntaxNode) {
        const items = [];
        const stack: SyntaxNode[] = [];
         stack.push(node);
         while(stack.length) {
             const n = stack.pop();
             items.push(n);
             if(n) {
                for(const child of n.getChildren().reverse()) {
                    stack.push(child);
                }
            }
         }
         return items;
    }
}