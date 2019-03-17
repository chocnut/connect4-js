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
var ROWS = 6;
var COLUMNS = 7;
exports.initialState = {
    current: 'menu',
    playerOne: '',
    playerTwo: '',
    turn: 1,
    grid: new Array(ROWS).fill('').map(function () {
        return new Array(COLUMNS).fill('');
    }),
    freeCells: new Array(COLUMNS).fill(ROWS)
};
function game(state, action) {
    if (state === void 0) { state = exports.initialState; }
    var _a, _b;
    switch (action.type) {
        case "UPDATE_MENU": {
            return __assign({}, state, { current: action.payload });
        }
        case "SET_PLAYER_ONE": {
            return __assign({}, state, { playerOne: action.payload.toUpperCase() });
        }
        case "SET_PLAYER_TWO": {
            return __assign({}, state, { playerTwo: action.payload.toUpperCase(), current: 'inGame' });
        }
        case "PLACE_COLUMN": {
            var _c = action.payload, column = _c.column, value = _c.value, turn = _c.turn;
            var firstArrayIndex = state.freeCells[column] - 1;
            var secondArrayIndex = column;
            var newGrid = Object.assign(state.grid.slice(), (_a = {},
                _a[firstArrayIndex] = Object.assign(state.grid[firstArrayIndex].slice(), (_b = {},
                    _b[secondArrayIndex] = value,
                    _b)),
                _a));
            return __assign({}, state, { grid: newGrid, freeCells: state.freeCells.concat([state.freeCells[column]--]), turn: state.turn === 1 ? 2 : 1 });
        }
        default: {
            return state;
        }
    }
}
exports.game = game;
