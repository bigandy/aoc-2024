import { testInput } from "./test";
import { actualInput } from "./real";

// testCode
const rows = testInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// Actual Input
// const rows = actualInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// const rows = actualInput.split("\n").filter((l) => l !== "");

const firstAnswer = () => {
  let count = 0;
  rows.forEach((row) => {
    // const numberArray = row.split(" ").map((n) => Number(n));
    // const ans = compareNumbersInArray(numberArray);
    // const passes = checkIfPasses(ans);
    // if (passes) {
    //   count++;
    // }
  });

  console.log("part-1 answer:", count);
};

firstAnswer();

// const secondAnswer = () => {
//   let count = 0;
//   rows.forEach((row) => {

//   });

//   console.log("part-2 answer:", count);
// };

// secondAnswer();
