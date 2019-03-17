import readline from "readline";
import { updateMenu, checkWinner, placeColumn } from "../actions";

const { stdin, stdout } = process;
class Board {
  private recorder: any;
  private store: any;
  private dispatch: ({}) => void;
  private watcher: any;
  private columns: Array<number>;

  constructor(recorder: any, store: any) {
    this.recorder = recorder;
    this.store = store;
    this.store.subscribe(this.render);
    this.dispatch = store.dispatch;
    this.watcher = null;
    this.columns = [0, 1, 2, 3, 4, 5, 6];
  }

  clear() {
    console.clear();
  }

  isAi() {
    const { game, } = this.store.getState();
    const { playerOne, playerTwo } = game;

    return playerOne === playerTwo;
  }

  checkWinner = (grid: Array<number>) => {
    clearTimeout(this.watcher);
    this.watcher = setTimeout(() => {
      this.dispatch(checkWinner({ grid }));
    }, 500);
    this.displayGrid(grid);
  };

  playerMove = (column: string, player: string) => {
    this.dispatch(
      placeColumn({
        column,
        value: player
      })
    );
  };

  isValidMove(index: number) {
    return this.columns[index] !== undefined;
  }

  prompt = () => {
    this.recorder.question("Valid moves are 0, 1, 2, 3, 4, 5, 6\nSelect your next move: ", (answer: string) => {

      if (this.isValidMove(parseInt(answer))) {
        this.playerMove(answer, "H");
        this.makeAiMove();
      } else {
        console.log('Invalid column. Please select again.')
      }
    });
  };

  makeAiMove() {
    const { game } = this.store.getState();
    const { turn } = game;

    const computerColumn = this.columns[Math.floor(Math.random() * this.columns.length)];

    if (this.isAi()) {
      this.playerMove(computerColumn.toString(), `C${turn}`);
    } else {
      this.playerMove(computerColumn.toString(), "C");
    }

  }

  getWinningPlayer = (player: string) => {
    const { game } = this.store.getState();
    const { playerOne, playerTwo } = game;

    return playerOne === player ? `Player 1 (${player})` : `Player 2 (${player})`;
  }

  announceWinner(winner: any) {
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

  displayGrid(grid: Array<number>) {
    console.table(grid);
    console.table("\n");
  }

  render = () => {
    const { game, winner } = this.store.getState();
    const { current, grid } = game;

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
