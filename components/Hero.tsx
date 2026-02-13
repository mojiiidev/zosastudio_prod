
import React from 'react';
import Image from 'next/image';

interface HeroProps {
  onToggleServices?: (e?: React.MouseEvent) => void;
}

const Hero: React.FC<HeroProps> = ({ onToggleServices }) => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden bg-stone-100">
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
          alt=""
          fill
          className="object-cover opacity-20 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50/0 via-stone-50/50 to-stone-50"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h2 className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-8 animate-fade-in">
          Established Excellence in the Philippines
        </h2>
        <h1 className="text-5xl md:text-8xl font-light text-stone-900 leading-tight mb-8 serif">
          Trust. Speed. <span className="serif italic">Quality.</span>
        </h1>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-stone-800 text-xl md:text-2xl font-medium leading-relaxed">
            With over 50 years of extensive experience in the practice of law in the Philippines.
            <br />
            <span className="text-stone-500 font-light italic text-lg md:text-xl">A modern approach grounded on Philippine Law.</span>
          </p>
          <p className="text-stone-600 text-base md:text-lg font-light leading-relaxed">
            We represent businesses in high-stakes disputes—commercial litigation, labor cases, and criminal matters like qualified theft, estafa, and corporate-related offenses. We also handle land acquisitions, property transactions, leasing, and the due diligence that fuels expansion.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mt-12">
          <a href="#contact" className="px-10 py-4 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition-all">
            Start Consultation
          </a>
          <a 
            href="#services" 
            onClick={onToggleServices}
            className="px-10 py-4 border border-stone-300 text-stone-900 text-xs uppercase tracking-widest hover:bg-stone-100 transition-all"
          >
            Full Service List
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
