import React from 'react';

interface StepProps {
  title: string;
  heading: string;
  description: string;
  img: string;
  alternate: boolean;
  isCarousel?: boolean;
  images?: string[];
}

const Step: React.FC<StepProps> = ({ title, heading, description, img, alternate, isCarousel = false, images = [] }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const row = "lg:items-center lg:flex lg:flex-row lg:justify-end";
  const rowReverse = "lg:items-center lg:flex lg:flex-row-reverse lg:justify-center";
  // Efecto para cambiar automáticamente las imágenes del carrusel
  React.useEffect(() => {
    if (isCarousel) {
      const timer = setTimeout(() => {
        nextSlide();
      }, 3000); // Cambiará la imagen cada 3 segundos

      // Limpieza del temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isCarousel]);

  return (
    <div className={alternate ? row : rowReverse}>
      <div className="lg:w-2/6 lg:-ml-20 lg:-mt-10 lg:flex lg:flex-col lg:justify-center lg:items-start">
        <p className="pb-5 text-2xl font-semibold text-center text-orange-400 transition-all hover:text-orange-500 lg:pb-0 lg:-mb-3 lg:text-lg lg:font-bold lg:text-left">{title}</p>
        <p className="p-5 text-4xl font-semibold leading-relaxed text-center text-blue-800 transition-all hover:text-blue-900 lg:pb-4 lg:text-3xl lg:pl-0 lg:font-bold lg:text-left">{heading}</p>
        <p className="p-5 pb-0 pl-10 pr-10 text-2xl leading-10 text-center text-gray-400 lg:w-5/6 lg:pb-0 lg:text-lg lg:text-left lg:p-0 lg:pl-0 lg:pr-0">{description}</p>
      </div>
      <div className="ml-10 lg:ml-0 lg:w-3/6 relative lg:-mt-32 lg:-mb-20 flex justify-center items-center">
        {isCarousel ? (
          <>
            {images.map((image, index) => (
              <div
                key={index}
                className={`transition-opacity duration-300 absolute inset-0 flex justify-center items-center ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
              >
                <img
                  src={image}
                  alt={`Slide ${index}`}
                  className="mx-auto w-2/4 h-64 object-contain" // Cambié w-3/4 a w-2/4 para reducir el ancho
                />
              </div>
            ))}

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* Puntos de navegación */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${currentIndex === index ? 'bg-blue-800' : 'bg-gray-400'}`}
                  onClick={() => setCurrentIndex(index)} // Llamar a setCurrentIndex para cambiar la imagen al hacer clic en un punto
                />
              ))}
            </div>


          </>
        ) : (
          <img src={img} alt={title} className="mx-auto w-3/4 h-64 object-contain" />
        )}
      </div>



    </div>
  );
}

export default Step;
