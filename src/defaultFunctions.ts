import { Environment } from './interpreter/environment';
import { FcalFunction } from './interpreter/function';
import { Type } from './types/datatype';

export function getDefaultFunction(): FcalFunction[] {
  const functions = Array<FcalFunction>();

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('abs', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.abs());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('sqrt', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.sqrt());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('cbrt', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.cbrt());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('log', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.log());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('ln', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.ln());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('round', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.round());
    }),
  );
  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('floor', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.floor());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('ceil', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.ceil());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('cos', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.cosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('acos', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.inverseCosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('cosh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.hyperbolicCosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('acosh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.inverseHyperbolicCosine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('sin', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.sine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('asin', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.inverseSine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('sinh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.hyperbolicSine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('asinh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.inverseHyperbolicSine());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('tan', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.tangent());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('atan', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.inverseTangent());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('tanh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.hyperbolicTangent());
    }),
  );

  functions.push(
    // tslint:disable-next-line: only-arrow-functions variable-name
    new FcalFunction('atanh', 1, function(_environment: Environment, argument: Type[]): Type {
      const value = argument[0] as Type.Numberic;
      return value.newNumeric(value.number.inverseHyperbolicTangent());
    }),
  );

  return functions;
}
