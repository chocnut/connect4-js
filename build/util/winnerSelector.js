"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var WinnerSelector = /** @class */ (function () {
    function WinnerSelector(state, payload) {
        this.state = state;
        this.grid = payload.grid;
        this.cellValue = "";
        this.ROW = 6;
        this.COLUMN = 7;
    }
    WinnerSelector.prototype.horizontalCheck = function () {
        for (var i = 0; i < this.ROW; i++) {
            for (var j = 0; j < this.COLUMN - 3; j++) {
                this.cellValue = this.grid[i][j];
                if (this.cellValue !== "" &&
                    this.grid[i][j + 1] === this.cellValue &&
                    this.grid[i][j + 2] === this.cellValue &&
                    this.grid[i][j + 3] === this.cellValue) {
                    return true;
                }
            }
        }
        return false;
    };
    WinnerSelector.prototype.verticalCheck = function () {
        for (var j = 0; j < this.COLUMN; j++) {
            for (var i = 0; i < this.ROW - 3; i++) {
                this.cellValue = this.grid[i][j];
                if (this.cellValue !== "" &&
                    this.grid[i + 1][j] === this.cellValue &&
                    this.grid[i + 2][j] === this.cellValue &&
                    this.grid[i + 3][j] === this.cellValue) {
                    return true;
                }
            }
        }
        return false;
    };
    WinnerSelector.prototype.ascendingDiagonalCheck = function () {
        for (var i = 3; i < this.ROW; i++) {
            for (var j = 0; j < this.COLUMN - 3; j++) {
                this.cellValue = this.grid[i][j];
                if (this.cellValue !== "" &&
                    this.grid[i - 1][j + 1] === this.cellValue &&
                    this.grid[i - 2][j + 2] === this.cellValue &&
                    this.grid[i - 3][j + 3] === this.cellValue) {
                    return true;
                }
            }
        }
        return false;
    };
    WinnerSelector.prototype.descendingDiagonalCheck = function () {
        for (var i = 3; i < this.ROW; i++) {
            for (var j = 3; j < this.COLUMN; j++) {
                this.cellValue = this.grid[i][j];
                if (this.cellValue !== this.cellValue &&
                    this.grid[i - 1][j - 1] === this.cellValue &&
                    this.grid[i - 2][j - 2] === this.cellValue &&
                    this.grid[i - 3][j - 3] === this.cellValue) {
                    return true;
                }
            }
        }
        return false;
    };
    WinnerSelector.prototype.getState = function () {
        if (this.horizontalCheck() ||
            this.verticalCheck() ||
            this.ascendingDiagonalCheck() ||
            this.descendingDiagonalCheck()) {
            return __assign({}, this.state, { player: this.cellValue, draw: false });
        }
        return this.state;
    };
    return WinnerSelector;
}());
exports.default = WinnerSelector;
