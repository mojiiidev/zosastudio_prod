
import React from 'react';
import { PRACTICE_AREAS } from '../constants';

interface PracticesProps {
  onToggleServices?: (e?: React.MouseEvent) => void;
}

const Practices: React.FC<PracticesProps> = ({ onToggleServices }) => {
  return (
    <section id="services" className="py-32 bg-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-stone-200 pb-12">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-4">Core Competencies</h2>
            <h3 className="text-4xl md:text-5xl text-stone-900 font-light">Our Services</h3>
          </div>
          <div className="mt-6 md:mt-0 md:max-w-xs space-y-6">
            <p className="text-stone-500 text-sm leading-relaxed font-light">
              Our practice is defined by a deep understanding of the Philippine legal landscape and the specific commercial needs of our clients.
            </p>
            <button 
                onClick={onToggleServices}
                className="text-[10px] uppercase tracking-widest text-stone-900 font-bold border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-500 transition-all"
            >
                View Exhaustive Service List →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
          {PRACTICE_AREAS.map((practice) => (
            <div key={practice.id} className="group cursor-default">
              <div className="text-3xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100 transform group-hover:scale-110">
                {practice.icon}
              </div>
              <h4 className="serif text-xl mb-4 text-stone-900 group-hover:text-stone-700 transition-colors">
                {practice.title}
              </h4>
              <p className="text-stone-500 text-sm leading-relaxed font-light">
                {practice.description}
              </p>
              <div className="mt-6 h-[1px] w-0 bg-stone-900 group-hover:w-full transition-all duration-500 opacity-20"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Practices;
