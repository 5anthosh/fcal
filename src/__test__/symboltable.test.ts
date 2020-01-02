import Decimal from 'decimal.js';
import { Fcal } from '../fcal';
import { Type } from '../types/datatype';
import { Unit } from '../types/units';
import { FcalFunction } from '../evaluator/function';

test('create variable with already used phrases', () => {
  expect(() => {
    Fcal.eval('days : 2343');
  }).toThrowError('Expect expression but found days [unit]');

  expect(() => {
    Fcal.eval('sin : 0B1010');
  }).toThrowError('sin is already used in function');

  expect(() => {
    Fcal.eval('ADD : 0.34E4');
  }).toThrowError('Expect expression but found :');
  expect(() => {
    Fcal.eval('dec : 0.34E4');
  }).toThrowError('Expect expression but found dec [number system]');

  expect(() => {
    Fcal.eval('E : 0.34E4');
  }).not.toThrowError('sin is already used in constant');

  expect(() => {
    Fcal.eval('num : 0.34E4');
  }).toThrowError('Expect expression but found num [converter]');
});

test('create variable with already used phrases (Fcal obj using variables)', () => {
  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ msec: 35 });
  }).toThrowError('msec is already used in unit');

  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ ln: '3.5' });
  }).toThrowError('ln is already used in function');
  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ MUL: new Type.Percentage('0.172') });
  }).toThrowError('MUL is already used in operation phrase');
  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ bin: new Decimal(0) });
  }).toThrowError('bin is already used in number system');

  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ E: new Decimal(0) });
  }).not.toThrowError('E is already used in variable');

  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ number: new Decimal(0) });
  }).toThrowError('number is already used in converter');
});

test('create variable with already used phrases (Fcal obj using variables)', () => {
  expect(() => {
    const exp = new Fcal().expression('mpc * 90');
    exp.setValues({ msec: 35 });
  }).toThrowError('msec is already used in unit');

  expect(() => {
    const exp = new Fcal().expression('mpc * 90');
    exp.setValues({ ln: '3.5' });
  }).toThrowError('ln is already used in function');
  expect(() => {
    const exp = new Fcal().expression('mpc * 90');
    exp.setValues({ MUL: new Type.Percentage('0.172') });
  }).toThrowError('MUL is already used in operation phrase');
  expect(() => {
    const exp = new Fcal().expression('mpc * 90');
    exp.setValues({ bin: new Decimal(0) });
  }).toThrowError('bin is already used in number system');

  expect(() => {
    const exp = new Fcal().expression('mpc * 90');
    exp.setValues({ E: new Decimal(0) });
  }).not.toThrowError('E is already used in variable');

  expect(() => {
    const exp = new Fcal().expression('mpc * 90');
    exp.setValues({ percentage: new Decimal(0) });
  }).toThrowError('percentage is already used in converter');
});

test('set phrase after create variable using fcal obj )', () => {
  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ er: 35 });
    Fcal.UseFunction(
      new FcalFunction('er', 1, (): number => {
        return 45;
      }),
    );
  }).not.toThrowError('er is already used in variable');

  expect(() => {
    const fcal = new Fcal();
    fcal.setValues({ kid: '3.5' });
    Fcal.useConstants({ msec: 35 });
  }).not.toThrowError('kid is already used in variable');
});

test('create unit with already used phrases', () => {
  expect(() => {
    Fcal.UseUnit(new Unit('TEST', 23.2, 'TEST', ['kts']));
  }).toThrowError('kts is already used in unit');

  expect(() => {
    Fcal.UseUnit(new Unit('TEST', 23e-34, 'TEST', ['new unit', 'sigma']));
  }).toThrowError('sigma is already used in function');
  expect(() => {
    Fcal.UseUnit(new Unit('TEST', new Decimal(23.4), 'TEST', ['n342', 'MINUS']));
  }).toThrowError('MINUS is already used in operation phrase');
  expect(() => {
    Fcal.UseUnit(new Unit('TEST', 10, 'TEST', ['hex']));
  }).toThrowError('hex is already used in number system');

  expect(() => {
    Fcal.UseUnit(new Unit('TEST', 10, 'TEST', ['PI2']));
  }).toThrowError('PI2 is already used in constant');

  expect(() => {
    Fcal.UseUnit(new Unit('TEST', 10, 'TEST', ['percent']));
  }).toThrowError('percent is already used in converter');
});

test('create function with already used phrases', () => {
  expect(() => {
    Fcal.UseFunction(
      new FcalFunction('yard', 4, (): number => {
        return 45;
      }),
    );
  }).toThrowError('yard is already used in unit');

  expect(() => {
    Fcal.UseFunction(
      new FcalFunction('atanh', 4, (): number => {
        return 45;
      }),
    );
  }).toThrowError('atanh is already used in function');

  expect(() => {
    Fcal.UseFunction(
      new FcalFunction('DIVIDEBY', 4, (): number => {
        return 45;
      }),
    );
  }).toThrowError('DIVIDEBY is already used in operation phrase');

  expect(() => {
    Fcal.UseFunction(
      new FcalFunction('decimal', 4, (): number => {
        return 45;
      }),
    );
  }).toThrowError('decimal is already used in number system');

  expect(() => {
    Fcal.UseFunction(
      new FcalFunction('_', 4, (): number => {
        return 45;
      }),
    );
  }).toThrowError('_ is already used in variable');

  expect(() => {
    Fcal.UseFunction(
      new FcalFunction('num', 4, (): number => {
        return 45;
      }),
    );
  }).toThrowError('num is already used in converter');
});

test('create constant with already used phrases', () => {
  expect(() => {
    Fcal.useConstants({ msec: 35 });
  }).toThrowError('msec is already used in unit');

  expect(() => {
    Fcal.useConstants({ ln: '3.5' });
  }).toThrowError('ln is already used in function');
  expect(() => {
    Fcal.useConstants({ MUL: new Type.Percentage('0.172') });
  }).toThrowError('MUL is already used in operation phrase');
  expect(() => {
    Fcal.useConstants({ bin: new Decimal(0) });
  }).toThrowError('bin is already used in number system');

  expect(() => {
    Fcal.useConstants({ E: new Decimal(0) });
  }).not.toThrowError('E is already used in variable');
});

test('create constant with already used phrases', () => {
  const c = (v: Type): Type => {
    return v;
  };
  expect(() => {
    Fcal.useConverter('kb', c);
  }).toThrowError('kb is already used in unit');

  expect(() => {
    Fcal.useConverter('min', c);
  }).toThrowError('min is already used in function');
  expect(() => {
    Fcal.useConverter('ADD', c);
  }).toThrowError('ADD is already used in operation phrase');
  expect(() => {
    Fcal.useConverter('octal', c);
  }).toThrowError('octal is already used in number system');
});
