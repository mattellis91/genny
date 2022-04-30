import { BoundStatement } from "../../binding";
import { StatementSyntax } from "../../syntax";

export interface IBoundBlockStatement {
    statements: BoundStatement[]
}