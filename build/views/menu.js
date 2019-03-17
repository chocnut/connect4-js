"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Menu = /** @class */ (function () {
    function Menu(recorder, store) {
        var _this = this;
        this.welcomeMessage = function () {
            var game = _this.store.getState().game;
            if (game.current === "menu") {
                console.log("========================");
                console.log("Welcome to Connect Four!");
                console.log("========================");
                console.log("Select player strategies: \n");
                console.log("H for Human");
                console.log("C for Computer");
                _this.store.dispatch({
                    type: "UPDATE_MENU",
                    payload: "prompt"
                });
            }
        };
        this.prompt = function () {
            var game = _this.store.getState().game;
            if (game.playerOne.length === 0 && game.playerTwo.length === 0) {
                _this.humanQuestion();
            }
            else if (game.playerOne.length > 0 && game.playerTwo.length === 0) {
                _this.computerQuestion();
            }
        };
        this.humanQuestion = function () {
            _this.recorder.question("Select Player 1: ", function (answer) {
                _this.store.dispatch({
                    type: "SET_PLAYER_ONE",
                    payload: answer
                });
            });
        };
        this.computerQuestion = function () {
            var game = _this.store.getState().game;
            if (game.playerOne.length > 0 && game.playerTwo.length === 0) {
                _this.recorder.question("Select Player 2: ", function (answer) {
                    _this.store.dispatch({
                        type: "SET_PLAYER_TWO",
                        payload: answer
                    });
                });
            }
        };
        this.render = function () {
            _this.welcomeMessage();
            _this.prompt();
        };
        this.recorder = recorder;
        this.store = store;
        this.store.subscribe(this.render);
    }
    return Menu;
}());
exports.default = Menu;
