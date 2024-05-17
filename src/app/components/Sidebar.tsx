// components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 md:w-64 w-2/3 h-full h-fullblack bg-sidebar text-white transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-30`}
    >
      <button
  className="absolute top-6 right-10 rounded-full text-6xl text-yellow-400" // Adjust the padding to increase button size
  onClick={onClose}
>
        &times;
      </button>
      <nav className="mt-16">
        <ul className="space-y-4">
          <li><a href="#section1" className="block px-4 py-2">Section 1</a></li>
          <li><a href="#section2" className="block px-4 py-2">Section 2</a></li>
          <li><a href="#section3" className="block px-4 py-2">Section 3</a></li>
          <li><a href="#section4" className="block px-4 py-2">Section 4</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
