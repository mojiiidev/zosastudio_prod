
"use client";

import React, { useState, useEffect } from 'react';
import { NAV_ITEMS } from '../constants';

interface NavbarProps {
  onToggleServices?: (e?: React.MouseEvent) => void;
  currentView?: 'home' | 'services';
}

const Navbar: React.FC<NavbarProps> = ({ onToggleServices, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#services' && onToggleServices) {
      onToggleServices(e);
    } else if (currentView === 'services' && onToggleServices) {
      onToggleServices(e);
      // Wait for re-render then scroll
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || currentView === 'services' ? 'bg-stone-50/90 backdrop-blur-md py-4 border-b border-stone-200 shadow-sm' : 'bg-transparent py-8'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div 
          className="flex flex-col cursor-pointer"
          onClick={(e) => currentView === 'services' && onToggleServices && onToggleServices(e)}
        >
          <span className="serif text-xl font-bold tracking-tight text-stone-900 leading-none">
            Zosa Borromeo
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mt-1">
            Ong Vaño & Mirhan
          </span>
        </div>
        
        <div className="hidden md:flex space-x-10">
          {NAV_ITEMS.map((item) => (
            <a 
              key={item.href} 
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={`text-xs uppercase tracking-widest transition-colors duration-200 ${
                (item.href === '#services' && currentView === 'services') 
                ? 'text-stone-900 font-bold border-b border-stone-900' 
                : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button className="md:hidden text-stone-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
