"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gamePlay_1 = __importDefault(require("../views/gamePlay"));
test("Game Play", function () {
    var game = new gamePlay_1.default();
    expect(game).not.toBe(null);
});
