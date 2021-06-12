import { IDiagnostic } from "../interfaces/compilation-interfaces/i-diagnostic";
import { TextSpan } from "./textSpan";

export class Diagnostic implements IDiagnostic {
    public span:TextSpan;
    public message:string;
    constructor(textSpan:TextSpan, message:string) {
        this.span = textSpan;
        this.message = message;
    }
}