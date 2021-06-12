import { ITextSpan } from "../interfaces/compilation-interfaces/i-textSpan";

export class TextSpan implements ITextSpan {
    public start:number;
    public length:number;
    public end:number;

    constructor(start:number, length:number) {
        this.start = start;
        this.length = length;
        this.end = this.start + this.length;
    }
}