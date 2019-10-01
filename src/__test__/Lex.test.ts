import { Lexer } from '../lex/lex';
import { LexerError } from '../lex/lexError';
import { Token, TokenType } from '../lex/token';
import { Type } from '../type';

test('Test Lexer characters', () => {
  const expression = '112/12312--++//**';
  const lexer = new Lexer(expression);
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '112', Type.Number('112'), 0, 3));
  expect(lexer.Next()).toEqual(new Token(TokenType.SLASH, '/', '/', 3, 4));
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '12312', Type.Number('12312'), 4, 9));
  expect(lexer.Next()).toEqual(new Token(TokenType.MINUS, '-', '-', 9, 10));
  expect(lexer.Next()).toEqual(new Token(TokenType.MINUS, '-', '-', 10, 11));
  expect(lexer.Next()).toEqual(new Token(TokenType.PLUS, '+', '+', 11, 12));
  expect(lexer.Next()).toEqual(new Token(TokenType.PLUS, '+', '+', 12, 13));
  expect(lexer.Next()).toEqual(new Token(TokenType.SLASH, '/', '/', 13, 14));
  expect(lexer.Next()).toEqual(new Token(TokenType.SLASH, '/', '/', 14, 15));
  expect(lexer.Next()).toEqual(new Token(TokenType.STAR, '*', '*', 15, 16));
  expect(lexer.Next()).toEqual(new Token(TokenType.STAR, '*', '*', 16, 17));
  expect(lexer.Next()).toEqual(Token.EOLToken(17));
});
test('Test Lexer Float', () => {
  const expression = '9343.234*134.181324';
  const lexer = new Lexer(expression);
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '9343.234', Type.Number('9343.234'), 0, 8));
  expect(lexer.Next()).toEqual(new Token(TokenType.STAR, '*', '*', 8, 9));
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '134.181324', Type.Number('134.181324'), 9, 19));
  expect(lexer.Next()).toEqual(Token.EOLToken(19));
});

test('Test Lexer unexpected char', () => {
  const expression = '/+/+@';
  const lexer = new Lexer(expression);
  expect(lexer.Next()).toEqual(new Token(TokenType.SLASH, '/', '/', 0, 1));
  expect(lexer.Next()).toEqual(new Token(TokenType.PLUS, '+', '+', 1, 2));
  expect(lexer.Next()).toEqual(new Token(TokenType.SLASH, '/', '/', 2, 3));
  expect(lexer.Next()).toEqual(new Token(TokenType.PLUS, '+', '+', 3, 4));
  expect(() => {
    lexer.Next();
  }).toThrow(new LexerError('Unexpected character @'));
});
