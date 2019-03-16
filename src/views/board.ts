import readline from "readline";
const { stdin, stdout } = process;

class Board {
  constructor(recorder, store) {
    this.recorder = recorder;
    this.store = store;
    this.store.subscribe(this.render);
  }

  clear() {
    console.clear();
  }

  render = () => {
    const { game } = this.store.getState()
    const { current, grid, freeCell } = game;
    
    if (current === 'inGame') {
      this.clear();
      console.table(grid)
      console.log(freeCell)

      this.recorder.question("move: ", answer => {
        this.store.dispatch({
          type: "PLACE_COLUMN",
          payload: {
            column: answer,
            value: 'X'
          }
        });
        // this.recorder.close();
      });

    }
  }
}

export default Board;