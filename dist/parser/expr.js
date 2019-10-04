"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const astPrinter_1 = require("./astPrinter");
class Expr extends astPrinter_1.ASTPrinter {
    constructor(start, end) {
        super();
        this.start = start;
        this.end = end;
    }
    toString() {
        return this.print(this);
    }
}
exports.Expr = Expr;
// tslint:disable-next-line: no-namespace
(function (Expr) {
    class Binary extends Expr {
        constructor(left, operator, right, start, end) {
            super(start, end);
            this.left = left;
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitBinaryExpr(this);
        }
    }
    Expr.Binary = Binary;
    class Grouping extends Expr {
        constructor(expression, start, end) {
            super(start, end);
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitGroupingExpr(this);
        }
    }
    Expr.Grouping = Grouping;
    class Literal extends Expr {
        constructor(value, start, end) {
            super(start, end);
            this.value = value;
        }
        accept(visitor) {
            return visitor.visitLiteralExpr(this);
        }
    }
    Expr.Literal = Literal;
    class Percentage extends Expr {
        constructor(expression, start, end) {
            super(start, end);
            this.expression = expression;
        }
        accept(visitor) {
            return visitor.visitPercentageExpr(this);
        }
    }
    Expr.Percentage = Percentage;
    class Unary extends Expr {
        constructor(operator, right, start, end) {
            super(start, end);
            this.operator = operator;
            this.right = right;
        }
        accept(visitor) {
            return visitor.visitUnaryExpr(this);
        }
    }
    Expr.Unary = Unary;
})(Expr = exports.Expr || (exports.Expr = {}));
//# sourceMappingURL=expr.js.map