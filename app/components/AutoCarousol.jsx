import React, { useState, useEffect } from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Montserrat } from '@next/font/google';
import downArrow from '../assets/images/down_arrow.svg'
import up_down_arrow from '../assets/images/up_down_arrow.svg';
import Image from "next/image";


const montserrat_700 = Montserrat({
  subsets:['latin'],
  weight:'700',
});

function AutoCarousol() {

  const [active, setActive] = useState(5);
  const [masterSwitch, setMasterSwitch] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      if(masterSwitch){setActive(prevActive => (prevActive + 1) % 3);}
    }, 1500); // 3000 milliseconds = 3 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, );

  const toggleAutoCarousol = (key) =>{
    if(key != masterSwitch){
      setMasterSwitch(key);
      if(key){
        setActive((active+1)%3);
      }
    }
  }

  const toggleIndex = (key) =>{
    if(key != active){
      setActive(key);
    }
  }

  
  return (
    <div className="w-full text-3xl rounded-lg text-[#5C5C5C] my-auto" 
      onMouseEnter={() => toggleAutoCarousol(false)} onMouseLeave={() => toggleAutoCarousol(true)}>
      <div onMouseOver={() => toggleIndex(0)} className={`${montserrat_700.className} w-full p-4 border border-[#5C5C5C] flex ${active == 0 ? 'bg-[#5C5C5C] text-gray-100' : ''} `}>
        <p className='my-auto h-fit'> SERVER SIDE </p>
        <div className={`w-12 h-12 px-4 py-1 ml-auto ${active == 0 ? 'bg-secondary' : 'bg-none'}`}>
          <Image src={downArrow} className="rotate-[225deg]" alt="down_arrow" />
        </div>
      </div>
      <div onMouseOver={() => toggleIndex(1)} className={`${montserrat_700.className} w-full p-4 border border-[#5C5C5C] flex ${active == 1 ? 'bg-[#5C5C5C] text-gray-100' : ''} `}>
        <p className='my-auto h-fit'>API</p>
        <div className={`w-12 h-12 px-4 py-1 ml-auto ${active == 1 ? 'bg-secondary' : 'bg-none'}`}>
          <Image src={up_down_arrow} className="" alt="up_down_arrow" />
        </div>
      </div>
      <div onMouseOver={() => toggleIndex(2)} className={`${montserrat_700.className} w-full p-4 border border-[#5C5C5C] flex ${active == 2 ? 'bg-[#5C5C5C] text-gray-100' : ''} `}>
        <p className='my-auto h-fit'>CLIENT SIDE</p>
        <div className={`w-12 h-12 px-4 py-1 ml-auto ${active == 2 ? 'bg-secondary' : 'bg-none'}`}>
          <Image src={downArrow} className="" alt="down_arrow" />
        </div>
      </div>
    </div>
  );
}

export default AutoCarousol;