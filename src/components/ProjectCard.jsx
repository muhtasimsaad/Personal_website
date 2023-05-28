import React from 'react'

function ProjectCard({item}) {
  return (
    <>
      <div className="img-box w-full lg2:w-auto flex justify-center items-center relative overflow-hidden rounded-3xl ">
        <img src={item.img} alt="" className='w-full' />
        <div className="p absolute top-[-100%] left-0 h-full w-full text-center bg-[#b004b0ee] pt-5 px-2">
          
          
        
          
          <h1 className="font-bold text-3xl">{item.title}</h1>
          <p className="my-4 w-4/5 mx-auto">{item.description}</p>
          <div className='text-center flex w-4/5 mx-auto mt-2 justify-between text-left'>
          <div className='w-1/2 p-4'>
              <p>Front End</p>
              <ul className='mt-2 list-disc flex flex-col items-center'>

              {item.frontend.map((frontItem) => (
                <li className='flex items-center'>
                  <span className='mr-2'>•</span>
                  <span>{frontItem}</span>
                </li>
              ))}
                
                
              </ul>
            </div>
            <div className='w-1/2 p-4'>
              <p>Back End</p>
              <ul className='mt-2 list-disc flex flex-col items-center'>
                {item.backend.map((backItem) => (
                  <li className='flex items-center'>
                    <span className='mr-2'>•</span>
                    <span>{backItem}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default ProjectCard