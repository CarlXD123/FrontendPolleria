import React from "react";

// Definición de las propiedades del componente
interface FooterProps {
  logo: string;
}

const Footer: React.FC<FooterProps> = ({ logo }) => {
  return (
    <div id="contact" className="flex items-center justify-between h-20 px-8 bg-brightRed shadow-md text-white">
       <a href="/" className="pl-7 logo lg:ml-10">
        <img style={{ width: '100px', height: '79px' }} src={logo} alt="logo" />
      </a>

      <div className="flex items-center justify-around w-2/3 pt-5 lg:pt-0 lg:w-1/3 ">
        <a href="https://m.facebook.com/PolleriaLaFamiliaOficial1/">
          <svg className="text-orange-600 hover:text-orange-700" width="30" height="30" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.2106 0.48291H1.75153C1.04307 0.48291 0.470703 1.05528 0.470703 1.76374V31.2229C0.470703 31.9313 1.04307 32.5037 1.75153 32.5037H31.2106C31.9191 32.5037 32.4915 31.9313 32.4915 31.2229V1.76374C32.4915 1.05528 31.9191 0.48291 31.2106 0.48291ZM27.5122 9.82897H24.9546C22.9493 9.82897 22.561 10.7816 22.561 12.1825V15.2685H27.3481L26.7237 20.0996H22.561V32.5037H17.5698V20.1036H13.3951V15.2685H17.5698V11.7062C17.5698 7.57151 20.0954 5.31805 23.7858 5.31805C25.555 5.31805 27.072 5.45013 27.5163 5.51017V9.82897H27.5122Z" fill="currentColor" /></svg>
        </a>
      </div>
      <div className="mt-10 text-lg text-blue-800 lg:mt-0">
        Copyright 2023 La Familia
      </div>
    </div>
  );
};

export default Footer;
