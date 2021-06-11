import { BoundExpression, BoundUnaryExpression } from "../binding";
import { BoundBinaryExpression } from "../binding/boundBinaryExpression";
import { BoundBinaryOperatorType } from "../binding/boundBinaryOperatorType";
import { BoundLiteralExpression } from "../binding/boundLiteralExpression";
import { BoundUnaryOperatorType } from "../binding/boundUnaryOperatorType";
import { IEvaluator } from "../interfaces/evaluation-interfaces/i-evaluator";
import { BinaryExpressionSyntax } from "../syntax/binaryExpressionSyntax";
import { ExpressionSyntax } from "../syntax/expressionSyntax";
import { LiteralExpressionSyntax } from "../syntax/literalExpressionSyntax";
import { ParenthesizedExpressionSyntax } from "../syntax/parenthesizedExpressionSyntax";
import { SyntaxType } from "../syntax/syntax-type";
import { UnaryExpressionSyntax } from "../syntax/unaryExpressionSyntax";


export class Evaluator implements IEvaluator {
    private readonly _root:BoundExpression;
    constructor(root: BoundExpression) {      
        this._root = root;
    }

    public evaluate():number {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(node: BoundExpression): number{

        if(node instanceof BoundLiteralExpression) {
            return node.value as number;
        }

        if(node instanceof BoundUnaryExpression) {
            const operand = this.evaluateExpression(node.operand);

            switch(node.operatorType) {
                case BoundUnaryOperatorType.Identity:
                    return operand;
                case BoundUnaryOperatorType.Negation:
                    return -operand;
                default:
                    throw new Error("ERROR: Unexpected unary operator: " + node.operatorType);
            }
        }

        if(node instanceof BoundBinaryExpression) {
            const left = this.evaluateExpression(node.left);
            const right = this.evaluateExpression(node.right);
       
            switch(node.operatorType) {
                case BoundBinaryOperatorType.Addition:
                    return left + right; 
                case BoundBinaryOperatorType.Subtraction:
                    return left - right;
                case BoundBinaryOperatorType.Multiplication:
                    return left * right;
                case BoundBinaryOperatorType.Division:
                    return left / right;
                case BoundBinaryOperatorType.Modulus:
                    return left % right;
                default:
                    throw new Error("ERROR: Unexpected binary expression operator: " + node.operatorType);
            }
        }

        throw new Error("ERROR: Unexpected node: " + node.type);
    }
}