import { SourceText } from "..";
import { Diagnostic } from "../compilation/diagnostic";
import { ISyntaxTree } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { Parser } from "./parser";
import { SyntaxToken } from "./syntax-token";

export class SyntaxTree implements ISyntaxTree {
    public root:ExpressionSyntax;
    public EOFToken:SyntaxToken;
    public readonly diagnostics:Diagnostic[];
    public text:SourceText;
    constructor(text:SourceText, root:ExpressionSyntax, EOFToken: SyntaxToken, diagnostics:Diagnostic[]) {
        this.text = text;
        this.root = root;
        this.EOFToken = EOFToken;
        this.diagnostics = diagnostics;
    }

    public static parse(text:string): SyntaxTree {
        const sourceText = SourceText.from(text);
        return this.parseFromSourceText(sourceText);
    }

    public static parseFromSourceText(text:SourceText): SyntaxTree {
        const parser = new Parser(text);
        return parser.parse();
    }
}