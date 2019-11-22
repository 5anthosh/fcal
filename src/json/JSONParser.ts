import { FcalError } from '../fcal';
import { Converter } from '../interpreter/converter';
import { Expr } from '../parser/expr';
import { Type } from '../types/datatype';
import { NumberSystem } from '../types/numberSystem';
import { Unit } from '../types/units';
import { IJSON, JSONTYPES } from './toJSON';

class JSONParser {
  private units: Unit.List;
  private c: Converter;
  private ast: IJSON;

  constructor(astJSON: string, units: Unit.List, c: Converter) {
    this.units = units;
    this.c = c;
    this.ast = JSON.parse(astJSON);
  }

  public parse(): Expr {
    return this.createExpr(this.ast);
  }

  private createExpr(ast: IJSON): Expr {
    const type = ast.type;
    switch (type) {
      case JSONTYPES.BINARY:
        if (ast.right && ast.left && ast.operator) {
          const left = this.createExpr(ast.left);
          const right = this.createExpr(ast.right);
          return new Expr.Binary(left, ast.operator, right, ast.start, ast.end);
        }
        break;
      case JSONTYPES.GROUP:
        if (ast.value && typeof ast.value !== 'string') {
          const expr = this.createExpr(ast.value);
          return new Expr.Grouping(expr, ast.start, ast.end);
        }
        break;
      case JSONTYPES.LITERAL:
        if (ast.value && typeof ast.value === 'string') {
          return new Expr.Literal(new Type.BNumber(ast.value), ast.start, ast.end);
        }
        break;
      case JSONTYPES.UNARY:
        if (ast.operator && ast.value && typeof ast.value !== 'string') {
          const expr = this.createExpr(ast.value);
          return new Expr.Unary(ast.operator, expr, ast.start, ast.end);
        }
        break;
      case JSONTYPES.PERCENTAGE:
        if (ast.value && typeof ast.value !== 'string') {
          const expr = this.createExpr(ast.value);

          return new Expr.Percentage(expr, ast.start, ast.end);
        }
        break;
      case JSONTYPES.UNIT:
        if (ast.phrase && ast.value && typeof ast.value !== 'string') {
          const unitmeta = this.units.get(ast.phrase);
          if (unitmeta) {
            const expr = this.createExpr(ast.value);
            return new Expr.UnitExpr(expr, ast.phrase, unitmeta, ast.start, ast.end);
          }
        }
        break;
      case JSONTYPES.CONVERSION:
        if (ast.value && typeof ast.value !== 'string') {
          const value = this.createExpr(ast.value);
          if (ast.unit) {
            const unitMeta = this.units.get(ast.unit);
            if (unitMeta) {
              return new Expr.ConvertionExpr(value, unitMeta, ast.unit, ast.start, ast.end);
            }
          }
          if (ast.ns) {
            const ns = NumberSystem.get(ast.ns);
            if (ns) {
              return new Expr.ConvertionExpr(value, ns, ast.ns, ast.start, ast.end);
            }
          }
          if (ast.converter) {
            const cov = this.c.get(ast.converter);
            if (cov) {
              return new Expr.ConvertionExpr(value, cov, ast.converter, ast.start, ast.end);
            }
          }
        }
        break;
      case JSONTYPES.ASSIGN:
        if (ast.value && typeof ast.value !== 'string') {
          const value = this.createExpr(ast.value);
          if (ast.variable) {
            return new Expr.Assign(ast.variable, value, ast.start, ast.end);
          }
        }
        break;
      case JSONTYPES.VARIABLE:
        if (ast.name) {
          return new Expr.Variable(ast.name, ast.start, ast.end);
        }
        break;
      case JSONTYPES.CALL:
        if (ast.name) {
          const exprs = Array<Expr>();
          if (ast.args) {
            for (const arg of ast.args) {
              exprs.push(this.createExpr(arg));
            }
            return new Expr.Call(ast.name, exprs, ast.start, ast.end);
          }
        }
        break;
      case JSONTYPES.LOGICAL:
        if (ast.right && ast.left && ast.operator) {
          const left = this.createExpr(ast.left);
          const right = this.createExpr(ast.right);
          return new Expr.Logical(left, ast.operator, right, ast.start, ast.end);
        }
        break;
      case JSONTYPES.TERNARY:
        if (ast.main && ast.texpr && ast.fexpr) {
          const main = this.createExpr(ast.main);
          const texpr = this.createExpr(ast.texpr);
          const fexpr = this.createExpr(ast.fexpr);
          return new Expr.Ternary(main, texpr, fexpr, ast.start, ast.end);
        }
        break;
    }
    throw new FcalError(`Invalid JSON ${ast}`);
  }
}

export { JSONParser };
