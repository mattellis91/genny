import { BoundExpression, BoundNodeType } from ".";
import { VariableSymbol } from "../compilation/variableSymbol";
import { BoundStatement } from "./boundStatement";

export class BoundVariableDeclaration extends BoundStatement {

    public type:string;
    public variable:VariableSymbol;
    public initializser:BoundExpression;
    public boundNodeType:BoundNodeType = BoundNodeType.VariableDeclaration;

    constructor(variable:VariableSymbol, initializer:BoundExpression) {
        super();
        this.variable = variable;
        this.initializser = initializer;
        this.type = variable.type; 
    }
}