import readline from "readline";
import { store } from "../util/setup";
import { checkWinner, placeColumn } from "../actions";
import Board from '../views/board'

const { stdout, stdin } = process;
const recorder = readline.createInterface({
    input: stdin,
    output: stdout
});

test('Test human vs computer. Player 1 win', () => {
    const board = new Board(recorder, store);
    board.render();

    store.dispatch(placeColumn({ column: 0, value: 'H' }));
    store.dispatch(placeColumn({ column: 1, value: 'C' }));
    store.dispatch(placeColumn({ column: 0, value: 'H' }));
    store.dispatch(placeColumn({ column: 1, value: 'C' }));
    store.dispatch(placeColumn({ column: 0, value: 'H' }));
    store.dispatch(placeColumn({ column: 2, value: 'C' }));
    store.dispatch(placeColumn({ column: 0, value: 'H' }));
    store.dispatch(placeColumn({ column: 5, value: 'C' }));
    const { game } = store.getState();
    expect(game.grid).not.toBe(null);
    expect(game.grid[5][0]).toEqual('H');
    store.dispatch(checkWinner({grid: game.grid}));
    const { winner } = store.getState();
    expect(winner.player).toEqual('H');
})