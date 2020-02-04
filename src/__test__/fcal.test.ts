import { Fcal } from '../fcal';
import { Type } from '../types/datatype';

test('Run initialize twice', () => {
  expect(() => {
    return Fcal.initialize();
  }).not.toThrowError();
});

test('Simple arithmetic operation', () => {
  const expression =
    '1 + 2 + 3 * 5 - 4 * (1 - 2) / 3.4 - (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) * (-1) + (1.23423) ^ (2) ** 3 ^ -4 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Divide By Zero', () => {
  const expression = '1/0';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('Infinity'));
});

test('Phrases', () => {
  const expression =
    '1 add 2 ADd 3 mUl 5 MINUS 4 * (1 - 2) DIVIDE 3.4 - (-1) + (PLUS 1) + 1.000 / 1.000\
     + 1 * (1) * (0.2) mul (5) * (-1) * (--1) * (-1) + (1.23423) ** (2) pow 3 ^ -4';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('24.412934840534418202'));
});

test('Modulo Operation', () => {
  const expression = '- (-1) + (+1) + 1.000 / 1.000 + 1 * (1) * (0.2) * (5) * (-1) * (--1) + 4 mod 5 mod 45   mod 1 ';
  expect(Fcal.eval(expression)).toStrictEqual(new Type.BNumber('2.0'));
});

test('Floor division', () => {
  expect(Fcal.eval('16//10/5')).toStrictEqual(Type.BNumber.New(0.2));
  expect(Fcal.eval('-10//3')).toStrictEqual(Type.BNumber.New(-4));
  const unit = Fcal.getUnit('cm');
  expect(unit).not.toBeNull();
  if (unit) {
    expect(Fcal.eval('-1 cm //5')).toStrictEqual(new Type.UnitNumber(-1, unit));
  }
});

test('New line', () => {
  // const expression = '    1 + \t 5 \t';
  // expect(() => {
  //   Fcal.eval(expression);
  // }).toThrowError(new Error('Expecting new Line'));

  const expression1 = '12_34 + 12_341_324_123 * 34 \t \n $';
  expect(Fcal.eval(expression1)).toStrictEqual(new Type.BNumber('419605021416'));
  expect(() => new Fcal().rawEvaluate('1+')).toThrowError('Expect expression but found EOL');
  expect(() => new Fcal().rawEvaluate('0x')).toThrowError("Unexpected '\0' in Hexadecimal");
  expect(() => new Fcal().rawEvaluate('1+2')).toThrowError('Expecting EOL');
});

test('Parser error Expect expression', () => {
  const expression = '* 12_3$';
  const error = new Error('Expect expression but found *');
  error.name = 'FcalError [0, 1]';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(error);
});

test('Lex error unexpected token', () => {
  const expression = '123 mul 123$';
  const error = new Error('Unexpected token $');
  error.name = 'FcalError [9, 10]';
  expect(() => {
    Fcal.eval(expression);
  }).toThrow(error);

  expect(() => {
    Fcal.eval('23km 0');
  }).toThrowError('Unexpected token 0');
});

test('PI area of the circle', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  expect(fcal.evaluate('radius: 20 ')).toStrictEqual(new Type.BNumber('20'));
  expect(fcal.evaluate(expression)).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('Default functions', () => {
  const expression =
    'abs(-23) + log(123) - ln(0.23) * sqrt(12) / cbrt(60) ^ round(1.2344) mod ceil(2.7) + floor(23.6 cm)  ';
  const unit = Fcal.getUnit('cm');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('49.390359524782034541', unit));
  }

  const trigonometry =
    'cos(23 km) + acos(-0.5) sec + cosh(34cm) * acosh(1) ** sin(0.23) \
    - asin(0.12341234) + sinh(0 mps) - asinh(8) + tan(45) - atan(45) ^ tanh(0.23 cm ) * atanh(0.7) cm';
  const unit2 = Fcal.getUnit('cm');
  expect(unit2).not.toEqual(null);
  if (unit2 != null) {
    expect(Fcal.eval(trigonometry)).toStrictEqual(new Type.UnitNumber('-0.67627697424654781499', unit2));
  }
});

test('Expression', () => {
  const expression = 'PI*radius^2 ';
  const fcal = new Fcal();
  fcal.setValues({ radius: new Type.BNumber('20') });
  const expr = fcal.expression(expression);
  const expr1 = fcal.expression('radius ');
  expr1.setValues({ radius: new Type.BNumber('21') });
  expect(expr1.evaluate()).toStrictEqual(new Type.BNumber('21'));
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber('1256.6370614359172954'));
});

