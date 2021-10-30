
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
    BangToken = "BangToken",
    AmpersandAmpersandToken = "AmpersandAmpersandToken",
    PipePipeToken = "PipePipeToken",
    EqualsEqualsToken = "EqualsEqualsToken",
    BangEqualsToken = "BangEqualsToken",

    //Expressions
    NumberExpression = "NumberExpression",
    BinaryExpression = "BinaryExpression",
    ParenthesizedExpression = "ParenthesizedExpression",
    LiteralExpression = "LiteralExpression",
    UnaryExpression = "UnaryExpression",
    NameExpression = "NameExpression",
    AssignmentToken = "AssignmentToken",

    //Keywords
    TrueKeyword = "TrueKeyword",
    FalseKeyword = "FalseKeyword",
};
