// Game of life implementation

class GameOfLife {
  private board: boolean[][];
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.board = new Array(height)
      .fill(null)
      .map(() => new Array(width).fill(false));
  }

  public getBoard(): boolean[][] {
    return this.board;
  }

  public setBoard(board: boolean[][]): void {
    if (board.length === this.height && board[0].length === this.width) {
      this.board = board;
    } else {
      throw new Error("Board dimensions do not match");
    }
  }

  public nextGeneration(): void {
    const newBoard = new Array(this.height)
      .fill(null)
      .map(() => new Array(this.width).fill(false));

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);

        if (this.board[y][x]) {
          newBoard[y][x] = neighbors === 2 || neighbors === 3;
        } else {
          newBoard[y][x] = neighbors === 3;
        }
      }
    }

    this.board = newBoard;
  }

  public printBoard(): void {
    for (let row of this.board) {
      console.log(row.map((cell) => (cell ? "X" : ".")).join(""));
    }
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) {
          continue;
        }

        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= this.width || ny < 0 || ny >= this.height) {
          continue;
        }

        if (this.board[ny][nx]) {
          count++;
        }
      }
    }

    return count;
  }
}

export function exampleRun() {
  let initialBoard = [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, true, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
  ];
  let game = new GameOfLife(initialBoard[0].length, initialBoard.length);
  game.setBoard(initialBoard);
  console.log("Initial state:");
  game.printBoard();
  console.log("Next generation:");
  game.nextGeneration();
  game.printBoard();
}
