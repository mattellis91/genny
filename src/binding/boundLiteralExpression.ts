import { IBoundLiteralExpression } from "../interfaces/binding-interfaces/i-boundLiteralExpression";
import { BoundExpression } from "./boundExpression";
import { BoundNodeType } from "./boundNodeType";

export class BoundLiteralExpression extends BoundExpression implements IBoundLiteralExpression{

    public value:any;
    public boundNodeType:BoundNodeType = BoundNodeType.LiteralExpression;
    public type:string;

    constructor(value:any) {
        super();
        this.value = value;
        this.type = this.getLiteralType(value);
    }

}