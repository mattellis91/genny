import { IBinder } from "../interfaces/binding-interfaces/i-binder";
import { BinaryExpressionSyntax, ExpressionSyntax, LiteralExpressionSyntax, SyntaxType, UnaryExpressionSyntax } from "../syntax";
import { BoundBinaryExpression } from "./boundBinaryExpression";
import { BoundBinaryOperatorType } from "./boundBinaryOperatorType";
import { BoundExpression } from "./boundExpression";
import { BoundLiteralExpression } from "./boundLiteralExpression";
import { BoundUnaryExpression } from "./boundUnaryExpression";
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
        const boundOperatorType = this.bindBinaryOperatorType(syntax.operatorToken.type, boundLeft.type, boundRight.type); 
        if(boundOperatorType === null) {
            this.diagnostics.push("ERROR: Binary operator '" + syntax.operatorToken + "' is not defined for type " + boundLeft.type + " and " + boundRight.type);
            return boundLeft;
        }
        return new BoundBinaryExpression(boundLeft, boundOperatorType, boundRight);
    }

    private bindBinaryOperatorType(type:SyntaxType, leftType:string, rightType:string): BoundBinaryOperatorType | null {

        if(leftType !== 'number' || rightType !== 'number') {
            return null;
        }

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
            default:
                throw new Error("ERROR: Unexpected binary operator " + type);
        }
    }

    private bindUnaryExpression(syntax:UnaryExpressionSyntax): BoundExpression {
        const boundOperand = this.bindExpression(syntax.operand);
        const boundOperatorType = this.bindUnaryOperatorType(syntax.operatorToken.type, boundOperand.type);
        if(boundOperatorType === null) {
            this.diagnostics.push("ERROR: Unary operator '" + syntax.operatorToken + "' is not defined for type " + boundOperand.type);
            return boundOperand;
        }
        return new BoundUnaryExpression(boundOperatorType, boundOperand);
    }

    private bindUnaryOperatorType(type:SyntaxType, operandType:string): BoundUnaryOperatorType | null {

        if(operandType !== 'number') {
            return null;
        }

        switch(type) {
            case SyntaxType.PlusToken:
                return BoundUnaryOperatorType.Identity;
            case SyntaxType.MinusToken:
                return BoundUnaryOperatorType.Negation;
            default:
                throw new Error("ERROR: Unexpected unary operator " + type);
        }
    }

    private bindLiteralExpression(syntax:LiteralExpressionSyntax) : BoundExpression{
        const value = syntax.literalToken.value as number ?? 0;   
        return new BoundLiteralExpression(value);     
    }
} 