import colors from 'colors/safe';
import { SyntaxNode } from '../syntax/syntaxNode';
import { Diagnostic } from "../compilation/diagnostic";
import { SourceText, SyntaxToken } from '..';

export class Util {

    public static prettyPrint(node:SyntaxNode, indent:string = "", isLast:boolean = false):void {
        const marker = isLast ? "|__" : "|--";

        let logString = "";
        logString += indent;
        logString += marker;
        logString += node.type;
        if((node as any).value) {
            logString += " " + (node as any).value;
        }

        console.log(node instanceof SyntaxToken ? colors.blue(logString) : colors.cyan(logString));

        indent += isLast ? "    " : "|    ";

        const children = node.getChildren();

        for(const child of children) {
            this.prettyPrint(child, indent, Object.is(child, children[children.length - 1]));
        }
    }

    public static logErrorMessage(input:string, text:SourceText, diagnostic:Diagnostic) {

      const lineIndex = text.getLineIndex(diagnostic.span.start);
      const lineNumber = lineIndex + 1;
      const textLine = text.lines[lineIndex];
      const char = diagnostic.span.start - textLine.start + 1;

      console.log("\n");
      console.log(colors.red(`(${lineNumber}, ${char}): ` + diagnostic.message));

      const prefix = text.toSubString(textLine.start, textLine.start + diagnostic.span.start);
      const error = text.toSubString(diagnostic.span.start, diagnostic.span.start + diagnostic.span.length);
      const suffix = text.toSubString(diagnostic.span.end, diagnostic.span.end + textLine.end);

      process.stdout.write("\t");
      process.stdout.write(prefix);
      process.stdout.write(colors.red(error));
      process.stdout.write(suffix);
      console.log("\n");

    }
}
