import { IBoundBlockStatement, IBoundStatement } from "../interfaces";
import { StatementSyntax } from "../syntax";
import { BoundNode } from "./boundNode";
import { BoundNodeType } from "./boundNodeType";
import { BoundStatement } from "./boundStatement";

export class BoundBlockStatement extends BoundStatement implements IBoundBlockStatement{
    public boundNodeType: BoundNodeType = BoundNodeType.BlockStatement;
    public statements: BoundStatement[];

    constructor(statements:BoundStatement[]) {
        super();
        this.statements = statements;
    }
}               