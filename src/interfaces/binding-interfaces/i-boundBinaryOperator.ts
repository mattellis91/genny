import { BoundBinaryOperatorType } from "../../binding/boundBinaryOperatorType";
import { SyntaxType } from "../../syntax/syntax-type";

export interface IBoundBinaryOperator {
    syntaxType:SyntaxType;
    boundBinaryOperatorType:BoundBinaryOperatorType;
    leftType:string;
    rightType:string;
    resultType:string;
}