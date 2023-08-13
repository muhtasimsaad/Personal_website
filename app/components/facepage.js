import React from 'react'
import Header from "./Header"
import Contact from "./Contact"
import Footer from "./Footer"
import Projects from "./Projects"
import Skills from "./Skills"
import ParticleBackground from './ParticleBackground';


export const Facepage= () => {

 
    return (
      <>
        <ParticleBackground/>
        <Header/> 
        {/* <Skills/>  */}
        <Projects/>
        <Contact/>
        <Footer/>
      </>
      );
  };
  
   
  
  