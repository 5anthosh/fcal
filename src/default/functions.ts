import { Decimal } from 'decimal.js';
import { IUseFunction } from '../fcal';
import { Environment } from '../interpreter/environment';
import { Type } from '../types/datatype';

export function getDefaultFunctions(): IUseFunction[] {
  const functions: IUseFunction[] = [
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.abs());
      },
      name: 'abs',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.sqrt());
      },

      name: 'sqrt',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.cbrt());
      },
      name: 'cbrt',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.log());
      },
      name: 'log',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.ln());
      },
      name: 'ln',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.round());
      },
      name: 'round',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.floor());
      },
      name: 'floor',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.ceil());
      },
      name: 'ceil',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.cos());
      },
      name: 'cos',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.acos());
      },
      name: 'acos',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.cosh());
      },
      name: 'cosh',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.acosh());
      },
      name: 'acosh',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.sin());
      },
      name: 'sin',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.asin());
      },
      name: 'asin',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.sinh());
      },
      name: 'sinh',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.asinh());
      },
      name: 'asinh',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.tan());
      },
      name: 'tan',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.atan());
      },
      name: 'atan',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.tanh());
      },
      name: 'tanh',
    },
    {
      arity: 1,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Type => {
        const value = args[0] as Type.Numberic;
        return value.New(value.n.atanh());
      },
      name: 'atanh',
    },
    {
      arity: 2,
      // tslint:disable-next-line: variable-name
      func: (_env: Environment, args: Type[]): Decimal => {
        const start = args[0] as Type.Numberic;
        const end = args[1] as Type.Numberic;
        start.n = start.n.minus(1);
        return end.n
          .mul(end.n.plus(1))
          .div(2)
          .sub(start.n.mul(start.n.plus(1)).div(2));
      },
      name: 'sigma',
    },
  ];

  return functions;
}
