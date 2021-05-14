import { ISyntaxToken } from "../interfaces";
import { SyntaxType } from "./syntax-type";

export class SyntaxToken implements ISyntaxToken{

    public position:number;
    public text:string;
    public type:SyntaxType;

    constructor(type:SyntaxType, position:number, text:string, value: number | string) {
        this.position = position;
        this.text = text;
        this.type = type;
    }

}