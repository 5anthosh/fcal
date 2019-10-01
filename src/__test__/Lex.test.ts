import Big = require('big.js');
import { Lexer } from '../lex/lex';
import { Token, TokenType } from '../lex/token';

test('Test simple divide', () => {
  const expression = '112/12312';
  const lexer = new Lexer(expression);
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '112', new Big('112'), 0, 3));
  expect(lexer.Next()).toEqual(new Token(TokenType.SLASH, '/', '/', 3, 4));
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '12312', new Big(12312), 4, 9));
  expect(lexer.Next()).toEqual(Token.EOLToken(9));
});

test('Test simple multiplication', () => {
  const expression = '9343.234*134.181324';
  const lexer = new Lexer(expression);
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '9343.234', new Big('9343.234'), 0, 8));
  expect(lexer.Next()).toEqual(new Token(TokenType.STAR, '*', '*', 8, 9));
  expect(lexer.Next()).toEqual(new Token(TokenType.Number, '134.181324', new Big('134.181324'), 9, 19));
  expect(lexer.Next()).toEqual(Token.EOLToken(19));
  expect(lexer.Next()).toEqual(Token.EOLToken(19));
  expect(lexer.Next()).toEqual(Token.EOLToken(19));
  expect(lexer.Next()).toEqual(Token.EOLToken(19));
});
