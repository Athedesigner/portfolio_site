// page.tsx
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
  const [isLoading, setIsLoading] = useState(true); // State to track whether the component is loading
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isCursorHidden, setIsCursorHidden] = useState(false); // State to track if cursor should be hidden

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
    // Simulate loading delay for 2 seconds (you can replace this with actual loading logic)
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number; }) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });

      // Check if the cursor is near the edge of the viewport
      const { innerWidth, innerHeight } = window;
      const edgeThreshold = 10; // Define how close to the edge the cursor should be to hide
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

  const bounceAnimation = bounceTrigger ? 'animate-bounce' : '';

  if (isLoading) {
    // Render loading animation while content is loading
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
      className={`flex min-h-screen flex-col items-center justify-between px-[15%] md:px-24 pt-24 bg-black custom-cursor`}
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
        <img src="/logo1.png" alt="Logo" width={80} height={45} />
      </div>
      <button
        className={`hamburger fixed top-12 right-10 z-50 ${bounceAnimation}`}
        onClick={() => setSidebarOpen(!isSidebarOpen)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={`hamburger-icon ${isSidebarOpen ? 'active' : ''}`}>
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </button>
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="relative z-10 text-white flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold">Welcome to my Portfolio!</h1>
        <p className="mt-4 text-lg">Scroll down to dive into my full journey!</p>
        {/* Add more content here */}
        <RepeatComponent
          times={100}
          render={(index) => <br key={index} />}
        />
      </div>
      {scrollPosition > 400 && <About />} {/* Ensure About is conditionally rendered */}
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
