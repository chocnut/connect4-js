"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = __importDefault(require("readline"));
var setup_1 = require("../util/setup");
var actions_1 = require("../actions");
var board_1 = __importDefault(require("../views/board"));
var stdout = process.stdout, stdin = process.stdin;
var recorder = readline_1.default.createInterface({
    input: stdin,
    output: stdout
});
test('Test human vs computer. Player 1 win', function () {
    var board = new board_1.default(recorder, setup_1.store);
    board.render();
    setup_1.store.dispatch(actions_1.placeColumn({ column: 0, value: 'H' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 1, value: 'C' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 0, value: 'H' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 1, value: 'C' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 0, value: 'H' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 2, value: 'C' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 0, value: 'H' }));
    setup_1.store.dispatch(actions_1.placeColumn({ column: 5, value: 'C' }));
    var game = setup_1.store.getState().game;
    expect(game.grid).not.toBe(null);
    expect(game.grid[5][0]).toEqual('H');
    setup_1.store.dispatch(actions_1.checkWinner({ grid: game.grid }));
    var winner = setup_1.store.getState().winner;
    expect(winner.player).toEqual('H');
});
