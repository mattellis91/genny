import { LiteralExpressionSyntax } from "../parsing";

export enum SyntaxType {
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
    NumberExpression = "NumberExpression",
    BinaryExpression = "BinaryExpression",
    ParenthesizedExpression = "ParenthesizedExpression",
    LiteralExpression = "LiteralExpression",
    UnaryExpression = "UnaryExpression"
};
