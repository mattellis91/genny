import { Diagnostic } from "../../compilation/diagnostic";
import { DiagnosticBag } from "../../compilation/diagnosticBag";

export interface IParser {
    diagnosticBag: DiagnosticBag;
}