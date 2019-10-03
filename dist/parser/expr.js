"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Expr {
    constructor(depth, start, end) {
        this.depth = depth;
        this.start = start;
        this.end = end;
    }
}
exports.Expr = Expr;
// tslint:disable-next-line: no-namespace
(function (Expr) {
    class Binary extends Expr {
        constructor(depth, left, operator, right, start, end) {
            super(depth, start, end);
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitBinaryExpr(this);
        }
        increaseDepth() {
            this.depth += 1;
            this.left.increaseDepth();
            this.right.increaseDepth();
        }
        toString() {
            return `+${'-'.repeat(this.depth)}(${this.depth})EXPR BINARY  ${this.operator} \n|\n${this.left}${this.right}`;
        }
    }
    Expr.Binary = Binary;
    class Grouping extends Expr {
        constructor(depth, expression, start, end) {
            super(depth, start, end);
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitGroupingExpr(this);
        }
        increaseDepth() {
            this.depth += 1;
            this.expression.increaseDepth();
        }
        toString() {
            return `+${'-'.repeat(this.depth)}(${this.depth})EXPR Grouping \n|\n${this.expression}`;
        }
    }
    Expr.Grouping = Grouping;
    class Literal extends Expr {
        constructor(depth, value, start, end) {
            super(depth, start, end);
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitLiteralExpr(this);
        }
        increaseDepth() {
            this.depth += 1;
        }
        toString() {
            return `+${'-'.repeat(this.depth)}(${this.depth})EXPR LITERAL ${this.value.format()}\n|\n`;
        }
    }
    Expr.Literal = Literal;
    class Percentage extends Expr {
        constructor(depth, expression, start, end) {
            super(depth, start, end);
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitPercentageExpr(this);
        }
        increaseDepth() {
            this.depth += 1;
            this.expression.increaseDepth();
        }
        toString() {
            return `+${'-'.repeat(this.depth)}(${this.depth})EXPR PERCENTAGE \n|\n${this.expression}`;
        }
    }
    Expr.Percentage = Percentage;
    class Unary extends Expr {
        constructor(depth, operator, right, start, end) {
            super(depth, start, end);
            this.operator = operator;
            this.right = right;
        }
        increaseDepth() {
            this.depth += 1;
            this.right.increaseDepth();
        }
        accept(visitor) {
            return visitor.visitUnaryExpr(this);
        }
        toString() {
            return `+${'-'.repeat(this.depth)}(${this.depth})EXPR UNARY ${this.operator} \n|\n${this.right}`;
        }
    }
    Expr.Unary = Unary;
})(Expr = exports.Expr || (exports.Expr = {}));
//# sourceMappingURL=expr.js.map