import React from 'react';
import Header from "../app/components/Header"
import Contact from "../app/components/Contact"
import Footer from "../app/components/Footer"
import Projects from "../app/components/Projects"
import '../app/globals.css'
import Image from 'next/image';
import { Montserrat } from '@next/font/google';
import { Poppins } from '@next/font/google';
import { Lobster } from '@next/font/google';
import home from '../app/assets/images/home.png';
import about from '../app/assets/images/about.png';

const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'900',
});
const montserrat_bold_600 = Montserrat({
  subsets:['latin'],
  weight:'600',
});
const montserrat_normal = Montserrat({
  subsets:['latin'],
  weight:'400',
});
const montserrat_700 = Montserrat({
  subsets:['latin'],
  weight:'700',
});
const poppins_bold = Poppins({
  subsets:['latin'],
  weight:'700',
});
const poppins_normal = Poppins({
  subsets:['latin'],
  weight:'400',
});
const lobster = Lobster({
  subsets:['latin'],
  weight:'400',
});

const Index = () => {

  return <div className='bg-background'>

<div className='w-4/6 mx-auto'>
  <nav className="w-full my-auto text-3xl h-fit">
    <div className="mx-auto max-w-7xl">
      <div className="relative flex items-center justify-between h-16">
        <div className="flex w-full">
          
          <div className="">
            <div className="flex">
              {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
              <a href="#" className={`${montserrat_bold.className} w-full text-3xl h-fit my-auto rounded-md py-2 text-xl text-secondary`} aria-current="page">MSO</a>
            </div>
          </div>
          <div className="flex ml-auto">
            <div className={`${poppins_normal.className} flex space-x-4 my-auto justify-center`}>
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-100 hover:text-secondary" aria-current="page">Home</a>
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-100 hover:text-secondary" aria-current="page">About</a>
              <a href="#" className="flex items-center px-3 py-2 text-sm text-gray-100 hover:text-secondary" aria-current="page">Projects</a>
              <a href="#" className="flex items-center px-12 py-2 text-lg transition border border-transparent rounded-md text-background bg-secondary hover:border-secondary hover:bg-background hover:text-secondary" aria-current="page">Contact</a>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </nav>
  <div className='flex mt-36'>
    <div className='w-1/2'>
      <p className={`${montserrat_bold.className} text-8xl h-fit my-auto rounded-md py-2`}> Hello<span className='text-secondary'>.</span></p>
      <p className={`${lobster.className} w-full text-6xl h-fit my-auto rounded-md py-2 text-gray-100`}> This is Saad</p>
      <p className={`${poppins_normal.className} w-full text-secondary`}>Full Stack Developer</p>
      <p className='pr-0 text-sm text-gray-100 xl:pr-12'>With expertise in designing and developing web applications, I love creating seamless
          user experice and tackling complex challenges.</p>

      <div className='mt-4 w-fit'>
        <p className={`${montserrat_bold_600.className} rounded-2xl px-12 py-2 text-background hover:text-secondary bg-secondary 
            hover:bg-background text-sm border-2 border-transparent hover:border-secondary cursor-pointer`}>Get In Touch</p>
      </div>
    </div>
    
    <div className='w-1/2'>
      <Image src = {home} className="" />
    </div>
    
  </div>
  <div className='flex mt-36'>
    <div className='w-1/2'>
      <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md py-2 text-gray-100`}>
        MORE<br />ON <span className='text-secondary'>ME</span>.
      </p>
      <p className='pr-0 text-sm text-gray-100 xl:pr-12'>Programming isn't just a job for me, it's a true passion.
        I constantly explore new technologies to stay ahead of the curve, whether it's diving into backend systems 
        or crafting beautiful front-end interfaces.</p>

      <p className='pr-0 mt-8 text-sm text-gray-100 xl:pr-12'>Beyond coding, I'm also an avid gamer. I find inspiration 
        in the creativity and immersive experiences that video games offer, which drives me to create engaging and 
        interactive digital solutions.</p>

      <div className='mt-4 w-fit'>
        <p className={`${montserrat_bold_600.className} rounded-2xl px-12 py-2 text-background hover:text-secondary bg-secondary 
            hover:bg-background text-sm border-2 border-transparent hover:border-secondary cursor-pointer`}>See My Work</p>
      </div>
    </div>
    
    <div className='w-1/2 px-4'>
      <Image src = {about} className="w-full rounded-lg" />
    </div>
    
  </div>
</div>
  
    
    {/* <Header/> 
    <Projects/>
    <Contact/>
    <Footer/> */}
  </div>
};

export default Index;