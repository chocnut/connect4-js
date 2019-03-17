"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var setup_1 = require("../util/setup");
var menu_1 = __importDefault(require("./menu"));
var board_1 = __importDefault(require("./board"));
var readline_1 = __importDefault(require("readline"));
var stdout = process.stdout, stdin = process.stdin;
var GamePlay = /** @class */ (function () {
    function GamePlay() {
        this.store = setup_1.store;
        this.recorder = readline_1.default.createInterface({
            input: stdin,
            output: stdout
        });
    }
    GamePlay.prototype.start = function () {
        var menu = new menu_1.default(this.recorder, this.store);
        menu.render();
        var board = new board_1.default(this.recorder, this.store);
        board.render();
    };
    return GamePlay;
}());
exports.default = GamePlay;
