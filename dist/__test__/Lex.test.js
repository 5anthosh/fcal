"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lex_1 = require("../lex/lex");
const lexError_1 = require("../lex/lexError");
const token_1 = require("../lex/token");
const type_1 = require("../type");
test('Test Lexer characters', () => {
    const expression = '112/12312--++//**';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '112', type_1.Type.Number('112'), 0, 3));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', '/', 3, 4));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '12312', type_1.Type.Number('12312'), 4, 9));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.MINUS, '-', '-', 9, 10));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.MINUS, '-', '-', 10, 11));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', '+', 11, 12));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', '+', 12, 13));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', '/', 13, 14));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', '/', 14, 15));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.STAR, '*', '*', 15, 16));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.STAR, '*', '*', 16, 17));
    expect(lexer.Next()).toEqual(token_1.Token.EOLToken(17));
});
test('Test Lexer Float', () => {
    const expression = '9343.234*134.181324';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '9343.234', type_1.Type.Number('9343.234'), 0, 8));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.STAR, '*', '*', 8, 9));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '134.181324', type_1.Type.Number('134.181324'), 9, 19));
    expect(lexer.Next()).toEqual(token_1.Token.EOLToken(19));
});
test('Test Lexer unexpected char', () => {
    const expression = '/+/+@';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', '/', 0, 1));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', '+', 1, 2));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', '/', 2, 3));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', '+', 3, 4));
    expect(() => {
        lexer.Next();
    }).toThrow(new lexError_1.LexerError('Unexpected character @'));
});
//# sourceMappingURL=Lex.test.js.map