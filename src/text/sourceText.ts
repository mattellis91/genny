import { TextLine, TextSpan } from ".";
import { ISourceText } from "..";

export class SourceText implements ISourceText {

    public lines:TextLine[];
    private _text:string;
    
    constructor(text:string) {
        this.lines = SourceText.parseLines(this, text);
        this._text = text;
    }

    public static from(text:string) : SourceText {
        return new SourceText(text);
    }

    public getLineIndex(pos:number) : number {
        let lower = 0;
        let upper = this.lines.length - 1;
        while(lower <= upper) {
            const index = Math.floor(lower + (upper - lower) / 2); 
            const start = this.lines[index].start;

            if(pos === start) {
                return index;
            }

            if(start > pos) {
                upper = index - 1;
            } else {
                lower = index + 1;
            }
        }

        return lower - 1;
    }

    private static parseLines(sourceText:SourceText, text:string): TextLine[] {
        const result = [] as TextLine[];
        let pos = 0;
        let lineStart = 0;
        while(pos < text.length) {
            const lineBreakWidth = SourceText.getLineBreakWidth(text, pos);

            if(lineBreakWidth === 0) {
                pos++; 
            } else {
                result.push(SourceText.addLine(sourceText, pos, lineStart, lineBreakWidth));
                pos += lineBreakWidth;
                lineStart = pos;
            }
        }

        if(pos > lineStart) {
            result.push(SourceText.addLine(sourceText, pos, lineStart, 0));
        }
        return result;
    }

    private static addLine(sourceText:SourceText, pos:number, lineStart:number, lineBreakWidth:number) : TextLine {
        const lineLength = pos - lineStart;
        const lineLengthIncludingLineBreak = lineLength + lineBreakWidth;
        const line = new TextLine(sourceText, lineStart, lineLength, lineLengthIncludingLineBreak);
        return line;
    }

    private static getLineBreakWidth(text:string, pos:number):number {
        let c = text[pos];
        let l = pos + 1 >= text.length ? '\0' : text[pos + 1];

        if(c === '\r' && l === '\n') {
            return 2;
        }

        if(c === '\r' || c === '\n') {
            return 1;
        }

        return 0;
    }

    public toString() : string {
        return this._text;
    }

    public toSubString(start:number, end:number) : string {
        return this._text.substring(start, end);
    }

    public toStringFromTextSpan(span: TextSpan): string {
        return this.toSubString(span.start, span.start + span.length);
    }

    public getLength() : number {
        return this._text.length;
    }

    public getCharAtIndex(index:number) : string {
        return this._text[index];
    } 

}