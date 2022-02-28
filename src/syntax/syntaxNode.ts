import { TextSpan } from "../text/textSpan";
import { ISyntaxNode } from "../interfaces";
import { SyntaxType } from "./syntax-type";

export abstract class SyntaxNode implements ISyntaxNode {
    public abstract type:SyntaxType;
    public abstract getChildren():SyntaxNode[];
    public getSpan():TextSpan {
        const children = this.getChildren();
        const first:TextSpan = children[0].getSpan();
        const last:TextSpan = children[children.length - 1].getSpan();
        return TextSpan.fromBounds(first.start,last.end);
    }

    private static prettyPrint(node:SyntaxNode, indent:string = "", isLast:boolean = false):void {
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
} 