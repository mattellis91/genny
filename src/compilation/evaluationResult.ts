import { IEvaluationResult } from "../interfaces/compilation-interfaces/i-evaluationResult";
import { Diagnostic } from "./diagnostic";

export class EvaluationResult implements IEvaluationResult {
    public diagnostics:Diagnostic[];
    public value:any;
    constructor(diagnostics:Diagnostic[], value:any) {
        this.diagnostics = diagnostics;
        this.value = value
    }
}