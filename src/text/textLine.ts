import { SourceText, TextSpan } from ".";
import { ITextLine } from "..";

export class TextLine implements ITextLine {
    public text:SourceText;
    public start:number;
    public length:number;
    public lengthIncludingLineBreak:number;
    public span:TextSpan;
    public spanIncludingLineBreak: TextSpan;
    public end:number;

    constructor(text:SourceText, start:number, length:number, lengthIncludingLineBreak:number) {
        this.text = text;
        this.start = start;
        this.length = length;
        this.lengthIncludingLineBreak = lengthIncludingLineBreak;
        this.end = start + length;
        this.span = new TextSpan(start,length);
        this.spanIncludingLineBreak = new TextSpan(start,lengthIncludingLineBreak);

    }

    public toString() : string {
        return this.text.toStringFromTextSpan(this.span);
    }

}