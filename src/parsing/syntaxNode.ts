import { ISyntaxNode } from "../interfaces";
import { SyntaxType } from "../lexing/syntax-type";

export abstract class SyntaxNode implements ISyntaxNode {
    public abstract type:SyntaxType;
} 