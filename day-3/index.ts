import { testInput, testInput2 } from "./test.ts";
import { actualInput } from "./real.ts";

// testCode
const input = testInput;
const input2 = testInput2;

// Actual Input
// const input = actualInput;
// const input2 = actualInput;

// regex to get the mul() with 2 numbers of 1-3 digits each
const mulRegexp = new RegExp(/(mul\()([0-9]{1,3},[0-9]{1,3})+(\))/, "g");
// regex to get do()
const doRegexp = new RegExp(/(do\(\))/, "g");
// regex to get don't()
const dontRegexp = new RegExp(/(don\'t\(\))/, "g");

const getSumFromMul = (text) => {
  const [a, b] = text.replace("mul(", "").replace(")", "").split(",");
  const sum = a * b;
  return sum;
};

const firstAnswer = () => {
  const mulMatches = input.match(mulRegexp);

  const answer = mulMatches?.reduce((accumulator, currentValue) => {
    // replace the mul() and split the numbers by the comma.
    const sum = getSumFromMul(currentValue);
    return accumulator + sum;
  }, 0);
  console.log("part-1 answer:", answer);
};

firstAnswer();

interface Indice {
  index: number;
  type: string;
  result: string;
}

const getPositions = (searchStr, regExp, type) => {
  var regex = regExp,
    result,
    indices: Indice[] = [];
  while ((result = regex.exec(searchStr))) {
    indices.push({ index: result.index, type, result: result[0] });
  }

  return indices;
};

const secondAnswer = () => {
  // mul is enabled at the start.
  let enabled = true;

  // search for locations of each string
  const mulPositions = getPositions(input2, mulRegexp, "mul");
  const doPositions = getPositions(input2, doRegexp, "do");
  const dontPositions = getPositions(input2, dontRegexp, "dont");

  // combine into one array, sorted by index.
  const out = [...mulPositions, ...doPositions, ...dontPositions];
  const flatOut = out.flat().sort((a, b) => a.index - b.index);

  const ans: Indice[] = [];
  flatOut.forEach((item: Indice) => {
    if (enabled && item.type === "mul") {
      // add to array
      ans.push(item);
    } else if (item.type === "do") {
      enabled = true;
    } else if (item.type === "dont") {
      enabled = false;
    }
  });

  const answer = ans.reduce((accumulator, currentValue) => {
    const sum = getSumFromMul(currentValue.result);
    return accumulator + sum;
  }, 0);

  console.log("part-2 answer:", answer);
};

secondAnswer();
