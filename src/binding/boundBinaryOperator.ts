import { IBoundBinaryOperator } from "../interfaces/binding-interfaces/i-boundBinaryOperator";
import { SyntaxType } from "../syntax";
import { BoundBinaryOperatorType } from "./boundBinaryOperatorType";

export class BoundBinaryOperator implements IBoundBinaryOperator {
    public syntaxType:SyntaxType;
    public boundBinaryOperatorType:BoundBinaryOperatorType;
    public leftType:string;
    public rightType:string;
    public resultType:string;

    private static _operators:BoundBinaryOperator[] = [
        new BoundBinaryOperator(SyntaxType.PlusToken, BoundBinaryOperatorType.Addition, typeof(1), typeof(1), typeof(1)),
        new BoundBinaryOperator(SyntaxType.MinusToken, BoundBinaryOperatorType.Subtraction, typeof(1), typeof(1), typeof(1)),
        new BoundBinaryOperator(SyntaxType.StarToken, BoundBinaryOperatorType.Multiplication, typeof(1), typeof(1), typeof(1)),
        new BoundBinaryOperator(SyntaxType.SlashToken, BoundBinaryOperatorType.Division, typeof(1), typeof(1), typeof(1)),
        new BoundBinaryOperator(SyntaxType.ModToken, BoundBinaryOperatorType.Modulus, typeof(1), typeof(1), typeof(1)),
        new BoundBinaryOperator(SyntaxType.AmpersandAmpersandToken, BoundBinaryOperatorType.LogicalAnd, typeof(true), typeof(true), typeof(true)),
        new BoundBinaryOperator(SyntaxType.PipePipeToken, BoundBinaryOperatorType.LogicalOr, typeof(true), typeof(true), typeof(true)),
        new BoundBinaryOperator(SyntaxType.EqualsEqualsToken, BoundBinaryOperatorType.Equals, typeof(1), typeof(1), typeof(true)),
        new BoundBinaryOperator(SyntaxType.BangEqualsToken, BoundBinaryOperatorType.NotEquals, typeof(1), typeof(1), typeof(true)),
        new BoundBinaryOperator(SyntaxType.EqualsEqualsToken, BoundBinaryOperatorType.Equals, typeof(true), typeof(true), typeof(true)),
        new BoundBinaryOperator(SyntaxType.BangEqualsToken, BoundBinaryOperatorType.NotEquals, typeof(true), typeof(true), typeof(true)),
    ]

    public static bind(syntaxType:SyntaxType, leftType:string, rightType:string):BoundBinaryOperator | null {
        for(const op of this._operators) {
            if(op.syntaxType === syntaxType && op.leftType === leftType && op.rightType === rightType) {
                return op;
            }
        }
        return null;
    }

    constructor(syntaxType:SyntaxType, boundBinaryOperatorType:BoundBinaryOperatorType, leftType:string, rightType:string, resultType:string) {
        this.syntaxType = syntaxType;
        this.boundBinaryOperatorType = boundBinaryOperatorType;
        this.leftType = leftType;
        this.rightType = rightType;
        this.resultType = resultType;
    }
}