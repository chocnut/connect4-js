import { store } from "../util/setup";
import Menu from "./menu";
import Board from './board'
import readline from "readline";
const { stdout, stdin } = process;
class GamePlay {
  constructor() {
    this.store = store

    this.recorder = readline.createInterface({
      input: stdin,
      output: stdout
    });
  }

  start() {
    const menu = new Menu(this.recorder, this.store);
    menu.render()

    const board = new Board(this.recorder, this.store);
    board.render()
  }
}

export default GamePlay;
