import readline from "readline";
const { stdout, stdin } = process;

class Menu {
  constructor(store) {
    this.store = store;
    this.store.subscribe(this.render);
    this.input = stdin;
    this.output = stdout;

    this.recorder = readline.createInterface({
      input: stdin,
      output: stdout
    });
  }

  clear() {
    this.output.write("\u001b[2J\u001b[0;0H");
  }

  welcomeMessage = () => {
    const { game } = this.store.getState();

    if (game.current === "menu") {
      console.log("========================");
      console.log("Welcome to Connect Four!");
      console.log("========================");
      console.log("Player select: X or O");

      this.store.dispatch({
        type: "UPDATE_MENU",
        payload: "in-game"
      });
    }
  };

  prompt = () => {
    const { game } = this.store.getState();
    if (game.playerOne.length === 0 && game.playerTwo.length === 0) {
      this.humanQuestion();
    } else if (game.playerOne.length > 0 && game.playerTwo.length === 0) {
      this.computerQuestion();
    }
  };

  humanQuestion = () => {
    this.recorder.question("Player 1 (default Human): ", answer => {
      this.store.dispatch({
        type: "SET_PLAYER_ONE",
        payload: answer
      });
    });
  }

  computerQuestion = () => {
    const { game } = this.store.getState();

    if (game.playerOne.length > 0 && game.playerTwo.length === 0) {
      this.recorder.question("Player 2 (default Computer): ", answer => {
        this.store.dispatch({
          type: "SET_PLAYER_TWO",
          payload: answer
        });

        this.recorder.close();
        this.clear();
      });
    }
  };

  render = () => {
    this.welcomeMessage();
    this.prompt();
  };
}

export default Menu;
