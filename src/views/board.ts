import readline from "readline";
import { updateMenu, checkWinner, placeColumn } from '../actions';

const { stdin, stdout } = process;
class Board {
  constructor(recorder, store) {
    this.recorder = recorder;
    this.store = store;
    this.store.subscribe(this.render);
    this.dispatch = store.dispatch;
    this.watcher = null;
  }

  clear() {
    console.clear();
  }

  checkWinner = (grid) => {
    clearTimeout(this.watcher)
    this.watcher = setTimeout(() => {
      this.dispatch(checkWinner({ grid }))
    }, 500)
  }

  playerMove = (column, player) => {
    this.dispatch(placeColumn({
      column,
      value: player
    }));
  }

  render = () => {
    const { game, winner } = this.store.getState();
    const { current, grid } = game;

    if (current === "inGame") {
      this.clear();
      this.checkWinner(grid);

      if (!winner.draw && winner.player !== "") {
        console.log("Winner is " + winner.player);
        this.dispatch(updateMenu('gameOver'));
        this.recorder.close();
      } else {
        console.table(grid);
        console.log(winner)

        this.recorder.question("move: ", answer => {
          this.playerMove(answer, "H")

          const cols = [0, 1, 2, 3, 4, 5, 6];
          const computerColumn = cols[Math.floor(Math.random() * cols.length)];

          this.playerMove(computerColumn, "C")
        });
      }
    }
  };
}

export default Board;