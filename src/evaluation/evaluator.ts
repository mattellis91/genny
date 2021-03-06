import { BoundExpression, BoundUnaryExpression, BoundVariableExpression, BoundAssignmentExpression, BoundStatement, BoundBlockStatement, BoundExpressionStatement, BoundVariableDeclaration } from "../binding";
import { BoundBinaryExpression } from "../binding/boundBinaryExpression";
import { BoundBinaryOperatorType } from "../binding/boundBinaryOperatorType";
import { BoundNodeType } from "../binding/boundNodeType";
import { BoundLiteralExpression } from "../binding/boundLiteralExpression";
import { BoundUnaryOperatorType } from "../binding/boundUnaryOperatorType";
import { VariableSymbol } from "../compilation/variableSymbol";
import { IEvaluator } from "../interfaces/evaluation-interfaces/i-evaluator";

export class Evaluator implements IEvaluator {
    private readonly _root:BoundStatement;
    private readonly _variables:Map<VariableSymbol, object>;
    private _lastValue: unknown;
    
    constructor(root: BoundStatement, variables: Map<VariableSymbol, object>) {      
        this._root = root;
        this._variables = variables;
    }

    public evaluate():any {
        this.evaluateStatement(this._root);
        return this._lastValue;
    }

    private evaluateStatement(statement: BoundStatement): any{
        switch(statement.boundNodeType) {
            case BoundNodeType.BlockStatement:
                this.evaluateBlockStatement(statement as BoundBlockStatement);
                break;
            case BoundNodeType.VariableDeclaration:
                this.evaluateVariableDeclaration(statement as BoundVariableDeclaration);
                break;
            case BoundNodeType.ExpressionStatement:
                this.evaluateExpressionStatement(statement as BoundExpressionStatement);
                break;
            default:
                throw new Error("ERROR: Unexpected statement: " + statement.boundNodeType) 
        }
    }
    
    private evaluateBlockStatement(blockStatement: BoundBlockStatement) {
        for(const statement of blockStatement.statements) {
            this.evaluateStatement(statement);
        }
    }

    private evaluateVariableDeclaration(node: BoundVariableDeclaration) {
        const value = this.evaluateExpression(node.initializser);
        this._variables.set(node.variable, value);
        this._lastValue = value;
    }

    private evaluateExpressionStatement(expressionStatement: BoundExpressionStatement) {
        this._lastValue = this.evaluateExpression(expressionStatement.expression);
    }

    private evaluateExpression(node: BoundExpression): any{
        switch(node.boundNodeType) {
            case BoundNodeType.LiteralExpression:
                return this.evaluateLiteralExpression(node as BoundLiteralExpression);
            case BoundNodeType.VariableExpression:
                return this.evaluateVariableExpression(node as BoundVariableExpression);
            case BoundNodeType.AssignmentExpression:
                return this.evaluateAssignmentExpression(node as BoundAssignmentExpression);
            case BoundNodeType.UnaryExpression:
                return this.evaluateUnaryExpression(node as BoundUnaryExpression);
            case BoundNodeType.BinaryExpression:
                return this.evaluateBinaryExpression(node as BoundBinaryExpression);
            default:
                throw new Error("ERROR: Unexpected node: " + node.boundNodeType) 
        }
    }

    private evaluateLiteralExpression(node: BoundLiteralExpression): any {
        return node.value;
    }

    private evaluateVariableExpression(node: BoundVariableExpression): any {
        return this._variables.get(node.variable);
    }

    private evaluateAssignmentExpression(node: BoundAssignmentExpression): any {
        const value = this.evaluateExpression(node.expression);
        this._variables.set(node.variable, value);
        return value;
    }

    private evaluateUnaryExpression(node: BoundUnaryExpression): any {
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

    private evaluateBinaryExpression(node: BoundBinaryExpression): any {
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
}