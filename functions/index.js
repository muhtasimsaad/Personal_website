const express = require("express");
const app = express();
app.use(cors({origin: true}));


global.nodesTraversed = 0;
global.logicallySolved = 0;
global.solvedUsingBFS = 0;
global.difficulty = 0;
global.logicalArray = "";
global.startTime = 0;
global.responseVariable = "";
global.response = "";

/**
 * Returns a string indicating a positive outcome.
 *
 * This function returns the string "yes" to indicate a positive outcome.
 *
 * @return {string} The string "yes" representing a positive outcome.
 *
 * @example
 * const result = testData();
 * 
 */

/**
 * Solves the puzzle using a guessing algorithm.
 *@param {Array} mainArray
 *@param {Array} metadata
 */

function sendResults(mainArray, metadata) {
  const responseData = {
    status: "success",
    solution: mainArray,
    metadata: metadata,
  };

  global.responseVariable.status(200).json(responseData);
}

export const generatePuzzle2 = () => {
   return 'success';
};

exports.generatePuzzle = onRequest(
    {cors: false},
    (req, res) => {
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "*");

      const mainArray = [
        [
          ["6", "", "", "8", "", "", "2", "7", ""],
          ["", "3", "", "", "", "", "9", "4", ""],
          ["", "", "", "", "", "", "6", "3", ""],
          ["4", "", "6", "", "7", "", "", "", "3"],
          ["2", "1", "8", "", "", "9", "7", "", "4"],
          ["7", "", "", "2", "", "8", "", "6", ""],
          ["", "", "2", "4", "5", "", "", "", ""],
          ["1", "", "", "", "3", "", "4", "9", ""],
          ["", "", "4", "", "", "", "5", "1", "6"],
        ],
        [
          ["1", "", "", "5", "", "", "2", "3", ""],
          ["6", "", "", "", "", "1", "8", "", ""],
          ["", "2", "", "7", "", "", "", "5", ""],
          ["", "4", "9", "", "", "", "", "", ""],
          ["5", "", "", "", "", "", "", "", "8"],
          ["", "", "", "", "", "", "7", "6", ""],
          ["", "3", "", "", "", "7", "", "1", ""],
          ["", "", "6", "8", "", "", "", "", "2"],
          ["", "1", "4", "", "", "6", "", "", "5"],
        ],
        [
          ["6", "", "", "", "", "", "", "3", "9"],
          ["2", "", "3", "", "", "4", "", "", ""],
          ["", "", "", "5", "", "", "7", "", ""],
          ["", "3", "", "", "", "8", "", "", ""],
          ["9", "", "", "", "", "", "", "", "3"],
          ["", "", "", "7", "", "", "", "4", ""],
          ["", "", "5", "", "", "1", "", "", ""],
          ["", "", "", "4", "", "", "2", "", "6"],
          ["1", "9", "", "", "", "", "", "", "7"],
        ],
      ];

      const responseData = {
        puzzle: mainArray[Math.floor(Math.random() * mainArray.length)],
      };
      res.status(200).send(responseData);
    },
);

exports.solveSudoku = onRequest(
    {cors: false},
    (req, res) => {
      global.response = res;
      res.set("Access-Control-Allow-Origin", "*");
      res.set("Access-Control-Allow-Methods", "GET, PUT, POST, OPTIONS");
      res.set("Access-Control-Allow-Headers", "*");

      const mainArray = req.body['mainArray'];
      global.responseVariable = res;
      global.startTime = performance.now();
      const possibilitiesArray = convertToPossibilitiesArray(mainArray);
      console.log(possibilitiesArray);
      solveSudoku(possibilitiesArray);
      const responseData = {
        message: "response from main method",
        situation : mainArray,
      };
      res.status(200).send(responseData);
    },
);

/**
 * Converts an incomplete Sudoku puzzle
 *
 * @param {Array<Array<string>>} mainArray
 * @return {Array<Array<string>>}
 */
