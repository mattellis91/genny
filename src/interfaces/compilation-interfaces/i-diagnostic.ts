import { TextSpan } from "../../compilation/textSpan";

export interface IDiagnostic {
    span:TextSpan;
    message:string;
}