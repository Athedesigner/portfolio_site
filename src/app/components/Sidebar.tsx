// src/app/components/Sidebar.tsx
import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed top-0 right-0 md:w-64 w-2/3 h-full bg-sidebar text-white transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out z-30`}
    >
      <nav className="mt-16">
        <ul className="space-y-4">
          <li><a href="#section1" className="block px-4 py-2" onClick={onClose}>Section 1</a></li>
          <li><a href="#section2" className="block px-4 py-2" onClick={onClose}>Section 2</a></li>
          <li><a href="#section3" className="block px-4 py-2" onClick={onClose}>Section 3</a></li>
          <li><a href="#section4" className="block px-4 py-2" onClick={onClose}>Section 4</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
