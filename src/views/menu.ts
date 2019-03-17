class Menu {
  private recorder: any;
  private store: any;

  constructor(recorder: any, store: any) {
    this.recorder = recorder;
    this.store = store;
    this.store.subscribe(this.render);
  }

  welcomeMessage = () => {
    const { game } = this.store.getState();

    if (game.current === "menu") {
      console.log("========================");
      console.log("Welcome to Connect Four!");
      console.log("========================");
      console.log("Player Strategies: \n");
      console.log("H for Human");
      console.log("C for Computer");

      this.store.dispatch({
        type: "UPDATE_MENU",
        payload: "prompt"
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
    this.recorder.question("Select Player 1: ", (answer: string) => {
      this.store.dispatch({
        type: "SET_PLAYER_ONE",
        payload: answer
      });
    });
  }

  computerQuestion = () => {
    const { game } = this.store.getState();

    if (game.playerOne.length > 0 && game.playerTwo.length === 0) {
      this.recorder.question("Select Player 2: ", (answer:string) => {
        this.store.dispatch({
          type: "SET_PLAYER_TWO",
          payload: answer
        });
      });
    }
  };

  render = () => {
    this.welcomeMessage();
    this.prompt();
  };
}

export default Menu;
