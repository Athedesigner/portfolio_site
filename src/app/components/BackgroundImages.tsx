// components/BackgroundImages.tsx
"use client";

import { useEffect, useState, CSSProperties } from 'react';
import Image from 'next/image';

const BackgroundImages = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

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

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute w-full h-full bottom-0">
        <div
          className="absolute inset-0 translate-y-[35%] animate-bounce-up"
          style={getStyle(35, 400)}
        >
          <Image src="/mountains/Layer1.png" alt="Image 1" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute inset-0 translate-y-[40%] animate-bounce-up"
          style={getStyle(40, 300)}
        >
          <Image src="/mountains/Layer2.png" alt="Image 2" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute inset-0 translate-y-[45%] animate-bounce-up"
          style={getStyle(45, 200)}
        >
          <Image src="/mountains/Layer3.png" alt="Image 3" layout="fill" objectFit="cover" />
        </div>
        <div
          className="absolute inset-0 translate-y-[50%] animate-bounce-up"
          style={getStyle(50, 100)}
        >
          <Image src="/mountains/Layer4.png" alt="Image 4" layout="fill" objectFit="cover" />
        </div>
        <div className="vignette"></div> {/* Vignette overlay */}
      </div>
    </div>
  );
};

export default BackgroundImages;
