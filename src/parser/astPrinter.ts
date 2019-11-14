import { UnitMeta } from '../types/units';
import { Expr } from './expr';

class ASTPrinter implements Expr.IVisitor<string> {
  private static tab: number = 2;
  private static prefixchar = '+';

  private static createPrefix(depth: number, type: string): string {
    return `${this.prefixchar}${'-'.repeat(depth * this.tab)} (${depth / this.tab})${type}`;
  }

  private depth: number;

  constructor() {
    this.depth = 0;
  }

  public visitCallExpr(expr: Expr.Call): string {
    let str = `${ASTPrinter.createPrefix(this.depth, 'FUNCTION')} ==> ${expr.name} `;
    this.depth += ASTPrinter.tab;
    for (const arg of expr.argument) {
      str = `${str} \n|\n${this.evaluate(arg)}`;
    }
    this.depth -= ASTPrinter.tab;
    return str;
  }

  public visitAssignExpr(expr: Expr.Assign): string {
    this.depth += ASTPrinter.tab;
    const value = this.evaluate(expr.value);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'ASSIGN')} ${expr.name} \n|\n${value}`;
  }

  public visitVariableExpr(expr: Expr.Variable): string {
    return `${ASTPrinter.createPrefix(this.depth, 'VARIABLE')} ${expr.name}\n|\n`;
  }

  public visitUnitExpr(expr: Expr.UnitExpr): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'UNIT')} ${expr.unit.unitType} \n|\n${expression}`;
  }

  public visitUnitConvertionExpr(expr: Expr.UnitorNSConvertionExpr): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    if (expr.unit instanceof UnitMeta) {
      return `${ASTPrinter.createPrefix(this.depth, 'UNIT CONVERT')} ${expr.unit.unitType} \n|\n${expression}`;
    }
    return `${ASTPrinter.createPrefix(this.depth, 'UNIT CONVERT')} ${expr.unit.name} \n|\n${expression}`;
  }

  public visitBinaryExpr(expr: Expr.Binary): string {
    this.depth += ASTPrinter.tab;
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'BINARY')}  ${expr.operator} \n|\n${left}${right}`;
  }

  public visitGroupingExpr(expr: Expr.Grouping): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'Grouping')} \n|\n${expression}`;
  }

  public visitLiteralExpr(expr: Expr.Literal): string {
    return `${ASTPrinter.createPrefix(this.depth, 'LITERAL')} ${expr.value.print()}\n|\n`;
  }

  public visitUnaryExpr(expr: Expr.Unary): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.right);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'UNARY')} ${expr.operator} \n|\n${expression}`;
  }

  public visitPercentageExpr(expr: Expr.Percentage): string {
    this.depth += ASTPrinter.tab;
    const expression = this.evaluate(expr.expression);
    this.depth -= ASTPrinter.tab;
    return `${ASTPrinter.createPrefix(this.depth, 'PERCENTAGE')} \n|\n${expression}`;
  }

  public print(expr: Expr): string {
    return this.evaluate(expr);
  }

  private evaluate(expr: Expr): string {
    const ast = expr.accept(this);
    return ast;
  }
}

export { ASTPrinter };
