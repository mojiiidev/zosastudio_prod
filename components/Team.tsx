"use client";

import React, { useState } from 'react';
import { Partner } from '../types';

interface TeamProps {
  partners: Partner[];
  isLoading?: boolean;
}

export default function Team({ partners, isLoading }: TeamProps) {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const closeModal = () => setSelectedPartner(null);

  if (isLoading) {
    return (
      <section id="partners" className="py-32 bg-stone-100 flex items-center justify-center">
        <div className="animate-pulse text-stone-400 uppercase tracking-widest text-xs">Loading Partners...</div>
      </section>
    );
  }

  return (
    <section id="partners" className="py-32 bg-stone-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-4">Leadership</h2>
          <h3 className="text-4xl md:text-5xl text-stone-900 font-light serif italic">Partners in Excellence</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {partners.map((partner) => (
            <div 
              key={partner.id} 
              onClick={() => setSelectedPartner(partner)}
              className="bg-white p-4 nordic-shadow group transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col h-full"
            >
              <div className="relative overflow-hidden aspect-[4/5] mb-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={partner.imageUrl} 
                  alt={partner.name}
                  crossOrigin="anonymous"
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="text-[10px] text-white uppercase tracking-widest border border-white/30 px-4 py-2 backdrop-blur-sm">View Profile</span>
                </div>
              </div>
              <h4 className="serif text-lg text-stone-900 mb-1 leading-tight">{partner.name}</h4>
              <p className="text-[9px] uppercase tracking-widest text-stone-500 mb-3">{partner.title}</p>
              <p className="text-stone-600 text-[11px] leading-relaxed font-light line-clamp-3 mb-4 flex-grow">
                {partner.bio}
              </p>
            </div>
          ))}
        </div>
      </div>

      {selectedPartner && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-stone-900/60 backdrop-blur-sm animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto nordic-shadow relative flex flex-col md:flex-row animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 z-10 text-stone-400 hover:text-stone-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="w-full md:w-2/5 aspect-[4/5] md:aspect-auto">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={selectedPartner.imageUrl} 
                alt={selectedPartner.name}
                crossOrigin="anonymous"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            <div className="w-full md:w-3/5 p-8 md:p-12">
              <div className="mb-10">
                <h2 className="serif text-4xl text-stone-900 mb-2">{selectedPartner.name}</h2>
                <p className="text-xs uppercase tracking-[0.3em] text-stone-500 font-medium italic">{selectedPartner.title}</p>
              </div>

              <div className="space-y-10">
                <section>
                  <h4 className="text-[10px] uppercase tracking-widest text-stone-900 font-bold border-b border-stone-100 pb-3 mb-4">Practice Areas</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPartner.specialization.map(spec => (
                      <span key={spec} className="text-xs text-stone-600 bg-stone-50 px-3 py-1 border border-stone-100 rounded-full font-light">
                        {spec}
                      </span>
                    ))}
                  </div>
                </section>

                <section>
                  <h4 className="text-[10px] uppercase tracking-widest text-stone-900 font-bold border-b border-stone-100 pb-3 mb-4">Education</h4>
                  <ul className="space-y-2">
                    {selectedPartner.education.map((edu, idx) => (
                      <li key={idx} className="text-sm text-stone-600 font-light flex items-center space-x-3">
                        <span className="w-1.5 h-1.5 bg-stone-200 rounded-full flex-shrink-0"></span>
                        <span>{edu}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h4 className="text-[10px] uppercase tracking-widest text-stone-900 font-bold border-b border-stone-100 pb-3 mb-4">Contact</h4>
                  <div className="space-y-1 text-sm text-stone-600 font-light">
                    <p>{selectedPartner.email}</p>
                    <p>{selectedPartner.phone}</p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
