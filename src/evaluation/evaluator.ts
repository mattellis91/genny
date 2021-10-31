import { BoundExpression, BoundUnaryExpression, BoundVariableExpression, BoundAssignmentExpression } from "../binding";
import { BoundBinaryExpression } from "../binding/boundBinaryExpression";
import { BoundBinaryOperatorType } from "../binding/boundBinaryOperatorType";
import { BoundLiteralExpression } from "../binding/boundLiteralExpression";
import { BoundUnaryOperatorType } from "../binding/boundUnaryOperatorType";
import { VariableSymbol } from "../compilation/variableSymbol";
import { IEvaluator } from "../interfaces/evaluation-interfaces/i-evaluator";

export class Evaluator implements IEvaluator {
    private readonly _root:BoundExpression;
    private readonly _variables:Map<VariableSymbol, object>;
    
    constructor(root: BoundExpression, variables: Map<VariableSymbol, object>) {      
        this._root = root;
        this._variables = variables;
    }

    public evaluate():any {
        return this.evaluateExpression(this._root);
    }

    private evaluateExpression(node: BoundExpression): any{

        if(node instanceof BoundLiteralExpression) {
            return node.value;
        }

        if(node instanceof BoundVariableExpression) {
            return this._variables.get(node.variable);
        }

        if(node instanceof BoundAssignmentExpression) {
            const value = this.evaluateExpression(node.expression);
            this._variables.set(node.variable, value);
            return value;
        }

        if(node instanceof BoundUnaryExpression) {
            const operand = this.evaluateExpression(node.operand);

            switch(node.operator.boundUnaryOperatorType) {
                case BoundUnaryOperatorType.Identity:
                    return operand as number;
                case BoundUnaryOperatorType.Negation:
                    return -(operand as number);
                case BoundUnaryOperatorType.LogicalNegation:
                    return !(operand as boolean);
                default:
                    throw new Error("ERROR: Unexpected unary operator: " + node.operator.boundUnaryOperatorType);
            }
        }

        if(node instanceof BoundBinaryExpression) {
            const left = this.evaluateExpression(node.left) ;
            const right = this.evaluateExpression(node.right);
       
            switch(node.operator.boundBinaryOperatorType) {
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
                case BoundBinaryOperatorType.Equals:
                    return left === right;
                case BoundBinaryOperatorType.NotEquals:
                    return left !== right;
                default:
                    throw new Error("ERROR: Unexpected binary expression operator: " + node.operator.boundBinaryOperatorType);
            }
        }

        throw new Error("ERROR: Unexpected node: " + node.type);
    }
}