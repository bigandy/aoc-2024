// import { input } from "./test";
import { input } from "./real";

// testCode
const rows = input.split("\n").filter((l) => l !== "");

const firstAnswer = () => {
  let count = 0;

  const symbols = ["*", "+"];

  const answer = rows.reduce((accumulator, currentValue) => {
    const [targetString, inputString] = currentValue.split(": ");

    const target = Number(targetString);
    const input = inputString.split(" ").map((n) => Number(n));

    let solutions: Array<string> = [];

    const inputsLength = input.length;
    const symbols = ["+", "*"];

    for (let i = 0; i < inputsLength - 1; i++) {
      //
      if (solutions.length === 0) {
        solutions = symbols.map((symbol) => {
          return eval(`${input[i]}${symbol}${input[i + 1]}`);
        });
      } else {
        const newSolution: Array<string> = [];
        symbols.forEach((symbol) => {
          solutions.forEach((prevSolution) => {
            newSolution.push(eval(`${prevSolution}${symbol}${input[i + 1]}`));
          });
        });
        solutions = newSolution;
      }
    }

    const possibleAnswersCalculated = solutions.map((solution) =>
      eval(solution),
    );

    if (possibleAnswersCalculated.includes(target)) {
      return accumulator + target;
    }

    return accumulator;
  }, 0);

  console.log("part-1 answer:", answer);
};

firstAnswer();

// const secondAnswer = () => {
//   let count = 0;
//   rows.forEach((row) => {

//   });

//   console.log("part-2 answer:", count);
// };

// secondAnswer();
