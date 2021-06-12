import { TextSpan } from "../compilation/textSpan";
import { ISyntaxToken } from "../interfaces";
import { SyntaxType } from "./syntax-type";
import { SyntaxNode } from "./syntaxNode";

export class SyntaxToken extends SyntaxNode implements ISyntaxToken{

    public position:number;
    public text:string | null;
    public type:SyntaxType;
    public value: number | string | null;
    public span:TextSpan;

    constructor(type:SyntaxType, position:number, text:string | null, value: number | string | null) {
        super();
        this.position = position;
        this.text = text;
        this.type = type;
        this.value = value;
        this.span = new TextSpan(this.position, this.text?.length as number);
    }

    public getChildren():SyntaxNode[] {
        return [];   
    }
}