import Menu from "./Menu";
import { store } from "../util/setup";

class GamePlay {
  constructor() {
    this.store = store
  }

  start() {
    const menu = new Menu(this.store);
    menu.render()
  }
}

export default GamePlay;
