
"use client";

import React, { useEffect } from 'react';
import { DETAILED_SERVICES } from '../constants';

interface ServicesPageProps {
  onBack: () => void;
}

const ServicesPage: React.FC<ServicesPageProps> = ({ onBack }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-48 bg-stone-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-32">
          <button 
            onClick={onBack}
            className="flex items-center space-x-2 text-stone-400 hover:text-stone-900 transition-all mb-12 text-[10px] uppercase tracking-[0.3em]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Overview</span>
          </button>
          
          <h1 className="text-[10px] uppercase tracking-[0.5em] text-stone-500 mb-8">Scope of Expertise</h1>
          <h2 className="text-5xl md:text-8xl text-stone-900 font-light serif leading-none mb-12">
            List of Services & <br />
            <span className="italic">Accomplishments.</span>
          </h2>
          <p className="text-stone-500 text-sm italic tracking-wide">(Partial Listing as per Firm Records)</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <aside className="lg:col-span-4 border-l border-stone-200 pl-8 h-fit lg:sticky lg:top-32">
            <nav className="space-y-4">
              {DETAILED_SERVICES.map((section) => (
                <a 
                  key={section.category}
                  href={`#${section.category.split('.')[0].trim()}`}
                  className="block text-[10px] uppercase tracking-widest text-stone-400 hover:text-stone-900 transition-colors"
                >
                  {section.category}
                </a>
              ))}
            </nav>
          </aside>

          <div className="lg:col-span-8 space-y-24">
            {DETAILED_SERVICES.map((section) => (
              <section 
                key={section.category} 
                id={section.category.split('.')[0].trim()}
                className="scroll-mt-32"
              >
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-900 mb-10 pb-4 border-b border-stone-100 flex items-center justify-between">
                  <span>{section.category}</span>
                  <span className="text-[10px] text-stone-300 font-mono">0{DETAILED_SERVICES.indexOf(section) + 1}</span>
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12">
                  {section.items.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-4 group">
                      <span className="text-stone-300 group-hover:text-stone-900 transition-colors text-[10px] pt-1">•</span>
                      <span className="text-stone-600 font-light leading-relaxed group-hover:text-stone-900 transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>

        <section className="mt-48 py-24 border-t border-stone-200 text-center">
            <h4 className="serif text-3xl mb-8">Inquire regarding our nationwide scope.</h4>
            <p className="text-stone-500 mb-12 max-w-xl mx-auto font-light">
                Our offices in Cebu, Makati, and Clark allow us to deliver these business-minded legal solutions across all major business hubs in the Philippines.
            </p>
            <button 
                onClick={() => {
                    onBack();
                    setTimeout(() => {
                        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }}
                className="px-12 py-5 bg-stone-900 text-stone-50 text-[10px] uppercase tracking-[0.3em] hover:bg-stone-800 transition-all"
            >
                Start Legal Inquiry
            </button>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;
