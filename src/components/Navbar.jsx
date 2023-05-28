import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./styles.css";

function Navbar() {
  const [durum, setDurum] = useState(true);
  console.log(durum);

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.querySelector(".navbarcon").style.background = "linear-gradient(to right, #171717, #44403c)";
    } else {
      document.querySelector(".navbarcon").style.background =
        "rgba(0, 0, 0, 0)";
      document.querySelector(".tl").style.background = "rgba(100, 0, 0, 0)";
    }
  }

  return (
    <>
      <div className="navbarcon flex justify-between items-center px-20 py-6 bg-transparent z-40 text-white lg:px-6 fixed w-full">
        <h1 className="text-4xl  font-bold ">Saad's</h1>
        <div className="gap-10 hidden lg:flex">
          <h1 className="text-lg font-bold cursor-pointer hover:text-gray-600">Projects</h1>
          <h1 className="text-lg font-bold cursor-pointer hover:text-gray-600">Skills</h1>
          <h1 className="text-lg font-bold cursor-pointer hover:text-gray-600">Let's Connect</h1>
        </div>
        

        
      </div>
    </>
  );
}

export default Navbar;
