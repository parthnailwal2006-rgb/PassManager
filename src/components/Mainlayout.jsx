import React, { useState, useLayoutEffect } from 'react';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

const Mainlayout = () => {
  const [mode, setMode] = useState(
    () => localStorage.getItem('theme') || 'light'
  );

  useLayoutEffect(() => {
    document.body.classList.toggle('bg-gray-900', mode === 'dark');
    document.body.classList.toggle('bg-neutral-200', mode === 'light');

    localStorage.setItem('theme', mode);
  }, [mode]);

  function toggletheme() {
    setMode(prev => prev === 'light' ? 'dark' : 'light');
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar mode={mode} toggletheme={toggletheme} />
      <main className="flex-1 flex flex-col items-center justify-center w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default Mainlayout;
