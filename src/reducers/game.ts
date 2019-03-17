const ROWS = 6
const COLUMNS = 7

export const initialState = {
  current: 'menu',
  playerOne: '',
  playerTwo: '',
  turn: 1,
  grid: new Array(ROWS).fill('').map(() => {
    return new Array(COLUMNS).fill('');
  }),
  freeCells: new Array(COLUMNS).fill(ROWS)
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
      const { column, value, turn } = action.payload

      const firstArrayIndex = state.freeCells[column] - 1;
      const secondArrayIndex = column;
      const newGrid = Object.assign([...state.grid], {
        [firstArrayIndex]: Object.assign([...state.grid[firstArrayIndex]], {
          [secondArrayIndex]: value
        })
      })
      return {
        ...state,
        grid: newGrid,
        freeCells: [...state.freeCells, state.freeCells[column]--],
        turn: state.turn === 1 ? 2 : 1
      }
    }
    default: {
      return state;
    }
  }
}