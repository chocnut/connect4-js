"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actions_1 = require("../actions");
var stdin = process.stdin, stdout = process.stdout;
var Board = /** @class */ (function () {
    function Board(recorder, store) {
        var _this = this;
        this.checkWinner = function (grid) {
            clearTimeout(_this.watcher);
            _this.watcher = setTimeout(function () {
                _this.dispatch(actions_1.checkWinner({ grid: grid }));
            }, 500);
        };
        this.playerMove = function (column, player) {
            _this.dispatch(actions_1.placeColumn({
                column: column,
                value: player
            }));
        };
        this.prompt = function () {
            _this.recorder.question("Valid moves are 0, 1, 2, 3, 4, 5, 6\nSelect your next move: ", function (answer) {
                if (_this.isValidMove(parseInt(answer))) {
                    _this.playerMove(parseInt(answer), "H");
                    _this.makeAiMove();
                }
                else {
                    console.log('Invalid column. Please select again.');
                }
            });
        };
        this.getWinningPlayer = function (player) {
            var game = _this.store.getState().game;
            var playerOne = game.playerOne, playerTwo = game.playerTwo;
            return playerOne === player ? "Player 1 (" + player + ")" : "Player 2 (" + player + ")";
        };
        this.render = function () {
            var _a = _this.store.getState(), game = _a.game, winner = _a.winner;
            var current = game.current, grid = game.grid;
            if (current === "inGame") {
                _this.clear();
                _this.checkWinner(grid);
                if (!winner.draw && winner.player !== "") {
                    _this.announceWinner(winner);
                }
                else {
                    _this.displayGrid(grid);
                    _this.play();
                }
            }
        };
        this.recorder = recorder;
        this.store = store;
        this.store.subscribe(this.render);
        this.dispatch = store.dispatch;
        this.watcher = null;
        this.columns = [0, 1, 2, 3, 4, 5, 6];
    }
    Board.prototype.clear = function () {
        console.clear();
    };
    Board.prototype.isAi = function () {
        var game = this.store.getState().game;
        var playerOne = game.playerOne, playerTwo = game.playerTwo;
        return playerOne === playerTwo;
    };
    Board.prototype.isValidMove = function (index) {
        return this.columns[index] !== undefined;
    };
    Board.prototype.makeAiMove = function () {
        var game = this.store.getState().game;
        var turn = game.turn;
        var computerColumn = this.columns[Math.floor(Math.random() * this.columns.length)];
        if (this.isAi()) {
            this.playerMove(computerColumn, "C" + turn);
        }
        else {
            this.playerMove(computerColumn, "C");
        }
    };
    Board.prototype.announceWinner = function (winner) {
        console.log("====== GAME OVER ===========");
        console.log("  Winner is " + this.getWinningPlayer(winner.player) + "  ");
        console.log("============================");
        this.dispatch(actions_1.updateMenu("gameOver"));
        this.recorder.close();
    };
    Board.prototype.play = function () {
        if (this.isAi()) {
            this.makeAiMove();
        }
        else {
            this.prompt();
        }
    };
    Board.prototype.displayGrid = function (grid) {
        console.table(grid);
        console.table("\n");
    };
    return Board;
}());
exports.default = Board;
