
export enum SyntaxType {
    
    //Tokens
    NumberToken = "NumberToken",
    WhitespaceToken = "WhitespaceToken",
    PlusToken = "PlusToken",
    MinusToken = "MinusToken",
    StarToken = "StarToken",
    SlashToken = "SlashToken",
    OpenParenthesisToken = "OpenParenthesisToken",
    CloseParenthesisToken = "CloseParenthesisToken",
    ModToken = "ModToken",
    UnknownToken = "UnknownToken",
    EOFToken = "EOFToken",
    IndetifierToken = "IndetifierToken",
    

    //Expressions
    NumberExpression = "NumberExpression",
    BinaryExpression = "BinaryExpression",
    ParenthesizedExpression = "ParenthesizedExpression",
    LiteralExpression = "LiteralExpression",
    UnaryExpression = "UnaryExpression",

    //Keywords
    TrueKeyword = "TrueKeyword",
    FalseKeyword = "FalseKeyword",
};
