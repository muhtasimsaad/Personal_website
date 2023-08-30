import React, { useRef } from 'react';
import Navbar from '@/app/components/Navbar';
import Projects from "../app/components/Projects"
import '../app/globals.css'
import Image from 'next/image';
import { Montserrat } from '@next/font/google';
import { Poppins } from '@next/font/google';
import { Lobster } from '@next/font/google';
import { Owswald } from '@next/font/google';
import home from '../app/assets/images/home.png';
import about from '../app/assets/images/about.png';
import Button from '@/app/components/Button';
import AutoCarousol from '@/app/components/AutoCarousol';
import Slider from '@/app/components/Slider';
import { useState } from 'react';
import Contact from '@/app/components/Contact';
import { Oswald } from 'next/font/google';
import heroImage from "../app/assets/images/heroImage.png";
import heroImage2 from "../app/assets/images/heroImage2.png";
import heroImage3 from "../app/assets/images/heroImage3.png";
import heroImage4 from "../app/assets/images/heroImage4.png";
import path from "../app/assets/images/path.png";


const montserrat_bold = Montserrat({
  subsets:['latin'],
  weight:'900',
});
const oswald = Oswald({
  subsets:['latin'],
  weight:'400',
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

  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsOverviewRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const scrollReferences = [homeRef,aboutRef,projectsOverviewRef,projectsRef,contactRef];
  var [activeWindow, setActiveWindow] = useState(0);

  const handleSubmit = () => {

  }

  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    setActiveWindow(Math.floor(scrollTop/(window.innerHeight-2)));
  };

  return <div className='bg-background'>

    <div className='hidden lg:block'>
      <Navbar references={scrollReferences} activeWindow={activeWindow} />
      
    </div>


    <div className='w-full'>
      <div className='h-screen overflow-auto snap-mandatory snap-y' onScroll={handleScroll}>
        <div ref={homeRef} className='flex h-screen m-auto snap-start'>
          <div className='flex w-full px-3 py-10 mx-auto lg:m-auto lg:px-0 lg:w-2/3'>
            <div className='block lg:flex h-fit my-auto'>
                <div className='w-full lg:w-1/2 '>
                  <p className={`${montserrat_bold.className} text-gray-100 text-7xl lg:text-8xl h-fit my-3 lg:my-0 rounded-md`}>
                    Hello<span className='text-secondary'>.</span></p>
                  <p className={`${lobster.className} w-full text-5xl lg:text-6xl h-fit my-3 lg:my-0 rounded-md text-gray-100`}>
                    This is Saad</p>
                  <p className={`${poppins_normal.className} w-full text-xl lg:text-lg text-secondary my-3 lg:my-0`}>
                    Full Stack Developer</p>
                  <p className='pr-0 my-3 text-sm text-gray-100 xl:pr-12 lg:my-0'>With expertise in designing and developing web applications, I love creating seamless
                      user experice and tackling complex challenges.</p>
                  <div className='my-8 lg:my-0'>
                    <Button buttonText="Get In Touch" />
                  </div>
                </div>
                <div className="block w-full lg:my-auto lg:flex lg:w-1/2 h-fit ">
                  <Image src = {home} className="hidden lg:block" alt="home"/>
                  <div className="text-2xl w-full h-fit mx-auto block lg:hidden p-4 mt-6 bg-[#292929] text-white">
                    <div className='py-4 mx-auto max-w-fit'>
                      <div  className='flex mb-2 max-w-fit'>
                        <p className={` ${oswald.className}  uppercase`}>
                          creativity is
                        </p>
                        <Image className='ml-4' alt="heroImage" src={heroImage} />
                      </div>
                      <div  className='flex mb-2 max-w-fit'>
                        <div className='px-3 mr-3 rounded-full bg-secondary'></div>
                        <p className={` ${oswald.className}  uppercase`}>
                          allowing yourself
                        </p>
                      </div>
                      <div  className='flex mb-2 max-w-fit'>
                        <p className={` ${oswald.className}  uppercase`}>
                          to make mistakes
                        </p>
                        <Image className='ml-4' alt="heroImage" src={heroImage3} />
                      </div>
                      <div  className='flex mb-2 max-w-fit'>
                        <p className={` ${oswald.className}  uppercase`}>
                          art is knowing
                        </p>
                        <Image alt="heroImage" className='ml-4' src={heroImage2} />
                      </div>
                      <div  className='flex mb-2 max-w-fit'>
                        <Image alt="heroImage" className='mr-2' src={heroImage4} />
                        <p className={` ${oswald.className}  uppercase`}>
                          which ones to keep
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div ref={aboutRef} className='flex h-screen my-auto snap-start'>
          <div className='w-full m-auto lg:w-2/3'>
            <div className='block p-8 my-auto lg:flex lg:px-0'>
              <div className='flex w-full lg:w-1/2'>
                <div className='my-auto h-fit'>
                  <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md text-gray-100`}>
                      MORE<br />ON <span className='text-secondary'>ME</span>.
                  </p>
                  <p className='pr-0 text-sm text-gray-100 xl:pr-12'>Programming isn&apos;t just a job for me, it&apos;s a true passion.
                    I constantly explore new technologies to stay ahead of the curve, whether it&apos;s diving into backend systems 
                    or crafting beautiful front-end interfaces.</p>

                  <div className='flex my-2 lg:hidden'>
                    <Image alt="heroImage" src={path} className="w-6 mx-auto"/>
                  </div>

                  <p className='pr-0 mt-0 text-sm text-gray-100 xl:mt-8 xl:pr-12'>Beyond coding, I&apos;m also an avid gamer. I find inspiration 
                    in the creativity and immersive experiences that video games offer, which drives me to create engaging and 
                    interactive digital solutions.</p>

                  <div className='block w-full mt-2 lg:hidden'>
                    <Image src = {about} alt="about" className="w-full rounded-lg" />
                  </div>

                  <Button buttonText="See My Work" />
                </div>
              </div>
              <div className='hidden w-1/2 px-4 lg:block'>
                <Image src = {about} alt="about" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div ref={projectsOverviewRef} className='flex h-screen my-auto snap-start'>
          <div className='flex w-full h-full m-auto lg:w-2/3 '>
            <div className='h-fit my-auto'>
              <div className='flex'>
                <div className='flex g:w-1/2 '>
                  <div className='p-4 mx-auto lg:m-auto h-fit'>
                    <p className={`${montserrat_700.className} mt-8 w-full text-4xl h-fit my-auto rounded-md py-2 text-gray-100`}>
                      MY BEST<br />PROJECTS<span className='text-secondary'>.</span>
                    </p>
                    <p className='pr-0 text-sm text-gray-100 xl:pr-12'>On this website, you&apos;ll find a showcase of my best 
                      projects that demonstrate my skills, problem-solving abilities, and attention to detail tackling all things:
                    </p>

                    <div className='flex w-full my-8 lg:hidden lg:block'>
                      <AutoCarousol />
                    </div>

                    <p className='pr-0 mt-8 text-sm text-gray-100 xl:pr-12'>I invite you to explore my work and see how I can bring
                      your ideas to life. If you&apos;re looking for a dedicated professional who is passionate about delivering 
                      high-quality solutions.
                    </p>
                    <div className='my-6 lg:my-0' onClick={() => projectsRef.current.scrollIntoView({ behavior: 'smooth' })}>
                      <Button buttonText="Check Out My Projects" />
                    </div>
                  </div>
                </div>
                <div className='flex hidden w-full px-4 my-auto lg:block'>
                  <AutoCarousol />
                </div>
              </div>
              <div className='lg:mt-12'>
                <Slider />
              </div>
              
            </div>
            
          </div>
        </div>
        <div ref={projectsRef} className='flex h-screen my-auto snap-start'>
          <div className='w-full m-auto lg:w-5/6'>
            <Projects />
          </div>
        </div>
        <div ref={contactRef} >
          <Contact />
        </div>
      </div>
    </div>
  </div>
};

export default Index;