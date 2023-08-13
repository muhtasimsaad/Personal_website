const functions = require('@google-cloud/functions-framework');
const data = { 
  nodesTraversed : 0,
  logicallySolved : 0,
  solvedUsingBFS : 0,
  difficulty : 0,
  logicalArray : "",
  startTime : 0,
  responseVariable : "",
  response : "",
   };
/**
 * HTTP function that supports CORS requests.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
functions.http('solveSudoku', (req, res) => {
  // Set CORS headers for preflight requests
  // Allows GETs from any origin with the Content-Type header
  // and caches preflight response for 3600s
  res.set('Access-Control-Allow-Origin', '*');

  // Send response to OPTIONS requests
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  // Get the name variable from query parameters
  
  const mainArray = req.query.puzzle || req.body.puzzle || 'default';
  if(mainArray == 'default'){
    const responseData = {
      message: 'No Array Found',
    };
    res.status(200).send(responseData);
  }
  data.responseVariable = res;
  data.startTime = performance.now();
  console.log('-->'+mainArray[0]);
  const possibilitiesArray = convertToPossibilitiesArray(mainArray);

  solveSudoku(possibilitiesArray);

  const responseData = {
    puzzle: possibilitiesArray,
    nodes: data.nodes,
  };
  res.status(200).send(responseData);
   
});


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

  return mainArray;
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
  data.logical_array = mainArray;
  generateLogicalVsBFS(mainArray);
  if (!checkSolved(mainArray)) {
    data.logicalArray = duplicateArray(mainArray);
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
          data.nodesTraversed++;
        }
      }
    } else {
      if (checkSolutionIsCorrect(solvedElement)) {
        sendResults(solvedElement, getMetadataForGuessing());
      }
    }
  } while (mainStack.length > 0);
}

function sendResults(mainArray, metadata) {
  const responseData = {
    status: "success",
    solution: mainArray,
    metadata: metadata,
  };

  data.responseVariable.status(200).json(responseData);
}

/**
 *
 * @return {Object}
 */
function getMetadataForGuessing() {
  return {
    nodes_traversed: data.nodesTraversed,
    logically_solved: data.logicallySolved,
    solved_using_BFS: data.solvedUsingBFS,
    difficulty: data.difficulty,
    logical_array: data.logicalArray,
    time_required: performance.now() - data.startTime,
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
        data.logicallySolved++;
      } else {
        data.solvedUsingBFS++;
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
    data.difficulty = 0.1;
    return;
  }
  if (count <= 20) {
    data.difficulty = 0.9;
    return;
  }
  count = count - 20;
  let diff = 0.9;
  for (let c = count; c > 0; c--) {
    diff = diff - 0.05;
  }
  data.difficulty = diff;
}