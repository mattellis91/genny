import { ISyntaxToken } from "../interfaces";
import { SyntaxNode } from "../parsing/syntaxNode";
import { SyntaxType } from "./syntax-type";

export class SyntaxToken extends SyntaxNode implements ISyntaxToken{

    public position:number;
    public text:string | null;
    public type:SyntaxType;
    public value: number | string | null;

    constructor(type:SyntaxType, position:number, text:string | null, value: number | string | null) {
        super();
        this.position = position;
        this.text = text;
        this.type = type;
        this.value = value;
    }

    public getChildren():SyntaxNode[] {
        return [];   
    }
}