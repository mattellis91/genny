import { DiagnosticBag } from "../../compilation/diagnosticBag";
import { TextSpan } from "../../compilation/textSpan";
import { SyntaxType } from "../../syntax/syntax-type";

export interface IDiagnosticBag {
    reportInvalidNumber(span:TextSpan, text:string, type:string):void;
    reportUnkownCharacter(position:number, token:string):void;
    addRange(diagnosticBag:DiagnosticBag):void;
    reportUnexpectedToken(span:TextSpan, recievedType:SyntaxType, expectedType:SyntaxType):void;
    reportUndefinedBinaryExpression(span:TextSpan, operatorText:string, leftType:string, rightType:string):void;
    reportUndefinedUnaryOperator(span:TextSpan, operatorText:string, operandType:string):void;
}