test('Expression Sync', () => {
  const expression = 'PI2*radius';
  const fcal = new Fcal();
  fcal.setValues({ radius: new Type.BNumber('20') });
  const expr = fcal.expressionSync(expression);
  const expr1 = fcal.expression('radius \n');
  fcal.setValues({ radius: new Type.BNumber('21') });
  expect(expr1.evaluate()).toStrictEqual(new Type.BNumber('20'));
  expect(expr.evaluate()).toStrictEqual(new Type.BNumber('131.94689145077131601'));
});

test('Temperature', () => {
  const expression = '23432 F + 0.2 C * 9 F / 4 K';
  let unit = Fcal.getUnit('F');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression)).toStrictEqual(new Type.UnitNumber('23431.356333016553583', unit));
  }

  const expression1 = '60F in F';
  unit = Fcal.getUnit('F');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression1)).toStrictEqual(new Type.UnitNumber('60', unit));
  }

  const expression2 = '0.23_34_52 F in C';
  unit = Fcal.getUnit('C');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression2)).toStrictEqual(new Type.UnitNumber('-17.64808222222224444', unit));
  }

  const expression3 = '2_73.1_5 F  + 1 K';
  unit = Fcal.getUnit('K');
  expect(unit).not.toEqual(null);
  if (unit != null) {
    expect(Fcal.eval(expression3)).toStrictEqual(new Type.UnitNumber('408.1222222222222', unit));
  }
});

test('Infinity', () => {
  const expression =
    'Infinity + Infinity - (-Infinity) + (1/0)% of 342 * Infinity + 23 / +++ Infinity + 23/0/0 + 45 mod 0xaa / 0.00';
  expect(Fcal.eval(expression).toString()).toStrictEqual('Infinity');
});

test('ToNumber', () => {
  expect(Fcal.eval('3434%').toNumber()).toStrictEqual(3434);
  expect(Fcal.eval('-90cm').toNumber()).toStrictEqual(-90);
  expect(Fcal.eval('0x1_a_c in oct').toNumber()).toStrictEqual(428);
  expect(Fcal.eval('0.34 + 1').toNumber()).toStrictEqual(1.34);
});

test('Fcal getUnit', () => {
  const cmUnit = Fcal.getUnit('cm');
  expect(cmUnit).not.toBeNull();
  if (cmUnit) {
    expect(cmUnit.unitType).toStrictEqual('cm');
  }
  expect(Fcal.getUnit('hasifh')).toBeNull();
});

test('Value toString()', () => {
  expect(
    Fcal.eval('32184039488888888888888888888882342342344444444444444444888888888888888888888888').toString(),
  ).toStrictEqual('3.2184039488888888889e+79');

  expect(
    Fcal.eval('32184039488888888888888888888882342342344444444444444444888888888888888888888888 %').toString(),
  ).toStrictEqual('% 3.2184039488888888889e+79');

  expect(
    Fcal.eval('32184039488888888888888888888882342342344444444444444444888888888888888888888888 cm').toString(),
  ).toStrictEqual('3.2184039488888888889e+79 Centimeters');
});

test('AST print()', () => {
  const expr = new Fcal().expression(
    '5 && 4 ? ( y = PI * radius cm ^ 2 + sinh(8) as cm + log(23) in hex + (--100)%  + 45% in percent ) : 2',
  );
  expect(expr.getAST()).toStrictEqual(`\
+ (0)TERNARY
|
+---- (1)LOGICAL  && 
|
+-------- (2)LITERAL 5
|
+-------- (2)LITERAL 4
|
+---- (1)GROUPING 
|
+-------- (2)ASSIGN y 
|
+------------ (3)BINARY  + 
|
+---------------- (4)BINARY  + 
|
+-------------------- (5)BINARY  + 
|
+------------------------ (6)BINARY  + 
|
+---------------------------- (7)BINARY  * 
|
+-------------------------------- (8)VARIABLE PI
|
+-------------------------------- (8)BINARY  ^ 
|
+------------------------------------ (9)UNIT cm 
|
+---------------------------------------- (10)VARIABLE radius
|
+------------------------------------ (9)LITERAL 2
|
+---------------------------- (7)UNIT CONVERT cm 
|
+-------------------------------- (8)FUNCTION ==> sinh  
|
+------------------------------------ (9)LITERAL 8
|
+------------------------ (6)NUMERICAL SYSTEM hex 
|
+---------------------------- (7)FUNCTION ==> log  
|
+-------------------------------- (8)LITERAL 23
|
+-------------------- (5)PERCENTAGE 
|
+------------------------ (6)GROUPING 
|
+---------------------------- (7)UNARY - 
|
+-------------------------------- (8)UNARY - 
|
+------------------------------------ (9)LITERAL 100
|
+---------------- (4)CONVERTER percent 
|
+-------------------- (5)PERCENTAGE 
|
+------------------------ (6)LITERAL 45
|
+---- (1)LITERAL 2
`);
});
