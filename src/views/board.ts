import readline from "readline";
import { updateMenu, checkWinner, placeColumn } from "../actions";

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

  isAi() {
    const { game, } = this.store.getState();
    const { playerOne, playerTwo } = game;

    return playerOne === playerTwo;
  }

  checkWinner = grid => {
    clearTimeout(this.watcher);
    this.watcher = setTimeout(() => {
      this.dispatch(checkWinner({ grid }));
    }, 500);
  };

  playerMove = (column, player) => {
    this.dispatch(
      placeColumn({
        column,
        value: player
      })
    );
  };

  prompt = () => {
    this.recorder.question("Valid moves are 0, 1, 2, 3, 4, 5, 6\nSelect your next move: ", answer => {
      this.playerMove(answer, "H");
      this.makeAiMove();
    });
  };

  makeAiMove() {
    const { game } = this.store.getState();
    const { turn } = game;

    const cols = [0, 1, 2, 3, 4, 5, 6];
    const computerColumn = cols[Math.floor(Math.random() * cols.length)];

    if (this.isAi()) {
      this.playerMove(computerColumn, `C${turn}`);
    } else {
      this.playerMove(computerColumn, "C");
    }

  }

  getWinningPlayer = player => {
    const { game } = this.store.getState();
    const { playerOne, playerTwo } = game;

    return playerOne === player ? `Player 1 (${player})` : `Player 2 (${player})`;
  }

  announceWinner(winner) {
    console.log("====== GAME OVER ===========");
    console.log(`  Winner is ${this.getWinningPlayer(winner.player)}  `);
    console.log("============================");
    this.dispatch(updateMenu("gameOver"));
    this.recorder.close();
  }

  play() {
    if (this.isAi()) {
      this.makeAiMove()
    } else {
      this.prompt()
    }
  }

  displayGrid(grid) {
    console.table(grid);
  }

  render = () => {
    const { game, winner } = this.store.getState();
    const { current, grid, turn, playerOne, playerTwo } = game;

    if (current === "inGame") {
      this.clear();
      this.checkWinner(grid);

      if (!winner.draw && winner.player !== "") {
        this.announceWinner(winner)
      } else {
        this.displayGrid(grid);
        this.play();
      }
    }
  };
}

export default Board;
