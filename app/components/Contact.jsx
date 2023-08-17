import React from "react";
import axios from 'axios';
import { useState, useRef } from "react";
import contactImage from "../assets/images/contact.png";
import { Montserrat } from '@next/font/google';
import Image from "next/image";
import { Poppins } from '@next/font/google';
import Button from "../components/Button"
import emailjs from '@emailjs/browser';
import AlertMessage from "./AlertMessage";



const montserrat_700 = Montserrat({
  subsets:['latin'],
  weight:'700',
});
const poppins_normal = Poppins({
  subsets:['latin'],
  weight:'400',
});

const Contact = () => {

  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [message,setMessage] = useState('');
  const [showAlert,setshowAlert] = useState(false);
  const [showAlertType,setshowAlertType] = useState('');
  const form = useRef();

  const handleSubmit = () => {
    // e.preventDefault();
    emailjs.sendForm('service_2vi4rhx', 'template_rsnprx4', form.current, 'W0TOAJvKckCIRxOkN')
    .then((result) => {
        if(result.text == "OK"){
          setshowAlertType("green");
          setshowAlert(true);
        }
    }, (error) => {
      setshowAlertType("red");
      setshowAlert(true);
    });
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "message":
        setMessage(event.target.value);
        break;
       
    }

  };

  return (
    <div className='flex h-screen my-auto snap-start'>
      
      <div className='w-2/3 m-auto'>
        {showAlert && <AlertMessage type={showAlertType} />}
        <div className='flex my-auto'>
          <div className='flex w-1/2 px-4'>
            <Image src = {contactImage} alt="about" className="w-full my-auto rounded-lg" />
          </div>
          <div className='flex w-1/2'>
            <form className='w-3/5 mx-auto h-fit' ref={form}>
              <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md text-gray-100`}>
                  GET IN TOUCH
              </p>
              <p className={`${poppins_normal.className} pr-0 text-sm text-gray-100 mt-2`}>I would like to hear about your ideas,
                  let&apos;s have some coffee.
              </p>
              <p className='mt-4 text-gray-100'>Name</p>
              <input name="name" placeholder='John Doe' value={name} onChange={handleChange} className={`${poppins_normal.className} mt-2 w-full rounded-lg 
                text-gray-200 px-5 py-2 text-sm bg-[#111111] border-2 border-[#959595] rounded-md'`}/>
              <p className='mt-4 text-gray-100'>Email</p>
              <input name="email" placeholder='John@gmail.com' value={email} onChange={handleChange} className={`${poppins_normal.className} mt-2 w-full rounded-lg
                  text-gray-200 px-5 py-2 text-sm bg-[#111111] border-2 border-[#959595] rounded-md'`}/>
              <p className='mt-4 text-gray-100'>Message</p>
              <textarea name="message" rows={5} placeholder='Message' value={message} onChange={handleChange} className={`${poppins_normal.className} mt-2 w-full rounded-lg text-gray-200 px-5 py-2 text-sm bg-[#111111] border-2 border-[#959595] rounded-md'`}/>
              <div onClick={handleSubmit}>
                <Button buttonText={"Send Message"} />
              </div>
              
            </form>

            
          </div>
        </div>
      </div>
    </div>
   
  );
}

export default Contact;
