import WinnerSelector from "../util/winnerSelector";

interface Payload {
  grid: Array<number>
}

const winnerSelector = (state: object, payload: Payload) => {
  const selector = new WinnerSelector(state, payload)
  let newState = selector.getState();
  return newState;
};

export const initialState = {
  draw: true,
  player: "",
};

export function winner(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "CHECK_WINNER": {
      return {
        ...state,
        ...winnerSelector(state, action.payload)
      };
    }
    default: {
      return state;
    }
  }
}
