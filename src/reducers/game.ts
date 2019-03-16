export const initialState = {
  current: 'menu',
  playerOne: '',
  playerTwo: '',
  grid: new Array(6).fill('()').map(() => {
    return new Array(7).fill('()');
  }),
  freeCell: new Array(7).fill(6)
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
    case "SET_PLAYER_TWO": {
      return {
        ...state,
        playerTwo: action.payload.toUpperCase(),
        current: 'inGame'
      };
    }
    case "PLACE_COLUMN": {
      const { column, value} = action.payload

      const firstArrayIndex = state.freeCell[column] - 1;
      const secondArrayIndex = column;
      const newGrid = Object.assign([...state.grid], {
        [firstArrayIndex]: Object.assign([...state.grid[i]], {
          [secondArrayIndex]: '(' + value + ')'
        })
      })
      return {
        ...state,
        grid: newGrid,
        freeCell: [...state.freeCell, state.freeCell[column]--]
      }
    }
    default: {
      return state;
    }
  }
}