interface GridPayload {
  grid: Array<number>;
}

interface Column {
  column: number;
  value: string;
}
export const updateMenu = (payload: string) => ({
  type: "UPDATE_MENU",
  payload
});

export const checkWinner = (payload: GridPayload) => ({
  type: "CHECK_WINNER",
  payload
});

export const placeColumn = (payload: Column) => ({
  type: "PLACE_COLUMN",
  payload
});
