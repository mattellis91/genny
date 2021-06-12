import { BoundExpression, BoundUnaryExpression } from "../binding";
import { BoundBinaryExpression } from "../binding/boundBinaryExpression";
import { BoundBinaryOperatorType } from "../binding/boundBinaryOperatorType";
import { BoundLiteralExpression } from "../binding/boundLiteralExpression";
import { BoundUnaryOperatorType } from "../binding/boundUnaryOperatorType";
import { IEvaluator } from "../interfaces/evaluation-interfaces/i-evaluator";

export class Evaluator implements IEvaluator {
    private readonly _root:BoundExpression;
    constructor(root: BoundExpression) {      
        this._root = root;
    }

    public evaluate():any {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(node: BoundExpression): any{

        if(node instanceof BoundLiteralExpression) {
            return node.value;
        }

        if(node instanceof BoundUnaryExpression) {
            const operand = this.evaluateExpression(node.operand);

            switch(node.operatorType) {
                case BoundUnaryOperatorType.Identity:
                    return operand as number;
                case BoundUnaryOperatorType.Negation:
                    return -(operand as number);
                case BoundUnaryOperatorType.LogicalNegation:
                    return !(operand as boolean);
                default:
                    throw new Error("ERROR: Unexpected unary operator: " + node.operatorType);
            }
        }

        if(node instanceof BoundBinaryExpression) {
            const left = this.evaluateExpression(node.left) ;
            const right = this.evaluateExpression(node.right);
       
            switch(node.operatorType) {
                case BoundBinaryOperatorType.Addition:
                    return (left as number) + (right as number); 
                case BoundBinaryOperatorType.Subtraction:
                    return (left as number) - (right as number);
                case BoundBinaryOperatorType.Multiplication:
                    return (left as number) * (right as number);
                case BoundBinaryOperatorType.Division:
                    return (left as number) / (right as number);
                case BoundBinaryOperatorType.Modulus:
                    return (left as number) % (right as number);
                case BoundBinaryOperatorType.LogicalAnd:
                    return (left as boolean) && (right as boolean);
                case BoundBinaryOperatorType.LogicalOr:
                    return (left as boolean) || (right as boolean);
                default:
                    throw new Error("ERROR: Unexpected binary expression operator: " + node.operatorType);
            }
        }

        throw new Error("ERROR: Unexpected node: " + node.type);
    }
}