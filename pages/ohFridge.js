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
import { sendEmail } from '@/functions/solver';

// import { generatePuzzle2 } from '@/functions';
// import { solveSudoku } from '@/functions';
import { generator, solvePuzzle } from '@/functions/solver';
import { validatePuzzle } from '@/functions/solver';

//  fonts
const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'700',
});
const montserrat_normal = Montserrat({
  subsets:['latin'],
  weight:'400',
});


const ohFridge = () => {  

  const [logicallySolved,setLogicallySolved] = useState();
  const [solvedUsingBFS,setsolvedUsingBFS] = useState();
  const [nodesTraversed,setnodesTraversed] = useState();
  const [timeRequired,settimeRequired] = useState();
  const [difficulty,setDifficulty] = useState();
  const [status,setStatus] = useState('Unsolved');
  // States
  const [solved,setSolved] =useState(false);
  const [info,setInfo] =useState(false);
  const [loading,setLoading] =useState(false);
  
  const [question,setQuestion] = useState();
  const [logicalArray,setlogicalArray] = useState();
  const [mainArray, setMainArray] = useState(Array(9).fill(Array(9).fill('')));
  const [errorArray, setErrorArray] = useState(Array(9).fill(Array(9).fill(false)));



  const sendDataToAPI = async () => {
    if(!solved){
      setErrorArray(Array(9).fill(Array(9).fill(false)));
      const puzzle = mainArray.map(row => [...row]);
      const qstn = puzzle.map(row => [...row]);
      const errors = validatePuzzle(qstn);

      //checking if puzzle has minimum inputs



      //checking if puzzle is invalid
      if (errors.length > 0) {

        const tempErrorArray = Array(9).fill(null).map(() => Array(9).fill(false));

        errors.forEach(element => {
          const [row, col] = element.toString().split('-').map(Number);
          tempErrorArray[row][col] = true;
          console.log(tempErrorArray);
        });

        setStatus('Error Found');
        setErrorArray(tempErrorArray);
        return;
      } 

       

      setQuestion(qstn);
      const response = solvePuzzle(puzzle);
      if(response){
          setMainArray(response[0]);
      
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
          setStatus('Solved');
          sendEmail('A user solved a puzzle');
        }
        else{
          // setMainArray(Array(9).fill(null).map(() => Array(9).fill('')));
          // resetBoard();
          setStatus('Failed to solve');
          sendEmail('A user failed to a puzzle');
          // console.log('failed to solve');
        }
      }
      else{
        console.log('error');
      }
      
      
  };

 

  return <div className={montserrat_normal.className}>

  

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
          
          
          <div className='block w-full  '>
            <div className='flex w-4/5 xl:w-3/5    mx-auto'>
              <div className='text-lg lg:text-3xl text-white pt-10 mb-4'>
                <h1 className={montserrat_bold.className}>oh Fridge !!</h1>
                <p className='text-xs lg:text-sm'>Made By Yours_Truly</p>
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
                 
              </div>
            </div>
            <div className='block xl:flex min-w-fit'>
              <div className='w-4/5 xl:w-3/5  mx-auto bg-gradient-to-br from-white/[.3] to-white/[.2] border border-white/[.3] rounded-xl'>
                <div className='max-w-1/2 mx-auto  px-4
                    md:px-8 lg:px-16 py-16 '>
                  <div className=''>
                     
                    
                    <div className=''>
                      <p className='my-4'> ohFridge is a expo application designed for iOS, Android and web platform. It uses a Laravel backend 
                        and mySQL database in the backend for its operations. 
                        </p>
                      <p className='my-4'> ohFridge is your ultimate inventory management app designed to keep track of your fridge and pantry effortlessly. 
                        With built-in quantity control, you can easily add, update, or delete items and monitor stock levels in real-time.
                      </p>
                      <p className='my-4'>
                        The app features family sharing, allowing multiple members to access and manage a shared inventory seamlessly. Any changes made—whether 
                            adding groceries, updating quantities, or removing expired items—are instantly synced, ensuring everyone stays informed.
                      </p>
                      <p className='my-4'>
                        Stay connected with real-time updates and instant notifications whenever an item is modified. Never run out of essentials again—ohFridge helps you organize, 
                            reduce food waste, and simplify grocery shopping like never before!
                      </p>
                      <p className='my-4 text-red-400'>
                        The application is still under active developement. You can visit my github for more information from <span className=' underline text-blue-200 hover:text-blue-500'>
                            <Link href="https://github.com/muhtasimsaad/ohFridge">here</Link></span>. 
                      </p>
                    </div>
 

                  </div>
                  
                  
                  
                </div>
              </div>
              
            </div>
           
          </div>
        </div>
      </div>
    </div>


  </div>
};

export default ohFridge;