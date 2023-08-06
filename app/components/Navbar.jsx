import React, { useState } from "react";
import AnchorLink from "react-anchor-link-smooth-scroll";
import "./styles.css";

function Navbar() {
  const [durum, setDurum] = useState(true);
  console.log(durum);

  // window.onscroll = function () {
  //   scrollFunction();
  // };

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
      <div className="navbarcon flex justify-between items-center px-4 lg:px-6  bg-transparent z-40 text-white  fixed w-full">
        <h1 className="text-4xl font-bold">Saad`&#39;`s</h1>
        
        <div className="gap-10 hidden lg:flex h-full py-1">
          <h1 className="text-lg font-bold cursor-pointer border-2 border-transparent hover:border-white hover:bg-theme rounded-2xl px-6 py-4">Projects</h1>
          <h1 className="text-lg font-bold cursor-pointer border-2 border-transparent hover:border-white hover:bg-theme rounded-2xl px-6 py-4">Let`&#39;`s Connect</h1>
          <div className="flex">
            <a href="https://github.com/muhtasimsaad" className="my-auto" target="_blank">
              <i className="fa-brands fa-github border-[1px] border-white p-2 rounded-[100%] hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]"></i>
            </a>
          </div>
          <div className="flex">
            <a href="https://www.linkedin.com/in/muhtasim-saad-512606120/" className="my-auto" target="_blank">
              <i className="fa-brands fa-linkedin border-[1px] border-white p-2 rounded-[100%] hover:hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]"></i>
            </a>
          </div>
          <div className="flex">
            <a href="https://www.facebook.com/muhtasim.billah" className="my-auto" target="_blank">
              <i className="fa-brands fa-facebook border-[1px] border-white p-2 rounded-[100%] hover:hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]"></i>
            </a>
          </div>
        </div>
        

        
      </div>
    </>
  );
}

export default Navbar;
