"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import BackgroundImages from './components/BackgroundImages';
import Sidebar from './components/Sidebar';
import './globals.css'; // Ensure this path points to your global stylesheet

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bounceTrigger, setBounceTrigger] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      if (window.scrollY === 0) {
        setBounceTrigger(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setBounceTrigger(false), 1000);
    return () => clearTimeout(timer);
  }, [bounceTrigger]);

  const bounceAnimation = bounceTrigger ? 'animate-bounce' : '';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-[15%] md:px-24 pt-24 bg-black">
      <BackgroundImages />
      <div className={`logo fixed top-7 left-10 z-20 ${bounceAnimation}`}>
        <Image src="/logo.png" alt="Logo" width={80} height={45} />
      </div>
      <div className={`hamburger fixed top-7 right-10 z-20 ${bounceAnimation}`} onClick={() => setSidebarOpen(!isSidebarOpen)}>
        <Image src="/hamburger-icon.png" alt="Hamburger Menu" width={40} height={40} />
      </div>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="relative z-10 text-white">
        <h1 className="text-4xl font-bold">Welcome to My Next.js App</h1>
        <p className="mt-4 text-lg">Scroll down to see the background images disappear.</p>
        <RepeatComponent
          times={100}
          render={(index) => <br />}
        />
      </div>
    </main>
  );
}

interface RepeatComponentProps {
  times: number;
  render: (index: number) => JSX.Element;
}

const RepeatComponent: React.FC<RepeatComponentProps> = ({ times, render }) => {
  return (
    <>
      {Array.from({ length: times }).map((_, index) =>
        render(index)
      )}
    </>
  );
};
