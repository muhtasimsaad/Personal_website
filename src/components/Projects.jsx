import React, { useState } from "react";
import img1 from "../assets/images/project-img1.png";
import genofax from "../assets/images/genofax.png";
import anfactor from "../assets/images/anfactor.png";

import "./styles.css";
import ProjectCard from "./ProjectCard";

function Projects() {
  const [durum, setDurum] = useState(1);

  const personal = [
    {
      id: 1,
      title: "Personal 1",
      description: "Design & Development",
      backend:['asd1','asd2','asd32'],
      frontend:['asd1','asd32','asd3'],
      img: img1,
    },
    {
      id: 2,
      title: "Personal 2",
      description: "Design & Development",
      backend:['asd1','asd2','asd32'],
      frontend:['asd1','asd32','asd3'],
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
      backend:['Laravel','DomPDF'],
      frontend:['Next.js','Axios','Tailwind css'],
      url:"https://genofax.com",
      img: genofax,
    },
    {
      id: 1,
      title: "Anfactor",
      description: "Anfactor offers plug and play installation of a chatbot that users can easily custom tailor"+
      "according to their specific business needs.Anfactor offers reliable reports to track and optimize your chatbot's performance." +
      "You can improve customer experience using past chats. Use this knowledge to build better chatbot "+
      "stories and improve customer satisfaction.",
      backend:['Django',],
      frontend:['Django','Alpine.js','Tailwind css', 'Vue.js'],
      url:"https://anfactor.com",
      img: anfactor,
    },
    
  ];


  return (
    <>
      <div id="projects" className="p-6 bg-theme bg-opacity-90 mx-2 py-10 w-full lg:w-4/5 mx-auto rounded-lg">
        <h1 className="text-center text-white text-4xl font-bold py-6">Projects</h1>
        <p className="text-center max-w-[1000px] lg:px-6 mx-auto text-gray-200">
            On this website, you'll find a showcase of my projects that demonstrate my skills, problem-solving abilities, and attention to
            detail. I invite you to explore my work and see how I can bring your ideas to life. If you're looking for a dedicated
            professional who is passionate about delivering high-quality solutions.  
        </p>
        <div className="flex justify-center items-center gap-4 mt-12 mb-2 ">
        <div
            onClick={() => setDurum(1)}
            className={`px-6 py-2 cursor-pointer text-white font-bold text-lg
             border-2 border-white  bg-[#171717] rounded-[6px] ${
              durum === 1 ? "bg-[linear-gradient(90deg,#b004b0,#38097a)]" : "hover:border-gray-700"
            }  `}
          >
            Personal Projects
          </div>


          <div
            onClick={() => setDurum(2)}
            className={`px-6 py-2 cursor-pointer text-white font-bold text-lg
             border-2 border-white  bg-[#171717] rounded-[6px] ${
              durum === 2 ? "bg-[linear-gradient(90deg,#b004b0,#38097a)]" : "hover:border-gray-700"
            }  `}
          >
            Professional Projects
          </div>
          
        </div>
        <div className="grid grid-cols-1 p-10 justify-center items-center gap-8 lg:grid-cols-1
         tl:grid-cols-1  ">

        {durum === 2 &&
          <p className="text-center max-w-[1000px] lg:px-6 mx-auto text-gray-200 my-8">
            The projects showcased here are the property of their respective clients or former employer(s). I worked on these projects in a 
            professional capacity, focusing on specific aspects or tasks. I do not claim any ownership rights over these projects, which 
            remain the exclusive property of the clients and organizations I worked for. The purpose of featuring them is to demonstrate 
            my professional skills and experience. For further inquiries or verification, please contact me using the provided information.
          </p>
        }
          
          {durum === 1
            ? personal.map((item, i) => 

              <div className='block md:flex  px-1 lg:px-6 rounded-lg bg-theme rounded-2xl bg-opacity-90 w-full lg:w-5/6 py-6 mx-auto'>

                <div className="content w-full lg:w-2/5 mx-auto flex">
                    <div className="m-auto">
                      <ProjectCard key={i} item={item} />
                    </div>
                </div>

                
                
              </div>

            )
            : null}
            {durum === 2
            ? professional.map((item, i) => 
              <div className='block md:flex  px-1 lg:px-6 rounded-lg bg-theme rounded-2xl bg-opacity-90 w-full lg:w-5/6 py-6 mx-auto'>

                <div className="content w-full mt-4 lg:w-2/5 mx-auto flex">
                    <div className="m-auto">
                      <ProjectCard key={i} item={item} />
                    </div>
                </div>
                <div className="block">
                  <div className="content lg:text-center w-full my-auto px-4 bg-opacity-90 
                  py-16 lg:py-0 max-h-64">
                      <h1 className='text-white text-2xl font-bold'>{item.title}</h1>
                      <p className='text-white py-4 max-w-lg mx-auto'>{item.description}</p>
                  </div>
                  <a href={item.url} target="_blank">
                    <div className="mt-4 px-2 py-2 cursor-pointer text-white font-bold text-sm text-center mx-8 md:mx-auto md:w-3/4 lg:w-2/3
                            border-2 border-white  bg-[#171717] rounded-[6px] hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]">
                        Visit {item.title}
                    </div>
                  </a>
                  
                </div>

              </div>
            )
            : null}
        </div>
         
        
      </div>
    </>
  );
}

export default Projects;
