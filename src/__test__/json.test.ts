import { Fcal } from '../fcal';

test('Import and export json', () => {
  const f = new Fcal();
  const expr = f.expression(
    '5 && 4 ? ( y = PI * radius cm ^ 2 + sinh(8) as cm + log(23) in hex + (--100)%  + 45% in percent ) : 2',
  );
  const jn = expr.toJSON();
  const expr2 = f.fromJSON(jn);
  expr2.setValues({ radius: 4 });
  expr.setValues({ radius: 4 });
  expect(expr2.evaluate()).toStrictEqual(expr.evaluate());
});
