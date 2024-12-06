// import { input } from "./test";
import { input } from "./real";

// testCode
const rows = input.split("\n").filter(Boolean);
console.log({ rows });

const mapObject = (arr: any[]) =>
  Object.fromEntries(arr.map((el, index) => [index, el.split("")]));

const mapArray = (arr: any[]) => arr.map((el) => el.split(""));

const deepCloneArray = (inputArray: string[][]) =>
  JSON.parse(JSON.stringify(inputArray));

// .slice(0, 1);
// Actual Input
// const rows = actualInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// const rows = actualInput.split("\n").filter((l) => l !== "");

const firstAnswer = () => {
  const cycleGrid = (grid: string[][]) => {
    const rowCount = grid.length;
    const rowLength = grid[0].length;
    // go through each row, by row
    for (let row = 0; row < rowCount; row++) {
      for (let column = 0; column < rowLength; column++) {
        // console.log(row, column);
        const currentCursor = grid[row][column];

        // console.log({ currentCursor });
        if (currentCursor === "^") {
          const newGrid = deepCloneArray(grid);
          if (row === 0) {
            newGrid[row][column] = "X";
            return newGrid;
          }
          const nextPosition = grid[row - 1][column];
          console.log("check the one upwards", nextPosition);
          if ([".", "X"].includes(nextPosition)) {
            // replace current icon with an X. Move cursor to next position.
            newGrid[row][column] = "X";
            newGrid[row - 1][column] = "^";
            // console.log(newGrid[row - 1][column]);
          } else if (nextPosition === "#") {
            newGrid[row][column] = ">";
          }
          return cycleGrid(newGrid);
        } else if (currentCursor === ">") {
          const newGrid = deepCloneArray(grid);
          if (column === rowLength) {
            newGrid[row][column] = "X";
            return newGrid;
          }
          const nextPosition = grid[row][column + 1];

          console.log("check the one right", nextPosition);

          if ([".", "X"].includes(nextPosition)) {
            // replace current icon with an X. Move cursor to next position.
            newGrid[row][column] = "X";
            newGrid[row][column + 1] = ">";
            // console.log(newGrid[row - 1][column]);
          } else if (nextPosition === "#") {
            console.log("next one right is a #");
            newGrid[row][column] = "v";
          }
          return cycleGrid(newGrid);
        } else if (currentCursor === "v") {
          const newGrid = deepCloneArray(grid);
          if (row === rowCount - 1) {
            newGrid[row][column] = "X";
            return newGrid;
          }
          const nextPosition = grid[row + 1][column];
          console.log("check the one down", nextPosition);

          if ([".", "X"].includes(nextPosition)) {
            // replace current icon with an X. Move cursor to next position.
            newGrid[row][column] = "X";
            newGrid[row + 1][column] = "v";
            // console.log(newGrid[row - 1][column]);
          } else if (nextPosition === "#") {
            newGrid[row][column] = "<";
          }
          return cycleGrid(newGrid);
        } else if (currentCursor === "<") {
          if (column === 0) {
            return grid;
          }
          const nextPosition = grid[row][column - 1];
          const newGrid = deepCloneArray(grid);
          console.log("check the one left", nextPosition);

          if ([".", "X"].includes(nextPosition)) {
            // replace current icon with an X. Move cursor to next position.
            newGrid[row][column] = "X";
            newGrid[row][column - 1] = "<";
            // console.log(newGrid[row - 1][column]);
          } else if (nextPosition === "#") {
            newGrid[row][column] = "^";
          }
          return cycleGrid(newGrid);
        }
      }
    }
  };

  const grid = mapArray(rows);

  const output = cycleGrid(grid);

  const solution = output
    .flat()
    .reduce((accumulator: number, currentValue: string) => {
      const additionalNumber = currentValue === "X" ? 1 : 0;
      return accumulator + additionalNumber;
    }, 0);

  //   console.log({
  //     output: output.flat().join(""),
  //     expected: `
  // ....#.....
  // ....XXXXX#
  // ....X...X.
  // ..#.X...X.
  // ..XXXXX#X.
  // ..X.X.X.X.
  // .#XXXXXXX.
  // .XXXXXXX#.
  // #XXXXXXX..
  // ......#X..
  // `
  //       .split("\n")
  //       .filter(Boolean)
  //       .join(""),
  //     solution,
  //   });

  // 4751 is too low!
  console.log("part-1 answer:", solution);
};

firstAnswer();

// const secondAnswer = () => {
//   let count = 0;
//   rows.forEach((row) => {

//   });

//   console.log("part-2 answer:", count);
// };

// secondAnswer();
