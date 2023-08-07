import React from 'react';
import { useState } from "react";
import { CountUp } from 'use-count-up';
import Image from 'next/image';
import background from '../app/assets/images/background.png'
import background_circle2 from '../app/assets/images/background_circle2.svg'
import '../app/globals.css'
import { Montserrat } from '@next/font/google';
import table from '../app/assets/images/Table.svg';
import logically_solved from '../app/assets/images/logcally_solved.svg';
import solved_using_BFS from '../app/assets/images/solved_using_bfs.svg';
import nodes from '../app/assets/images/nodes.svg';
import time_taken from '../app/assets/images/Time.svg';
import difficultys from '../app/assets/images/difficulty.svg';


const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'700',
});
const montserrat_normal = Montserrat({
  subsets:['latin'],
  weight:'400',
});

const Sudoku = () => {

  

  let url = '';

  if (typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      url = 'https://localhost:5000/api/solve';
    } else {
      url = 'https://us-central1-portfolio-cec85.cloudfunctions.net/api/solve';
    }
  }  

  const [logicallySolved,setLogicallySolved] = useState(10);
  const [solvedUsingBFS,setsolvedUsingBFS] = useState(10);
  const [nodesTraversed,setnodesTraversed] = useState(10);
  const [timeRequired,settimeRequired] = useState(10);
  const [difficulty,setDifficulty] = useState(.1);
  const [buttonText,setButtonText] = useState('Solve');
  
  const [solved,setSolved] =useState(false);
  const [loading,setLoading] =useState(false);
   
  
  const [question,setQuestion] = useState();
  const [logicalArray,setlogicalArray] = useState();
  const [mainArray, setmainArray] = useState([
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '',''],
    // ['', '','', '','', '','', '','']

    ['6', '','', '8','', '','2', '7',''],
    ['', '3','', '','', '','9', '4',''],
    ['', '','', '','', '','6', '3',''],
    ['4', '','6', '','7', '','', '','3'],
    ['2', '1','8', '','', '9','7', '','4'],
    ['7', '','', '2','', '8','', '6',''],
    ['', '','2', '4','5', '' ,'', '',''],
    ['1', '','', '','3', ''  ,'4', '9',''],
    ['', '','4', '','', ''  ,'5', '1','6'],
   ]);


  const sendDataToAPI = async () => {
    if(!solved){
      try {
    
        setQuestion(mainArray);

        setLoading(true);

        

        const response = await fetch('https://us-central1-portfolio-cec85.cloudfunctions.net/api/solve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ mainArray }),
        });
    
        if (response.ok) {
          const data = await response.json();
          if(data.status != 'success'){
            return;
          }
          processResponse(data);
          setButtonText('Reset');
          setSolved(true);
          setLoading(false);
        } else {
          console.log('Failed to send data');
        }
      } catch (error) {
        console.log('Error:', error);
      }
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

       setButtonText('Solve');
          setSolved(false);
    }
      
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


  const processResponse = (data) => {
    
    setmainArray(data.solution);

    let metadata = data.metadata;
    setnodesTraversed(metadata.nodes_traversed);
    setLogicallySolved(metadata.logically_solved);
    setsolvedUsingBFS(metadata.solved_using_BFS);
    settimeRequired(metadata.time_required);
    console.log(parseFloat(metadata.time_required, 10).toFixed(6));
    setDifficulty(metadata.difficulty);
    setlogicalArray(metadata.logical_array);
    
  }


  const computeInputColor = (row,column) => {
    // Your logic to compute the background color dynamically
     
    if(!solved ){

      if(mainArray[row][column] == ""){
        return '#e5e5e5';
      }
      return '#22c55e';
    }

    //solved state


    if(question[row][column].length == 1 ){
      return "#22c55e";
    }

    if(!logicalArray){
      return "#93c5fd";
    }

    if(logicalArray[row][column].length == 1 ){
      return "#93c5fd";
    }
    
    return "#e879f9";
  };

  return <div style={{background: '#1E1E1E'}} className={montserrat_normal.className}>



