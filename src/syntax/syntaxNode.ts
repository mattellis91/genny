import { TextSpan } from "../compilation/textSpan";
import { ISyntaxNode } from "../interfaces";
import { SyntaxType } from "./syntax-type";

export abstract class SyntaxNode implements ISyntaxNode {
    public abstract type:SyntaxType;
    public abstract getChildren():SyntaxNode[];
} 