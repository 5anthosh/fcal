import { Fcal, FcalError } from '../fcal';

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
  const expression = '(0B10010 % of Infinity) mod(2.2323E-3 ^ Infinity)';
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
| ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
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
`);
    }
  }
});
