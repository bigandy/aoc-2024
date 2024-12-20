import { input } from "./test";
// import { input } from "./real";

const rows = input.split("\n").filter((l) => l !== "");

const firstAnswer = () => {
  const symbols = ["*", "+"];

  const answer = rows.reduce((accumulator, currentValue) => {
    const [targetString, inputString] = currentValue.split(": ");

    const target = Number(targetString);
    const input = inputString.split(" ").map((n) => Number(n));

    let solutions: Array<number> = [];

    const inputsLength = input.length;

    for (let i = 0; i < inputsLength - 1; i++) {
      if (solutions.length === 0) {
        solutions = symbols.map((symbol) => {
          return eval(`${input[i]}${symbol}${input[i + 1]}`);
        });
      } else {
        const newSolution: Array<number> = [];
        symbols.forEach((symbol) => {
          solutions.forEach((prevSolution) => {
            newSolution.push(eval(`${prevSolution}${symbol}${input[i + 1]}`));
          });
        });
        solutions = newSolution;
      }
    }

    if (solutions.includes(target)) {
      return accumulator + target;
    }

    return accumulator;
  }, 0);

  console.log("part-1 answer:", answer);
};

firstAnswer();

const secondAnswer = () => {
  const symbols = ["*", "+", "||"];

  const answer = rows.reduce((accumulator, currentValue) => {
    const [targetString, inputString] = currentValue.split(": ");

    const target = Number(targetString);
    const input = inputString.split(" ").map((n) => Number(n));

    let solutions: Array<number> = [];

    const inputsLength = input.length;

    for (let i = 0; i < inputsLength - 1; i++) {
      if (solutions.length === 0) {
        solutions = symbols.map((symbol) => {
          if (symbol === "||") {
            return Number(String(input[i]) + String(input[i + 1]));
          }
          return eval(`${input[i]}${symbol}${input[i + 1]}`);
        });
      } else {
        const newSolution: Array<number> = [];
        symbols.forEach((symbol) => {
          solutions.forEach((prevSolution) => {
            if (symbol === "||") {
              newSolution.push(
                Number(String(prevSolution) + String(input[i + 1]))
              );
            } else {
              newSolution.push(
                eval(`${Number(prevSolution)}${symbol}${input[i + 1]}`)
              );
            }
          });
        });
        solutions = newSolution;
      }
    }

    if (solutions.includes(target)) {
      return accumulator + target;
    }

    return accumulator;
  }, 0);

  console.log("part-2 answer:", answer);
};

secondAnswer();
