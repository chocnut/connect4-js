export const initialState = {
  current: 'menu',
  playerOne: '',
  playerTwo: '',
};

export function game(
  state = initialState,
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "UPDATE_MENU": {
      return {
        ...state,
        current: action.payload
      };
    }
    case "SET_PLAYER_ONE": {
      return {
        ...state,
        playerOne: action.payload.toUpperCase()
      };
    }
    case "SET_PLAYER_ONE": {
      return {
        ...state,
        playerTwo: action.payload.toUpperCase()
      };
    }
    default: {
      return state;
    }
  }
}