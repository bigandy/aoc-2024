import { testInput } from "./test.js";
import { actualInput } from "./real.js";

// testCode
// const rows = testInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
const rows = actualInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// const rows = actualInput.split("\n").filter((l) => l !== "");

const checkIfPasses = (inputArray) => {
  const allDirectionsSame = inputArray.every(
    (v) => v.direction === inputArray[0].direction
  );
  const diffInRange = inputArray.every((v) => v.diff >= 1 && v.diff <= 3);

  return diffInRange && allDirectionsSame;
};

const compareNumbersInArray = (numberArray) => {
  return numberArray
    .map((num, index) => {
      const currentNumber = num;
      const prevValue = numberArray[index - 1];
      let direction = undefined;

      if (index > 0) {
        const diff = Math.abs(prevValue - currentNumber);

        if (prevValue > currentNumber) {
          direction = "decreasing";
        } else if (currentNumber > prevValue) {
          direction = "increasing";
        } else {
          direction = "same";
        }

        return {
          direction,
          diff,
        };
      }
    })
    .filter((n) => n !== undefined);
};

const firstAnswer = () => {
  let count = 0;
  rows.forEach((row) => {
    const numberArray = row.split(" ").map((n) => Number(n));

    const ans = compareNumbersInArray(numberArray);

    const passes = checkIfPasses(ans);

    if (passes) {
      count++;
    }
  });

  console.log("part-1 answer:", count);
};

firstAnswer();

const secondAnswer = () => {
  let count = 0;
  rows.forEach((row) => {
    const numberArray = row.split(" ").map((n) => Number(n));

    // passes if one number taken from array and matches conditions
    // so go through numberArray and remove one number at a time and do
    // the check. If passes, break the loop and increment the count.
    for (let i = 0; i <= numberArray.length; i++) {
      const copy = [...numberArray];
      // remove one number from array at index - 1 position
      copy.splice(i - 1, 1);

      const getComparison = compareNumbersInArray(copy);
      const passes = checkIfPasses(getComparison);

      if (passes) {
        count++;
        break;
      }
    }
  });

  console.log("part-2 answer:", count);
};

secondAnswer();
