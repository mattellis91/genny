import { SourceText, TextSpan } from "../..";

export interface ITextLine {
    text:SourceText;
    start:number;
    length:number;
    lengthIncludingLineBreak:number;
    span:TextSpan;
    spanIncludingLineBreak:TextSpan;
    end:number;
    toString() : string;
}