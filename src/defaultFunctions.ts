import { Environment } from './interpreter/environment';
import { FcalFunction, FcalFunctions } from './interpreter/function';
import { Type } from './types/datatype';

export function getDefaultFunction(): FcalFunctions {
  const functions = new FcalFunctions();
  const abs = new FcalFunction('abs', 1);

  // tslint:disable-next-line: only-arrow-functions variable-name
  abs.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.abs());
  };
  functions.add(abs);

  const sqrt = new FcalFunction('sqrt', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  sqrt.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.sqrt());
  };
  functions.add(sqrt);

  const cbrt = new FcalFunction('cbrt', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  cbrt.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.cbrt());
  };
  functions.add(cbrt);

  const log = new FcalFunction('log', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  log.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.log());
  };
  functions.add(log);

  const ln = new FcalFunction('ln', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  ln.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.ln());
  };
  functions.add(ln);

  const round = new FcalFunction('round', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  round.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.round());
  };

  functions.add(round);

  const floor = new FcalFunction('floor', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  floor.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.floor());
  };

  functions.add(floor);

  const ceil = new FcalFunction('ceil', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  ceil.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.ceil());
  };

  functions.add(ceil);

  return functions;
}
