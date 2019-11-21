import { Expr } from '../parser/expr';
import { JSONTYPES, IJSON } from './toJSON';
import { Type } from '../types/datatype';
import { Unit } from '../types/units';

class FromJSON {
  private static createExpr(ast: IJSON, units: Unit.List): Expr {
    const type = ast.type;
    switch (type) {
      case JSONTYPES.BINARY:
        if (ast.right && ast.left && ast.operator) {
          const left = this.createExpr(ast.right, units);
          const right = this.createExpr(ast.left, units);
          return new Expr.Binary(left, ast.operator, right, ast.start, ast.end);
        }
        break;
      case JSONTYPES.GROUP:
        if (ast.value && typeof ast.value !== 'string') {
          const expr = this.createExpr(ast.value, units);
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
          const expr = this.createExpr(ast.value, units);
          return new Expr.Unary(ast.operator, expr, ast.start, ast.end);
        }
        break;
      case JSONTYPES.PERCENTAGE:
        if (ast.value && typeof ast.value !== 'string') {
          const expr = this.createExpr(ast.value, units);

          return new Expr.Percentage(expr, ast.start, ast.end);
        }
        break;
      case JSONTYPES.UNIT:
        if (ast.value && ast.phrase && ast.value && typeof ast.value !== 'string') {
          const unitmeta = units.get(ast.phrase);
          if (unitmeta) {
            const expr = this.createExpr(ast.value, units);
            return new Expr.UnitExpr(expr, ast.phrase, unitmeta, ast.start, ast.end);
          }
        }
        break;
      default:
        break;
    }
  }
  private astJSON: string;
  constructor(ast: string) {
    this.astJSON = ast;
  }
}

export { FromJSON };