<div style={{
    backgroundImage: `url(${background.src})`,
    height: '100%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    }}  className='w-full mx-auto bg-[#1E1E1E]'>
  <div className='mx-auto w-3/4 text-3xl text-white pt-10 mb-4'>
    <h1 className={montserrat_bold.className}>Sudoku Solver</h1>
    <p className='text-sm'>Made By Yours Truly</p>
  </div>
  
    <div className='w-5/6 flex mx-auto pb-12'>
      <div className='w-2/3 min-w-fit'>
        <div className='max-w-fit bg-white bg-opacity-30 rounded-xl px-4 md:px-8 lg:px-16 pb-8 ml-2 md:ml-8 lg:ml-16'>
          <div className='flex justify-end w-full mx-auto pt-6'>
            <p className='pt-8 text-white'>Algorithm Applied</p>
            <p class="w-4 h-4 rounded-full mt-auto bg-[#27374D] mb-1 ml-2 mr-6"></p>
            <p className='pt-8 text-white'>Logically Solved</p>
            <p class="w-4 h-4 rounded-full mt-auto bg-[#9DB2BF] mb-1 ml-2"></p>
          </div>
          <div className='flex '>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
          </div>
          <div className='flex '>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
          </div>
          <div className='flex '>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
            <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
              <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center  bg-white bg-opacity-0  text-white font-bold' name='asd' />
            </div>
          </div>
          
        </div>
        
      </div>
      <div className='w-1/4 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-xl px-6'>
          <div className='w-full mx-auto'>
            <p className='text-white text-xl font-bold mt-12'>Dashboard</p>
            <p className='text-white text-sm mt-2'>Status: <span className='text-[#14FF00]'>Solved</span></p>
          </div>

          <div className='mt-3 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-md px-4 py-3 flex'>
            <Image src={table} className='h-8 w-8 mr-1'/>
            <div class="flex justify-between items-center w-full">
              <p class='text-sm text-white'>total Cells:</p>
              <p class='text-3xl text-white font-bold'>81</p>
            </div>
          </div>

          <div className='mt-3 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-md px-4 py-3 flex'>
            <Image src={logically_solved} className='h-8 w-8 mr-1'/>
            <div class="flex justify-between items-center w-full">
              <p class='text-sm text-white'>Logically Solved:</p>
              <p class='text-3xl text-white font-bold'>81</p>
            </div>
          </div>

          <div className='mt-3 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-md px-4 py-3 flex'>
            <Image src={solved_using_BFS} className='h-8 w-8 mr-1'/>
            <div class="flex justify-between items-center w-full">
              <p class='text-sm text-white'>Solved Using BFS:</p>
              <p class='text-3xl text-white font-bold'>81</p>
            </div>
          </div>

          <div className='mt-3 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-md px-4 py-3 flex'>
            <Image src={nodes} className='h-8 w-8 mr-1'/>
            <div class="flex justify-between items-center w-full">
              <p class='text-sm text-white'>Nodes Traversed:</p>
              <p class='text-3xl text-white font-bold'>81</p>
            </div>
          </div>

          <div className='mt-3 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-md px-4 py-3 flex'>
            <Image src={time_taken} className='h-8 w-8 mr-1'/>
            <div class="flex justify-between items-center w-full">
              <p class='text-sm text-white'>Time Taken:</p>
              <p class='text-3xl text-white font-bold'>81</p>
            </div>
          </div>

          <div className='mt-6 bg-gradient-to-br from-white/[.3] border border-white/[.3] to-none rounded-md px-4 py-3 flex'>
            <Image src={difficultys} className='h-10 w-10'/>
            <div class="flex justify-between items-center w-full">
              <p class='text-sm text-white'>Difficulty:</p>
              <p class='text-3xl text-white font-bold'>81</p>
            </div>
          </div>

          <p class='text-sm text-white mt-6'>View on Github &#10230;</p>

          <div>
            <p className='font-bold text-white bg-[#111111] text-center rounded-2xl py-2 my-4'> Reset </p>
          </div>


      </div>
      
    </div>
 
   

</div>


  </div>
};

export default Sudoku;