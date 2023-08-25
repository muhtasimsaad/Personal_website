import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";
import facebook from "../assets/images/facebook.svg";
import linkedin from "../assets/images/linkedin.svg";
import github from "../assets/images/github.svg";
import Image from "next/image";
import { Poppins } from '@next/font/google';


const poppins_bold = Poppins({
  subsets:['latin'],
  weight:'700',
});

function Footer({ type }) {

  return (
    <div className="flex w-full lg:w-2/3 m-auto h-fit">
        <div className="w-1/2">
          <p className={` text-secondary ${poppins_bold.className}`}>MSO</p>
          <p>Sydney, Australia</p>
        </div>
        <div className="w-1/2 flex ">
          <div className="w-fit ml-auto flex">
            <Image className="w-9" src={facebook} alt="facebook" />
            <Image className="w-9" src={linkedin} alt="facebook" />
            <Image className="w-9" src={github} alt="facebook" />
          </div>
          
        </div>
    </div>
  );
}

export default Footer;