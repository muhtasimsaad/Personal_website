import React from 'react';
import { useState } from "react";
import { CountUp } from 'use-count-up';
import Image from 'next/image';
import background_circle1 from '../app/assets/images/background_circle1.svg'
import background_circle2 from '../app/assets/images/background_circle2.svg'
import '../app/globals.css'
import { Montserrat } from '@next/font/google';


const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'600',
});
const montserrat_normal = Montserrat({
  subsets:['latin'],
  weight:'300',
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

  return <div className={montserrat_normal.className}
  >  



<div className='w-5/6 mx-auto'>
  <div className='mt-10 mx-auto text-3xl'>
    <h1 className={montserrat_bold.className}>Sudoku Solver</h1>
    <p className='text-xs'>Made By Yours Truly</p>
  </div>
  <div className='w-full mt-12 rounded-lg bg-white bg-opacity-30 p-4'>
    <div className='w-3/4 mx-auto bg-opacity-10'>
      <p>Algorithm used</p>
      <div className='flex'>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
      </div>
      <div className='flex'>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
      </div>
      <div className='flex'>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
        <div class="grid grid-rows-3 grid-flow-col gap-0 border-2 border-[#AAAAAA]">
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
          <input className='bg-none border border-[#AAAAAA] w-16 h-16 text-3xl p-2 text-center' name='asd' />
        </div>
      </div>
    </div>
  </div>
</div>

<div className=''>
  {/* <Image disabled src={background_circle2} className="fixed bottom-0 w-2/3 h-2/3 opacity-100 ml-auto" /> */}
  {/* <Image disabled src={background_circle1} className="fixed right-0 w-2/3 h-2/3 opacity-40 ml-auto" /> */}
</div>
  </div>
};

export default Sudoku;