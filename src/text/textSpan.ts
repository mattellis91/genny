import { ITextSpan } from "../interfaces/text-interfaces/i-textSpan";

export class TextSpan implements ITextSpan {
    public start:number;
    public length:number;
    public end:number;

    constructor(start:number, length:number) {
        this.start = start;
        this.length = length;
        this.end = this.start + this.length;
    }

    public static fromBounds(start:number,end:number):TextSpan {
        return new TextSpan(start,end);
    }
}