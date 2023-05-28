/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const { onRequest } = require("firebase-functions/lib/providers/https");
// const logger = require("firebase-functions/lib/logger");

const {onRequest} = require("firebase-functions/v2/https");
const nodemailer = require('nodemailer');

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


global.nodesTraversed = 0;
global.logicallySolved = 0;
global.solvedUsingBFS = 0;
global.difficulty = 0;
global.logicalArray = '';
global.startTime = 0;
global.responseVariable = '';


const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'muhtasimsaad@gmail.com',
    pass: 'mr.joker11!'
  }
});

exports.sendEmail = functions.https.onRequest((request, response) => {
  const { email, subject, message } = request.body;

  const mailOptions = {
    from: 'muhtasimsaad@gmail.com',
    to: 'muhtasimsaad@gmail.com',
    subject: subject,
    text: `Email: ${email}\n\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      response.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      response.send('Email sent successfully');
    }
  });
});

exports.helloWorld = onRequest((request, response) => {

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  const data = {
    message: "Hello from Firebase!",
  };
  // Send the JSON response
  response.json(data);
});

exports.solverApi = onRequest((request, response) => {

  response.set('Access-Control-Allow-Origin', '*');
  response.set('Access-Control-Allow-Methods', 'GET, POST');
  response.set('Access-Control-Allow-Headers', 'Content-Type');

  if (request.headers.origin == 'https://portfolio-cec85.web.app' || request.headers.origin == 'http://localhost:3000') {
    const mainArray = request.body.mainArray;
    global.responseVariable = response;
    global.startTime = performance.now();

    // Perform the necessary operations with the mainArray
    // ...
 

    $possibilitiesArray = convert_to_possibilities_array(mainArray);

    solve_sudoku($possibilitiesArray);

    const responseData = {
      message: request.headers.origin,
      // Add any other response data as needed
    };

    response.json(responseData);
  } else {
    const responseData = {
      error: 'Invalid request.',
    };

    response.status(405).json(responseData);
  }
});

function sendResults(mainArray, metadata) {
  const responseData = {
    status: 'success',
    solution: mainArray,
    metadata: metadata
  };
  
  global.responseVariable.status(200).json(responseData);
}

function convert_to_possibilities_array(mainArray) {
  for (let row = 0; row < 9; row++) {
    for (let cols = 0; cols < 9; cols++) {
      if (mainArray[row][cols] === '') {
        mainArray[row][cols] = '123456789';
      }
    }
  }
  return mainArray;
}

function solve_sudoku(mainArray) {

  generateDifficultyLevel(mainArray);


  

  mainArray = solve_by_logic(mainArray);

  global.logical_array = mainArray;

  generateLogicalVsBFS(mainArray);
  
  
  if (!check_solved(mainArray)) {

    global.logicalArray = duplicateArray(mainArray);
    
    mainArray = solveByGuessing(mainArray);

     

  }
    
  

  if (checkSolutionIsCorrect(mainArray)) {
    sendResults(mainArray, null);
  } else {
    const response = {
      status: 'failed',
      reason: 'logic failed',
      result: mainArray,
    };
    JSON.stringify(response);
  }
}

function check_solved(mainArray) {
  for (let row = 0; row < 9; row++) {
    for (let column = 0; column < 9; column++) {
      if (mainArray[row][column].length !== 1) {
        return false;
      }
    }
  }
  return true;
}

function solve_by_logic(mainArray) {
  let mainFlag;

  do {
    mainFlag = false;
    for (let row = 0; row < 9; row++) {
      for (let column = 0; column < 9; column++) {
        if (mainArray[row][column].length === 1) {
          let flag = false;
          do {
            const result = trim_array(mainArray, row, column);
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

function trim_array(mainArray, row, column) {
  const columnResult = trim_by_column(mainArray, row, column);
  const rowResult = trim_by_row(columnResult[0], row, column);
  const gridResult = trim_by_grid(rowResult[0], row, column);
  const singularColumnResult = scopeSingularPossibilityColumn(mainArray, row, column);
  const singularRowResult = scopeSingularPossibilityRow(columnResult[0], row, column);
  

  return [gridResult[0], columnResult[1] || rowResult[1] || gridResult[1] || singularColumnResult[1] || singularRowResult[1]];
}

function trim_by_column(mainArray, row, column) {
  let flag = false;
  const value = mainArray[row][column];

  for (let r = 0; r < 9; r++) {
    if (mainArray[r][column].includes(value) && r !== row && mainArray[r][column].length > 1) {
      mainArray[r][column] = mainArray[r][column].replace(value, '');
      flag = true;
    }
  }

  return [mainArray, flag];
}

function trim_by_row(mainArray, row, column) {
  let flag = false;
  const value = mainArray[row][column];

  for (let c = 0; c < 9; c++) {
    if (mainArray[row][c].includes(value) && c !== column && mainArray[row][c].length > 1) {
      mainArray[row][c] = mainArray[row][c].replace(value, '');
      flag = true;
    }
  }

  return [mainArray, flag];
}

function trim_by_grid(mainArray, row, column) {
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
      if (mainArray[r][c].includes(value) && (c !== column || r !== row) && mainArray[r][c].length > 1) {
        mainArray[r][c] = mainArray[r][c].replace(value, '');
        flag = true;
      }
    }
  }

  return [mainArray, flag];
}

function scopeSingularPossibilityRow(mainArray, row, column){

  let mainFlag = false;
  
  for(let row = 0; row < 9; row++){
    for(let value = 0; value < 9; value++){
      let flag = false;
      let counter = -1; 
      for(let column = 0; column < 9; column++){
        if(mainArray[row][column].includes(value) && !flag){
          flag = true;counter = column;
        }
        if(mainArray[row][column].includes(value) && flag){
          break;
        }
        if(column == 8 && flag){
          console.log('its here');
          mainArray[row][counter] = value;
          mainFlag = true;
        }
      }
    }
  }

  return [mainArray, mainFlag];

}

function scopeSingularPossibilityColumn(mainArray, row, column){

  let mainFlag = false;
  
  for(let column = 0; column < 9; column++){
    for(let value = 0; value < 9; value++){
      let flag = false;
      let counter = -1; 
      for(let row = 0; row < 9; row++){
        if(mainArray[row][column].includes(value) && !flag){
          flag = true;counter = row;
        }
        if(mainArray[row][column].includes(value) && flag){
          break;
        }
        if(row == 8 && flag){
          mainArray[row][counter] = value;
          mainFlag = true;
        }
      }
    }
  }

  return [mainArray, mainFlag];

}

function scopeSingularPossibilityGrid(mainArray, row, column){

  let mainFlag = false;
  
  for(let column = 0; column < 9; column++){
    for(let value = 0; value < 9; value++){
      let flag = false;
      let counter = -1; 
      for(let row = 0; row < 9; row++){
        if(mainArray[row][column].includes(value) && !flag){
          flag = true;counter = row;
        }
        if(mainArray[row][column].includes(value) && flag){
          break;
        }
        if(row == 8 && flag){
          mainArray[row][counter] = value;
          mainFlag = true;
        }
      }
    }
  }

  return [mainArray, mainFlag];

}


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
          if (mainArray[r][c] === mainArray[row][column] && (c !== column || r !== row)) {
            return false;
          }
        }
      }
    }
  }
  return true;
}

function solveByGuessing(mainArray) {
  let mainStack = [];
  let trashStack = [];


  

  let duplicatedArray = duplicateArray(mainArray);
  mainStack.push(duplicatedArray);
  
  
  do {
    let element = mainStack.shift();
    
    if(element == undefined){
      const response = {
        status: 'failed',
        reason: 'Array was empty',
      };
      JSON.stringify(response);
    }
    element = solve_by_logic(element);
    if (!check_solved(element)) { 
      trashStack.push(element);
      let [row, column] = findSmallestString(element);
      let allPossibilities = Array.from(element[row][column]);
      
      for (let eachPossibility of allPossibilities) {
        let doppleGangerArray = duplicateArray(element);
        doppleGangerArray[row][column] = eachPossibility;
        
        if (!alreadyInTrash(trashStack, doppleGangerArray)) {
          mainStack.push(doppleGangerArray);
          global.nodesTraversed++;
  	    }
        else{
      
        }
      }
    } else {
      if (checkSolutionIsCorrect(element)) {
        sendResults(element, getMetadataForGuessing());
      } 
    }
    
  } while (mainStack.length > 0);


}

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

function duplicateArray(array) {
  return array.map((innerArray) => [...innerArray]);
}

function alreadyInTrashOriginal(trashStack, mainArray) {


  
  for (let eachItem of trashStack) {
    
    for (let row = 0; row < 9; row++) {
      
      for (let column = 0; column < 9; column++) {
        if (mainArray[row][column] != eachItem[row][column]) {
          break;
        } else {
          if (row == 8 && column == 8) {
            return true;
          }
        }
      }
    }
  }
  return false;
}
function alreadyInTrash(mainArray, trashStack) {
  for (let eachItem of trashStack) {
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
