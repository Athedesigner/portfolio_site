// components/BackgroundImages.tsx
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

const BackgroundImages = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000 ${scrolled ? 'opacity-0' : 'opacity-100'}`}>
      <div className="absolute w-full h-1/2r">
        <Image src="/mountains/Layer1.png" alt="Image 1" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute w-full h-1/2">
        <Image src="/mountains/Layer2.png" alt="Image 2" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute w-full h-1/2">
        <Image src="/mountains/Layer3.png" alt="Image 3" layout="fill" objectFit="cover" />
      </div>
      <div className="absolute w-full h-1/2">
        <Image src="/mountains/Layer4.png" alt="Image 4" layout="fill" objectFit="cover" />
      </div>
    </div>
  );
};

export default BackgroundImages;
