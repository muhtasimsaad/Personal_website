import React from 'react';
import { useState } from "react";
import Image from 'next/image';
import background from '../app/assets/images/background.png'
import '../app/globals.css'
import { Montserrat } from '@next/font/google';
import table from '../app/assets/images/Table.svg';
import logically_solved from '../app/assets/images/logcally_solved.svg';
import solved_using_BFS from '../app/assets/images/solved_using_bfs.svg';
import nodes from '../app/assets/images/nodes.svg';
import time_taken from '../app/assets/images/Time.svg';
import difficultys from '../app/assets/images/difficulty.svg';
import cross from "../app/assets/images/close.svg";
import information from "../app/assets/images/info.svg";
import Link from 'next/link';
// import { generatePuzzle2 } from '@/functions';
// import { solveSudoku } from '@/functions';
import { generator, solvePuzzle } from '@/functions/solver';


//  fonts
const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'700',
});
const montserrat_normal = Montserrat({
  subsets:['latin'],
  weight:'400',
});


const Sudoku = () => {  

  const [logicallySolved,setLogicallySolved] = useState();
  const [solvedUsingBFS,setsolvedUsingBFS] = useState();
  const [nodesTraversed,setnodesTraversed] = useState();
  const [timeRequired,settimeRequired] = useState();
  const [difficulty,setDifficulty] = useState();

  // States
  const [solved,setSolved] =useState(false);
  const [info,setInfo] =useState(false);
  const [loading,setLoading] =useState(false);
  
  const [question,setQuestion] = useState();
  const [logicalArray,setlogicalArray] = useState();
  const [mainArray, setmainArray] = useState([
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '',''],
    ['', '','', '','', '','', '','']
   ]);


  const sendDataToAPI = async () => {
    if(!solved){
      // response = solvePuzzle(mainArray.map(row => [...row]));
      const puzzle = mainArray.map(row => [...row]);
      const qstn = puzzle.map(row => [...row]);
      setQuestion(qstn);
      const response = solvePuzzle(puzzle);
      setmainArray(response[0]);
     
      setnodesTraversed(response[4]);
      setLogicallySolved(response[2]);
      setsolvedUsingBFS(response[3]);
      settimeRequired((parseFloat(response[5])).toFixed(1));
      setlogicalArray(response[1]);
      
      const difficult_level = response[6];
      if (difficult_level >= 0.9) {
        setDifficulty("Extreme");
      } else if (difficult_level >= 0.66) {
        setDifficulty("Hard");
      } else if (difficult_level >= 0.33) {
        setDifficulty("Medium");
      } else {
        setDifficulty("Easy");
      }
      setSolved(true);
    }
    else{
      setmainArray([
        // ['6', '','', '8','', '','2', '7',''],
        // ['', '3','', '','', '','9', '4',''],
        // ['', '','', '','', '','6', '3',''],
        // ['4', '','6', '','7', '','', '','3'],
        // ['2', '1','8', '','', '9','7', '','4'],
        // ['7', '','', '2','', '8','', '6',''],
        // ['', '','2', '4','5', '' ,'', '',''],
        // ['1', '','', '','3', ''  ,'4', '9',''],
        // ['', '','4', '','', ''  ,'5', '1','6'],
  
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '',''],
        ['', '','', '','', '','', '','']
      ]);

        resetBoard();

    }
      
  };

  const resetBoard = () => {
    setlogicalArray();
    setQuestion();
    setLoading();
    setInfo();
    setSolved(false);
    setDifficulty();
    settimeRequired();
    setnodesTraversed();
    setsolvedUsingBFS();
    setLogicallySolved();
  }

  const generatePuzzle = () => {
        const data = generator();
        resetBoard();
        setmainArray(data.puzzle);
  }

  const setInfoModal = (key) => {
    setInfo(key);
  };

  const handleInputChange = (rowIndex, columnIndex, event) => {
    let newValue = event.target.value;
    if(isNaN(newValue)){return;}
    if(newValue > 9 || newValue < 1){
      newValue = '';
    }

    setmainArray((prevState) => {
      const newState = [...prevState]; // Create a copy of the 2D array
      newState[rowIndex][columnIndex] = newValue; // Update the specified element
      return newState; // Return the updated array
    });
  };

 


  const computeInputColor = (row,column) => {
    // Your logic to compute the background color dynamically
     
    if(!solved){
      if(mainArray[row][column] == ""){
        return '';
      }
      return '#444444';
    }
    else{
      if(question[row][column].length == 1 ){
        return "#444444";
      }
  
      if(logicalArray[row][column].length == 1){
        return "#161824";
      }
  
      if(mainArray[row][column].length == 1 ){
        return "#27374D";
      }
    }

    //solved state

    
    
    // return "#27374D";
  };

  return <div className={montserrat_normal.className}>

  {info &&
    <div className="bg-gray-300">
        
      {/* Info Grid  */}
      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
          <div className="inline-block align-bottom bg-[#1E1E1E] rounded-lg px-4 pt-5 pb-4 text-left
              overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <div className='text-gray-100'>
              <div className='flex'>
              <p className={`${montserrat_bold.className} text-2xl h-fit my-auto`}>Instructions:</p>
              <Image src={cross} alt="cross" className="h-6 w-6 ml-auto rounded-full cursor-pointer" onClick={() => setInfoModal(false)}/>
              </div>
              
              <p className='mt-4'><span className={`${montserrat_bold.className} underline`}>Input Grid:</span> Enter the initial Sudoku puzzle by filling in the 9x9 grid. Click on each cell to input anumber from 1 to 9. Leave empty cells for the unknown numbers.</p>
              <p className='mt-4'><span className={`${montserrat_bold.className} underline`}>Initial Setup:</span> Start with some cells pre-filled with numbers, providing a starting point forsolving.</p>
              <p className='mt-4'><span className={`${montserrat_bold.className} underline`}>No Repetition:</span> Every row, column, and 3x3 subgrid must have unique numbers, with no digit repetition.</p>
              <p className='mt-4'><span className={`${montserrat_bold.className} underline`}>Logical Deduction:</span> Use logic and process of elimination to determine where numbers fit based on existing placements.</p>
              <p className='mt-4'><span className={`${montserrat_bold.className} underline`}>Iterative Solution:</span> Solve by gradually filling numbers, making deductions, and revising until the entire grid is correctly filled.</p>
            </div>
          </div>
        </div>
      </div>

    </div>

  }

    {/* starts with background */}
    <div style={{
        backgroundImage: `url(${background.src})`,
        height: '100%',
        width: '100%',
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
    }}  className='min-h-screen w-full'>

      <div className='w-full lg:w-4/5 mx-auto min-w-fit '>

        
  
        <div className='mx-auto pb-12 max-w-fit'>
          
          
          <div className='block w-full min-w-fit '>
            <div className='flex lg:mx-0 min-w-full'>
              <div className='text-lg lg:text-3xl text-white pt-10 mb-4'>
                <h1 className={montserrat_bold.className}>Sudoku Solver</h1>
                <p className='text-xs lg:text-sm'>Made By Yours Truly</p>
              </div>
              <div className='ml-auto text-lg lg:text-3xl text-white pt-10 mb-4 justify-end'>
                <Link className="flex" href="/">
                  <p className="text-lg hover:mr-1 ease-in-out duration-300 pr-1">
                    &#8592;
                  </p>
                  <p className="text-lg hover:ml-1 ease-in-out duration-300">
                    Back to Portfolio
                  </p>
                </Link>
                <div className='flex'>
                  <p className='text-xs lg:text-sm ml-auto text-right'>About Sudoku</p>
                  <Image src={information} alt="info" className="mt-auto ml-1 cursor-pointer" onClick={() => setInfoModal(true)}/>
                </div>
              </div>
            </div>
            <div className='block xl:flex min-w-fit'>
              <div className='min-w-fit bg-gradient-to-br from-white/[.3] to-white/[.2] border border-white/[.3] rounded-xl'>
                <div className='max-w-fit mx-auto  px-4
                    md:px-8 lg:px-16 py-16'>
                  <div className=''>
                    <div className='flex justify-end w-full mx-auto'>
                      <div className='flex'>
                        <p className='text-xs md:text-lg text-white w-16 md:w-fit' >Algorithm Applied</p>
                        <p className="w-4 h-4 rounded-full mt-auto bg-[#27374D] mb-1.5 ml-2 mr-6"></p>
                      </div>
                      <div className='flex'>
                        <p className='text-xs md:text-lg text-white w-14 md:w-fit'>Logically Solved</p>
                        <p className="w-4 h-4 rounded-full mt-auto bg-[#161824] mb-1.5 ml-2"></p>
                      </div>
                    </div>
                    
                    <div className='flex'>
                      <div className="grid grid-cols-9 grid-flow-row gap-0 border-2 border-[#AAAAAA]">
                        {mainArray.map((row, rowIndex) =>
                          row.map((value, colIndex) => (
                            <input
                              key={`${rowIndex}-${colIndex}`} // Unique key for each input
                              className={`bg-none  ${(colIndex+1)%3 == 0 ? 'border border-r-4' : 'border'} ${(rowIndex+1)%3 == 0 ? 'border border-b-4' : 'border'} border-[#AAAAAA] w-9 h-9 md:w-16 md:h-16 text-3xl p-2 text-center bg-white bg-opacity-0 text-white font-bold caret-gray-900`}
                              disabled={solved}
                              value={value}
                              onChange={(event) => handleInputChange(rowIndex, colIndex, event)}
                              style={{ backgroundColor: computeInputColor(rowIndex, colIndex) }}
                            />
                          ))
                        )}
                      </div>
                    </div>

                  </div>
                  
                  
                  
                </div>
              </div>
              <div className='xl:mx-0 bg-gradient-to-br from-white/[.3] 
                  border border-white/[.3] to-none rounded-xl px-8 w-full min-w-fit ml-0 xl:ml-12 mt-12 xl:mt-0'>
                  
                {/* Dashboard */}
                <div className='w-full mx-auto'>
                  <p className='text-white text-xl font-bold mt-12'>Dashboard</p>
                  <p className='text-white text-sm mt-2'>Status: 
                    { solved &&<span className='text-[#14FF00] ml-2'>Solved</span>}
                    {!solved &&<span className='text-yellow-300 ml-2'>Unsolved</span>}
                  </p>
                </div>
                  
                <div>
                  <div className='mt-3 bg-gradient-to-br from-white/[.3] to-none  hover:bg-gradient-to-tl from-white/[.3] to-none border border-white/[.3] rounded-md px-4 py-3 flex'>
                    <Image src={table} alt="cells" className='h-8 w-8 mr-1'/>
                    <div className="flex justify-between items-center w-full">
                      <p className='text-sm text-white'>total Cells:</p>
                      <p className='text-3xl text-white font-bold'>81</p>
                    </div>
                  </div>

                  <div className='mt-3 bg-gradient-to-br from-white/[.3] to-none hover:bg-gradient-to-tl from-white/[.3] to-none border border-white/[.3] rounded-md px-4 py-3 flex'>
                    <Image src={logically_solved} alt="logically" className='h-8 w-8 mr-1'/>
                    <div className="flex justify-between items-center w-full">
                      <p className='text-sm text-white'>Logically Solved:</p>
                      {solved && <p className='text-3xl text-white font-bold'>{logicallySolved}</p>}
                      {!solved && <p className='text-3xl text-white font-bold'>?</p>}
                    </div>
                  </div>

                  <div className='mt-3 bg-gradient-to-br from-white/[.3] to-none hover:bg-gradient-to-tl from-white/[.3] to-none border border-white/[.3] rounded-md px-4 py-3 flex'>
                    <Image src={solved_using_BFS} alt="bfs" className='h-8 w-8 mr-1'/>
                    <div className="flex justify-between items-center w-full">
                      <p className='text-sm text-white min-w-fit mr-4'>Solved Using BFS:</p>
                      {solved && <p className='text-3xl text-white font-bold'>{solvedUsingBFS}</p>}
                      {!solved && <p className='text-3xl text-white font-bold'>?</p>}
                    </div>
                  </div>

                  <div className='mt-3 bg-gradient-to-br from-white/[.3] to-none hover:bg-gradient-to-tl from-white/[.3] to-none border border-white/[.3]  rounded-md px-4 py-3 flex'>
                    <Image src={nodes} alt="nodes" className='h-8 w-8 mr-1'/>
                    <div className="flex justify-between items-center w-full">
                      <p className='text-sm text-white'>Nodes Traversed:</p>
                      {solved && <p className='text-3xl text-white font-bold'>{nodesTraversed? nodesTraversed : 0}</p>}
                      {!solved && <p className='text-3xl text-white font-bold'>?</p>}
                    </div>
                  </div>

                  <div className='mt-3 bg-gradient-to-br from-white/[.3] to-none hover:bg-gradient-to-tl from-white/[.3] to-none border border-white/[.3] rounded-md px-4 py-3 flex'>
                    <Image src={time_taken} alt="time" className='h-8 w-8 mr-1'/>
                    <div className="flex justify-between items-center w-full">
                      <p className='text-sm text-white'>Time Taken:</p>
                      {solved && <p className='text-3xl text-white font-bold ml-2'>{timeRequired}ms</p>}
                      {!solved && <p className='text-3xl text-white font-bold'>?</p>}
                    </div>
                  </div>

                  <div className='mt-3 bg-gradient-to-br from-white/[.3] to-none hover:bg-gradient-to-tl from-white/[.3] to none border border-white/[.3] rounded-md px-4 py-3 flex'>
                    <Image src={difficultys} alt="difficulty" className='h-10 w-10'/>
                    <div className="flex justify-between items-center w-full">
                      <p className='text-sm text-white'>Difficulty:</p>
                      {solved && <p className='text-xl text-white font-bold'>{difficulty}</p>}
                      {!solved && <p className='text-3xl text-white font-bold'>?</p>}
                    </div>
                  </div>
                  <p onClick={generatePuzzle} className='cursor-pointer text-sm font-bold text-white bg-gradient-to-br from-white/[.3] to-none hover:bg-gradient-to-tl from-white/[.3] to-none text-center rounded-md border border-white/[.3] py-2 my-4 '>
                    Generate a Puzzle 
                  </p>
                </div>
                  
                <Link className="flex" href="https://github.com/muhtasimsaad/Personal_website/blob/main/pages/sudoku.js">
                  
                    <p className="text-sm text-white cursor-pointer my-auto mr-1 hover:mr-2 ease-in-out duration-300">
                    View on Github
                    </p>
                    <p className="text-lg hover:ml-1 text-white ease-in-out duration-300">
                      &#10230;
                    </p>
                
                  
                </Link>

                <div onClick={sendDataToAPI}>
                  
                  {!solved && <p className='cursor-pointer font-bold text-white bg-[#111111] 
                        hover:bg-white/[.3] border-2 border-transparent hover:border-white/[.3] text-center rounded-2xl py-2 my-4 '>
                    {loading &&
                    <svg aria-hidden="true" role="status" class="inline w-5 h-5 mr-4 text-gray-800 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                  }
                    Solve 
                      </p>}
                  {solved && <p className='cursor-pointer font-bold text-white bg-[#111111] 
                  hover:bg-white/[.3] border-2 border-transparent hover:border-white/[.3] text-center rounded-2xl py-2 my-4 '>
                  Reset 
                  </p>}
                </div>
                
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>


  </div>
};

export default Sudoku;