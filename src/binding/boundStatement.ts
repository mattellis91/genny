import { IBoundStatement } from "../interfaces";
import { BoundNode } from "./boundNode";

export abstract class BoundStatement extends BoundNode implements IBoundStatement{
}               