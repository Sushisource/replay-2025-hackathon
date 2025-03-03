import { GameOfLife } from "./editme";

function printBoard(board: boolean[][]): void {
  for (let row of board) {
    console.log(row.map((cell) => (cell ? "X" : ".")).join(""));
  }
}

// A glider
let initialBoard = [
  [false, false, false, false, false],
  [false, false, false, true, false],
  [false, true, false, true, false],
  [false, false, true, true, false],
  [false, false, false, false, false],
];
let expectedBoard = [
  [false, false, false, false, false],
  [false, false, true, false, false],
  [false, false, false, true, true],
  [false, false, true, true, false],
  [false, false, false, false, false],
];
let game = new GameOfLife(initialBoard[0].length, initialBoard.length);
game.setBoard(initialBoard);
console.log("Initial state:");
printBoard(game.getBoard());
console.log("Next generation:");
game.nextGeneration();
printBoard(game.getBoard());
if (JSON.stringify(game.getBoard()) !== JSON.stringify(expectedBoard)) {
  console.log("Current board does not match expected!!");
  console.log("Expected:");
  printBoard(expectedBoard);
  throw new Error("Game of life implementation is incorrect");
}
