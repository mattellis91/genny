import { ISyntaxTree } from "../interfaces";
import { SyntaxToken } from "../lexing";
import { ExpressionSyntax } from "./expressionSyntax";
import { Parser } from "./parser";

export class SyntaxTree implements ISyntaxTree {
    public root:ExpressionSyntax;
    public EOFToken:SyntaxToken;
    public readonly diagnostics:string[];
    constructor(root:ExpressionSyntax, EOFToken: SyntaxToken, diagnostics:string[]) {
        this.root = root;
        this.EOFToken = EOFToken;
        this.diagnostics = diagnostics;
    }

    public static parse(text:string): SyntaxTree {
        const parser = new Parser(text);
        return parser.parse();
    }
}