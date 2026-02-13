"use client";

import React, { useState } from 'react';
import { Post } from '../types';

interface NewsProps {
  posts: Post[];
  isLoading?: boolean;
}

export default function News({ posts, isLoading }: NewsProps) {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const closeModal = () => setSelectedPost(null);

  if (isLoading) {
    return (
      <section id="news" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="animate-pulse text-stone-300 uppercase tracking-widest text-[10px]">Updating insights...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24">
          <div className="max-w-2xl">
            <h2 className="text-xs uppercase tracking-[0.3em] text-stone-500 mb-4">Latest Insights</h2>
            <h3 className="text-4xl md:text-5xl text-stone-900 font-light serif italic">Firm News & Articles</h3>
          </div>
          <button className="mt-8 md:mt-0 text-xs uppercase tracking-[0.2em] text-stone-900 border-b border-stone-900 pb-1 hover:text-stone-500 hover:border-stone-50 transition-all">
            View All Archives
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {posts.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer border-t border-stone-100 pt-8"
              onClick={() => setSelectedPost(item)}
            >
              <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-4 flex items-center">
                <span className="w-8 h-[1px] bg-stone-200 mr-3 transition-all group-hover:w-12 group-hover:bg-stone-900"></span>
                {item.category}
              </p>
              <h4 className="serif text-xl text-stone-900 mb-4 leading-snug group-hover:text-stone-600 transition-colors">
                {item.title}
              </h4>
              <div 
                className="text-stone-500 text-sm font-light leading-relaxed mb-6 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: item.excerpt }}
              />
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-stone-400 italic">
                  {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
                <span className="text-[9px] uppercase tracking-widest text-stone-900 opacity-0 group-hover:opacity-100 transition-opacity">Read Full Article →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Detail Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-stone-900/60 backdrop-blur-md animate-fade-in"
          onClick={closeModal}
        >
          <div 
            className="bg-stone-50 w-full max-w-5xl h-full max-h-[90vh] overflow-y-auto nordic-shadow relative p-8 md:p-20 animate-slide-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeModal}
              className="fixed md:absolute top-6 right-6 z-10 text-stone-400 hover:text-stone-900 transition-colors bg-white/80 p-2 rounded-full md:bg-transparent"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <article className="max-w-3xl mx-auto">
              <header className="mb-16 border-b border-stone-200 pb-12">
                <div className="flex items-center space-x-4 mb-6">
                   <span className="text-[10px] uppercase tracking-widest text-stone-500 bg-white px-3 py-1 border border-stone-200">
                    {selectedPost.category}
                   </span>
                   <span className="text-[10px] text-stone-400 italic">
                    {new Date(selectedPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                   </span>
                </div>
                <h2 className="serif text-4xl md:text-6xl text-stone-900 mb-8 leading-tight">{selectedPost.title}</h2>
                <div 
                    className="text-stone-500 text-lg font-light leading-relaxed italic"
                    dangerouslySetInnerHTML={{ __html: selectedPost.excerpt }}
                />
              </header>

              <div 
                className="prose prose-stone prose-lg max-w-none text-stone-700 font-light leading-relaxed space-y-6 news-content"
                dangerouslySetInnerHTML={{ __html: selectedPost.content }}
              />

              <footer className="mt-20 pt-12 border-t border-stone-200">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-left">
                        <p className="text-[10px] uppercase tracking-widest text-stone-400 mb-2">Legal Disclaimer</p>
                        <p className="text-[11px] text-stone-400 max-w-sm italic">This article is for informational purposes only and does not constitute legal advice.</p>
                    </div>
                    <button 
                        onClick={closeModal}
                        className="px-10 py-4 border border-stone-300 text-stone-900 text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all"
                    >
                        Back to Insights
                    </button>
                </div>
              </footer>
            </article>
          </div>
        </div>
      )}


    </section>
  );
}
