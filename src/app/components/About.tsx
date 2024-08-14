// components/About.tsx
"use client";

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
        <p className="text-lg text-center">
          Welcome to my portfolio! Here you will find information about my journey, experiences, and the projects I’ve worked on.
        </p>
      </div>
    </section>
  );
};

export default About;
