import { IExpressionSyntax } from "../interfaces";
import { SyntaxNode } from "./syntaxNode";

export abstract class ExpressionSyntax extends SyntaxNode implements IExpressionSyntax {}