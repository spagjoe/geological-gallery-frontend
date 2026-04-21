import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const navBase = `px-4 py-2 rounded-lg font-roboto-mono text-sm transition-all duration-200`;
  const active = `bg-smoke-500/50 border border-smoke-300 text-white`;
  const inactive = `text-stone-400 hover:text-white`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-smoke-900/90 backdrop-blur-sm border-b border-smoke-700 py-3">
      <div className="container mx-auto max-w-7xl px-4 flex items-center justify-between">
        <NavLink to="/" className="font-roboto-mono text-white font-bold text-md lg:text-lg tracking-tight">
          mycool.rocks
        </NavLink>
        <div className="flex items-center gap-1">
          <NavLink to="/" end className={({ isActive }) => `${navBase} ${isActive ? active : inactive}`}>
            Home
          </NavLink>
          <NavLink to="/gallery" className={({ isActive }) => `${navBase} ${isActive ? active : inactive}`}>
            Gallery
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `${navBase} ${isActive ? active : inactive}`}>
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;