import { GameOfLife } from "./editme";

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
  [false, true, false, false, false],
  [false, false, true, true, false],
  [false, true, true, false, false],
  [false, false, false, false, false],
];
let game = new GameOfLife(initialBoard[0].length, initialBoard.length);
game.setBoard(initialBoard);
console.log("Initial state:");
game.printBoard();
console.log("Next generation:");
game.nextGeneration();
game.printBoard();
if (JSON.stringify(game.getBoard()) !== JSON.stringify(expectedBoard)) {
  throw new Error("Game of life implementation is incorrect");
}
