export class VariableSymbol {
    public name:string;
    public isReadOnly:boolean;
    public type:string;
    constructor(name:string, isReadOnly:boolean, type:string) {
        this.name = name;
        this.isReadOnly = isReadOnly;
        
        this.type = type;
    }

}