import React from "react";
import axios from 'axios';
import { useState } from "react";

const Contact = () => {


  const [email,setEmail] = useState('');
  const [name,setName] = useState('');
  const [message,setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    

    try {
      const response = await axios.post(
        'https://your-cloud-function-url',
        { email, name, message }
      );

      console.log(response.data); // Success message
      // Reset form fields
      setEmail('');
      setName('');
      setMessage('');
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleChange = (event) => {
    switch (event.target.name) {
      case "name":
        setName(event.target.name);
        break;
      case "email":
        setEmail(event.target.email);
        break;
      case "message":
        setMessage(event.target.message);
        break;
       
    }
  };

  return (
    <>
      <section class="bg-theme bg-opacity-95 mx-6 mt-12 ">
        <div class="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
            <h2 class="mb-4 text-4xl tracking-tight font-extrabold text-center text-white">Lets Talk</h2>
            <p class="mb-8 lg:mb-16 font-light text-center text-whie sm:text-xl w-full">Getting in touch has never been easier!</p>
            <form action="#" class="space-y-8" onSubmit={handleSubmit}>
                <div>
                    <label for="name" class="block mb-2 text-sm font-medium text-white mt-4">Your Name</label>
                    <input type="name" id="email" class="shadow-sm border bg-theme border-white border-4 text-white text-sm 
                     rounded-lg focus:ring-purple-600 hover:border-purple-400 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500 dark:shadow-sm-light" name="name" placeholder="name@example.com" onChange={handleChange} required/>
                 
                    <label for="email" class="block mb-2 text-sm font-medium text-white mt-4">Your email</label>
                    <input type="email" id="email" class="shadow-sm border bg-theme border-white border-4 text-white text-sm 
                    rounded-lg focus:ring-purple-600 hover:border-purple-400 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500 dark:shadow-sm-light" name="email" placeholder="name@example.com" onChange={handleChange} required/>
                 
                    <label for="message" class="block mb-2 text-sm font-medium text-white mt-4">Your message</label>
                    <textarea id="message" rows="6" class="shadow-sm border bg-theme border-white border-4 text-white text-sm 
                     rounded-lg focus:ring-purple-600 hover:border-purple-400 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 
                    dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                    dark:focus:border-primary-500 dark:shadow-sm-light" name="message"
                    placeholder="Leave a comment..." onChange={handleChange} ></textarea>
                </div>
                <div className="w-2/3 lg:w-1/3 mx-auto ">
                  <button type="submit" class="shadow-sm border bg-[linear-gradient(90deg,#b004b0,#38097a)] 
                  border-white hover:border-gray-700 border-4 text-white text-sm
                      rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 
                      dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 
                      dark:focus:border-primary-500 dark:shadow-sm-light ">Send message</button>
                </div>
                
                
            </form>
        </div>
      </section>
    </>
  );
}

export default Contact;
