import { DiagnosticBag } from "../compilation/diagnosticBag";
import { IBinder } from "../interfaces/binding-interfaces/i-binder";
import { BinaryExpressionSyntax, 
        ExpressionSyntax, 
        LiteralExpressionSyntax, 
        SyntaxType, 
        UnaryExpressionSyntax, 
        ParenthesizedExpressionSyntax,
        NameExpressionSyntax,
        AssignmentExpressionSyntax
    } from "../syntax";
import { BoundBinaryExpression } from "./boundBinaryExpression";
import { BoundBinaryOperator } from "./boundBinaryOperator";
import { BoundExpression } from "./boundExpression";
import { BoundLiteralExpression } from "./boundLiteralExpression";
import { BoundUnaryExpression } from "./boundUnaryExpression";
import { BoundUnaryOperator } from "./boundUnaryOperator";

export class Binder implements IBinder {

    public diagnosticBag:DiagnosticBag = new DiagnosticBag();

    public bindExpression(syntax:ExpressionSyntax) : BoundExpression {
        switch(syntax.type) {
            case SyntaxType.BinaryExpression:
                return this.bindBinaryExpression(syntax as BinaryExpressionSyntax);
            case SyntaxType.UnaryExpression:
                return this.bindUnaryExpression(syntax as UnaryExpressionSyntax);
            case SyntaxType.LiteralExpression:
                return this.bindLiteralExpression(syntax as LiteralExpressionSyntax);
            case SyntaxType.ParenthesizedExpression:
                return this.bindParenthesizedExpression((syntax as ParenthesizedExpressionSyntax));
            case SyntaxType.NameExpression:
                return this.bindNameExpression(syntax as NameExpressionSyntax);
            case SyntaxType.AssignmentExpression:
                return this.bindAssignmentExpression(syntax as AssignmentExpressionSyntax);
            default:
                throw new Error("ERROR: Unexpected syntax: " + syntax.type);
        }
    }

    private bindBinaryExpression(syntax:BinaryExpressionSyntax): BoundExpression {
        const boundLeft = this.bindExpression(syntax.left);
        const boundRight = this.bindExpression(syntax.right);
        const boundOperator = BoundBinaryOperator.bind(syntax.operatorToken.type, boundLeft.type, boundRight.type); 
        if(boundOperator === null) {
            this.diagnosticBag.reportUndefinedBinaryExpression(syntax.operatorToken.span, syntax.operatorToken.text as string, boundLeft.type, boundRight.type);
            return boundLeft;
        }
        return new BoundBinaryExpression(boundLeft, boundOperator, boundRight);
    }

    private bindUnaryExpression(syntax:UnaryExpressionSyntax): BoundExpression {
        const boundOperand = this.bindExpression(syntax.operand);
        const boundOperator = BoundUnaryOperator.bind(syntax.operatorToken.type, boundOperand.type);
        if(boundOperator === null) {
            this.diagnosticBag.reportUndefinedUnaryOperator(syntax.operatorToken.span, syntax.operatorToken.text as string, boundOperand.type);
            return boundOperand;
        }
        return new BoundUnaryExpression(boundOperator, boundOperand);
    }

    private bindLiteralExpression(syntax:LiteralExpressionSyntax) : BoundExpression{
        const value = syntax.value !== null ? syntax.value : syntax.literalToken.value ?? 0;   
        return new BoundLiteralExpression(value);     
    }

    private bindParenthesizedExpression(syntax:ParenthesizedExpressionSyntax) : BoundExpression {
        return this.bindExpression(syntax.expression);
    }

    private bindNameExpression(syntax:NameExpressionSyntax) : BoundExpression {
        return this.bindExpression(syntax);
    }

    private bindAssignmentExpression(syntax:AssignmentExpressionSyntax) : BoundExpression {
        return this.bindExpression(syntax);
    }
} 