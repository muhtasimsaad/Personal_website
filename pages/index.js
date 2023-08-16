import React, { useRef } from 'react';
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
import Button from '@/app/components/Button';
import AutoCarousol from '@/app/components/AutoCarousol';
import contact from "../app/assets/images/contact.png";

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
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToView = (key) => {

    console.log('-->'+key);
    if (key == 'home') {
      homeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'about') {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'projects') {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    if (key == 'contact') {
      projectsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return <div className='bg-background'>

    <nav className="fixed w-screen text-3xl bg-transparent bg-red-100 h-fit">
      <div className="w-2/3 mx-auto bg-background">
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
                  <div onClick={() => scrollToView('home')} className="flex items-center px-3 py-2 text-sm text-gray-100 cursor-pointer hover:text-secondary" aria-current="page">Home</div>
                  <div onClick={() => scrollToView('about')} className="flex items-center px-3 py-2 text-sm text-gray-100 cursor-pointer hover:text-secondary" aria-current="page">About</div>
                  <div onClick={() => scrollToView('projects')} className="flex items-center px-3 py-2 text-sm text-gray-100 cursor-pointer hover:text-secondary" aria-current="page">Projects</div>
                  <div onClick={() => scrollToView('contact')} className="flex items-center px-12 py-2 text-lg transition border border-transparent rounded-md cursor-pointer text-background bg-secondary hover:border-secondary hover:bg-background hover:text-secondary" aria-current="page">Contact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>


    <div className='w-full px-2'>
      <div className='h-screen overflow-auto snap-mandatory snap-y'>
        <div ref={homeRef} className='flex h-screen my-auto snap-start'>
          <div className='w-2/3 m-auto'>
            <div className='flex my-auto'>
              <div className='w-1/2'>
                <p className={`${montserrat_bold.className} text-gray-100 text-8xl h-fit my-auto rounded-md py-2`}> Hello<span className='text-secondary'>.</span></p>
                <p className={`${lobster.className} w-full text-6xl h-fit my-auto rounded-md py-2 text-gray-100`}> This is Saad</p>
                <p className={`${poppins_normal.className} w-full text-secondary`}>Full Stack Developer</p>
                <p className='pr-0 text-sm text-gray-100 xl:pr-12'>With expertise in designing and developing web applications, I love creating seamless
                    user experice and tackling complex challenges.</p>
                <Button buttonText="Get In Touch" />
              </div>
              
              
              <div className='w-1/2'>
                <Image src = {home} className="" alt="home"/>
              </div>
            </div>
          </div>
        </div>
        <div ref={aboutRef} className='flex h-screen my-auto snap-start'>
          <div className='w-2/3 m-auto'>
            <div className='flex my-auto'>
              <div className='flex w-1/2'>
                <div className='my-auto h-fit'>
                  <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md py-2 text-gray-100`}>
                      MORE<br />ON <span className='text-secondary'>ME</span>.
                  </p>
                  <p className='pr-0 text-sm text-gray-100 xl:pr-12'>Programming isn&apos;t just a job for me, it&apos;s a true passion.
                    I constantly explore new technologies to stay ahead of the curve, whether it&apos;s diving into backend systems 
                    or crafting beautiful front-end interfaces.</p>

                  <p className='pr-0 mt-8 text-sm text-gray-100 xl:pr-12'>Beyond coding, I&apos;m also an avid gamer. I find inspiration 
                    in the creativity and immersive experiences that video games offer, which drives me to create engaging and 
                    interactive digital solutions.</p>

                  <Button buttonText="See My Work" />
                </div>
              </div>
              <div className='w-1/2 px-4'>
                <Image src = {about} alt="about" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
        <div className='flex h-screen my-auto snap-start'>
          <div className='w-2/3 m-auto'>
            <div className='flex my-auto'>
              <div className='flex w-1/2'>
                <div className='my-auto h-fit'>
                  <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md py-2 text-gray-100`}>
                    MY BEST<br />PROJECTS<span className='text-secondary'>.</span>
                  </p>
                  <p className='pr-0 text-sm text-gray-100 xl:pr-12'>On this website, you&apos;ll find a showcase of my best 
                    projects that demonstrate my skills, problem-solving abilities, and attention to detail tackling all things:
                  </p>

                  <p className='pr-0 mt-8 text-sm text-gray-100 xl:pr-12'>I invite you to explore my work and see how I can bring
                    your ideas to life. If you're looking for a dedicated professional who is passionate about delivering 
                    high-quality solutions.
                  </p>

                  <Button buttonText="Check Out My Projects" />
                </div>
              </div>
              <div className='flex w-1/2 px-4'>
                <AutoCarousol />
              </div>
            </div>
          </div>
        </div>
        <div ref={projectsRef} className='flex h-screen my-auto snap-start'>
          <div className='w-2/3 m-auto'>
            <Projects />
          </div>
        </div>
        <div ref={aboutRef} className='flex h-screen my-auto snap-start '>
          <div className='w-2/3 m-auto'>
            <div className='flex my-auto'>
              <div className='w-1/2 px-4'>
                <Image src = {contact} alt="about" className="w-full rounded-lg" />
              </div>
              <div className='flex w-1/2 bg-red-100'>
                <div className='w-2/3 mx-auto my-auto bg-red-400 h-fit'>
                  <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md py-2 text-gray-100`}>
                      GET IN TOUCH
                  </p>
                  <p className='pr-0 text-sm text-gray-100 xl:pr-12'>I would like to hear about your ideas,
                  let&apos;s have some coffee.</p>

                  <p className='pr-0 mt-8 text-sm text-gray-100 xl:pr-12'>Beyond coding, I&apos;m also an avid gamer. I find inspiration 
                    in the creativity and immersive experiences that video games offer, which drives me to create engaging and 
                    interactive digital solutions.</p>

                  <Button buttonText="See My Work" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
};

export default Index;