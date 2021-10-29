import colors from 'colors/safe';
import { SyntaxNode } from '../syntax/syntaxNode';
import { Diagnostic } from "../compilation/diagnostic";

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

        console.log(logString);

        indent += isLast ? "    " : "|    ";

        const children = node.getChildren();

        for(const child of children) {
            this.prettyPrint(child, indent, Object.is(child, children[children.length - 1]));
        }
    }

    public static logErrorMessage(input:string, diagnostic:Diagnostic) {

      console.log("\n");
      console.log(colors.red(diagnostic.message));

      const prefix = input.substr(0, diagnostic.span.start);
      const error = input.substr(diagnostic.span.start, diagnostic.span.length);
      const suffix = input.substr(diagnostic.span.end);

      process.stdout.write("\t");
      process.stdout.write(prefix);
      process.stdout.write(colors.red(error));
      process.stdout.write(suffix);
      console.log("\n");

    }
}
