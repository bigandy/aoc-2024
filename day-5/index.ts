// import { combined } from "./test";
import { combined } from "./real";

const [rulesOne, pagesOne] = combined.split("\n\n");

const rulesArray = rulesOne
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split("|").map((n) => +n));

const pagesArray = pagesOne
  .split("\n")
  .filter(Boolean)
  .map((line) => line.split(",").map((n) => +n));

const firstAnswer = () => {
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

// https://stackoverflow.com/questions/3579486/sort-a-javascript-array-by-frequency-and-then-filter-repeats
function sortByFrequencyAndRemoveDuplicates(array: number[]) {
  var frequency: { [key: string]: number } = {},
    value;

  // compute frequencies of each value
  for (var i = 0; i < array.length; i++) {
    value = array[i];
    if (value in frequency) {
      frequency[value]++;
    } else {
      frequency[value] = 1;
    }
  }

  // make array from the frequency object to de-duplicate
  var uniques = [];
  for (value in frequency) {
    uniques.push(value);
  }

  // sort the uniques array in descending order by frequency
  function compareFrequency(a: string, b: string) {
    return frequency[b] - frequency[a];
  }

  return uniques.sort(compareFrequency).map((l) => Number(l));
}

const secondAnswer = () => {
  // Check one group
  const checkGroup = (pagesGroup: number[]) => {
    let breakRuleCount = 0;
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
          breakRuleCount++;
        }
      }
    }
    return breakRuleCount;
  };

  // checkGroups checks a pagesArray to see if there are passing or failing pagesArrays
  const checkGroups = (pagesArray: number[][], passing: boolean) => {
    return pagesArray.filter((pagesGroup) => {
      const breakRuleCount = checkGroup(pagesGroup);

      if (passing === true) {
        return breakRuleCount === 0;
      } else {
        return breakRuleCount !== 0;
      }
    });
  };

  const failingGroups = checkGroups(pagesArray, false);

  const resultTwo = failingGroups.reduce(
    (accumulator: number, currentValue: number[]) => {
      // get all rules that are applicable to the currentValue
      const applicableRules = rulesArray
        .filter((rule) => {
          // console.log({ rule });
          return rule.every((r) => currentValue.includes(r));
        })
        .map(([a]) => a);

      const getAllNumbersButLast =
        sortByFrequencyAndRemoveDuplicates(applicableRules);

      const getLastNumber = currentValue.filter(
        (n: number) => !getAllNumbersButLast.includes(n)
      );

      const numbersArray = [...getAllNumbersButLast, ...getLastNumber];

      const middleNumber = numbersArray[Math.floor(currentValue.length / 2)];
      return accumulator + middleNumber;
    },
    0
  );

  console.log("part-2 answer:", resultTwo);
};

secondAnswer();
