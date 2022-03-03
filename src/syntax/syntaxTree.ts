import { compilationUnitSyntax } from ".";
import { SourceText } from "..";
import { Diagnostic } from "../compilation/diagnostic";
import { ISyntaxTree } from "../interfaces";
import { ExpressionSyntax } from "./expressionSyntax";
import { Parser } from "./parser";
import { SyntaxToken } from "./syntax-token";

export class SyntaxTree implements ISyntaxTree {
    public root:compilationUnitSyntax;
    public readonly diagnostics:Diagnostic[];
    public text:SourceText;
    private constructor(text:SourceText) {
        const parser = new Parser(text);
        const root = parser.parseCompilationUnit();
        this.text = text;
        this.root = root;
        this.diagnostics = parser.diagnosticBag.diagnostics;
    }

    public static parse(text:string): SyntaxTree {
        const sourceText = SourceText.from(text);
        return this.parseFromSourceText(sourceText);
    }

    public static parseFromSourceText(text:SourceText): SyntaxTree {
        return new SyntaxTree(text);
    }
}