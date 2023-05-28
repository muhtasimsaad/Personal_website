import React from 'react'
import Navbar from './Navbar'
import "./styles.css"
import img from "../assets/images/coding.jpg";

function Header() {
  return (
   <>
   <div id='home' className=' bg-center bg-cover bg-no-repeat h-screen flex flex-col '>
    <Navbar/>
    <div className="wrapper flex justify-between items-center h-screen w-full lg:w-5/6 mx-auto lg:justify-center
         lg:px-6 ">
      <div className='lg:flex  rounded-lg bg-theme rounded-l-lg bg-opacity-90 w-full '>

        <div className="content w-full hidden lg:flex ">
          
            <img src={img}  alt="" className='rounded-xl w-4/5 mx-auto'/>
          
        </div>
        <div className="content lg:text-center w-full my-auto rounded-r-lg px-4 bg-theme bg-opacity-90 mt-6 lg:mt-0 py-16 lg:py-14">
          
            <h1 className='text-white text-5xl font-bold'>Hi! I'm Saad.</h1>
            <p className='text-white py-4 max-w-lg mx-auto'>Lorem ipsum dolor sit amet consectetur  adipisicing elit. In qui impedit  sunt, est molestiae ullam. Saepe voluptatum ducimus adipisci pariatur. adipisicing elit.  In qui impedit ipsum dolor sit amet consectetur</p>
            <button className='  text-white text-2xl'>Let's Connect <i className="fa-solid fa-arrow-right text-lg  p-[2px] "></i> </button>
            <div  className=' mx-auto w-2/3 text-center lg:w-1/2 mt-8 block border-2 border-[#b0aaaa] font-bold text-white 
            bg-[linear-gradient(90deg,#b004b0,#38097a)] p-4 rounded-2xl'>Discover my work</div>
          
          
        
        </div>
        
      </div>
      
       
       
   
    </div>
     
   </div>
   </>
  )
}

export default Header