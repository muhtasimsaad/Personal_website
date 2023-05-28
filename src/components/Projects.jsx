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
      title: "Business Startup",
      description: "Design & Development",
      img: img1,
    },
    
  ];

  const professional = [
    {
      id: 1,
      title: "Business Startup",
      description: "Design & Development",
      img: img1,
    },
    
  ];


  return (
    <>
      <div id="projects" className="p-6 projects bg-theme bg-opacity-90 mx-6 py-10">
        <h1 className="text-center text-white text-4xl font-bold py-6">Projects</h1>
        <p className="text-center max-w-[1000px] lg:px-6 mx-auto text-[#939191]">
          lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur,
          cupiditate! Molestiae placeat architecto nihil obcaecati illum minima
          incidunt dolores? Officia consectetur optio non totam cum eos soluta
          ipsa et quod.
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
        <div className="grid grid-cols-3 p-10 justify-center items-center gap-8 lg:grid-cols-2 tl:grid-cols-1  ">
          {durum === 1
            ? personal.map((item, i) => <ProjectCard key={i} item={item} />)
            : null}
            {durum === 2
            ? professional.map((item, i) => <ProjectCard key={i} item={item} />)
            : null}
        </div>
         
        
      </div>
    </>
  );
}

export default Projects;
