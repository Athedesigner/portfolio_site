// src/app/art.tsx
"use client";
import { useEffect, useState } from 'react';
import BackgroundImages from './components/BackgroundImages';
import Sidebar from './components/Sidebar';
import '../styles/globals.css';
import HelloAnimation from './components/HelloAnimation';

export default function Art() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [bounceTrigger, setBounceTrigger] = useState(true);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  const bounceAnimation = bounceTrigger ? 'animate-bounce' : '';

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
    <main className={`flex min-h-screen flex-col items-center justify-between px-[15%] md:px-24 pt-24 bg-black`}>
      <BackgroundImages />
      <div className={`logo fixed top-7 left-10 z-20 ${bounceAnimation}`}>
        <img src="/logo.png" alt="Logo" width={80} height={45} />
        <span className="cursive-text">arts</span>
      </div>
      <button
        className={`hamburger fixed top-12 right-10 z-50 ${bounceAnimation}`}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <div className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}>
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="relative z-10 text-white">
        <h1 className="text-4xl font-bold">Welcome to the Art Page</h1>
        <p className="mt-4 text-lg">Explore various art pieces and styles.</p>
        <RepeatComponent
          times={100}
          render={(index) => <br key={index} />}
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
