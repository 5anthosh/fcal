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

  const cosine = new FcalFunction('cos', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  cosine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.cosine());
  };

  functions.add(cosine);

  const inverseCosine = new FcalFunction('acos', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  inverseCosine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.inverseCosine());
  };

  functions.add(inverseCosine);

  const hyperbolicCosine = new FcalFunction('cosh', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  hyperbolicCosine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.hyperbolicCosine());
  };

  functions.add(hyperbolicCosine);

  const inverseHyperbolicCosine = new FcalFunction('acosh', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  inverseHyperbolicCosine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.inverseHyperbolicCosine());
  };

  functions.add(inverseHyperbolicCosine);

  const sine = new FcalFunction('sin', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  sine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.sine());
  };

  functions.add(sine);

  const inverseSine = new FcalFunction('asin', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  inverseSine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.inverseSine());
  };

  functions.add(inverseSine);

  const hyperbolicSine = new FcalFunction('sinh', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  hyperbolicSine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.hyperbolicSine());
  };

  functions.add(hyperbolicSine);

  const inverseHyperbolicSine = new FcalFunction('asinh', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  inverseHyperbolicSine.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.inverseHyperbolicSine());
  };

  functions.add(inverseHyperbolicSine);

  const tangent = new FcalFunction('tan', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  tangent.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.tangent());
  };

  functions.add(tangent);

  const inverseTangent = new FcalFunction('atan', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  inverseTangent.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.inverseTangent());
  };

  functions.add(inverseTangent);

  const hyperbolicTangent = new FcalFunction('tanh', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  hyperbolicTangent.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.hyperbolicTangent());
  };

  functions.add(hyperbolicTangent);

  const inverseHyperbolicTangent = new FcalFunction('atanh', 1);
  // tslint:disable-next-line: only-arrow-functions variable-name
  inverseHyperbolicTangent.function = function(_environment: Environment, ...argument: Type[]): Type {
    const value = argument[0] as Type.Numberic;
    return value.newNumeric(value.number.inverseHyperbolicTangent());
  };

  functions.add(inverseHyperbolicTangent);

  return functions;
}
