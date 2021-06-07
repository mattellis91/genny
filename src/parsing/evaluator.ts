import { IEvaluator } from "../interfaces";
import { SyntaxType } from "../lexing";
import { BinaryExpressionSyntax } from "./binaryExpressionSyntax";
import { ExpressionSyntax } from "./expressionSyntax";
import { LiteralExpressionSyntax } from "./literalExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "./parenthesizedExpressionSyntax";

export class Evaluator implements IEvaluator {
    private readonly _root;
    constructor(root: ExpressionSyntax) {      
        this._root = root;
    }

    public evaluate():number {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(node: ExpressionSyntax): number{
        //binaryExpression
        //NumberExpression

        if(node instanceof LiteralExpressionSyntax) {
            return node.literalToken.value as number;
        }

        if(node instanceof BinaryExpressionSyntax) {
            const left = this.evaluateExpression(node.left);
            const right = this.evaluateExpression(node.right);
       
            switch(node.operatorToken.type) {
                case SyntaxType.PlusToken:
                    return left + right; 
                case SyntaxType.MinusToken:
                    return left - right;
                case SyntaxType.StarToken:
                    return left * right;
                case SyntaxType.SlashToken:
                    return left / right;
                case SyntaxType.ModToken:
                    return left % right;
                default:
                    throw new Error("ERROR: Unexpected binary expression operator: " + node.operatorToken.type);
            }
        }

        if(node instanceof ParenthesizedExpressionSyntax) {
            return this.evaluateExpression(node.expression);
        }
        
        throw new Error("ERROR: Unexpected node: " + node.type);
    }
}