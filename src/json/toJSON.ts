import { Token } from '../lex/token';
import { Expr } from '../parser/expr';
import { NumberSystem } from '../types/numberSystem';
import { UnitMeta } from '../types/units';

enum JSON_TYPES {
  BINARY = 'binary',
  GROUP = 'group',
  LITERAL = 'literal',
  UNARY = 'unary',
  PERCENTAGE = 'percentage',
  UNIT = 'unit',
  CONVERSION = 'conversion',
  ASSIGN = 'assign',
  VARIABLE = 'variable',
  CALL = 'call',
  LOGICAL = 'logical',
  TERNARY = 'ternary',
}

interface IJSON {
  type: JSON_TYPES;
  right?: IJSON;
  left?: IJSON;
  operator?: Token;
  value?: IJSON | string;
  phrase?: string;
  unit?: string;
  ns?: string;
  converter?: string;
  variable?: string;
  name?: string;
  main?: IJSON;
  texpr?: IJSON;
  fexpr?: IJSON;
  start?: number;
  end?: number;
  args?: IJSON[];
}

class ToJSON implements Expr.IVisitor<IJSON> {
  private ast: Expr;

  constructor(ast: Expr) {
    this.ast = ast;
  }

  public toJSON(): string {
    const astObj = this.toObj();
    return JSON.stringify(astObj);
  }

  public toObj(): object {
    return this.evaluate(this.ast);
  }

  public visitBinaryExpr(expr: Expr.Binary): IJSON {
    const right = this.evaluate(expr.right);
    const left = this.evaluate(expr.left);
    const operator = expr.operator;
    return { type: JSON_TYPES.BINARY, right, left, operator };
  }

  public visitGroupingExpr(expr: Expr.Grouping): IJSON {
    return { type: JSON_TYPES.GROUP, value: this.evaluate(expr.expression) };
  }

  public visitLiteralExpr(expr: Expr.Literal): IJSON {
    return { type: JSON_TYPES.LITERAL, value: expr.value.print() };
  }

  public visitUnaryExpr(expr: Expr.Unary): IJSON {
    return { type: JSON_TYPES.UNARY, operator: expr.operator, value: this.evaluate(expr.right) };
  }

  public visitPercentageExpr(expr: Expr.Percentage): IJSON {
    return { type: JSON_TYPES.PERCENTAGE, value: this.evaluate(expr.expression) };
  }

  public visitUnitExpr(expr: Expr.UnitExpr): IJSON {
    return { type: JSON_TYPES.UNIT, phrase: expr.phrase, value: this.evaluate(expr.expression) };
  }

  public visitConversionExpr(expr: Expr.ConversionExpr): IJSON {
    const value = this.evaluate(expr.expression);
    if (expr.to instanceof UnitMeta) {
      return { type: JSON_TYPES.CONVERSION, unit: expr.name, value };
    }
    if (expr.to instanceof NumberSystem) {
      return { type: JSON_TYPES.CONVERSION, ns: expr.name, value };
    }
    return { type: JSON_TYPES.CONVERSION, converter: expr.name, value };
  }

  public visitAssignExpr(expr: Expr.Assign): IJSON {
    return { type: JSON_TYPES.ASSIGN, variable: expr.name, value: this.evaluate(expr.value) };
  }

  public visitVariableExpr(expr: Expr.Variable): IJSON {
    return { type: JSON_TYPES.VARIABLE, name: expr.name };
  }

  public visitCallExpr(expr: Expr.Call): IJSON {
    const args = Array<IJSON>();
    for (const arg of expr.argument) {
      args.push(this.evaluate(arg));
    }
    return { type: JSON_TYPES.CALL, name: expr.name, args };
  }

  public visitLogicalExpr(expr: Expr.Logical): IJSON {
    const right = this.evaluate(expr.left);
    const left = this.evaluate(expr.left);
    const operator = expr.operator;
    return { type: JSON_TYPES.LOGICAL, right, left, operator };
  }

  public visitTernaryExpr(expr: Expr.Ternary): IJSON {
    const texpr = this.evaluate(expr.texpr);
    const fexpr = this.evaluate(expr.fexpr);
    const main = this.evaluate(expr.main);
    return { type: JSON_TYPES.TERNARY, main, texpr, fexpr };
  }

  private evaluate(expr: Expr): IJSON {
    const ast = expr.accept(this);
    return { start: expr.start, end: expr.end, ...ast };
  }
}

export { ToJSON, JSON_TYPES, IJSON };
