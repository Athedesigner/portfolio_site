"use client";

import { useEffect, useState } from 'react';
import BackgroundImages from './components/BackgroundImages';
import Sidebar from './components/Sidebar';
import About from './components/About';
import './globals.css'; // Ensure this path points to your global stylesheet
import HelloAnimation from './components/HelloAnimation';

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bounceTrigger, setBounceTrigger] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

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

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      const { innerWidth, innerHeight } = window;
      const edgeThreshold = 10;
      if (
        e.clientX < edgeThreshold ||
        e.clientX > innerWidth - edgeThreshold ||
        e.clientY < edgeThreshold ||
        e.clientY > innerHeight - edgeThreshold
      ) {
        setIsCursorHidden(true);
      } else {
        setIsCursorHidden(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      setIsCursorHidden(true);
    };

    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  useEffect(() => {
    const handleThemeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener('themeChange', handleThemeChange as EventListener);

    return () => {
      window.removeEventListener('themeChange', handleThemeChange as EventListener);
    };
  }, []);

  const bounceAnimation = bounceTrigger ? 'animate-bounce' : '';
  const hamburgerIconColor = isDarkMode ? '#FFCF00' : 'black';

  if (isLoading) {
    return (
      <div className="h-full min-h-screen flex items-center justify-center">
        <div className="h-full w-full min-h-[500px] flex justify-center items-center">
          <HelloAnimation />
        </div>
      </div>
    );
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between px-[15%] md:px-24 pt-24 ${isDarkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'} custom-cursor`}
      onMouseEnter={() => setIsHovering(false)}
    >
      <div
        className={`cursor-circle ${isHovering ? 'cursor-hover' : ''} ${isCursorHidden ? 'hidden' : ''}`}
        style={{ top: `${cursorPosition.y}px`, left: `${cursorPosition.x}px` }}
      ></div>
      <BackgroundImages />
      <div
        className={`logo fixed top-7 left-10 z-20 ${bounceAnimation}`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={isDarkMode ? "/notionlogob.png" : "/notionlogow.png"}
          alt="Logo"
          width={80}
          height={45}
        />
      </div>
      <button
        className={`hamburger fixed top-12 right-10 z-50 ${bounceAnimation}`}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}>
          <div className="line" style={{ backgroundColor: hamburgerIconColor }} />
          <div className="line" style={{ backgroundColor: hamburgerIconColor }} />
          <div className="line" style={{ backgroundColor: hamburgerIconColor }} />
        </div>
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold">Welcome to my Portfolio!</h1>
        <p className="mt-4 text-lg">Scroll down to dive into my full journey!</p>
        <RepeatComponent
          times={100}
          render={(index) => <br key={index} />}
        />
      </div>
      {scrollPosition > 400 && <About />}
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
