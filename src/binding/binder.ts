import { IBinder } from "../interfaces/binding-interfaces/i-binder";
import { BinaryExpressionSyntax, ExpressionSyntax, LiteralExpressionSyntax, SyntaxHelper, SyntaxType, UnaryExpressionSyntax } from "../syntax";
import { BoundBinaryExpression } from "./boundBinaryExpression";
import { BoundBinaryOperator } from "./boundBinaryOperator";
import { BoundBinaryOperatorType } from "./boundBinaryOperatorType";
import { BoundExpression } from "./boundExpression";
import { BoundLiteralExpression } from "./boundLiteralExpression";
import { BoundUnaryExpression } from "./boundUnaryExpression";
import { BoundUnaryOperator } from "./boundUnaryOperator";
import { BoundUnaryOperatorType } from "./boundUnaryOperatorType";

export class Binder implements IBinder {

    public diagnostics:string[] = [];

    public bindExpression(syntax:ExpressionSyntax) : BoundExpression {
        switch(syntax.type) {
            case SyntaxType.BinaryExpression:
                return this.bindBinaryExpression(syntax as BinaryExpressionSyntax);
            case SyntaxType.UnaryExpression:
                return this.bindUnaryExpression(syntax as UnaryExpressionSyntax);
            case SyntaxType.LiteralExpression:
                return this.bindLiteralExpression(syntax as LiteralExpressionSyntax);
            default:
                throw new Error("ERROR: Unexpected syntax: " + syntax.type);
        }
    }

    private bindBinaryExpression(syntax:BinaryExpressionSyntax): BoundExpression {
        const boundLeft = this.bindExpression(syntax.left);
        const boundRight = this.bindExpression(syntax.right);
        const boundOperator = BoundBinaryOperator.bind(syntax.operatorToken.type, boundLeft.type, boundRight.type); 
        if(boundOperator === null) {
            this.diagnostics.push("ERROR: Binary operator '" + SyntaxHelper.getSyntaxTypeText(syntax.operatorToken.type) + "' is not defined for type " + boundLeft.type + " and type " + boundRight.type);
            return boundLeft;
        }
        return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
    }

    private bindUnaryExpression(syntax:UnaryExpressionSyntax): BoundExpression {
        const boundOperand = this.bindExpression(syntax.operand);
        const boundOperator = BoundUnaryOperator.bind(syntax.operatorToken.type, boundOperand.type);
        if(boundOperator === null) {
            this.diagnostics.push("ERROR: Unary operator '" + SyntaxHelper.getSyntaxTypeText(syntax.operatorToken.type) + "' is not defined for type " + boundOperand.type);
            return boundOperand;
        }
        return new BoundUnaryExpression(boundOperator, boundOperand);
    }

    private bindBinaryOperatorType(type:SyntaxType, leftType:string, rightType:string): BoundBinaryOperatorType | null {

        if(leftType === 'number' && rightType === 'number') {
            switch(type) {
                case SyntaxType.PlusToken:
                    return BoundBinaryOperatorType.Addition;
                case SyntaxType.MinusToken:
                    return BoundBinaryOperatorType.Subtraction;
                case SyntaxType.StarToken:
                    return BoundBinaryOperatorType.Multiplication;
                case SyntaxType.SlashToken:
                    return BoundBinaryOperatorType.Division;
                case SyntaxType.ModToken:
                    return BoundBinaryOperatorType.Modulus;
            }
        }

        if(leftType === 'boolean' && rightType === 'boolean') {
            switch(type) {
                case SyntaxType.AmpersandAmpersandToken:
                    return BoundBinaryOperatorType.LogicalAnd;
                case SyntaxType.PipePipeToken:
                    return BoundBinaryOperatorType.LogicalOr;
            }
        }
        
        return null;
        

        
    }

    private bindUnaryOperatorType(type:SyntaxType, operandType:string): BoundUnaryOperatorType | null {

        if(operandType === 'number') { 
            switch(type) {
                case SyntaxType.PlusToken:
                    return BoundUnaryOperatorType.Identity;
                case SyntaxType.MinusToken:
                    return BoundUnaryOperatorType.Negation;
            }
        } 

        if(operandType === 'boolean') {
            switch(type) {
                case SyntaxType.BangToken:
                    return BoundUnaryOperatorType.LogicalNegation;
            }
        }
        
        return null;

    }

    private bindLiteralExpression(syntax:LiteralExpressionSyntax) : BoundExpression{
        const value = syntax.value !== null ? syntax.value : syntax.literalToken.value ?? 0;   
        return new BoundLiteralExpression(value);     
     }
} 