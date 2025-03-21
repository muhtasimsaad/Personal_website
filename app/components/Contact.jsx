import React from "react";
import { useState, useRef } from "react";
import contactImage from "../assets/images/contact.png";
import { Montserrat } from '@next/font/google';
import Image from "next/image";
import { Poppins } from '@next/font/google';
import Button from "../components/Button"
import AlertMessage from "./AlertMessage";
import Footer from "./Footer";
import { sendEmail } from "@/functions/solver";



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
  const [showAlert,setShowAlert] = useState(false);
  const [showAlertType,setShowAlertType] = useState('');
  const form = useRef();

  const handleSubmit = () => {
    const result = 'Someone wanted to keep in touch. Name: '+name+' ,Email: '+email+' , message : '+message;
    try{
      sendEmail(result);
      setShowAlertType('green');
      setShowAlert(true);
    }
    catch(exception){
      setShowAlertType('red');
      setShowAlert(true);
    }
    
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

  return (<>
    <div className='h-screen my-auto snap-start'>
      <div className='flex w-full h-5/6 p-8 m-auto lg:p-0 lg:w-2/3'>
        <div className="mt-auto h-full w-full lg:h-auto mt-auto pb-8">
          {showAlert && <AlertMessage type={showAlertType} />}
          <div className='block my-auto lg:flex'>
            <div className='hidden w-full px-4 lg:flex lg:w-1/2'>
              <Image src = {contactImage} alt="about" className="w-full my-auto rounded-lg" />
            </div>
            <div className='flex w-full mt-6 lg:w-1/2 lg:mt-0'>
              <div className='mx-auto lg:w-3/5 h-fit' ref={form}>
                <p className={`${montserrat_700.className} w-full text-4xl h-fit my-auto rounded-md text-gray-100`}>
                    GET IN TOUCH
                </p>
                <p className={`${poppins_normal.className}  mt-4 lg:mt-0 pr-0 text-sm text-gray-100 mt-2`}>I would like to hear about your ideas,
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
                
              </div>

            
            </div>
          </div>
          
        </div>
        
        
      </div>
      <div className="flex h-1/6 bg-black">
        <Footer />
      </div>
    </div>
    
    </>
  );
}

export default Contact;
