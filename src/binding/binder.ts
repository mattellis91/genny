import { BoundAssignmentExpression, BoundVariableExpression } from ".";
import { DiagnosticBag } from "../compilation/diagnosticBag";
import { VariableSymbol } from "../compilation/variableSymbol";
import { IBinder } from "../interfaces/binding-interfaces/i-binder";
import { BinaryExpressionSyntax, 
        ExpressionSyntax, 
        LiteralExpressionSyntax, 
        SyntaxType, 
        UnaryExpressionSyntax, 
        ParenthesizedExpressionSyntax,
        NameExpressionSyntax,
        AssignmentExpressionSyntax,
        compilationUnitSyntax,
        StatementSyntax,
        BlockStatementSyntax,
        ExpressionStatementSyntax
    } from "../syntax";
import { BoundBinaryExpression } from "./boundBinaryExpression";
import { BoundBinaryOperator } from "./boundBinaryOperator";
import { BoundBlockStatement } from "./boundBlockStatement";
import { BoundExpression } from "./boundExpression";
import { BoundExpressionStatement } from "./boundExpressionStatement";
import { BoundGlobalScope } from "./boundGlobalScope";
import { BoundLiteralExpression } from "./boundLiteralExpression";
import { BoundScope } from "./boundScope";
import { BoundStatement } from "./boundStatement";
import { BoundUnaryExpression } from "./boundUnaryExpression";
import { BoundUnaryOperator } from "./boundUnaryOperator";

export class Binder implements IBinder {

    public diagnosticBag:DiagnosticBag = new DiagnosticBag();
    private _scope:BoundScope;

    constructor(parent:BoundScope | null) {
        this._scope = new BoundScope(parent);
    }

    public static bindGlobalScope(previous:BoundGlobalScope | null, syntax:compilationUnitSyntax) {
        const parentScope = Binder.createParentScopes(previous);
        const binder = new Binder(parentScope);
        const statement = binder.bindStatement(syntax.statement);
        const variables = binder._scope.getDeclaredVariables();
        let diagnostics = binder.diagnosticBag.diagnostics;

        if(previous !== null) {
            diagnostics = [...previous.diagnostics, ...diagnostics];
        }

        return new BoundGlobalScope(previous, diagnostics, variables, statement);
    }

    private static createParentScopes(previous:BoundGlobalScope | null):BoundScope | null {
        const stack:BoundGlobalScope[] = [];
        while(previous !== null) {
            stack.push(previous);
            previous = previous.previous;
        }

        let parent:BoundScope | null = null;

        while(stack.length > 0) {
            const previous = stack.pop() as BoundGlobalScope;
            const scope:BoundScope = new BoundScope(parent);
            for(const variable of previous?.variables.values()) {
                scope.tryDeclare(variable);
            }
            parent = scope;
        }

        return parent;
    }

    private bindStatement(syntax:StatementSyntax) : BoundStatement {
        switch(syntax.type) {
            case SyntaxType.BlockStatement:
                return this.bindBlockStatement((syntax as BlockStatementSyntax));
            case SyntaxType.ExpressionStatement:
                return this.bindExpressionStatement((syntax as ExpressionStatementSyntax));
            default:
                throw new Error("ERROR: Unexpected syntax: " + syntax.type);
        }
    }

    private bindBlockStatement(syntax:BlockStatementSyntax) : BoundStatement {
        const statements:BoundStatement[] = [];
        for(const statementSyntax of syntax.statements) {
            const statement = this.bindStatement(statementSyntax);
            statements.push(statement);
        }
        return new BoundBlockStatement(statements)
    }

    private bindExpressionStatement(syntax:ExpressionStatementSyntax): BoundStatement {
        const expression = this.bindExpression(syntax.expression);
        return new BoundExpressionStatement(expression);
    }

    private bindExpression(syntax:ExpressionSyntax) : BoundExpression {
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
        const name = syntax.identifierToken.text as string;
        const variable = this._scope.tryLookup(name);

        if(variable === null) {
            this.diagnosticBag.reportUndefinedNameExpression(syntax.identifierToken.span, name);
            return new BoundLiteralExpression(0);
        }

        return new BoundVariableExpression(variable);
    }

    private bindAssignmentExpression(syntax:AssignmentExpressionSyntax) : BoundExpression {
        const name = syntax.identifierToken.text as string;
        const boundExpression = this.bindExpression(syntax.expression);
        let variable = this._scope.tryLookup(name);

        if(!variable) {
            variable = new VariableSymbol(name, boundExpression.type);
            this._scope.tryDeclare(variable);
        }

        if(boundExpression.type !== variable.type) {
            this.diagnosticBag.reportCannotConvert(syntax.expression.getSpan(), boundExpression.type, variable.type);
            return boundExpression;
        }

        return new BoundAssignmentExpression(variable, boundExpression);
    }
} 