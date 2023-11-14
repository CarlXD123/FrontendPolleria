import React from 'react';
import './App.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Step from './components/Step';
import Footer from './components/Footer';

import logo from "./components/images/logoPolleria.png";
import Rectangle_3 from './assets/polloupdate.png';
import Rectangle_4 from './assets/Rectangle_4.png';
import Rectangle_5 from './assets/polloupdate.png';
import pollo from './components/images/banner_2.jpg';
import pollo2 from './components/images/parilla-clasica-familiar.png';
import pollo3 from './components/images/pollo_entero.png';
interface HeroProps {
  appType: string;
  tagLine: string;
  description: string;
  mainActionText: string;
  extraActionText: string;
}

interface StepProps {
  title: string;
  heading: string;
  description: string;
  img: string;
  alternate: boolean;
  isCarousel?: boolean; // marca esto como opcional
  images?: string[];    // marca esto como opcional
}

interface BottomLeadProps {
  actionText: string;
  description: string;
  mainActionText: string;
  extraActionText: string;
}

interface NavbarProps {
  logo: string;
}

interface FooterProps {
  logo: string;
}

interface AppData {
  hero: HeroProps;
  step1: StepProps;
  step2: StepProps;
  step3: StepProps;
  bottomLead: BottomLeadProps;
}
const App: React.FC = () => {
  const data: AppData = {
    hero: {
      appType: 'LA FAMILIA',
      tagLine: 'BIENVENIDOS A LA FAMILIA, DONDE EL SABOR DEL POLLO NO PUEDE SER MAS RICO',
      description: 'La calidad antes que la cantidad',
      mainActionText: 'Playstore',
      extraActionText: 'App Store',
    },
    step1: {
      title: 'Create an account',
      heading: 'Create/login to an existing account to get started',
      description: 'An account is created with your email and a desired password',
      img: Rectangle_3,
      alternate: false,
    },
    step2: {
      title: 'Explore while shopping',
      heading: 'Shop for your favorites meal as e dey hot.',
      description: 'Shop for your favorite meals or drinks and enjoy while doing it.',
      img: Rectangle_4,
      alternate: true,
    },
    step3: {
      title: 'Algunos de nuestros productos',
      heading: "Nos gusta siempre ofrecer lo mejor",
      description: "En la polleria la familia siempre nos enfocamos en traer la calidad de nuestros productos",
      img: Rectangle_5,
      alternate: false,
      isCarousel: true,
      images: [pollo, pollo2, pollo3],
    },
    bottomLead: {
      actionText: 'Download the app now.',
      description: 'Available on your favourite store. Start your premium experience now.',
      mainActionText: 'Playstore',
      extraActionText: 'App Store',
    },

  };

  

  return (
    // __________________________TODO: ____________________
    // Add Montserrat font to everything (body)

    <div className="box-border">
      <div className="flex flex-col">

        <Navbar logo={logo} />
        <Hero
          appType={data.hero.appType}
          tagLine={data.hero.tagLine}
          description={data.hero.description}
          mainActionText={data.hero.mainActionText}
          extraActionText={data.hero.extraActionText}
        />

        <div id="divider" className="rounded-full ring-2 ring-gray-200 lg:w-1/2 lg:mx-auto "></div>

        <div id="faq" className="pt-20 mb-20 text-3xl font-semibold text-center text-blue-800 lg:font-bold">Productos </div>
       
        <br></br>
        <br></br>
        <Step {...data.step3} />
        <br></br>
        <br></br>
        <br></br>

        <Footer logo={logo} />
      </div>

    </div>
  );

}

export default App;
