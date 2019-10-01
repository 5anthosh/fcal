"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lex_1 = require("../lex/lex");
const lexError_1 = require("../lex/lexError");
const token_1 = require("../lex/token");
const type_1 = require("../type");
test('Test Lexer Basic arithmetic characters', () => {
    const expression = '112/12312--++//**';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '112', type_1.Type.Number('112'), 0, 3));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', null, 3, 4));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '12312', type_1.Type.Number('12312'), 4, 9));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.MINUS, '-', null, 9, 10));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.MINUS, '-', null, 10, 11));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', null, 11, 12));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', null, 12, 13));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', null, 13, 14));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', null, 14, 15));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.TIMES, '*', null, 15, 16));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.TIMES, '*', null, 16, 17));
    expect(lexer.Next()).toEqual(token_1.Token.EOLToken(17));
});
test('Test Lexer Float', () => {
    const expression = '9343.234*134.181324';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '9343.234', type_1.Type.Number('9343.234'), 0, 8));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.TIMES, '*', null, 8, 9));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '134.181324', type_1.Type.Number('134.181324'), 9, 19));
    expect(lexer.Next()).toEqual(token_1.Token.EOLToken(19));
});
test('Test Lexer unexpected char', () => {
    const expression = '/+/+@';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', null, 0, 1));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', null, 1, 2));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.SLASH, '/', null, 2, 3));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', null, 3, 4));
    expect(() => {
        lexer.Next();
    }).toThrow(new lexError_1.LexerError('Unexpected character @'));
});
test('Test Lexer Parenthesis', () => {
    const expression = '--(3.324)(+)34.6+)';
    const lexer = new lex_1.Lexer(expression);
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.MINUS, '-', null, 0, 1));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.MINUS, '-', null, 1, 2));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.OPEN_PARAN, '(', null, 2, 3));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '3.324', type_1.Type.Number('3.324'), 3, 8));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.CLOSE_PARAN, ')', null, 8, 9));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.OPEN_PARAN, '(', null, 9, 10));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', null, 10, 11));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.CLOSE_PARAN, ')', null, 11, 12));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.Number, '34.6', type_1.Type.Number('34.6'), 12, 16));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.PLUS, '+', null, 16, 17));
    expect(lexer.Next()).toEqual(new token_1.Token(token_1.TokenType.CLOSE_PARAN, ')', null, 17, 18));
    expect(lexer.Next()).toEqual(token_1.Token.EOLToken(18));
});
//# sourceMappingURL=Lex.test.js.map