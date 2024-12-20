import { input, inputWithObstacle } from "./test";
// import { input } from "./real";

// get a string of all input characters in a row.
const inputString = inputWithObstacle.replaceAll("\n", "");
const inputStringLength = inputString.length;
const rowLength = input.split("\n").filter(Boolean)[0].length;

const replaceCharacterAtIndex = (
  inputString: string,
  cursorIndex: number,
  newCharacter: string
) => {
  let newString = inputString;
  newString =
    newString.substring(0, cursorIndex) +
    newCharacter +
    newString.substring(cursorIndex + 1);
  return newString;
};

const getNextDirection = (currentDirection: string) => {
  const directions = ["^", ">", "v", "<"];

  const currentIndex = directions.indexOf(currentDirection);
  const nextIndex =
    currentIndex === directions.length - 1 ? 0 : currentIndex + 1;
  return directions[nextIndex];
};

const getCursorAndNextCharacterInformation = (inputString: string) => {
  const up = inputString.indexOf("^");
  const right = inputString.indexOf(">");
  const down = inputString.indexOf("v");
  const left = inputString.indexOf("<");

  let cursor = 0;
  let nextCharIndex = 0;
  let directionCharacter = "^";

  if (up !== -1) {
    cursor = up;
    nextCharIndex = cursor - rowLength;
    directionCharacter = "^";
  } else if (right !== -1) {
    cursor = right;
    nextCharIndex = cursor + 1;
    directionCharacter = ">";
  } else if (down !== -1) {
    cursor = down;
    nextCharIndex = cursor + rowLength;
    directionCharacter = "v";
  } else if (left !== -1) {
    cursor = left;
    nextCharIndex = cursor - 1;
    directionCharacter = "<";
  }

  return {
    cursor,
    nextCharIndex,
    nextChar: inputString.charAt(nextCharIndex),
    directionCharacter,
  };
};

// .slice(0, 1);
// Actual Input
// const rows = actualInput.split("\n").filter((l) => l !== "");
// .slice(0, 1);
// const rows = actualInput.split("\n").filter((l) => l !== "");

// FASTER NOW THAT USING STRINGS NOT ARRAYS
const firstAnswer = () => {
  const processString = (inputString: string) => {
    const { cursor, nextCharIndex, directionCharacter } =
      getCursorAndNextCharacterInformation(inputString);

    if (nextCharIndex > inputStringLength || nextCharIndex < 0) {
      // replace the cursor with X and return it.
      return replaceCharacterAtIndex(inputString, cursor, "X");
    }

    if (inputString.charAt(nextCharIndex!) === "#") {
      // rotate Current Direction
      const newDirectionCharacter = getNextDirection(directionCharacter);

      let newString = replaceCharacterAtIndex(
        inputString,
        cursor,
        newDirectionCharacter
      );
      return processString(newString);
    } else {
      // replace the current cursor location with a x
      let newString = replaceCharacterAtIndex(inputString, cursor, "X");
      // move the cursor to the nextChar location
      newString = replaceCharacterAtIndex(
        newString,
        nextCharIndex,
        directionCharacter
      );
      // console.log(newString);

      return processString(newString);
    }
  };

  const answer = processString(inputString);
  const count = (answer.match(new RegExp("X", "g")) || []).length;

  // 4751 is too low!
  // Off by one!
  console.log("part-1 answer:", count);
};

// firstAnswer();

const findNewCharacter = (nextChar, directionalCharacter) => {
  console.log({ nextChar, directionalCharacter });

  if (nextChar === "X") {
    if (["<", ">"].includes(directionalCharacter)) {
      return "-";
    } else if (["^", "v"].includes(directionalCharacter)) {
      return "|";
    }
  } else if (nextChar === "|") {
    if (["<", ">"].includes(directionalCharacter)) {
      return "+";
    }
    return "|";
  } else if (nextChar === "-") {
    if (["v", "^"].includes(directionalCharacter)) {
      return "+";
    }
    return "-";
  } else if (nextChar === "+") {
    return false;
  } else {
    return "X";
  }
};

const secondAnswer = () => {
  const processString = (inputString: string) => {
    const { cursor, nextCharIndex, nextChar, directionCharacter } =
      getCursorAndNextCharacterInformation(inputString);

    const goingOverBoard =
      nextCharIndex > inputStringLength || nextCharIndex < 0;

    // If going off the board, replace the final character with an X.
    if (goingOverBoard) {
      // replace the cursor with X and return it.
      return replaceCharacterAtIndex(inputString, cursor!, "X");
    }

    if (nextChar === "#" || nextChar === "O") {
      // rotate Current Direction
      const newDirectionCharacter = getNextDirection(directionCharacter);

      let newString = replaceCharacterAtIndex(
        inputString,
        cursor,
        newDirectionCharacter
      );
      return processString(newString);
    } else {
      const getNewCharacter = findNewCharacter(nextChar, directionCharacter);
      console.log({ getNewCharacter });
      if (!getNewCharacter) {
        return inputString;
      }

      // replace the current cursor location with a x
      let newString = replaceCharacterAtIndex(
        inputString,
        cursor,
        getNewCharacter!
      );
      // move the cursor to the nextChar location
      newString = replaceCharacterAtIndex(
        newString,
        nextCharIndex,
        directionCharacter
      );
      // console.log(newString);

      return processString(newString);
    }
  };

  const answer = processString(inputString);
  const check = `
....#.....
....+---+#
....|...|.
..#.|...|.
....|..#|.
....|...|.
.#.O^---+.
........#.
#.........
......#...
`;
  console.log({
    answe: answer,
    check: check.split("\n").filter(Boolean).join(""),
  });
  // const count = (answer.match(new RegExp("X", "g")) || []).length;

  // console.log("part-2 answer:", count);
};

secondAnswer();
