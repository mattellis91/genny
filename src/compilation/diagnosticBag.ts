import { IDiagnosticBag } from "../interfaces/compilation-interfaces/i-diagnosticBag";
import { SyntaxType } from "../syntax";
import { Diagnostic } from "./diagnostic";
import { TextSpan } from "./textSpan";

export class DiagnosticBag implements IDiagnosticBag {
    public diagnostics:Diagnostic[] = [];
    
    private report(span:TextSpan, message:string): void {
        this.diagnostics.push(new Diagnostic(span,message));
    }

    public reportInvalidNumber(span:TextSpan, text:string, type:string): void {
        const message = "ERROR: The number " + text + "isn't a valid " + type;
        this.report(span,message);
    }

    public reportUnkownCharacter(position:number, token:string):void {
        const message = "ERROR: Unknown character '" + token + "'";
        this.report(new TextSpan(position,1), message);
    }

    public reportUnexpectedToken(span:TextSpan, recievedType:SyntaxType, expectedType:SyntaxType):void {
        const message = "ERROR: Unexpected token <" + recievedType+">, expected <"+expectedType+">";
        this.report(span,message);
    }

    public reportUndefinedUnaryOperator(span:TextSpan, operatorText:string, operandType:string):void {
        const message = "ERROR: Unary operator '" + operatorText + "' is not defined for type '" + operandType + "'";
        this.report(span,message);
    }

    public reportUndefinedBinaryExpression(span:TextSpan, operatorText:string, leftType:string, rightType:string):void {
        const message = "ERROR: Binarary operator '" + operatorText + "' is not defined for type '" +leftType+ "' and type '" + rightType + "'"; 
        this.report(span,message);
    }

    public addRange(diagnosticBag:DiagnosticBag):void {
        this.diagnostics = [
            ...this.diagnostics,
            ...diagnosticBag.diagnostics  
        ];
    }

} 