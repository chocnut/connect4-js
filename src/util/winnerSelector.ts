interface Payload {
  grid: Array<number>
}
class WinnerSelector {
  private state: object;
  private grid: any;
  private cellValue: string;
  private ROW: number;
  private COLUMN: number;

  constructor(state: object, payload: Payload) {
    this.state = state;
    this.grid = payload.grid;
    this.cellValue = "";
    this.ROW = 6;
    this.COLUMN = 7;
  }

  horizontalCheck() {
    for (let i: number = 0; i < this.ROW; i++) {
      for (let j: number = 0; j < this.COLUMN - 3; j++) {
        this.cellValue = this.grid[i][j];
        if (
          this.cellValue !== "" &&
          this.grid[i][j + 1] === this.cellValue &&
          this.grid[i][j + 2] === this.cellValue &&
          this.grid[i][j + 3] === this.cellValue
        ) {
          return true;
        }
      }
    }
    return false;
  }

  verticalCheck() {
    for (let j: number = 0; j < this.COLUMN; j++) {
      for (let i: number = 0; i < this.ROW - 3; i++) {
        this.cellValue = this.grid[i][j];
        if (
          this.cellValue !== "" &&
          this.grid[i + 1][j] === this.cellValue &&
          this.grid[i + 2][j] === this.cellValue &&
          this.grid[i + 3][j] === this.cellValue
        ) {
          return true;
        }
      }
    }
    return false;
  }

  ascendingDiagonalCheck() {
    for (let i: number = 3; i < this.ROW; i++) {
      for (let j: number = 0; j < this.COLUMN - 3; j++) {
        this.cellValue = this.grid[i][j];
        if (
          this.cellValue !== "" &&
          this.grid[i - 1][j + 1] === this.cellValue &&
          this.grid[i - 2][j + 2] === this.cellValue &&
          this.grid[i - 3][j + 3] === this.cellValue
        ) {
          return true;
        }
      }
    }
    return false;
  }

  descendingDiagonalCheck() {
    for (let i: number = 3; i < this.ROW; i++) {
      for (let j: number = 3; j < this.COLUMN; j++) {
        this.cellValue = this.grid[i][j];
        if (
          this.cellValue !== this.cellValue &&
          this.grid[i - 1][j - 1] === this.cellValue &&
          this.grid[i - 2][j - 2] === this.cellValue &&
          this.grid[i - 3][j - 3] === this.cellValue
        ) {
          return true;
        }
      }
    }
    return false;
  }

  getState() {
    if (
      this.horizontalCheck() ||
      this.verticalCheck() ||
      this.ascendingDiagonalCheck() ||
      this.descendingDiagonalCheck()
    ) {
      return {
        ...this.state,
        player: this.cellValue,
        draw: false
      };
    }

    return this.state;
  }
}

export default WinnerSelector;
