import { TextSpan } from "../../text/textSpan";

export interface IDiagnostic {
    span:TextSpan;
    message:string;
}