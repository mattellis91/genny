import { BoundUnaryOperator } from "../../binding/boundUnaryOperator";
import { BoundUnaryOperatorType } from "../../binding/boundUnaryOperatorType";
import { SyntaxType } from "../../syntax/syntax-type";

export interface IBoundUnaryOperator {
    syntaxType:SyntaxType;
    boundUnaryOperatorType:BoundUnaryOperatorType;
    operandType:string;
    resultType?:string;
}