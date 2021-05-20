import { SyntaxType } from "../../lexing";

export interface ISyntaxToken {
    position:number;
    text:string;
    type:SyntaxType;
    value: number | string | null;
}