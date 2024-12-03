// import { testInput } from "./test.ts";
import { actualInput } from "./real.ts";

// testCode
// const rows = testInput.split("\n").filter((l) => l !== "");
const rows = actualInput.split("\n").filter((l) => l !== "");

const firstArray: number[] = [];
const secondArray: number[] = [];
rows.forEach((line) => {
  const [first, second] = line.split("   ");
  firstArray.push(+first);
  secondArray.push(+second);
});
// sort arrays by order
const sortedFirst = firstArray.sort();
const sortedSecond = secondArray.sort();

// Go through arrays at the same time, smallest to biggest (sort did this), work out diff for each pairing, add to total.

// Use Reduce for this
const firstAnswer = sortedFirst.reduce(
  (accumulator, currentValue, currentIndex) => {
    const diff = +currentValue - sortedSecond[currentIndex];
    return accumulator + Math.abs(diff);
  },
  0
);

console.log("PART ONE ANSWER:", firstAnswer);

const secondAnswer = sortedFirst.reduce((accumulator, currentValue) => {
  let count = 0;
  // count the number of times the currentValue is in the secondArray.
  sortedSecond.forEach((n) => {
    if (n === currentValue) {
      count++;
    }
  });

  return accumulator + count * currentValue;
}, 0);

console.log({ secondAnswer });