function convertToPossibilitiesArray(mainArray) {

  for(let row = 0; row <9; row++){
    for(let column = 0; column <9; column++){
      if(mainArray[row][column] == ""){
        mainArray[row][column] = "123456789";
      }
    }
  }

  return result;
}

/**
 * Solves a Sudoku puzzle using a combination of logic and guessing techniques.
 * Returns a string indicating a positive outcome.
 *
 * @param {Array<Array<string>>} mainArray
 */
function solveSudoku(mainArray) {

  

  generateDifficultyLevel(mainArray);
  mainArray = solveByLogic(mainArray);
  global.logical_array = mainArray;
  generateLogicalVsBFS(mainArray);
  if (!checkSolved(mainArray)) {
    global.logicalArray = duplicateArray(mainArray);
    mainArray = solveByGuessing(mainArray);
  }
  if (checkSolutionIsCorrect(mainArray)) {
    sendResults(mainArray, null);
  } else {
    const response = {
      status: "failed",
      reason: "logic failed",
      result: mainArray,
    };
    JSON.stringify(response);
  }
}
/**
 * Checks if a Sudoku puzzle is solved, i.e., all cells contain a single digit.
 * This function returns the string "yes" to indicate a positive outcome.
 *
 * @param {Array<Array<string>>} mainArray
 * @return {boolean}
 */
function checkSolved(mainArray) {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (mainArray[row][column].length !== 1) {
        return false;
      }
    }
  }
  return true;
}
/**
 * Solves a Sudoku puzzle using logic-based techniques.
 * @return {string} The string "yes" representing a positive outcome.
 *
 * @param {Array<Array<string>>} mainArray
 * @return {Array<Array<string>>}
 * @example
 */
function solveByLogic(mainArray) {
  let mainFlag;

  do {
    mainFlag = false;
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (mainArray[row][column].length === 1) {
          let flag = false;
          do {
            const result = trimArray(mainArray, row, column);
            flag = result[1];

            if (!mainFlag && flag) {
              mainFlag = true;
            }
            mainArray = result[0];
          } while (flag);
        }
      }
    }
  } while (mainFlag);

  return mainArray;
}
/**
 * Trims the possibilities of a cell based on row, column, and box constraints.
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function trimArray(mainArray, row, column) {
  const columnResult = trimByColumn(mainArray, row, column);
  const rowResult = trimByRow(columnResult[0], row, column);
  const gridResult = trimByGrid(rowResult[0], row, column);
  const singularColumnResult =
    singularPossibilityColumn(mainArray, row, column);
  const singularRowResult = singularPossRow(columnResult[0], row, column);
  return [gridResult[0], columnResult[1] ||
    rowResult[1] || gridResult[1] ||
    singularColumnResult[1] || singularRowResult[1]];
}
/**
 * Trims the possibilities of a cell based on column constraints.
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function trimByColumn(mainArray, row, column) {
  let flag = false;
  const value = mainArray[row][column];

  for (let r = 0; r < 9; r++) {
    if (mainArray[r][column].includes(value) &&
      r !== row && mainArray[r][column].length > 1) {
      mainArray[r][column] = mainArray[r][column].replace(value, "");
      flag = true;
    }
  }

  return [mainArray, flag];
}
/**
 * Trims the possibilities of a cell based on row constraints.
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>} .
 */
