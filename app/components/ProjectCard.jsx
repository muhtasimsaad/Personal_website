import React from "react"
import Image from "next/image"

function ProjectCard({item}) {
  return (
    <>
      <div className="img-box w-full lg2:w-auto flex justify-center items-center relative overflow-hidden rounded-3xl ">
        <Image src={item.img} alt="" style={{ width: "250px" }} className="w-full bg-white p-4" />
        <div className="p absolute top-[-100%] left-0 h-full w-full text-center bg-[#b004b0ee] px-2">
          
          
        
          
          {/* <h1 className="font-bold text-3xl">{item.title}</h1>
          <p className="my-4 w-full mx-auto">{item.description}</p> */}
          <div className="text-center h-full flex w-full mx-auto justify-between text-left">
            <div className="flex w-full justify-between text-center max-h-32 my-auto">
              <div className="w-full py-1">
                <p>Front End</p>
                <ul className="mt-2 list-disc flex flex-col items-center">

                {item.frontend.map((frontItem, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{frontItem}</span>
                  </li>
                ))}
                  
                  
                </ul>
              </div>
              <div className="w-full py-1">
                <p>Back End</p>
                <ul className="mt-2 list-disc flex flex-col items-center">

                {item.backend.map((frontItem, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    <span>{frontItem}</span>
                  </li>
                ))}
                  
                  
                </ul>
              </div>
            </div>
            

          </div>

          
        </div>
      </div>
    </>
  )
}

export default ProjectCard