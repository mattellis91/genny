import { Diagnostic } from "../../compilation/diagnostic";

export interface IEvaluationResult {
    diagnostics:Diagnostic[];
    value:any;   
}