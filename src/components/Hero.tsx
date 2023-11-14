import React from "react";

import rectangle_1 from '../assets/Rectangle_1.png';
import rectangle_2 from '../assets/Rectangle_2.png';

// Definición de las propiedades del componente
interface HeroProps {
  appType: string;
  tagLine: string;
  description: string;
  mainActionText: string;
  extraActionText: string;
}

const Hero: React.FC<HeroProps> = ({ appType, tagLine, description, mainActionText, extraActionText }) => {
  return (
    <div id="product">
      <div style={{ textShadow: '0px 1px 1px gray' }} className="flex flex-col items-center justify-start font-sans min-h-96 bg-gray-50 lg:pt-10 lg:pb-20 lg:bg-hero lg:bg-cover">
        <div>
          <p className="p-3 pt-12 text-lg font-bold text-gray-500 lg:text-gray-300">{appType}</p>
        </div>
        <div>
          <p className="p-2 text-4xl font-bold text-center text-blue-800 lg:mx-auto lg:w-4/6 lg:text-5xl lg:text-gray-100">
            {tagLine}
          </p>
        </div>
        <div>
          <p className="p-4 pt-6 font-sans text-2xl leading-10 text-center text-gray-500 lg:text-gray-200">
            {description}
          </p>
        </div>
        <div className="relative z-50 flex flex-col items-center justify-between h-48 lg:space-x-8 pt-7 lg:pt-0 lg:flex-row lg:justify-between lg:w-90">
         
        </div>

      </div>

    </div>
  );
};

export default Hero;
