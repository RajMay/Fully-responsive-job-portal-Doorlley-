import React, { useEffect, useState } from 'react';


const LogoCarousel = () => {
  const [position, setPosition] = useState(0);

 
  const logos = [
    { id: 1, name: 'Google', src: '/images/google.png' },
    { id: 2, name: 'BWM ', src: '/images/bmw.png' },
    { id: 3, name: 'Amazon', src: '/images/amazon.png' },
    { id: 4, name: 'BlackRock', src: '/images/blackrock.png' },
    { id: 5, name: 'Microsoft', src: '/images/microsoft.png' },
    { id: 6, name: 'Nvadia', src: '/images/Nvidia.png' },
    { id: 7, name: 'Google', src: '/images/google.png' },
    { id: 8, name: 'BWM Mediasoft', src: '/images/bmw.png' },
    { id: 9, name: 'Amazon', src: '/images/amazon.png' },
    { id: 10, name: 'BlackRock', src: '/images/blackrock.png' },
    { id: 11, name: 'Microsoft', src: '/images/microsoft.png' },
    { id: 12, name: 'Nvidia', src: '/images/Nvidia.png' },
  ];

  useEffect(() => {
    const animate = () => {
      setPosition((prevPosition) => {
        if (prevPosition <= -50) {
          return 0;
        }
        return prevPosition - 0.1;  
      });
    };

    const animationFrame = setInterval(animate, 16);  // ~60fps
    return () => clearInterval(animationFrame);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white py-10">
      <div className="relative max-w-6xl mx-auto px-4">
        <h2 className="text-2xl text-[#6A38C2] font-bold text-center mb-8">
          Partners
        </h2>

        <div className="relative overflow-hidden bg-gray-90 bg-opacity-80 shadow-sm rounded-full p-2 ">
          <div 
            className="flex items-center gap-20 transition-transform duration-100"
            style={{ transform: `translateX(${position}%)` }}
          >
            {logos.map((logo) => (
              <div
                key={logo.id}
                className="flex-shrink-0 w-26 h-20 flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={`${logo.name} `}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCarousel;
