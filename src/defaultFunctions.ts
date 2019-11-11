import { Decimal } from 'decimal.js';
import { Environment } from './interpreter/environment';
import { FcalFunction } from './interpreter/function';
import { Type } from './types/datatype';

export function getDefaultFunction(): FcalFunction[] {
  const functions = Array<FcalFunction>();

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('abs', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.abs());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('sqrt', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.sqrt());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('cbrt', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.cbrt());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('log', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.log());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('ln', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.ln());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('round', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.round());
    }),
  );
  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('floor', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.floor());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('ceil', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.ceil());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('cos', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.cosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('acos', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.inverseCosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('cosh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.hyperbolicCosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('acosh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.inverseHyperbolicCosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('sin', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.sine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('asin', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.inverseSine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('sinh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.hyperbolicSine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('asinh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.inverseHyperbolicSine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('tan', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.tangent());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('atan', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.inverseTangent());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('tanh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.hyperbolicTangent());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('atanh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.New(value.n.inverseHyperbolicTangent());
    }),
  );

  functions.push(
    new FcalFunction(
      'sigma',
      2,
      // tslint:disable-next-line: variable-name
      (_env: Environment, args: Type[]): Decimal => {
        const start = args[0] as Type.Numberic;
        const end = args[1] as Type.Numberic;
        start.n = start.n.minus(1);
        return end.n
          .mul(end.n.plus(1))
          .div(2)
          .sub(start.n.mul(start.n.plus(1)).div(2));
      },
    ),
  );
  return functions;
}
