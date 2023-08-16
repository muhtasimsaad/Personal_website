import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { Montserrat } from '@next/font/google';

const montserrat_bold_600 = Montserrat({
  subsets:['latin'],
  weight:'600',
});

function Button({ buttonText }) {


  
  return (
    <div className='mt-4 w-fit'>
      <p className={`${montserrat_bold_600.className} rounded-3xl px-12 py-2 text-background hover:text-secondary bg-secondary 
          hover:bg-background text-sm border-2 border-transparent hover:border-secondary cursor-pointer`}>{buttonText}</p>
    </div>
  );
}

export default Button;