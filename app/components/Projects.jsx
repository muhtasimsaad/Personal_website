import React, { useState } from "react";
import genofax from "../assets/images/genofax.png";
import anfactor from "../assets/images/anfactor.png";
import Image from "next/image"
import { Montserrat } from '@next/font/google';
import Button from "./button";
import backendImage from "../assets/images/backendTest.png";
import carouselNext from "../assets/images/carouselNext.svg";
import "./styles.css";


const montserrat_700 = Montserrat({
  subsets:['latin'],
  weight:'700',
});




function Projects() {
  let [active, setActive] = useState(1);

  const handleProjectChange = (key) => {
    const act = (active+1);
    const data = (act%projectArray.length);
    setActive(data);
    console.log(data);
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
      backend:[backendImage,backendImage],
      frontend:[backendImage,backendImage],
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
      backend:[backendImage,backendImage],
      frontend:[backendImage,backendImage],
      url:"https://genofax.com",
      img: genofax,
    },
    {
      id: 2,
      title: "Sudoku Solver",
      description: "Introducing my advanced Sudoku solver! This powerful tool adeptly cracks any Sudoku puzzle you feed it." +
       "Simply input your puzzle, and watch as the solver employs smart algorithms to swiftly unveil the solution. Say goodbye" +
       " to puzzling frustrations and hello to solved Sudokus, thanks to this efficient solver.",
      category:"Professional Project",
      backend:[backendImage,backendImage],
      frontend:[backendImage,backendImage],
      url:"https://genofax.com",
      img: genofax,
    },
    
    
  ];


  return (
    <>
      <div className='flex h-screen my-auto pt-1/3 '>
          <div className='w-5/6 m-auto '>
            <div className='flex my-auto'>
              <div className='flex w-1/2'>
                <div className='h-fit'>
                  <p className={`${montserrat_700.className} w-full text-4xl rounded-md pb-2 text-gray-100`}>
                       {projectArray[active].title } 
                  </p>
                  <p className='pr-0 overflow-hidden text-sm text-gray-100 h-42 xl:pr-12'>
                    {projectArray[active].description} 
                  </p>
                  <div className="">
                    <div className="flex mt-6">
                      <p className="mr-3 text-lg text-secondary">Category:</p>
                      <p className="my-auto text-md h-fit text-gray-100">{projectArray[active].category}</p>
                    </div>
                    <div className="flex mt-6">
                      <p className="mr-3 text-lg text-secondary">Frontend:</p>
                        {projectArray[active].frontend.map((image, index) => (
                          <Image key={index} src={image} alt={`Image ${index}`} className="mr-2" />
                        ))}
                    </div>
                    <div className="flex mt-6">
                      <p className="mr-3 text-lg text-secondary">Backend:</p>
                        {projectArray[active].backend.map((image, index) => (
                          <Image key={index} src={image} alt={`Image ${index}`} className="mr-2"/>
                        ))}
                    </div>
                    <div className="mt-6">
                      <Button buttonText={`Visit ${projectArray[active].title}`} />
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className='relative flex w-96 p-4 mt-2 ml-4 bg-gray-100'>
                <Image src={projectArray[active].img} alt="about" className="object-scale-down bg-gray-400 rounded-lg" />
                <div className="absolute inset-0 flex items-center justify-between">
                  <div onClick={() => handleProjectChange("negative")} className="flex px-3 py-2 mx-1 border-2 border-transparent rounded-full cursor-pointer hover:border-gray-900 bg-secondary">
                    <Image src={carouselNext} alt="next" className="mx-auto rotate-[180deg] rounded-full w-4" />
                  </div>
                  <div onClick={() => handleProjectChange("positive")} className="flex px-3 py-2 mx-1 border-2 border-transparent rounded-full cursor-pointer hover:border-gray-900 bg-secondary">
                    <Image src={carouselNext} alt="next" className="mx-auto rotate-[0deg] rounded-full w-4" />
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
