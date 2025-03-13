// Function 1: A simple utility function
// global.nodesTraversed = 0;
// global.logicallySolved = 0;
// global.solvedUsingBFS = 0;
// global.difficulty = 0;
// global.logicalArray = "";
// global.startTime = 0;
// global.responseVariable = "";
// global.response = "";


  export const sendEmail = async(text:String ) => {

    console.log(process.env.REACT_APP_API_BASE_URL);
    const response = await fetch( "/api/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           message : text
        })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error sending email: ${errorText}`);
        return;
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
  }

export const generator = () => {
    const puzzles = [
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
        [
            ["5", "3", "", "", "7", "", "", "", ""],
            ["6", "", "", "1", "9", "5", "", "", ""],
            ["", "9", "8", "", "", "", "", "6", ""],
            ["8", "", "", "", "6", "", "", "", "3"],
            ["4", "", "", "8", "", "3", "", "", "1"],
            ["7", "", "", "", "2", "", "", "", "6"],
            ["", "6", "", "", "", "", "2", "8", ""],
            ["", "", "", "4", "1", "9", "", "", "5"],
            ["", "", "", "", "8", "", "", "7", "9"],
          ],
          [
            ["", "", "", "2", "6", "", "7", "", "1"],
            ["6", "8", "", "", "7", "", "", "9", ""],
            ["1", "9", "", "", "", "4", "5", "", ""],
            ["8", "2", "", "1", "", "", "", "4", ""],
            ["", "", "4", "6", "", "2", "9", "", ""],
            ["", "5", "", "", "", "3", "", "2", "8"],
            ["", "", "9", "3", "", "", "", "7", "4"],
            ["", "4", "", "", "5", "", "", "3", "6"],
            ["7", "", "3", "", "1", "8", "", "", ""],
          ],
          
          [
            ["", "1", "", "", "2", "8", "", "", "6"],
            ["", "", "9", "", "", "", "8", "", ""],
            ["", "", "", "7", "", "", "", "4", ""],
            ["", "7", "", "", "5", "", "", "", ""],
            ["", "", "3", "", "", "", "1", "", ""],
            ["", "", "", "", "9", "", "", "6", ""],
            ["", "3", "", "", "", "6", "", "", ""],
            ["", "", "6", "", "", "", "5", "", ""],
            ["8", "", "", "2", "7", "", "", "9", ""],
          ],
          
      ];


      const responseData = {
        puzzle: puzzles[Math.floor(Math.random() * puzzles.length)],
      };

      return responseData;
  };
  
  // Function 2: A simple utility function
export const solvePuzzle = (puzzle: string[][]): any => {
    let draft = convertToPossibilitiesArray(puzzle);
    return solveSudoku(draft);
};

function convertToPossibilitiesArray(puzzle : string[][]) {

    for(let row = 0; row <9; row++){
        for(let column = 0; column <9; column++){
            if(puzzle[row][column] == ""){
                puzzle[row][column] = "123456789";
            }
        }
    }

    return puzzle;
}

function solveSudoku(draft : string[][]) {
    const start_time = performance.now();
    const puzzle = draft.map(row => [...row]);
    const difficulty = generateDifficultyLevel(draft);
    draft = solveByLogic(draft);
    const logically_solved_puzzle = draft.map(row => [...row]);
    const logically_solved_cells = generateLogicalySolved(puzzle,draft);
    let nodes:number;
    if (!checkSolved(draft)) {
      [draft,nodes] = solveByGuessing(draft);
    }
    if(draft && checkSolutionIsCorrect(draft)){
        const finish_time = performance.now();
        return [draft, logically_solved_puzzle, logically_solved_cells, NumberOfCellsSolvedByBFS(logically_solved_puzzle) ,nodes, (finish_time - start_time), difficulty];
    }
    else{
        return null;
    }
     
}
function NumberOfCellsSolvedByBFS (logically_solved_array:string[][]) : number{
    let counter = 0;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if(logically_solved_array[r][c].length > 1){
                counter++;
            }
        }
    }
    return counter;
}

function generateDifficultyLevel(mainArray : string[][]) {
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

    return diff;
}

function solveByLogic(draft : string[][]) {
    let mainFlag:boolean = false;
    
    do {
        mainFlag = false;   
        for (let row = 0; row < 9; row++) {
            for (let column = 0; column < 9; column++) {
                if (draft[row][column].length === 1) {
                    [draft,mainFlag] = trimArray(draft,row,column);
                }
                
            }
        }
    } while (mainFlag);
  
    return draft;
} 

/**
 * Trims the possibilities of a cell based on row, column, and box constraints.
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function trimArray(draft : string[][], row : number, column : number) : [string[][],boolean] {
    

    let columnResult : boolean, rowResult : boolean, gridResult : boolean, singularPossibilitiesResult : boolean; // Declare variables first

    [draft, columnResult] = trimByColumn(draft, row, column);
    [draft, rowResult] = trimByRow(draft, row, column);
    [draft, gridResult] = trimByGrid(draft, row, column);
    [draft, singularPossibilitiesResult] = processSingularPossibilities(draft);
    

    return [ draft, columnResult || rowResult || gridResult || singularPossibilitiesResult];
}
  /**
 * Trims the possibilities of a cell based on column constraints.
 *
 * @param {Array<Array<string>>} mainArray - The Sudoku puzzle array.
 * @param {number} row - The row index of the cell.
 * @param {number} column - The column index of the cell.
 * @return {Array<Array<string|boolean>>}
 */
function trimByColumn(mainArray : string[][], row : number, column:number) : [string[][],boolean] {
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
function trimByRow(mainArray : string[][], row : number, column:number) : [string[][],boolean] {
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
function trimByGrid(mainArray : string[][], row : number, column:number) : [string[][],boolean] {
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
function processSingularPossibilities(draft : string[][]) : [string[][] , boolean] {
    //Row wise
    let flag = false;
    let target = -1;
    for (let row = 0; row < 9; row++) {
        flag = false;
        for (let value = 1; value < 10; value++) {
            let counter = 0;
            for (let col = 0; col < 9; col++) {
                if(draft[row][col].includes(value.toString())){
                    counter++;
                    target = col;
                }
            }
            if(counter == 1){
                draft[row][target] = value.toString();
                flag = true;
            }
        }   
        
    }



    //Column wise
    target = -1;
    for (let col = 0; col < 9; col++) {
        for (let value = 1; value < 10; value++) {
            let counter = 0;
            for (let row = 0; row < 9; row++) {
                if(draft[row][col].includes(value.toString())){
                    counter++;
                    target = row;
                }
            }
            if(counter == 1){
                draft[target][col] = value.toString();
                flag = true;
            }
        }
        
    }


    //Grid wise
    for(let rowOffset = 0; rowOffset < 8; rowOffset = rowOffset +3){
        for(let colOffset = 0; colOffset < 8; colOffset = colOffset +3){
            for(let value = 1; value < 10; value++){
                let counter = 0;
                let target = [];
                for( let row = 0 ; row < 3 ; row++){
                    for( let col = 0; col < 3 ; col++){
                        if(draft[row+rowOffset][col+colOffset].includes(value.toString())){
                            counter++;
                            target = [(row+rowOffset),(col+colOffset)];
                        }
                    }
                }

                if(counter == 1){
                    draft[target[0]][target[1]] = value.toString();
                    flag = true;
                }
            }
        }
    }

    return [draft,false];

}
function generateLogicalySolved(puzzle: string [][],draft : string[][]) : number{
    let counter = 0;
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (draft[r][c].length === 1 && puzzle[r][c].length != 1) {
                counter++;
            }
        }
    }
    return counter;
}
function checkSolved(draft: string[][]) {
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (draft[row][column].length !== 1) {
          return false;
        }
      }
    }
    return true;
}
function solveByGuessing(draft : string[][]) : [string[][],number]{
    const mainStack = [];
    const trashStack = [];
    const duplicatedArray = draft.map(row => [...row]);
    let nodes = 0;
    mainStack.push(duplicatedArray);
    do {
        const element = mainStack.shift();
        if (!element) {
            console.log('FAILED');
        }
        const solvedElement = solveByLogic(element);
        if (!checkSolved(solvedElement)) {
            trashStack.push(solvedElement);
            const [row, column] = findSmallestString(solvedElement);
            if(row == -1 || column == -1){
                return [null,null];
            }
            const allPossibilities = Array.from(solvedElement[row][column]);
            for (const eachPossibility of allPossibilities) {
                const doppleGangerArray = solvedElement.map(row => [...row]);
                doppleGangerArray[row][column] = eachPossibility;
                if (!alreadyInTrash(trashStack, doppleGangerArray)) {
                    mainStack.push(doppleGangerArray);
                    nodes++;
                }
            }
        } 
        else {
            if (checkSolutionIsCorrect(solvedElement)) {
            //   sendResults(solvedElement, getMetadataForGuessing());
                return [solvedElement,nodes];
            }
            else{
                console.log(mainStack.length);
            }
        }
    } 
    while (mainStack.length > 0);
}

function findSmallestString(draft : string[][]) {
    let counter = 9;
    let row = -1;
    let column = -1;
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (draft[r][c].length < counter && draft[r][c].length > 1) {
          counter = draft[r][c].length;
          row = r;
          column = c;
        }
      }
    }
    return [row, column];
}
function alreadyInTrash(draft : string[][], trashStack: any) {
    for (const eachItem of trashStack) {
      let isEqual = true;
  
      for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
          if (draft[row][column] !== eachItem[row][column]) {
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
function checkSolutionIsCorrect(mainArray:String [][]) : boolean {
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

export const validatePuzzle = (puzzle: String [][]) : string[] => {

    let result = [];
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if(puzzle[row][column] === ''){continue;}
            // Checking row
            for (let c = 0; c < 9; c++) {
                if (puzzle[row][c] == puzzle[row][column] && c != column) {
                    result.push(row+'-'+c);
                }
            }
  
            // Checking column
            for (let r = 0; r < 9; r++) {
                if (puzzle[r][column] == puzzle[row][column] && r != row) {
                    result.push(r+'-'+column);
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
                    if (puzzle[r][c] === puzzle[row][column] &&
                        (c !== column || r !== row)) {
                            result.push(r+'-'+c);
                    }
                }
            }
        }
    }

    return result;
}