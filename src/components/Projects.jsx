import React, { useState } from "react";
import img1 from "../assets/images/project-img1.png";
import img2 from "../assets/images/project-img2.png";
import img3 from "../assets/images/project-img3.png";

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
      description: "Design & Development",
      backend:['asd1','asd2','asd32'],
      frontend:['asd1','asd32','asd3'],
      img: img1,
    },
    {
      id: 1,
      title: "Anfactor",
      description: "Design & Development",
      backend:['asd1','asd2','asd32'],
      frontend:['asd1','asd32','asd3'],
      img: img1,
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
        <div className="grid grid-cols-1 bg-red-400 p-10 justify-center items-center gap-8 lg:grid-cols-1
         tl:grid-cols-1  ">
          
          {durum === 1
            ? personal.map((item, i) => 

              <div className='block md:flex  px-1 lg:px-6 rounded-lg bg-theme rounded-2xl bg-opacity-90 w-full lg:w-5/6 py-6 mx-auto'>

                <div className="content w-full lg:w-2/5 mx-auto flex">
                    <div className="m-auto">
                      <ProjectCard key={i} item={item} />
                    </div>
                </div>
                <div className="content lg:text-center w-full my-auto px-4 bg-opacity-90 
                py-16 lg:py-14">
                    <h1 className='text-white text-2xl font-bold'>{item.title}</h1>
                    <p className='text-white py-4 max-w-lg mx-auto'>Welcome to my website! I'm Saad, a passionate full stack developer with a
                    strong background in software development. With expertise in designing and developing web applications, I 
                    love creating seamless user experiences and tackling complex challenges.</p>
                </div>

              </div>

            )
            : null}
            {durum === 2
            ? professional.map((item, i) => 
              <div className='block md:flex  px-1 lg:px-6 rounded-lg bg-theme rounded-2xl bg-opacity-90 w-full lg:w-5/6 py-6 mx-auto'>

                <div className="content w-full lg:w-2/5 mx-auto flex">
                    <div className="m-auto">
                      <ProjectCard key={i} item={item} />
                    </div>
                </div>
                <div className="content lg:text-center w-full my-auto px-4 bg-opacity-90 
                py-16 lg:py-14">
                    <h1 className='text-white text-2xl font-bold'>{item.title}</h1>
                    <p className='text-white py-4 max-w-lg mx-auto'>Welcome to my website! I'm Saad, a passionate full stack developer with a
                    strong background in software development. With expertise in designing and developing web applications, I 
                    love creating seamless user experiences and tackling complex challenges.</p>
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
