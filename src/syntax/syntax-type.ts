
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
    IdentifierToken = "IdentifierToken",
    BangToken = "BangToken",
    AmpersandAmpersandToken = "AmpersandAmpersandToken",
    PipePipeToken = "PipePipeToken",
    EqualsEqualsToken = "EqualsEqualsToken",
    BangEqualsToken = "BangEqualsToken",
    EqualsToken = "EqualsToken",

    //Expressions
    NumberExpression = "NumberExpression",
    BinaryExpression = "BinaryExpression",
    ParenthesizedExpression = "ParenthesizedExpression",
    LiteralExpression = "LiteralExpression",
    UnaryExpression = "UnaryExpression",
    NameExpression = "NameExpression",
    AssignmentExpression = "AssignmentExpression",

    //Keywords
    TrueKeyword = "TrueKeyword",
    FalseKeyword = "FalseKeyword",
};
