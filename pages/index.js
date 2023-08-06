import React from 'react';
import Header from "../app/components/Header"
import Contact from "../app/components/Contact"
import Footer from "../app/components/Footer"
import Projects from "../app/components/Projects"
import Skills from "../app/components/Skills"
import '../app/globals.css'

const Index = () => {

  return <div className='bg-black'>
   
  <Header/> 
  {/* <Skills/>  */}
  <Projects/>
  <Contact/>
  <Footer/>
</div>
};

export default Index;