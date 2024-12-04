import { testInput } from "./test";
import { actualInput } from "./real";

// testCode
const rows = testInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// Actual Input
// const rows = actualInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// const rows = actualInput.split("\n").filter((l) => l !== "");

type AvailableLetter = "X" | "M" | "A" | "S";

const checkSurroundingLetters = (
  letter: AvailableLetter,
  letterIndex: number,
  letters: string[],
  rowLength: number,
  ringWidth = 1
) => {
  const allowedLetters = getAllowedLetters(letter, ringWidth);
  // console.log({ allowedLetters });
  // console.log({ letterIndex, l: letters });

  const adjacentLetters = [
    letters[letterIndex - ringWidth],
    letters[letterIndex + ringWidth],
    letters[letterIndex - rowLength * ringWidth],
    letters[letterIndex - rowLength * ringWidth - ringWidth],
    letters[letterIndex - rowLength * ringWidth + ringWidth],
    letters[letterIndex + rowLength * ringWidth],
    letters[letterIndex + rowLength * ringWidth + ringWidth],
    letters[letterIndex + rowLength * ringWidth - ringWidth],
  ].filter(Boolean);
  // console.log({ adjacentLetters, allowedLetters });

  const containsAllAllowedLetters = allowedLetters.every((l) =>
    adjacentLetters.includes(l)
  );

  return containsAllAllowedLetters;

  // console.log({ adjacentLetters });
};

const getAllowedLetters = (letter: AvailableLetter, ringWidth: number) => {
  const xmasArray = ["X", "M", "A", "S"];
  const letterIndex = xmasArray.indexOf(letter);

  const allowedLetters = [
    xmasArray[letterIndex + ringWidth],
    xmasArray[letterIndex - ringWidth],
  ];
  return allowedLetters.filter(Boolean);
};

const checkLetterPartofXMAS = (
  letter: AvailableLetter,
  letterIndex: number,
  letters: string[],
  rowLength: number,
  ringWidth = 1 // Ring width is the distance away from the letter.
) => {
  const continueCheck = checkSurroundingLetters(
    letter,
    letterIndex,
    letters,
    rowLength,
    ringWidth
  );

  // return continueCheck && ringWidth === 4;
  if (continueCheck && ringWidth < 4) {
    // const newRingWidth = ringWidth + 1;
    return checkLetterPartofXMAS(
      letter,
      letterIndex,
      letters,
      rowLength,
      ringWidth + 1
    );
  }

  return continueCheck;
};

const firstAnswer = () => {
  let count = 0;

  const letters = testInput.replaceAll("\n", "");
  const rowLength = rows[0].length;

  // replace the letters which can't be part of XMAS, with .
  const output = letters.split("").map((letter, letterIndex, lettersArray) => {
    const check = checkLetterPartofXMAS(
      letter as AvailableLetter,
      letterIndex,
      lettersArray,
      rowLength,
      1
    );
    return check ? letter : ".";
  });

  console.log({ output });

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
