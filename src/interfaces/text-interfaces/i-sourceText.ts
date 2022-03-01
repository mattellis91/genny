import { SourceText, TextLine, TextSpan } from "../..";

export interface ISourceText {
    lines:TextLine[];
    getLineIndex(pos:number) : number;
    toString() : string;
    toSubString(start:number, length:number) : string;
    toStringFromTextSpan(span: TextSpan): string;
}