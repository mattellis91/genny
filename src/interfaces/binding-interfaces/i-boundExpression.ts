
export interface IBoundExpression {
    type:string;
    getLiteralType(arg:any): string;
    getOperatorType(arg:any): string;
}