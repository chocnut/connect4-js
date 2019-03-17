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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var winnerSelector_1 = __importDefault(require("../util/winnerSelector"));
var winnerSelector = function (state, payload) {
    var selector = new winnerSelector_1.default(state, payload);
    var newState = selector.getState();
    return newState;
};
exports.initialState = {
    draw: true,
    player: "",
};
function winner(state, action) {
    if (state === void 0) { state = exports.initialState; }
    switch (action.type) {
        case "CHECK_WINNER": {
            return __assign({}, state, winnerSelector(state, action.payload));
        }
        default: {
            return state;
        }
    }
}
exports.winner = winner;
