// import { rulesOne, pagesOne } from "./test";
import { rulesOne, pagesOne } from "./real";
// import { actualInput } from "./real";

// testCode
// const rows = testInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// Actual Input
// const rows = actualInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// const rows = actualInput.split("\n").filter((l) => l !== "");

const firstAnswer = () => {
  const rulesArray = rulesOne
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split("|").map((n) => +n));

  const pagesArray = pagesOne
    .split("\n")
    .filter(Boolean)
    .map((line) => line.split(",").map((n) => +n));

  const passingGroups = pagesArray.filter((pagesGroup) => {
    let breakRule = 0;

    for (let i = 0; i < pagesGroup.length; i++) {
      // rules must pass i + 1, i + 2, i + 3, i + 4
      const diffToEnd = pagesGroup.length - 1 - i;
      // console.log(diffToEnd);
      for (let j = 0; j < diffToEnd; j++) {
        const firstLetter = pagesGroup[i];
        const secondLetter = pagesGroup[j + i + 1];

        // find the rule in the rules array. if present, continue, otherwise break.
        if (
          !rulesArray.find(
            ([firstRule, secondRule]) =>
              firstRule === firstLetter && secondRule === secondLetter
          )
        ) {
          breakRule++;
        }
      }
    }
    return breakRule === 0;
  });

  // console.log({ passingGroups });

  const resultOne = passingGroups.reduce((accumulator, currentValue) => {
    const middleNumber = currentValue[Math.floor(currentValue.length / 2)];

    return accumulator + middleNumber;
  }, 0);
  console.log("part-1 answer:", resultOne);
};

firstAnswer();

// const secondAnswer = () => {
//   let count = 0;
//   rows.forEach((row) => {

//   });

//   console.log("part-2 answer:", count);
// };

// secondAnswer();
