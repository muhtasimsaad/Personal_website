import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./styles.css";
import { Montserrat } from '@next/font/google';
import { Poppins } from '@next/font/google';

const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'900',
});

const poppins_normal = Poppins({
  subsets:['latin'],
  weight:'400',
});



function Navbar({activeWindow,references}) {
  const [durum, setDurum] = useState(true);
  
  const scrollToView = (key) => {

    if (key == 'home') {
      references[0].current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'about') {
      references[1].current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'projectsOverview') {
      references[2].current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'projects') {
      references[3].current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'contact') {
      references[4].current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  

  return (
    <nav className="fixed w-screen  text-3xl bg-[#1E1E1] h-fit border-secondary">
      <div className="w-2/3 py-4 mx-auto bg-background ">
        <div className="mx-auto max-w-7xl">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex w-full">
              <div className="">
                <div className="flex">
                  {/* className={`w-12 h-12 px-4 py-1 ml-auto ${active == 1 ? 'bg-secondary' : 'bg-none'}`} */}
                  <a href="#" className={`${montserrat_bold.className} w-full text-3xl h-fit my-auto rounded-md py-2 text-xl text-secondary`} aria-current="page">MSO</a>
                </div>
              </div>
              <div className="flex w-full mx-auto">
                <div className={`${poppins_normal.className} flex space-x-4 m-auto justify-center`}>
                  <div onClick={() => scrollToView('home')} className={`flex items-center px-3 py-2 text-sm text-gray-100 cursor-pointer hover:text-secondary ${activeWindow == 0 ? 'underline text-secondary' : ''} `} aria-current="page">Home</div>
                  <div onClick={() => scrollToView('about')} className={`flex items-center px-3 py-2 text-sm text-gray-100 cursor-pointer hover:text-secondary ${activeWindow == 1 ? 'underline text-secondary' : ''} `} aria-current="page">About</div>
                  <div onClick={() => scrollToView('projectsOverview')} className={`flex items-center px-3 py-2 text-sm text-gray-100 cursor-pointer hover:text-secondary ${(activeWindow == 2 || activeWindow == 3 ) ? 'underline text-secondary' : ''} `} aria-current="page">Projects</div>
                </div>
              </div>
              <div className="flex ml-auto">
                <div className={`${poppins_normal.className} flex space-x-4 my-auto justify-center`}>
                  <div onClick={() => scrollToView('contact')} className={`flex items-center px-12 py-2 text-lg transition border border-transparent rounded-md cursor-pointer text-background bg-secondary hover:border-secondary hover:bg-background hover:text-secondary ${activeWindow == 4 ? 'animate-bounce' : ''}`} aria-current="page">Contact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
