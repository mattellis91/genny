import * as colors from 'colors/safe';
import { SyntaxNode } from '../syntax/syntaxNode';

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

    public static logErrorMessage(message:string) {
        console.log(colors.red(message));
    }
}