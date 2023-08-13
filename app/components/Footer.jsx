import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";


function Footer() {
  return (
    <>
      <div className="footer bg-theme ">
        <div className="wrap flex justify-between items-center px-12 text-white font-bold py-6 tl:px-4 tl:py-4 ">
          <h1 className="text-3xl">Saad`&#39;`s</h1>
          <div className="flex gap-4 cursor-pointer ">
            <a href="https://github.com/muhtasimsaad" target="_blank">
              <i className="fa-brands fa-github border-[1px] border-white p-2 rounded-[100%] hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]"></i>
            </a>
            <a href="https://www.linkedin.com/in/muhtasim-saad-512606120/" target="_blank">
              <i className="fa-brands fa-linkedin border-[1px] border-white p-2 rounded-[100%] hover:hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]"></i>
            </a>
            <a href="https://www.facebook.com/muhtasim.billah" target="_blank">
              <i className="fa-brands fa-facebook border-[1px] border-white p-2 rounded-[100%] hover:hover:bg-[linear-gradient(90deg,#b004b0,#38097a)]"></i>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
