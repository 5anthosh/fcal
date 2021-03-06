import { Fcal, FcalError } from '../fcal';
import { Type } from '../types/datatype';

test('Power result in imaginary number', () => {
  const expression = '34 cm  + (-2)^2.5';
  const errorMessage = 'Pow of operation results in complex number and complex number is not supported yet';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| .........^^^^^^^^
`);
    }
  }
});

test('Unexpected Token', () => {
  const expression = '23423 + 888 + dd() + 34234';
  const errorMessage = 'dd is not callable';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ..............^^^^
`);
    }
  }
});

test('Undefined variable', () => {
  const expression = '23423 + un$     ';
  const errorMessage = 'Undefined variable un$';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ........^^^
`);
    }
  }
});

test('Modulus with Infinity is indeterminate', () => {
  const expression = '(0B1_00_10 % of Infinity) mod(2.2323E-3 ^ Infinity)';
  const errorMessage = 'Modulus with Infinity is indeterminate';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Division between Infinity is indeterminate', () => {
  const expression = '(Infinity * -23) //   (12 * (Infinity))';
  const errorMessage = 'Division between Infinity is indeterminate';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Division between Infinity is indeterminate (Floor divide)', () => {
  const expression = '(Infinity * -23) /   (12 * (Infinity)) + 67 cm';
  const errorMessage = 'Division between Infinity is indeterminate';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Subtraction between Infinity is indeterminate', () => {
  const expression = '4*5---Infinity - -(45 * 234 mod 0o0)';
  const errorMessage = 'Subtraction between Infinity is indeterminate';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Subtraction between Infinity is indeterminate 2', () => {
  const expression = '---Infinity + 1/0';
  const errorMessage = 'Subtraction between Infinity is indeterminate';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Expected expression', () => {
  const expression = '4+';
  const errorMessage = 'Expect expression but found EOL';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ..^
`);
    }
  }
});

test('Invalid number literal', () => {
  const expression = '1E + 23';
  const errorMessage = "Expecting number after E but got ' '";
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^
`);
    }
  }
});

test('Invalid number literal 2', () => {
  const expression = '1.23e';
  const errorMessage = "Expecting number after e but got 'EOL'";
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^
`);
    }
  }
});

test('Invalid number literal 3', () => {
  const expression = '343 + 23.45E+*34';
  const errorMessage = "Expecting number after + but got '*'";
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ......^^^^^^^
`);
    }
  }
});

test('Change value of Constant', () => {
  const expression = 'PI = 345345';
  const errorMessage = "Can't reassign constant PI";
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^
`);
    }
  }
});

test('Strict mode units', () => {
  const expression = '23% + 34 cm + 5 byte';
  const errorMessage = "Unexpected '+' operation between different units (LENGTH, DIGITAL STORAGE)";
  const fcal = new Fcal();
  fcal.setStrict(true);
  expect(() => {
    fcal.evaluate(expression);
  }).toThrowError(errorMessage);
  try {
    fcal.evaluate(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Strict mode types 2', () => {
  const expression = '23% + 34 cm + 1';
  const errorMessage = "Unexpected '+' operation between different types (unit, number)";
  const fcal = new Fcal();
  fcal.setStrict(true);
  expect(() => {
    fcal.evaluate(expression);
  }).toThrowError(errorMessage);
  try {
    fcal.evaluate(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ^^^^^^^^^^^^^^^
`);
    }
  }
});

test('Strict mode types (Not) ', () => {
  let expression = '(23% + 34 cm * 1) as num';
  const fcal = new Fcal();
  fcal.setStrict(true);
  expect(() => {
    fcal.evaluate(expression);
  }).not.toThrowError();
  expect(fcal.evaluate(expression)).toStrictEqual(Type.BNumber.New(41.82));
  expression = '(23% + 34 cm / 1) as num';
  expect(() => {
    fcal.evaluate(expression);
  }).not.toThrowError();
  expect(fcal.evaluate(expression)).toStrictEqual(Type.BNumber.New(41.82));
  expression = '(23% + 34 cm // 1) as num';
  expect(() => {
    fcal.evaluate(expression);
  }).not.toThrowError();
  expect(fcal.evaluate(expression)).toStrictEqual(Type.BNumber.New(41.82));

  expression = '(23% + 34 cm mod 1) as num';
  expect(() => {
    fcal.evaluate(expression);
  }).not.toThrowError();
  expect(fcal.evaluate(expression)).toStrictEqual(Type.BNumber.New(0));

  expression = '(23% + 34 cm ^ 1) as num';
  expect(() => {
    fcal.evaluate(expression);
  }).not.toThrowError();
  expect(fcal.evaluate(expression)).toStrictEqual(Type.BNumber.New(41.82));

  expression = '(23% + 34 cm ^ 1) as num';
  expect(() => {
    fcal.evaluate(expression);
  }).not.toThrowError();
  expect(fcal.evaluate(expression)).toStrictEqual(Type.BNumber.New(41.82));
});

test('Boolean in percentage operation', () => {
  const expression = ' 34 + 4 + 5 * ( false of 34) + 100';
  const errorMessage = 'Unexpected Boolean in percentage operation';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ................^^^^^^^^^^^
`);
    }
  }
});

test('Percentage value in left side ', () => {
  const expression = ' 34 + 4 + 5 * (34 of 100 cm) + 100';
  const errorMessage = 'Expecting Percentage type in left side of percentage operation but got (number, unit)';
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...............^^^^^^^^^^^^
`);
    }
  }
});

test('Percentage value with different units', () => {
  const expression = ' 34 + 4 + 5 * (34cm of 100 F) + 100';
  const errorMessage = `Unexpected 'of' operation between different units (LENGTH, TEMPERATURE)`;
  const fcal = new Fcal();
  fcal.setStrict(true);
  expect(() => {
    fcal.evaluate(expression);
  }).toThrowError(errorMessage);
  try {
    fcal.evaluate(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...............^^^^^^^^^^^^^
`);
    }
  }
});

test('Improper number system numbers', () => {
  let expression = ' 34 + 4 + 5 * 3O10 + 5';
  let errorMessage = `Unexpected token O10`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...............^^^
`);
    }
  }

  expression = ' 34 + 4 + 5 * 3x34 + 5';
  errorMessage = `Unexpected token x34`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...............^^^
`);
    }
  }

  expression = ' 34 + 4 + 5 * 9B10 + 5';
  errorMessage = `Unexpected token B10`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...............^^^
`);
    }
  }
});
test('_ in unexpected places', () => {
  let expression = ' 34 + 4 + 5 * 0B101_ + 5';
  let errorMessage = `Unexpected token _`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...................^
`);
    }
  }

  expression = ' 34 + 4 + 5 * 0xA_C_ + 5';
  errorMessage = `Unexpected token _`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...................^
`);
    }
  }

  expression = ' 34 + 4 + 5 * 0O3_1_ + 5';
  errorMessage = `Unexpected token _`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...................^
`);
    }
  }

  expression = ' 34 + 4 + 5 * 0_3_1_ + 5';
  errorMessage = `Unexpected token _`;
  expect(() => {
    Fcal.eval(expression);
  }).toThrowError(errorMessage);
  try {
    Fcal.eval(expression);
  } catch (e) {
    expect(e).toBeInstanceOf(FcalError);
    if (e instanceof FcalError) {
      expect(e.info()).toStrictEqual(`\
err: ${errorMessage}
| ${expression}
| ...................^
`);
    }
  }
});
