"use client";

import { useEffect, useState, CSSProperties } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

const BackgroundImages = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(true); // State for theme

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getStyle = (endPosition: number, offset: number): CSSProperties & { [key: string]: string | number } => ({
    '--bounce-up-end': `${endPosition}%`,
    opacity: 1 - (scrollPosition - offset) / 200,
    transform: `translateY(${Math.max(-1 * (1 - (scrollPosition - offset) / 2), endPosition)}%)`
  });

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-100'}`}>
      <div className="absolute w-full h-full bottom-0">
        <div
          className="absolute inset-0 translate-y-[35%] animate-bounce-up"
          style={getStyle(35, 400)}
        >
          <Image 
            src={isDarkMode ? "/mountains/Layer1.svg" : "/mountainswhite/mount1.svg"} 
            alt="Image 1" 
            layout="fill" 
            objectFit="cover"
            style={{ filter: isDarkMode ? 'brightness(0.5)' : 'brightness(0.95)' }} // Adjusted brightness for subtle effect
          />
        </div>
        <div
          className="absolute inset-0 translate-y-[40%] animate-bounce-up"
          style={getStyle(40, 300)}
        >
          <Image 
            src={isDarkMode ? "/mountains/Layer2.svg" : "/mountainswhite/mount2.svg"} 
            alt="Image 2" 
            layout="fill" 
            objectFit="cover"
            style={{ filter: isDarkMode ? 'brightness(0.5)' : 'brightness(0.95)' }} // Adjusted brightness for subtle effect
          />
        </div>
        <div
          className="absolute inset-0 translate-y-[45%] animate-bounce-up"
          style={getStyle(45, 200)}
        >
          <Image 
            src={isDarkMode ? "/mountains/Layer3.svg" : "/mountainswhite/mount3.svg"} 
            alt="Image 3" 
            layout="fill" 
            objectFit="cover"
            style={{ filter: isDarkMode ? 'brightness(0.5)' : 'brightness(0.95)' }} // Adjusted brightness for subtle effect
          />
        </div>
        <div
          className="absolute inset-0 translate-y-[50%] animate-bounce-up"
          style={getStyle(50, 100)}
        >
          <Image 
            src={isDarkMode ? "/mountains/Layer4.svg" : "/mountainswhite/mount4.svg"} 
            alt="Image 4" 
            layout="fill" 
            objectFit="cover"
            style={{ filter: isDarkMode ? 'brightness(0.5)' : 'brightness(0.95)' }} // Adjusted brightness for subtle effect
          />
        </div>
      </div>
      <div 
        onClick={toggleTheme}
        className={`fixed bottom-4 right-4 flex items-center justify-center w-12 h-12 rounded-full cursor-pointer ${isDarkMode ? 'bg-gray-800 text-yellow-300' : 'bg-gray-500 text-gray-700'} shadow-lg transition-all duration-300`}
      >
        <FontAwesomeIcon 
          icon={isDarkMode ? faSun : faMoon} 
          className={`text-white ${isDarkMode ? 'text-yellow-400' : 'text-gray-700'}`} 
          size="lg" 
        />
      </div>
    </div>
  );
};

export default BackgroundImages;
