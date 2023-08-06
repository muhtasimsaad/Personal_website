import React from "react"
import Navbar from "./Navbar"
import "./styles.css"
import Image from "next/image"
import img from "../assets/images/coding.jpg";

function Header() {
  return (
   <>
   <div id="home" className=" bg-center bg-cover bg-no-repeat h-screen flex flex-col ">
    <Navbar/>
    <div className="wrapper flex justify-between items-center h-screen w-full lg:w-5/6 mx-auto lg:justify-center
         lg:px-6 ">
      <div className="lg:flex  rounded-lg bg-theme rounded-l-lg bg-opacity-90 w-full py-6">

        <div className="content w-full hidden lg:flex">
          <div className="my-auto ml-auto w-4/5">
            <Image src={img} alt="" className="rounded-lg mx-auto h-auto object-contain" />
          </div> 
        </div>

        <div className="content lg:text-center w-full my-auto rounded-r-lg px-4 bg-theme bg-opacity-90 mt-6 lg:mt-0 py-16 lg:py-14">
          
            <h1 className="text-white text-5xl font-bold">Hi! I`&#39;`m Saad.</h1>
            <p className="text-white py-4 max-w-lg mx-auto">Welcome to my website! I`&#39;`m Saad, a passionate full stack developer with a
             strong background in software development. With expertise in designing and developing web applications, I 
             love creating seamless user experiences and tackling complex challenges.</p>

             <p className="text-white py-4 max-w-lg mx-auto">Programming isn`&#39;`t just a job for me; it`&#39;`s my true passion. I constantly explore
              new technologies to stay ahead of the curve, whether it`&#39;`s diving into backend systems or crafting beautiful front-end 
              interfaces. Beyond coding, I`&#39;`m also an avid gamer. I find inspiration in the creativity and immersive experiences that 
              video games offer, which drives me to create engaging and interactive digital solutions.</p>

              

            <button className="  text-white text-2xl mt-4 ">Let`&#39;`s Connect and make some thing Amazing !</button>
             
          
          
        
        </div>
        
      </div>
      
       
       
   
    </div>
     
   </div>
   </>
  )
}

export default Header