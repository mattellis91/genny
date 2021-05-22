import { SyntaxType } from "../../lexing";

export interface ISyntaxToken {
    position:number;
    text:string | null;
    type:SyntaxType;
    value: number | string | null;
}