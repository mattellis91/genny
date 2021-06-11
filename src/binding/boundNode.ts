import { IBoundNode } from "../interfaces/binding-interfaces/i-boundNode";
import { BoundNodeType } from "./boundNodeType";

export abstract class BoundNode implements IBoundNode{
    public abstract boundNodeType:BoundNodeType;
}