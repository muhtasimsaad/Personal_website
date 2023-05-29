"use client"; // this is a client component 👈🏽

import React from 'react';
import { useState } from "react";
import ParticleBackground from './ParticleBackground';
import GaugeChart from 'react-gauge-chart';
import { CountUp } from 'use-count-up';

export const Sudoku = () => {

   
    let url = '';
    if(window.location.hostname == 'localhost'){
      url = 'https://localhost:5000/api/solve';
    }
    else{
      url = 'https://us-central1-portfolio-cec85.cloudfunctions.net/api/solve';
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
     
   
    return (
      <div class='w-full'>
        
         
        <ParticleBackground/>
          
        
         
         
        
        <div class="flex w-full">
          <div class="mx-auto w-full flex">
            <div class="mx-auto w-full xl:w-5/6 flex">
              <div class="mx-auto m-4 rounded-md p-4 bg-gradient-to-r from-cyan-500 to-blue-500 w-full xl:w-3/5">
                <div class="mt-4 bg-cyan-700 rounded-lg py-2">
                  <h1 class="text-white py-4 text-5xl  text-center font-bold" >Sudoku Solver</h1>
                </div>
                {solved && 
                  <div class="mt-4 rounded-lg flex w-4/5 mx-auto justify-between"> 
                    <div className='bg-green-500 py-1 px-5 rounded-lg  mx-2 w-1/3 flex'>
                      <p class="text-gray-700 py-1 text-md rounded-lg text-center font-bold m-auto" >Given</p>
                    </div>
                    <div className='bg-blue-300 py-1 px-5 rounded-lg  mx-2 w-1/3 flex'>
                      <p class="text-gray-700 py-1 text-md rounded-lg text-center font-bold m-auto" >Solved Logically</p>
                    </div>
                    <div className='bg-fuchsia-400 py-1 px-5 rounded-lg mx-2 w-1/3 flex'>
                      <p class="text-gray-700 py-1 text-md rounded-lg text-center font-bold m-auto" >Algorithm Applied</p>
                    </div>
                      
                      {/* <p class="text-gray-700 py-1 text-md bg-blue-300     mx-2 rounded-lg text-center font-bold w-1/3" >Solved Logically</p>
                      <p class="text-gray-700 py-1 text-md bg-fuchsia-400  mx-2 rounded-lg text-center font-bold w-1/3" >Algorithm Applied</p> */}
                  </div>
                }
  
  
  
                <div class='bg-cyan-200 px-10 py-4 mt-4 rounded-lg w-full flex'>
                  <div class='bg-red-200 rounded-lg w-full p-2'>
                    <div class="flex mx-auto">
                      <div class="flex rounded-t-lg w-full 2xl:w-4/5 mx-auto">
                        
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][0]}
                              onChange={(event) => handleInputChange(0, 0, event)} style={{ backgroundColor: computeInputColor(0,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][1]}
                              onChange={(event) => handleInputChange(0, 1, event)} style={{ backgroundColor: computeInputColor(0,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][2]}
                              onChange={(event) => handleInputChange(0, 2, event)} style={{ backgroundColor: computeInputColor(0,2) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][0]}
                              onChange={(event) => handleInputChange(1, 0, event)} style={{ backgroundColor: computeInputColor(1,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][1]}
                              onChange={(event) => handleInputChange(1, 1, event)} style={{ backgroundColor: computeInputColor(1,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][2]}
                              onChange={(event) => handleInputChange(1, 2, event)} style={{ backgroundColor: computeInputColor(1,2) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][0]}
                              onChange={(event) => handleInputChange(2, 0, event)} style={{ backgroundColor: computeInputColor(2,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][1]}
                              onChange={(event) => handleInputChange(2, 1, event)} style={{ backgroundColor: computeInputColor(2,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][2]}
                              onChange={(event) => handleInputChange(2, 2, event)} style={{ backgroundColor: computeInputColor(2,2) }} 
                              type="text"></input>
                            </div>
                          </div>
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2 mx-2 lg:mx-4">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][3]}
                              onChange={(event) => handleInputChange(0, 3, event)} style={{ backgroundColor: computeInputColor(0,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][4]}
                              onChange={(event) => handleInputChange(0, 4, event)} style={{ backgroundColor: computeInputColor(0,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][5]}
                              onChange={(event) => handleInputChange(0, 5, event)} style={{ backgroundColor: computeInputColor(0,5) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][3]}
                              onChange={(event) => handleInputChange(1, 3, event)} style={{ backgroundColor: computeInputColor(1,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][4]}
                              onChange={(event) => handleInputChange(1, 4, event)} style={{ backgroundColor: computeInputColor(1,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][5]}
                              onChange={(event) => handleInputChange(1, 5, event)} style={{ backgroundColor: computeInputColor(1,5) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][3]}
                              onChange={(event) => handleInputChange(2, 3, event)} style={{ backgroundColor: computeInputColor(2,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][4]}
                              onChange={(event) => handleInputChange(2, 4, event)} style={{ backgroundColor: computeInputColor(2,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][5]}
                              onChange={(event) => handleInputChange(2, 5, event)} style={{ backgroundColor: computeInputColor(2,5) }} 
                              type="text"></input>
                            </div>
                          </div>
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][6]}
                              onChange={(event) => handleInputChange(0, 6, event)} style={{ backgroundColor: computeInputColor(0,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][7]}
                              onChange={(event) => handleInputChange(0, 7, event)} style={{ backgroundColor: computeInputColor(0,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[0][8]}
                              onChange={(event) => handleInputChange(0, 8, event)} style={{ backgroundColor: computeInputColor(0,8) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][6]}
                              onChange={(event) => handleInputChange(1, 6, event)} style={{ backgroundColor: computeInputColor(1,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][7]}
                              onChange={(event) => handleInputChange(1, 7, event)} style={{ backgroundColor: computeInputColor(1,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[1][8]}
                              onChange={(event) => handleInputChange(1, 8, event)} style={{ backgroundColor: computeInputColor(1,8) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][6]}
                              onChange={(event) => handleInputChange(2, 6, event)} style={{ backgroundColor: computeInputColor(2,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][7]}
                              onChange={(event) => handleInputChange(2, 7, event)} style={{ backgroundColor: computeInputColor(2,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[2][8]}
                              onChange={(event) => handleInputChange(2, 8, event)} style={{ backgroundColor: computeInputColor(2,8) }} 
                              type="text"></input>
                            </div>
                          </div>
                          
                          
                        
                        
                      </div>
                    </div>
                    <div class="flex mx-auto mt-4">
                      <div class="flex rounded-t-lg w-full 2xl:w-4/5 mx-auto">
                        
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][0]}
                              onChange={(event) => handleInputChange(3, 0, event)} style={{ backgroundColor: computeInputColor(3,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][1]}
                              onChange={(event) => handleInputChange(3, 1, event)} style={{ backgroundColor: computeInputColor(3,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][2]}
                              onChange={(event) => handleInputChange(3, 2, event)} style={{ backgroundColor: computeInputColor(3,2) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][0]}
                              onChange={(event) => handleInputChange(4, 0, event)} style={{ backgroundColor: computeInputColor(4,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][1]}
                              onChange={(event) => handleInputChange(4, 1, event)} style={{ backgroundColor: computeInputColor(4,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][2]}
                              onChange={(event) => handleInputChange(4, 2, event)} style={{ backgroundColor: computeInputColor(4,2) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][0]}
                              onChange={(event) => handleInputChange(5, 0, event)} style={{ backgroundColor: computeInputColor(5,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][1]}
                              onChange={(event) => handleInputChange(5, 1, event)} style={{ backgroundColor: computeInputColor(5,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][2]}
                              onChange={(event) => handleInputChange(5, 2, event)} style={{ backgroundColor: computeInputColor(5,2) }} 
                              type="text"></input>
                            </div>
                          </div>
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2 mx-2 lg:mx-4">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][3]}
                              onChange={(event) => handleInputChange(3, 3, event)} style={{ backgroundColor: computeInputColor(3,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][4]}
                              onChange={(event) => handleInputChange(3, 4, event)} style={{ backgroundColor: computeInputColor(3,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][5]}
                              onChange={(event) => handleInputChange(3, 5, event)} style={{ backgroundColor: computeInputColor(3,5) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][3]}
                              onChange={(event) => handleInputChange(4, 3, event)} style={{ backgroundColor: computeInputColor(4,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][4]}
                              onChange={(event) => handleInputChange(4, 4, event)} style={{ backgroundColor: computeInputColor(4,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][5]}
                              onChange={(event) => handleInputChange(4, 5, event)} style={{ backgroundColor: computeInputColor(4,5) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][3]}
                              onChange={(event) => handleInputChange(5, 3, event)} style={{ backgroundColor: computeInputColor(5,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][4]}
                              onChange={(event) => handleInputChange(5, 4, event)} style={{ backgroundColor: computeInputColor(5,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][5]}
                              onChange={(event) => handleInputChange(5, 5, event)} style={{ backgroundColor: computeInputColor(5,5) }} 
                              type="text"></input>
                            </div>
                          </div>
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][6]}
                              onChange={(event) => handleInputChange(3, 6, event)} style={{ backgroundColor: computeInputColor(3,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][7]}
                              onChange={(event) => handleInputChange(3, 7, event)} style={{ backgroundColor: computeInputColor(3,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[3][8]}
                              onChange={(event) => handleInputChange(3, 8, event)} style={{ backgroundColor: computeInputColor(3,8) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][6]}
                              onChange={(event) => handleInputChange(4, 6, event)} style={{ backgroundColor: computeInputColor(4,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][7]}
                              onChange={(event) => handleInputChange(4, 7, event)} style={{ backgroundColor: computeInputColor(4,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[4][8]}
                              onChange={(event) => handleInputChange(4, 8, event)} style={{ backgroundColor: computeInputColor(4,8) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][6]}
                              onChange={(event) => handleInputChange(5, 6, event)} style={{ backgroundColor: computeInputColor(5,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][7]}
                              onChange={(event) => handleInputChange(5, 7, event)} style={{ backgroundColor: computeInputColor(5,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[5][8]}
                              onChange={(event) => handleInputChange(5, 8, event)} style={{ backgroundColor: computeInputColor(5,8) }} 
                              type="text"></input>
                            </div>
                          </div>
                          
                          
                        
                        
                      </div>
                    </div>
                    <div class="flex mx-auto mt-4">
                      <div class="flex rounded-t-lg w-full 2xl:w-4/5 mx-auto">
                        
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][0]}
                              onChange={(event) => handleInputChange(6, 0, event)} style={{ backgroundColor: computeInputColor(6,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][1]}
                              onChange={(event) => handleInputChange(6, 1, event)} style={{ backgroundColor: computeInputColor(6,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][2]}
                              onChange={(event) => handleInputChange(6, 2, event)} style={{ backgroundColor: computeInputColor(6,2) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][0]}
                              onChange={(event) => handleInputChange(7, 0, event)} style={{ backgroundColor: computeInputColor(7,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][1]}
                              onChange={(event) => handleInputChange(7, 1, event)} style={{ backgroundColor: computeInputColor(7,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][2]}
                              onChange={(event) => handleInputChange(7, 2, event)} style={{ backgroundColor: computeInputColor(7,2) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][0]}
                              onChange={(event) => handleInputChange(8, 0, event)} style={{ backgroundColor: computeInputColor(8,0) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][1]}
                              onChange={(event) => handleInputChange(8, 1, event)} style={{ backgroundColor: computeInputColor(8,1) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][2]}
                              onChange={(event) => handleInputChange(8, 2, event)} style={{ backgroundColor: computeInputColor(8,2) }} 
                              type="text"></input>
                            </div>
                          </div>
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2 mx-2 lg:mx-4">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][3]}
                              onChange={(event) => handleInputChange(6, 3, event)} style={{ backgroundColor: computeInputColor(6,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][4]}
                              onChange={(event) => handleInputChange(6, 4, event)} style={{ backgroundColor: computeInputColor(6,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][5]}
                              onChange={(event) => handleInputChange(6, 5, event)} style={{ backgroundColor: computeInputColor(6,5) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][3]}
                              onChange={(event) => handleInputChange(7, 3, event)} style={{ backgroundColor: computeInputColor(7,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][4]}
                              onChange={(event) => handleInputChange(7, 4, event)} style={{ backgroundColor: computeInputColor(7,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][5]}
                              onChange={(event) => handleInputChange(7, 5, event)} style={{ backgroundColor: computeInputColor(7,5) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][3]}
                              onChange={(event) => handleInputChange(8, 3, event)} style={{ backgroundColor: computeInputColor(8,3) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][4]}
                              onChange={(event) => handleInputChange(8, 4, event)} style={{ backgroundColor: computeInputColor(8,4) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][5]}
                              onChange={(event) => handleInputChange(8, 5, event)} style={{ backgroundColor: computeInputColor(8,5) }} 
                              type="text"></input>
                            </div>
                          </div>
                          <div class="grid grid-cols-3 gap-4 w-48 bg-red-400 p-2">
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][6]}
                              onChange={(event) => handleInputChange(6, 6, event)} style={{ backgroundColor: computeInputColor(6,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][7]}
                              onChange={(event) => handleInputChange(6, 7, event)} style={{ backgroundColor: computeInputColor(6,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[6][8]}
                              onChange={(event) => handleInputChange(6, 8, event)} style={{ backgroundColor: computeInputColor(6,8) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][6]}
                              onChange={(event) => handleInputChange(7, 6, event)} style={{ backgroundColor: computeInputColor(7,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][7]}
                              onChange={(event) => handleInputChange(7, 7, event)} style={{ backgroundColor: computeInputColor(7,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[7][8]}
                              onChange={(event) => handleInputChange(7, 8, event)} style={{ backgroundColor: computeInputColor(7,8) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][6]}
                              onChange={(event) => handleInputChange(8, 6, event)} style={{ backgroundColor: computeInputColor(8,6) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][7]}
                              onChange={(event) => handleInputChange(8, 7, event)} style={{ backgroundColor: computeInputColor(8,7) }} 
                              type="text"></input>
                            </div>
                            <div class="bg-gray-200 h-12">
                              <input class="h-12 w-full text-center text-black text-3xl font-bold" disabled={solved} value={mainArray[8][8]}
                              onChange={(event) => handleInputChange(8, 8, event)} style={{ backgroundColor: computeInputColor(8,8) }} 
                              type="text"></input>
                            </div>
                          </div>
                          
                          
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
  
                <div class="flex mt-4 bg-grey-200">
                  <div class="mx-auto w-1/6 p-2 w-full mx-auto flex">
          
                      <button onClick={sendDataToAPI} class="transition-all duration-25  inline-flex items-center mx-auto p-0.5 overflow-hidden 
                      font-medium rounded-lg group bg-blue-600 hover:bg-gradient-to-r from-purple-600 to-blue-800 
                       dark:text-white focus:ring-4 text-gray-100 shadow-lg" disabled={loading}>
                        
                        <span class="relative px-6 py-2.5 ease-in 
                        text-2xl">
                            {loading &&
                          <svg aria-hidden="true" role="status" class="inline w-5 h-5 mr-4 text-gray-800 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                          </svg>
                            }
                            
                            {buttonText}
                        </span>
                      </button>
  
                       
                    
                  </div>
                </div>
              </div>
              <div class="m-4 rounded-md p-1 flex transition-transform duration-500 transform translate-x-0 slide-out-div">
                    <hr class='h-2/3 bg-red-100 w-1 my-auto' />
              </div>
              {solved && 
                <>
                  
                  <div class="my-4 rounded-md p-4 bg-gradient-to-r from-cyan-500 to-blue-500 w-full lg:w-2/5 2xl:w-1/4 font-bold">
                    <h1 class='text-7xl text-black text-center'>Solved!</h1>
                    <div>
                      <h3 class="text-lg leading-6 font-medium text-gray-900 mt-8 text-center">
                        Thank you for playing Sudoku !
                      </h3>
                      <dl class="mt-5 ">
  
                        <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg">
                          <div class="flex-grow py-2 px-2">
                            <div class="flex items-center">
                              <div class="bg-indigo-500 rounded-md p-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                              </svg>
  
                              </div>
                              <div class="ml-5 w-0 flex-1 ">
                                <dt class="text-sm font-medium text-gray-500 truncate ">
                                  Total Cells
                                </dt>
                                <dd class="flex items-baseline">
                                  <div class="text-2xl font-semibold text-gray-900">
                                    <CountUp isCounting end={81} duration={3.2} decimalPlaces={4}/>
                                  </div>
                                </dd>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg mt-4">
                          <div class="flex-grow py-2 px-2">
                            <div class="flex items-center">
                              <div class="bg-indigo-500 rounded-md p-3">
                                <svg class="svg-icon" 
                                  style={{width : 24, height: 24,fill: "#ffffff",overflow: "hidden", }}
                                  viewBox="0 0 1024 1024" >
                                  <path d="M472.064 568.832h218.624a102.4 102.4 0 1 0-13.824-51.2h-204.8V224.256h222.72a94.72 94.72 0 1 0 92.16-116.224 94.208 94.208
                                  0 0 0-83.968 51.2H446.464a29.696 29.696 0 0 0-25.6 32.768v325.632H250.88a94.72 94.72 0 0 0-93.696-90.112 96.256 96.256 0 0 0 0 192
                                    94.208 94.208 0 0 0 83.456-51.2h180.224v274.432a29.696 29.696 0 0 0 25.6 32.768h242.688a102.4 102.4 0 0 0 90.112 51.2 96.256 
                                    96.256 0 1 0 0-192 102.4 102.4 0 0 0-102.4 75.776h-204.8z m307.2-89.6a34.816 34.816 0 0 1 29.696 15.872 30.208 30.208 0 0 1 
                                    0 31.744 34.816 34.816 0 0 1-29.696 15.872 32.256 32.256 0 1 1 0-64z m7.68-307.2a32.256 32.256 0 1 1-31.744 31.744 31.744
                                    31.744 0 0 1 31.744-31.744zM184.32 539.648a31.232 31.232 0 0 1-27.136 15.872 31.744 31.744 0 0 1 0-64 31.232 31.232 0 0
                                      1 27.136 15.872 32.256 32.256 0 0 1 0 32.256z m594.944 259.072a32.256 32.256 0 1 1-34.304 31.744 33.28 33.28 0 0 1
                                      34.304-31.744z" fill="" />
                                  </svg>
                              </div>
                              <div class="ml-5 w-0 flex-1 ">
                                <dt class="text-sm font-medium text-gray-500 truncate ">
                                  Logically Solved
                                </dt>
                                <dd class="flex items-baseline">
                                  <div class="text-2xl font-semibold text-gray-900">
                                    <CountUp isCounting end={logicallySolved} duration={3.2} />
                                  </div>
                                </dd>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg mt-4">
                          <div class="flex-grow py-2 px-2">
                            <div class="flex items-center">
                              <div class="bg-indigo-500 rounded-md p-3">
                                <svg class="svg-icon" style={{width : 24, height: 24,fill: "#ffffff",overflow: "hidden", }} 
                                  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M849.8 510.4c3.5-4.5 6.8-9.1 10-13.6 57.1-80.4 71.2-154.7 39.8-209.3-31.4-54.6-102.8-79.6-201-70.6-5.7 0.5-11.4
                                        1.2-17.2 1.9-2.2-5.4-4.6-10.7-6.9-15.9C633.4 113.3 576 64 513 64s-120.3 49.5-161.4 139c-2.4 5.1-4.6 10.4-6.9 15.7-5.7-0.7-11.4-1.4-17-1.9-98.1-9.2-169.6 15.8-201 70.4-31.5 54.6-17.4 128.9 39.6 209.3 3.2 4.5 6.6 9.1 10 13.6-3.5 4.5-6.8
                                        9.1-10 13.6C109.2 604.1 95 678.4 126.5 733c27.2 47.3 84.4 72.4 162.9 72.4 12.2 0 24.9-0.6 38-1.8 5.7-0.5 11.4-1.2 17.2-1.9
                                        2.2 5.4 4.6 10.7 6.9 15.9C392.6 907.2 450 956.5 513 956.5s120.3-49.3 161.5-138.9c2.4-5.1 4.6-10.4 6.9-15.7 5.7 0.7 11.4
                                        1.4 17 1.9 13.3 1.2 26.1 1.9 38.4 1.9 78.4 0 135.4-25.1 162.7-72.2 31.5-54.6 17.4-128.9-39.6-209.3-3.3-4.7-6.6-9.2-10.1-13.8zM322.2
                                        746.8c-73.6 6.8-127-8.6-146.4-42.3-19.4-33.7-6-87.6 36.9-147.8l1.5-2.1c25.4 27 54.5 53.2 86.7 78.1 5.4 40.2 13.6 78.4 24.2 113.8-0.9
                                        0.1-1.9 0.2-2.9 0.3z m-28.4-194c-15.5-14-30-28.2-43.2-42.6 13.2-14.4 27.6-28.6 43.2-42.6-0.6 14.1-1 28.3-1 42.7 0 14.2 0.4 28.4 1 
                                        42.5z m7.2-165.1c-32.2 24.8-61.3 51.1-86.7 78-0.5-0.7-1.1-1.4-1.5-2.1-42.8-60.4-56.2-114.3-36.8-147.9 16.4-28.4 56.9-43.8 113.3-43.8
                                        10.5 0 21.6 0.5 33.1 1.6 0.9 0.1 1.8 0.2 2.8 0.3-10.6 35.4-18.8 73.7-24.2 113.9z 
                                        m358.3-46.2c-11.8-7.5-23.9-14.9-36.2-22-12.3-7.1-24.7-13.9-37.1-20.3 19.7-6.4 39.1-11.7 58-15.9 5.8 18.2 10.9 37.6 15.3 
                                        58.2zM513.1 121.1c38.6 0 79.4 39.9 110.6 108.5-35.9 8.5-73 20.5-110.4 35.8-37.5-15.4-74.7-27.5-110.6-36 31-68.5 71.8-108.3 
                                        110.4-108.3z m-131 162c19 4.2 38.4 9.5 58.2 16-12.4 6.4-24.8 13.2-37.2 20.3-12.4 7.1-24.5 14.5-36.3 22 4.4-20.6 9.5-40.1 
                                        15.3-58.3zM366.8 679c11.8 7.5 23.9 14.9 36.2 22 12.3 7.1 24.7 13.9 37.1 20.3-19.7 6.4-39.1 11.7-58 15.9-5.8-18.1-10.9-37.6-15.3-58.2z 
                                        m146.3 220.5c-38.6 0-79.4-39.9-110.6-108.5 35.9-8.5 73-20.5 110.4-35.8 37.5 15.4 74.7 27.5 110.6 36-31.1 68.4-71.9 108.3-110.4 
                                        108.3zM644 737.4c-19-4.2-38.4-9.5-58.2-16 12.4-6.4 24.8-13.2 37.2-20.3 12.4-7.1 24.5-14.5 36.3-22-4.4 20.6-9.5 40.1-15.3 58.3z 
                                        m27.5-135.5c-24.1 17.5-49.9 34.2-77 49.8-27 15.6-54.4 29.4-81.6 41.5-27.2-12.1-54.5-26-81.5-41.6-27-15.6-52.7-32.4-76.8-49.9-3.1-29-4.8-59.6-4.8-91.5
                                         0-32 1.7-62.6 4.8-91.6 24.1-17.5 49.9-34.2 77-49.8 27-15.6 54.4-29.4 81.6-41.5 27.2 12.1 54.5 26 81.5 41.6 27 15.6 52.7 32.4 76.8 49.9
                                          3.1 29 4.8 59.6 4.8 91.5 0 32-1.7 62.5-4.8 91.6z m32.4-328.2c11.4-1.1 22.4-1.6 32.8-1.6 56.6 0 97.2 15.4 113.6 43.9 19.4 33.7 6 
                                          87.6-36.9 147.8l-1.5 2.1c-25.4-27-54.5-53.2-86.7-78.1-5.4-40.2-13.6-78.4-24.2-113.8 1-0.1 1.9-0.2 2.9-0.3z m28.4 194.1c15.5 14 
                                          30 28.2 43.2 42.6-13.2 14.4-27.6 28.6-43.2 42.6 0.6-14.1 1-28.3 1-42.7 0-14.3-0.3-28.5-1-42.5z m117.8 237.1c-19.4 33.7-72.8 
                                          49-146.4 42.1-0.9-0.1-1.8-0.2-2.8-0.3 10.6-35.4 18.8-73.6 24.2-113.8 32.2-24.8 61.3-51.1 86.7-78 0.5 0.7 1.1 1.4 1.5 2.1 42.9 
                                          60.3 56.2 114.2 36.8 147.9z"  />
                                    <path d="M482.4 501.6h-25.6V476c0-6.6-6.8-12-15.3-12-8.4 0-15.3 5.4-15.3 12v25.6h-25.6c-6.6 
                                          0-12 6.8-12 15.3 0 8.4 5.4 15.3 12 15.3h25.6v25.6c0 6.6 6.8 12 15.3 12 8.4 0 15.3-5.4 15.3-12v-25.6h25.6c6.6 0 
                                          12-6.8 12-15.3s-5.4-15.3-12-15.3zM629 501.6h-81.7c-6.6 0-12 6.8-12 15.3 0 8.4 5.4 15.3 12 15.3H629c6.6 0 12-6.8 12-15.3 
                                          0.1-8.5-5.3-15.3-12-15.3z"  />
                                  </svg>
                              </div>
                              <div class="ml-5 w-0 flex-1 ">
                                <dt class="text-sm font-medium text-gray-500 truncate ">
                                  Solved using BFS
                                </dt>
                                <dd class="flex items-baseline">
                                  <div class="text-2xl font-semibold text-gray-900">
                                    <CountUp isCounting end={solvedUsingBFS} duration={3.2} />
                                  </div>
                                </dd>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg mt-4">
                          <div class="flex-grow py-2 px-2">
                            <div class="flex items-center">
                              <div class="bg-indigo-500 rounded-md p-3">
                              <svg class="svg-icon" style={{width : 24, height: 24,fill: "#ffffff",overflow: "hidden", }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M298.666667 768h298.666666v-128a85.333333 85.333333 0 0 1 85.333334-85.333333h128V256a85.333333 85.333333 0 0 1-85.333334-85.333333h-298.666666v128a85.333333 85.333333 0 0 1-85.333334 85.333333H85.333333a85.333333 85.333333 0 0 1-85.333333-85.333333V128a85.333333 85.333333 0 0 1 85.333333-85.333333h256a85.333333 85.333333 0 0 1 85.333334 85.333333h310.101333A85.333333 85.333333 0 1 1 853.333333 244.565333V554.666667h85.333334a85.333333 85.333333 0 0 1 85.333333 85.333333v170.666667a85.333333 85.333333 0 0 1-85.333333 85.333333h-256a85.333333 85.333333 0 0 1-85.333334-85.333333H287.232A85.333333 85.333333 0 1 1 170.666667 694.101333V469.333333H106.666667a21.333333 21.333333 0 1 1 0-42.666666h213.333333a21.333333 21.333333 0 1 1 0 42.666666H213.333333v213.333334a85.333333 85.333333 0 0 1 85.333334 85.333333zM85.333333 85.333333a42.666667 42.666667 0 0 0-42.666666 42.666667v170.666667a42.666667 42.666667 0 0 0 42.666666 42.666666h256a42.666667 42.666667 0 0 0 42.666667-42.666666V128a42.666667 42.666667 0 0 0-42.666667-42.666667H85.333333z m597.333334 512a42.666667 42.666667 0 0 0-42.666667 42.666667v170.666667a42.666667 42.666667 0 0 0 42.666667 42.666666h256a42.666667 42.666667 0 0 0 42.666666-42.666666v-170.666667a42.666667 42.666667 0 0 0-42.666666-42.666667h-256z m21.333333 341.333334h213.333333a21.333333 21.333333 0 1 1 0 42.666666h-213.333333a21.333333 21.333333 0 1 1 0-42.666666zM810.666667 213.333333a42.666667 42.666667 0 1 0 0-85.333333 42.666667 42.666667 0 0 0 0 85.333333zM213.333333 810.666667a42.666667 42.666667 0 1 0 0-85.333334 42.666667 42.666667 0 0 0 0 85.333334z"  /></svg>
                              </div>
                              <div class="ml-5 w-0 flex-1 ">
                                <dt class="text-sm font-medium text-gray-500 truncate ">
                                  Nodes Traversed
                                </dt>
                                <dd class="flex items-baseline">
                                  <div class="text-2xl font-semibold text-gray-900">
                                    <CountUp isCounting end={nodesTraversed} duration={3.2} />
                                  </div>
                                </dd>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg mt-4">
                          <div class="flex-grow py-2 px-2">
                            <div class="flex items-center">
                              <div class="bg-indigo-500 rounded-md p-3">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
  
                              </div>
                              <div class="ml-5 w-0 flex-1 ">
                                <dt class="text-sm font-medium text-gray-500 truncate ">
                                  Time Required
                                </dt>
                                <dd class="flex items-baseline">
                                  <div class="text-2xl font-semibold text-gray-900">
                                  <CountUp isCounting end={timeRequired} duration={2.5} decimals={3} /> m(s)
                                  </div>
                                </dd>
                              </div>
                            </div>
                          </div>
                        </div>
  
                        <div class="flex flex-col bg-white overflow-hidden shadow rounded-lg mt-4">
                          <div class="flex-grow py-2 px-2">
                            <div class="flex items-center">
                              <div class="bg-indigo-500 rounded-md p-3">
                              <svg class="svg-icon" style={{width : 24, height: 24,fill: "#ffffff",overflow: "hidden", }} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 106.5h2.2c54.7 0.3 107.7 11.3 157.4 32.7 48.1 20.7 91.3 50.1 128.3 87.6 37 37.4 66 81 86.1 129.4 20.8 50.1 31.3 103.2 31 158-0.3 54.6-11.2 107.5-32.4 157.2-20.5 48-49.8 91.2-87 128.2-37.2 37-80.4 66.1-128.5 86.3-49.7 21-102.6 31.6-157 31.6h-2.2c-54.7-0.3-107.7-11.3-157.4-32.7-48.1-20.7-91.3-50.1-128.3-87.6-37-37.4-66-81-86.1-129.4-20.8-50.1-31.3-103.2-31-158 0.3-54.6 11.2-107.5 32.4-157.2 20.5-48 49.8-91.2 87-128.2 37.2-37 80.4-66.1 128.5-86.3 49.7-20.9 102.5-31.6 157-31.6m0-42.5C266 64 65.8 263 64.6 509.6c-1.3 247.4 198 449 445.1 450.3h2.4c246 0 446.2-199 447.4-445.6 1.3-247.4-198-449-445.1-450.3H512z"  /><path d="M621.4 702H404.3c-5.3 0-10.3-2.5-13.5-6.7s-4.3-9.7-2.9-14.8l107.7-400c2-7.4 8.7-12.6 16.4-12.6 7.7 0 14.4 5.1 16.4 12.5l109.4 400c1.4 5.1 0.3 10.6-2.9 14.8-3.2 4.3-8.2 6.8-13.5 6.8z m-194.9-34h172.7l-87-318.1L426.5 668z"  /><path d="M419.4 645.9H287c-5.7 0-11-2.9-14.2-7.6-3.2-4.8-3.7-10.8-1.5-16l87.3-206.7c2.1-5 6.5-8.7 11.8-10 5.3-1.2 10.9 0.1 15 3.7l81.7 70.9c7.1 6.2 7.9 16.9 1.7 24-6.2 7.1-16.9 7.9-24 1.7l-64-55.5-68.2 161.5h106.7c9.4 0 17 7.6 17 17s-7.5 17-16.9 17zM737 645.9H606.1c-9.4 0-17-7.6-17-17s7.6-17 17-17h109.3L673 436.3 642.7 483c-5.1 7.9-15.7 10.1-23.5 5-7.9-5.1-10.1-15.6-5-23.5l51.9-79.9c3.7-5.7 10.4-8.6 17.1-7.5 6.7 1.1 12.1 6.2 13.7 12.8l56.7 235c1.2 5.1 0.1 10.4-3.2 14.5-3.3 4.1-8.2 6.5-13.4 6.5z"  /></svg>
  
                              </div>
                              <h1 class="text-sm  ml-4 font-medium text-gray-500 truncate text-center">
                                Difficulty
                              </h1>
                              <div class="ml-5 w-0 flex-1 ">
                                <div class="flex-grow py-2 px-2 h-32">
                                  <GaugeChart style={{ zIndex: -1, height: '50px' }}
                                    id="gauge-chart1"
                                    nrOfLevels={3}
                                    colors={['#00cc66', '#ff9900', '#cc0000']}
                                    arcWidth={0.1}
                                    percent={difficulty}
                                    textColor={'black'}
                                    hideText={true} // If you want to hide the text
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
  
                      </dl>
                    </div>
                  </div>
                </>
              }
              {!solved && 
                <>
                 
                 <div class="my-4 rounded-md p-4 bg-gradient-to-r from-cyan-500 to-blue-500 w-full lg:w-2/5 2xl:w-1/4 font-bold">
                    <h1 class='text-3xl text-gray-600 text-center bg-cyan-400 rounded-md my-4 py-2'>Sudoku Rules !</h1>
                      
                        <div class="w-full">
        
                          <ul class="w-full">
                            
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full hover:text-lg">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              <h1 class="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 text-center text-gray-700 flex 
                                items-center justify-center">1</h1>
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-md hover:text-lg ">Each box, row, and column must contain the numbers 1 to 9. No 
                              repetition of numbers is allowed within any box, row, or column.</p>
                              </div>
                            </div>
                          </li>
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full hover:text-lg">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              <h1 class="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 text-center text-gray-700 flex 
                              items-center justify-center">2</h1>
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-md hover:text-lg">Initially, some of the cells are pre-filled with numbers from 1 to 9.
                              which is regarded as the given puzzle.</p>
                              </div>
                            </div>
                          </li>
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full hover:text-lg">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              <h1 class="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 text-center text-gray-700 flex 
                              items-center justify-center">3</h1>
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-md hover:text-lg">The goal is to fill in the empty cells with numbers 1 to 9, in such a way
                               that every row, column, and box contains all the numbers from 1 to 9 without repetition.</p>
                              </div>
                            </div>
                          </li>
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full hover:text-lg">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              <h1 class="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 text-center text-gray-700 flex 
                              items-center justify-center">4</h1>
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-md hover:text-lg">Each box, row, and column must contain the numbers 1 to 9. No 
                              repetition of numbers is allowed within any 3x3 Grid, row, or column.</p>
                              </div>
                            </div>
                          </li>
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full hover:text-lg">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              <h1 class="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 text-center text-gray-700 flex 
                              items-center justify-center">5</h1>
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-md hover:text-lg">You can only place a number in an empty cell if it doesn't violate any of the 
                              rules mentioned above.</p>
                              </div>
                            </div>
                          </li>
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full hover:text-lg">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              <h1 class="w-10 h-10 bg-cyan-500 rounded-full flex-shrink-0 text-center text-gray-700 flex 
                              items-center justify-center">6</h1>
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-md hover:text-lg">The solution should be unique, meaning that there should be only one possible 
                              way to fill in the entire grid while following the rules.</p>
                              </div>
                            </div>
                          </li>
                          <li class="col-span-1 bg-gray-100 hover:bg-blue-200 rounded-lg shadow divide-y divide-gray-200 w-full 
                          hover:text-2xl transition-all duration-600">
                            <div class="w-full flex items-center justify-between py-2 px-2 space-x-6 my-2">
                              
                              <div class="flex-1 ">
                              <p class="mt-1 text-gray-700 text-center ">Happy Hunting!</p>
                              </div>
                            </div>
                          </li>
  
                          <li class="col-span-1 hover:bg-blue-200 rounded-lg mt-4 mb-12 divide-y divide-gray-200 w-full transition-all duration-600">
                            <button class="flex items-center justify-center px-4 py-2 space-x-2 text-white bg-gray-800 rounded hover:bg-gray-700 float-right">
                              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M10 0C4.475 0 0 4.475 0 10c0 4.418 2.865 8.166 6.839 9.49.5.09.682-.217.682-.482 0-.237-.009-.866-.014-1.699-2.782.604-3.369-1.338-3.369-1.338C3.693 15.284 3.032 14.9 3.032 14.9c-1.14-.777.087-.763.087-.763 1.263.088 1.927 1.297 1.927 1.297 1.123 1.926 2.951 1.368 3.674 1.045.114-.824.44-1.369.798-1.688-2.793-.316-5.726-1.397-5.726-6.215 0-1.374.489-2.498 1.292-3.381-.13-.315-.56-1.597.123-3.332 0 0 1.057-.338 3.464 1.29a11.95 11.95 0 0 1 3.11-.419c1.054.004 2.116.143 3.11.419 2.407-1.628 3.464-1.29 3.464-1.29.684 1.735.255 3.017.125 3.332.806.883 1.29 2.007 1.29 3.381 0 4.83-2.936 5.896-5.737 6.206.45.39.854 1.16.854 2.337 0 1.686-.015 3.045-.015 3.459 0 .267.18.576.688.481C17.14 18.162 20 14.416 20 10c0-5.525-4.475-10-10-10z" clip-rule="evenodd" />
                              </svg>
                              <span>View on GitHub</span>
                            </button>
                          </li>
  
                          
                            
                            
                          </ul>
                           
                    </div>
                  </div>
                </>
              }
            </div>
          </div>
        </div>
        <div class="flex w-full mt-32">
          <div class="mx-auto w-full flex">
            <div class="mx-auto w-full flex">
              <div class="mx-auto m-4 rounded-md p-4 bg-gradient-to-r from-cyan-200 to-blue-200 w-full lg:w-4/5 ">          
                <div class="lg:flex lg:items-center lg:justify-between">
                  <div class="min-w-0 p-8">
                    <h1 class='text-5xl text-gray-700 font-bold my-4 bg-gray-300 p-4 rounded-lg'>About Sudoku</h1>
  
                    <p class='my-8'>
                      Sudoku, the internationally acclaimed puzzle game, has become a global obsession that transcends age, culture, and 
                      borders. Originating in Switzerland and gaining popularity in Japan before spreading worldwide, Sudoku has captured 
                      the imagination of millions. Beyond its numerical challenges, Sudoku offers a multitude of benefits, including mental 
                      stimulation, relaxation, and a sense of accomplishment. In this essay, we will explore the history of Sudoku, its 
                      remarkable rise to fame, and the numerous advantages it provides to enthusiasts around the globe.
                    </p>
  
                    <p class='my-8'>
                      While Sudoku's exact origins are somewhat mysterious, its roots can be traced back to Switzerland in the late 
                      18th century. The Swiss mathematician, Leonard Euler, created a puzzle known as the Latin Square, which laid the 
                      foundation for modern Sudoku. However, it wasn't until the 1970s that Sudoku gained prominence in Japan. Maki Kaji, 
                      the president of the Japanese puzzle company Nikoli, introduced Sudoku to the nation, giving it the name we know today. 
                      From there, Sudoku's popularity exploded, captivating the minds of people from all walks of life.
                    </p>
  
                    <p class='my-8'>
                      The allure of Sudoku lies in its simplicity and complexity combined. Each puzzle consists of a 9x9 grid divided into 
                      nine 3x3 subgrids. The objective is to fill the grid with numbers from 1 to 9, ensuring that each row, column, and 
                      subgrid contains all the digits without repetition. What appears as a mere arrangement of numbers is, in fact, a cerebral
                      challenge that requires logical thinking, pattern recognition, and deductive reasoning. Sudoku's appeal lies in the 
                      satisfaction derived from solving its intricacies, providing a welcome mental workout for puzzle enthusiasts.
                    </p>
  
                    <p class='my-8'>
                      Engaging in Sudoku regularly offers a myriad of cognitive benefits. The game enhances critical thinking skills, requiring
                      players to analyze possibilities, eliminate options, and make strategic decisions. This process exercises the brain, 
                      enhancing problem-solving abilities, logical reasoning, and memory retention. The mental stimulation provided by Sudoku 
                      is particularly valuable for individuals of all ages, as it helps maintain cognitive function and may even reduce the 
                      risk of age-related mental decline.
                    </p>
  
                    <p class='my-8'>
                      Beyond its cognitive advantages, Sudoku also offers a form of relaxation and stress relief. As players immerse 
                      themselves in solving the puzzle, they enter a state of focused concentration, redirecting their attention away 
                      from daily stressors. Sudoku provides a mindful escape, allowing individuals to find solace in the logical challenges 
                      it presents. The repetitive and methodical nature of filling in the grid creates a calming effect, akin to meditation.
                      Thus, Sudoku becomes a therapeutic tool that promotes mental well-being and relaxation.
                    </p>
  
                    <p class='my-8'>
                      Sudoku's educational value extends beyond the realm of entertainment. Many schools and educational institutions have 
                      incorporated Sudoku into their curriculum to enhance students' mathematical and logical skills. By encouraging critical
                      thinking and problem-solving, Sudoku cultivates important attributes that extend to various academic disciplines. Its 
                      non-threatening nature and enjoyable format make it an ideal tool for introducing complex concepts, fostering a love 
                      for mathematics, and instilling perseverance and resilience in students.
                    </p>
  
                    <p class='my-8'>
                      Sudoku has not only created a global community of puzzle enthusiasts but has also fostered social connections among
                       individuals of diverse backgrounds. The puzzle's popularity has led to the establishment of Sudoku clubs, forums, 
                       and competitions worldwide. Enthusiasts gather to share strategies, discuss techniques, and challenge each other. 
                       This shared passion for Sudoku transcends age, language barriers, and cultural differences, unifying individuals under the common pursuit of mental stimulation and enjoyment.
                    </p>
  
  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        
      </div>
    );
  };