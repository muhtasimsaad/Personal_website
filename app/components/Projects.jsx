import React, { useState } from "react";
import genofax from "../assets/images/genofax.png";
import anfactor from "../assets/images/anfactor.png";
import logo from "../assets/images/logo.png";
import sudoku from "../assets/images/sudoku.png";
import Image from "next/image"
import { Montserrat } from '@next/font/google';
import Button from "./Button";
import carouselNext from "../assets/images/carouselNext.svg";
import { sendEmail } from "@/functions/solver";

import "./styles.css";


const montserrat_700 = Montserrat({
  subsets:['latin'],
  weight:'700',
});




function Projects() {
  let [active, setActive] = useState(1);

  const handleProjectChange = (key) => {
    sendEmail('Someone came to Projects');
    const act = (active+1);
    const data = (act%projectArray.length);
    setActive(data);
    // console.log(data);
  }

  const projectArray = [
    {
      id: 0,
      title: "Anfactor",
      description: "Anfactor offers plug and play installation of a chatbot that users can easily custom tailor"+
      "according to their specific business needs.Anfactor offers reliable reports to track and optimize your chatbot's performance." +
      "You can improve customer experience using past chats. Use this knowledge to build better chatbot "+
      "stories and improve customer satisfaction.",
      category:"Professional Project",
      backend:"Django, Python, PostgreSQL",
      frontend:"Django, Tailwind CSS",
      url:"https://anfactor.com",
      img: anfactor,
    },
    {
      id: 1,
      title: "Genofax",
      description: "Genofax specializes in understanding the genome and the microbiome using" +
        " artificial intelligence and big data analytics and machine learning techniques to develop futuristic medical interventions." +
        " Our existing medical and healthcare sector usually focuses on disease symptom management" +
        " rather than prevention and cure. Please visit genofax for more information.",
      category:"Professional Project",
      backend:"Laravel, MySQL",
      frontend:"Next.js, Tailwind CSS",
      url:"https://genofax.com",
      img: genofax,
    },
    {
      id: 2,
      title: "Sudoku Solver",
      description: "Introducing my advanced Sudoku solver! This powerful tool adeptly cracks any Sudoku puzzle you feed it." +
       "Simply input your puzzle, and watch as the solver employs smart algorithms to swiftly unveil the solution. Say goodbye" +
       " to puzzling frustrations and hello to solved Sudokus, thanks to this efficient solver.",
      category:"Personal Project",
      backend:"Node.js, Google Cloud",
      frontend:"Next.js, Tailwind CSS",
      url:"/sudoku",
      img: sudoku,
    },
    {
      id: 3,
      title: "ohFridge !!",
      description: "ohFridge is your ultimate inventory management app designed to keep track of your fridge and pantry effortlessly."+
        "With built-in quantity control and family sharing you can easily manipulate items and monitor stock levels in real-time.",
      category:"Personal Project",
      backend:"Laravel, AWS, vercel",
      frontend:"react native",
      url:"/ohFridge",
      img: logo,
    },
    
    
  ];

  const handleVisit = (key) => {
    window.open(key, '_blank');
  }

  return (
    <>
      <div className='flex h-screen p-8 my-auto '>
          <div className='w-full m-auto lg:w-5/6'>
            <div className='block my-auto lg:flex'>
              <div className="block w-5/6 mx-auto lg:flex">
                <div className='block w-full lg:flex lg:w-2/3 '>
                  <div className='my-4 h-fit'>
                    <p className={`${montserrat_700.className} w-full text-4xl rounded-md text-gray-100`}>
                        {projectArray[active].title } 
                    </p>
                    <div className='relative flex w-full h-32 my-8 bg-gray-300 rounded-lg lg:hidden'>
                      <Image src={projectArray[active].img} alt="about" className="mx-auto bg-gray-400 rounded-lg w-fit" />
                      <div className="absolute inset-0 flex items-center justify-between">
                        <div onClick={() => handleProjectChange("negative")} className="flex px-3 py-2 mx-1 border-2 border-transparent rounded-full cursor-pointer hover:border-gray-900 bg-secondary">
                          <Image src={carouselNext} alt="next" className="mx-auto rotate-[180deg] rounded-full w-4" />
                        </div>
                        <div onClick={() => handleProjectChange("positive")} className="flex px-3 py-2 mx-1 border-2 border-transparent rounded-full cursor-pointer hover:border-gray-900 bg-secondary">
                          <Image src={carouselNext} alt="next" className="mx-auto rotate-[0deg] rounded-full w-4" />
                        </div>
                      </div>
                    </div>
                    <p className='mt-0 lg:mt-4 pr-0 h-auto lg:h-42 overflow-hidden text-sm lg:text-lg text-gray-100 xl:pr-12'>
                      {projectArray[active].description}
                    </p>
                    <div className="">
                      <div className="flex mt-6">
                        <p className="mr-3 text-lg text-secondary">Category: <span className="text-gray-100">{projectArray[active].category}</span></p>
                      </div>
                      <div className="flex mt-6">
                        <p className="mr-3 text-lg text-secondary">Frontend: <span className="text-gray-100">{projectArray[active].frontend}</span></p>
                      </div>
                      <div className="flex mt-6">
                        <p className="mr-3 text-lg text-secondary">Backend: <span className="text-gray-100">{projectArray[active].backend}</span></p>
                      </div>
                      <div className="mt-6" onClick={() => handleVisit(projectArray[active].url)}>
                        <Button buttonText={`Visit ${projectArray[active].title}`} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='relative hidden p-4 mt-2 ml-4 bg-gray-400 rounded-md lg:flex w-96 z-0'>
                  <Image src={projectArray[active].img} alt="about" className="object-scale-down bg-gray-400 rounded-lg max-h-96 my-auto" />
                  <div className="absolute inset-0 flex items-center justify-between">
                    <div onClick={() => handleProjectChange("negative")} className="flex px-3 py-2 mx-1 border-2 border-transparent rounded-full cursor-pointer hover:border-gray-900 bg-secondary/[.2] hover:bg-secondary">
                      <Image src={carouselNext} alt="next" className="mx-auto rotate-[180deg] rounded-full w-4" />
                    </div>
                    <div onClick={() => handleProjectChange("positive")} className="flex px-3 py-2 mx-1 border-2 border-transparent rounded-full cursor-pointer hover:border-gray-900 bg-secondary/[.2] hover:bg-secondary">
                      <Image src={carouselNext} alt="next" className="mx-auto rotate-[0deg] rounded-full w-4" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </>
  );
}

export default Projects;