function trimByRow(mainArray, row, column) {
  let flag = false;
  const value = mainArray[row][column];

  for (let c = 0; c < 9; c++) {
    if (mainArray[row][c].includes(value) &&
     c !== column && mainArray[row][c].length > 1) {
      mainArray[row][c] = mainArray[row][c].replace(value, "");
      flag = true;
    }
  }

  return [mainArray, flag];
}
/**
 * Trims the possibilities of a cell based on grid (box) constraints.
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function trimByGrid(mainArray, row, column) {
  let flag = false;
  const value = mainArray[row][column];
  let rows = [];
  let columns = [];

  if (row < 3) {
    rows = [0, 1, 2];
  } else if (row < 6) {
    rows = [3, 4, 5];
  } else {
    rows = [6, 7, 8];
  }

  if (column < 3) {
    columns = [0, 1, 2];
  } else if (column < 6) {
    columns = [3, 4, 5];
  } else {
    columns = [6, 7, 8];
  }

  for (const r of rows) {
    for (const c of columns) {
      if (mainArray[r][c].includes(value) &&
       (c !== column || r !== row) && mainArray[r][c].length > 1) {
        mainArray[r][c] = mainArray[r][c].replace(value, "");
        flag = true;
      }
    }
  }

  return [mainArray, flag];
}
/**
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function singularPossRow(mainArray, row, column) {
  let mainFlag = false;
  for (let row = 0; row < 9; row++) {
    for (let value = 0; value < 9; value++) {
      let flag = false;
      let counter = -1;
      for (let column = 0; column < 9; column++) {
        if (mainArray[row][column].includes(value) && !flag) {
          flag = true;
          counter = column;
        }
        if (mainArray[row][column].includes(value) && flag) {
          break;
        }
        if (column == 8 && flag) {
          mainArray[row][counter] = value;
          mainFlag = true;
        }
      }
    }
  }
  return [mainArray, mainFlag];
}
/**
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function singularPossibilityColumn(mainArray, row, column) {
  let mainFlag = false;
  for (let column = 0; column < 9; column++) {
    for (let value = 0; value < 9; value++) {
      let flag = false;
      let counter = -1;
      for (let row = 0; row < 9; row++) {
        if (mainArray[row][column].includes(value) && !flag) {
          flag = true;
          counter = row;
        }
        if (mainArray[row][column].includes(value) && flag) {
          break;
        }
        if (row == 8 && flag) {
          mainArray[row][counter] = value;
          mainFlag = true;
        }
      }
    }
  }
  return [mainArray, mainFlag];
}
// function scopeSingularPossibilityGrid(mainArray, row, column) {
//   let mainFlag = false;
//   for (let column = 0; column < 9; column++) {
//     for (let value = 0; value < 9; value++) {
//       let flag = false;
//       let counter = -1;
//       for (let row = 0; row < 9; row++) {
//         if (mainArray[row][column].includes(value) && !flag) {
//           flag = true;counter = row;
//         }
//         if (mainArray[row][column].includes(value) && flag) {
//           break;
//         }
//         if (row == 8 && flag) {
//           mainArray[row][counter] = value;
//           mainFlag = true;
//         }
//       }
//     }
//   }

//   return [mainArray, mainFlag];

// }
/**
 *
 * @param {Array<Array<string>>} mainArray
 * @return {boolean}
 */
