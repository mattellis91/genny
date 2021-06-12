import { IBoundExpression } from "../interfaces/binding-interfaces/i-boundExpression";
import { BoundNode } from "./boundNode";
import isObject from "lodash/isObject";

export abstract class BoundExpression extends BoundNode implements IBoundExpression{
    public abstract type:string;
    public getLiteralType(arg:any): string{
        return isObject(arg) ? typeof((arg as Record<string, unknown>).value) : typeof(arg);
    }
    public getOperatorType(arg:any): string {
        return arg.resultType;
    }
}               