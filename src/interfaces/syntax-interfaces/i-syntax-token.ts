import { TextSpan } from "../../compilation/textSpan";
import { SyntaxType } from "../../syntax/syntax-type";

export interface ISyntaxToken {
    position:number;
    text:string | null;
    type:SyntaxType;
    value: number | string | null;
    span:TextSpan;
}