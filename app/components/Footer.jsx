import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import { useHistory } from 'react-router-dom';
import { Poppins } from "next/font/google";
import { FacebookRounded, GitHub, LinkedIn } from '@mui/icons-material';
import Link from "next/link";

const poppins_bold = Poppins({
  subsets:['latin'],
  weight:'700',
});
const poppins_normal = Poppins({
  subsets:['latin'],
  weight:'400',
});

function Footer() {


  const redirectToSocialMedia = (key) => {
    let url="";
    switch (key){
      case "facebook":
        url="https://www.facebook.com/muhtasim.billah/";
        break;
      case "linkedin":
        url="https://www.linkedin.com/in/muhtasim-saad-512606120/";
        break;
      case "github":
        url="https://github.com/muhtasimsaad";
        break;
    }
    window.open(url, '_blank');
  }

  return (<div className="relative w-full m-auto h-full justify-bottom">
    <div className="flex w-full absolute top-1/3 h-fit ">
      <div className="flex w-full lg:w-2/3 mx-auto px-4 lg:px-0">
        <div className="w-1/2">
          <p className={` text-secondary ${poppins_bold.className}`}>MSO</p>
          <p className="text-white">Sydney, Australia</p>
        </div>
        <div className="w-1/2 flex ">
          <div className="w-fit ml-auto flex">
            <div className="flex my-auto">
              <FacebookRounded onClick={() => redirectToSocialMedia('facebook')} className="w-9 h-9 text-white hover:text-secondary cursor-pointer" />
              <GitHub onClick={() => redirectToSocialMedia('github')} className="w-9 h-9 text-white hover:text-secondary cursor-pointer mx-3" />
              <LinkedIn onClick={() => redirectToSocialMedia('linkedin')} className="w-9 h-9 text-white hover:text-secondary cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <div className={ `${poppins_normal.className} absolute bottom-2 text-white mt-full w-full text-center text-xs lg:text-md`}>
      <p>All rights reserved &copy; 2023</p>
    </div>
  </div>
    
  );
}

export default Footer;