import { input } from "./test";
// import { input } from "./real";

const rows = input.split("\n").filter((l) => l !== "");

const firstAnswer = () => {
  let count = 0;
  rows.forEach((row: string) => {
    console.log({ row });
  });

  console.log("part-1 answer:", count);
};

firstAnswer();

// const secondAnswer = () => {
//   let count = 0;
//   rows.forEach((row: string) => {
//     console.log({ row });
//   });

//   console.log("part-2 answer:", count);
// };

// secondAnswer();
