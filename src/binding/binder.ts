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

    private bindLiteralExpression(syntax:LiteralExpressionSyntax) : BoundExpression{
        const value = syntax.value !== null ? syntax.value : syntax.literalToken.value ?? 0;   
        return new BoundLiteralExpression(value);     
     }
} 