import GamePlay from "../views/gamePlay";

test("Game Play", () => {
  const game = new GamePlay();
  expect(game).not.toBe(null);
});
