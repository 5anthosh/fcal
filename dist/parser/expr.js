"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var astPrinter_1 = require("./astPrinter");
var Expr = /** @class */ (function (_super) {
    __extends(Expr, _super);
    function Expr(start, end) {
        var _this = _super.call(this) || this;
        _this.start = start;
        _this.end = end;
        return _this;
    }
    Expr.prototype.toString = function () {
        return this.print(this);
    };
    return Expr;
}(astPrinter_1.ASTPrinter));
exports.Expr = Expr;
// tslint:disable-next-line: no-namespace
(function (Expr) {
    var Binary = /** @class */ (function (_super) {
        __extends(Binary, _super);
        function Binary(left, operator, right, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.left = left;
            _this.operator = operator;
            _this.right = right;
            return _this;
        }
        Binary.prototype.accept = function (visitor) {
            return visitor.visitBinaryExpr(this);
        };
        return Binary;
    }(Expr));
    Expr.Binary = Binary;
    var Grouping = /** @class */ (function (_super) {
        __extends(Grouping, _super);
        function Grouping(expression, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.expression = expression;
            return _this;
        }
        Grouping.prototype.accept = function (visitor) {
            return visitor.visitGroupingExpr(this);
        };
        return Grouping;
    }(Expr));
    Expr.Grouping = Grouping;
    var Literal = /** @class */ (function (_super) {
        __extends(Literal, _super);
        function Literal(value, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.value = value;
            return _this;
        }
        Literal.prototype.accept = function (visitor) {
            return visitor.visitLiteralExpr(this);
        };
        return Literal;
    }(Expr));
    Expr.Literal = Literal;
    var Percentage = /** @class */ (function (_super) {
        __extends(Percentage, _super);
        function Percentage(expression, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.expression = expression;
            return _this;
        }
        Percentage.prototype.accept = function (visitor) {
            return visitor.visitPercentageExpr(this);
        };
        return Percentage;
    }(Expr));
    Expr.Percentage = Percentage;
    var Unary = /** @class */ (function (_super) {
        __extends(Unary, _super);
        function Unary(operator, right, start, end) {
            var _this = _super.call(this, start, end) || this;
            _this.operator = operator;
            _this.right = right;
            return _this;
        }
        Unary.prototype.accept = function (visitor) {
            return visitor.visitUnaryExpr(this);
        };
        return Unary;
    }(Expr));
    Expr.Unary = Unary;
})(Expr = exports.Expr || (exports.Expr = {}));
exports.Expr = Expr;
//# sourceMappingURL=expr.js.map