import { ISyntaxToken } from "../interfaces";
import { SyntaxType } from "./syntax-type";

export class SyntaxToken implements ISyntaxToken{

    public position:number;
    public text:string;
    public type:SyntaxType;
    public value: number | string | null;

    constructor(type:SyntaxType, position:number, text:string, value: number | string | null) {
        this.position = position;
        this.text = text;
        this.type = type;
        this.value = value;
    }
}