import { IBoundUnaryOperator } from "../interfaces/binding-interfaces/i-boundUnaryOperator";
import { SyntaxType } from "../syntax";
import { BoundUnaryOperatorType } from "./boundUnaryOperatorType";

export class BoundUnaryOperator implements IBoundUnaryOperator {
    public syntaxType:SyntaxType;
    public boundUnaryOperatorType:BoundUnaryOperatorType;
    public operandType:string;
    public resultType:string;

    private static _operators:BoundUnaryOperator[] = [
        new BoundUnaryOperator(SyntaxType.BangToken, BoundUnaryOperatorType.LogicalNegation, typeof(true)),
        new BoundUnaryOperator(SyntaxType.PlusToken, BoundUnaryOperatorType.Identity, typeof(1)),
        new BoundUnaryOperator(SyntaxType.MinusToken, BoundUnaryOperatorType.Negation, typeof(-1)),
    ]

    public static bind(syntaxType:SyntaxType, operandType:string):BoundUnaryOperator | null {
        for(const op of this._operators) {
            if(op.syntaxType === syntaxType && op.operandType === operandType) {
                return op;
            }
        }
        return null;
    }

    constructor(syntaxType:SyntaxType, boundUnaryOperatorType:BoundUnaryOperatorType, operandType:string, resultType?:string) {
        this.syntaxType = syntaxType;
        this.boundUnaryOperatorType = boundUnaryOperatorType;
        this.operandType = operandType;
        this.resultType = resultType ?? operandType;
    }
}