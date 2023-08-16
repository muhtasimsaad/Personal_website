import React, { useState } from "react";
import img1 from "../assets/images/project-img1.png";
import genofax from "../assets/images/genofax.png";
import anfactor from "../assets/images/anfactor.png";
import Image from "next/image"
import { Montserrat } from '@next/font/google';
import Button from "./button";
import about from "../assets/images/about.png"
import backendImage from "../assets/images/backendTest.png";
import genofaxImage from "../assets/images/genofax.png";

import "./styles.css";
import ProjectCard from "./ProjectCard";

const montserrat_700 = Montserrat({
  subsets:['latin'],
  weight:'700',
});

function Projects() {
  const [durum, setDurum] = useState(1);

  

  

  const personal = [
    {
      id: 1,
      title: "Personal 1",
      description: "Design & Development",
      backend:["asd1","asd2","asd32"],
      frontend:["asd1","asd32","asd3"],
      img: img1,
    },
    {
      id: 2,
      title: "Personal 2",
      description: "Design & Development",
      backend:["asd1","asd2","asd32"],
      frontend:["asd1","asd32","asd3"],
      img: img1,
    },
    
  ];

  const professional = [
    {
      id: 1,
      title: "Genofax",
      description: "Genofax specializes in understanding the genome and the microbiome using" +
        " artificial intelligence and big data analytics to develop futuristic medical interventions." +
        " Our existing medical and healthcare sector usually focuses on disease symptom management" +
        " rather than prevention and cure.",
      backend:["Laravel","DomPDF"],
      frontend:["Next.js","Axios","Tailwind css"],
      url:"https://genofax.com",
      img: genofax,
    },
    {
      id: 1,
      title: "Anfactor",
      description: "Anfactor offers plug and play installation of a chatbot that users can easily custom tailor"+
      "according to their specific business needs.Anfactor offers reliable reports to track and optimize your chatbot`&#39;`s performance." +
      "You can improve customer experience using past chats. Use this knowledge to build better chatbot "+
      "stories and improve customer satisfaction.",
      backend:["Django",],
      frontend:["Django","Alpine.js","Tailwind css", "Vue.js"],
      url:"https://anfactor.com",
      img: anfactor,
    },
    
  ];


  return (
    <>
      <div className='flex h-screen my-auto snap-start'>
          <div className='w-5/6 m-auto'>
            <div className='flex my-auto'>
              <div className='flex w-1/2'>
                <div className='h-fit'>
                  <p className={`${montserrat_700.className} w-full text-4xl rounded-md pb-2 text-gray-100`}>
                      PROJECT:
                  </p>
                  <p className='pr-0 text-sm text-gray-100 xl:pr-12'>
                    Genofax specializes in understanding the genome and the microbiome using artificial 
                    intelligence and big data analytics to develop futuristic medical interventions. Our 
                    existing medical and healthcare sector usually focuses on disease symptom management 
                    rather than prevention and cure.  
                  </p>
                  <div className="">
                    <div className="flex mt-6">
                      <p className="mr-3 text-lg text-secondary">Category:</p>
                      <p className="my-auto text-md h-fit">Professional Project</p>
                    </div>
                    <div className="flex mt-6">
                      <p className="mr-3 text-lg text-secondary">Frontend:</p>
                      <Image src={backendImage}  alt="backend"/>
                    </div>
                    <div className="flex mt-6">
                      <p className="mr-3 text-lg text-secondary">Backend:</p>
                      <Image src={backendImage}  alt="backend"/>
                    </div>
                    <div className="mt-6">
                      <Button buttonText={"Visit Genofax"} />
                    </div>
                    
                  </div>
                </div>
              </div>
              <div className='w-1/2 px-4 mt-2'>
                <Image src = {genofax} alt="about" className="object-scale-down rounded-lg" />
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Projects;
