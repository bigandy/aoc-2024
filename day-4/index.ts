import { testInput, checkInput } from "./test";
// import { actualInput } from "./real";

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
  ringWidth: number,
  letterArray: AvailableLetter[],
  direction?: any,
  newLetter?: AvailableLetter
) => {
  const allowedLetters = getAllowedLetters(letter, ringWidth);

  const adjacentLetters = {
    t: letters[letterIndex + rowLength * ringWidth],
    l: letters[letterIndex - ringWidth],
    r: letters[letterIndex + ringWidth],
    b: letters[letterIndex - rowLength * ringWidth],
    tl: letters[letterIndex - rowLength * ringWidth - ringWidth],
    tr: letters[letterIndex - rowLength * ringWidth + ringWidth],
    br: letters[letterIndex + rowLength * ringWidth + ringWidth],
    bl: letters[letterIndex + rowLength * ringWidth - ringWidth],
  };

  const chosenLetters = Object.entries(adjacentLetters)
    .map(([key, value]) => {
      return { key, value };
    })
    .filter(({ value }) => value);

  const directionsArray = chosenLetters.filter(({ value }) => {
    return allowedLetters.includes(value);
  });

  // console.log({ letter, directionsArray });

  console.log({ letterArray });
  if (letter === "X") {
    const mValue = directionsArray.findIndex((item) => item.value === "M");

    if (directionsArray[mValue]) {
      console.log("next one is an M", directionsArray[mValue]);

      return checkSurroundingLetters(
        letter,
        letterIndex,
        letters,
        rowLength,
        ringWidth + 1,
        ["X", "M"],
        directionsArray[mValue].key
      );
    }
  } else if (letter === "M") {
    console.log("is an M");

    const aValue = directionsArray.findIndex((item) => item.value === "A");
    const sValue = directionsArray.findIndex((item) => item.value === "S");

    if (directionsArray[aValue]) {
      console.log("next one is an A");
    } else if (directionsArray[sValue]) {
      console.log("next one is an S");
    }
  }

  return false;

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
  lettersArray: string[],
  rowLength: number
) => {
  const continueCheck = checkSurroundingLetters(
    letter,
    letterIndex,
    lettersArray,
    rowLength,
    1,
    []
  );

  return continueCheck;
};

const firstAnswer = () => {
  let count = 0;

  const letters = testInput.replaceAll("\n", "");
  const rowLength = rows[0].length;
  const lettersArray = letters.split("").slice(0, 20);

  const output = lettersArray.map((letter, letterIndex) => {
    const check = checkLetterPartofXMAS(
      letter as AvailableLetter,
      letterIndex,
      lettersArray,
      rowLength
    );
    // console.log({ check });
    if (check) {
      return letter;
    } else {
      return ".";
    }
  });

  const joinedOutput = output.join("");
  const shouldBeOutput = checkInput
    .split("\n")
    .filter((l) => l !== "")
    .join("");
  console.log({ joinedOutput, shouldBeOutput });

  // console.log("part-1 answer:", count);
};

firstAnswer();

// const secondAnswer = () => {
//   let count = 0;
//   rows.forEach((row) => {

//   });

//   console.log("part-2 answer:", count);
// };

// secondAnswer();
