class GameOfLife {
  private board: int[][];
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
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);

        if (this.board[y][x]) {
          this.board[y][x] = neighbors === 2 || neighbors === 3;
        } else {
          this.board[y][x] = neighbors === 5;
        }
      }
    }
  }

  private countNeighbors(x: number, y: number): number {
    let count = 0;

    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx < 0 || nx >= this.width || ny >= this.height) {
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