function checkSolutionIsCorrect(mainArray) {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      // Checking row
      for (let c = 0; c < 9; c++) {
        if (mainArray[row][c] == mainArray[row][column] && c != column) {
          return false;
        }
      }

      // Checking column
      for (let r = 0; r < 9; r++) {
        if (mainArray[r][column] == mainArray[row][column] && r != row) {
          return false;
        }
      }

      // Checking grid
      let rows = [];
      let columns = [];

      if (row < 3) {
        rows = [0, 1, 2];
      } else if (row < 6) {
        rows = [3, 4, 5];
      } else {
        rows = [6, 7, 8];
      }

      if (column < 3) {
        columns = [0, 1, 2];
      } else if (column < 6) {
        columns = [3, 4, 5];
      } else {
        columns = [6, 7, 8];
      }

      for (const r of rows) {
        for (const c of columns) {
          if (mainArray[r][c] === mainArray[row][column] &&
              (c !== column || r !== row)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}
/**
 * Solves the puzzle using a guessing algorithm.
 *
 * @param {Array} mainArray - The main puzzle array to be solved.
 */
function solveByGuessing(mainArray) {
  const mainStack = [];
  const trashStack = [];
  const duplicatedArray = duplicateArray(mainArray);
  mainStack.push(duplicatedArray);
  do {
    const element = mainStack.shift();
    if (element == undefined) {
      const response = {
        status: "failed",
        reason: "Array was empty",
      };
      JSON.stringify(response);
    }
    const solvedElement = solveByLogic(element);
    if (!checkSolved(solvedElement)) {
      trashStack.push(solvedElement);
      const [row, column] = findSmallestString(solvedElement);
      const allPossibilities = Array.from(solvedElement[row][column]);
      for (const eachPossibility of allPossibilities) {
        const doppleGangerArray = duplicateArray(solvedElement);
        doppleGangerArray[row][column] = eachPossibility;
        if (!alreadyInTrash(trashStack, doppleGangerArray)) {
          mainStack.push(doppleGangerArray);
          global.nodesTraversed++;
        }
      }
    } else {
      if (checkSolutionIsCorrect(solvedElement)) {
        sendResults(solvedElement, getMetadataForGuessing());
      }
    }
  } while (mainStack.length > 0);
}
/**
 *
 * @return {Object}
 */
function getMetadataForGuessing() {
  return {
    nodes_traversed: global.nodesTraversed,
    logically_solved: global.logicallySolved,
    solved_using_BFS: global.solvedUsingBFS,
    difficulty: global.difficulty,
    logical_array: global.logicalArray,
    time_required: performance.now() - global.startTime,
  };
}
/**
 * Finds the row and column
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @return {Array<number>}
 */
function findSmallestString(mainArray) {
  let counter = 9;
  let row = -1;
  let column = -1;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (mainArray[r][c].length < counter && mainArray[r][c].length > 1) {
        counter = mainArray[r][c].length;
        row = r;
        column = c;
      }
    }
  }
  return [row, column];
}
/**
 * Creates a duplicate of a 2D array.
 *
 * @param {Array<Array<any>>} array
 * @return {Array<Array<any>>}
 */
function duplicateArray(array) {
  return array.map((innerArray) => [...innerArray]);
}

// function alreadyInTrashOriginal(trashStack, mainArray) {
//   for (const eachItem of trashStack) {
//     for (let row = 0; row < 9; row++) {
//       for (let column = 0; column < 9; column++) {
//         if (mainArray[row][column] != eachItem[row][column]) {
//           break;
//         } else {
//           if (row == 8 && column == 8) {
//             return true;
//           }
//         }
//       }
//     }
//   }
//   return false;
// }
/**
 * Checks if a Sudoku puzzle array is already present in the trash stack.
 *
 * @param {Array<Array<string>>} mainArray
 * @param {Array<Array<Array<string>>>} trashStack
 * @return {boolean}
 */
function alreadyInTrash(mainArray, trashStack) {
  for (const eachItem of trashStack) {
    let isEqual = true;

    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (mainArray[row][column] !== eachItem[row][column]) {
          isEqual = false;
          break;
        }
      }

      if (!isEqual) {
        break;
      }
    }

    if (isEqual) {
      return true;
    }
  }
  return false;
}
/**
 * Generates statistics
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 */
function generateLogicalVsBFS(mainArray) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (mainArray[r][c].length === 1) {
        global.logicallySolved++;
      } else {
        global.solvedUsingBFS++;
      }
    }
  }
}
/**
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 */
function generateDifficultyLevel(mainArray) {
  let count = 0;
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (mainArray[r][c].length === 1) {
        count++;
      }
    }
  }

  if (count >= 36) {
    global.difficulty = 0.1;
    return;
  }
  if (count <= 20) {
    global.difficulty = 0.9;
    return;
  }
  count = count - 20;
  let diff = 0.9;
  for (let c = count; c > 0; c--) {
    diff = diff - 0.05;
  }
  global.difficulty = diff;
}
