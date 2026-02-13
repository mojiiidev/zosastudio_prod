"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Practices from './components/Practices';
import Team from './components/Team';
import News from './components/News';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import ServicesPage from './components/ServicesPage';
import { fetchGraphQL, GET_PARTNERS_QUERY, GET_POSTS_QUERY } from './lib/wordpress';
import { Partner, Post, WPPartnerNode, WPPostNode } from './types';
import { PARTNERS as STATIC_PARTNERS, STATIC_POSTS } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'services'>('home');
  const [partners, setPartners] = useState<Partner[]>(STATIC_PARTNERS);
  const [posts, setPosts] = useState<Post[]>(STATIC_POSTS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Robust HTML stripping that converts breaks to newlines first
  const cleanText = useCallback((input: any = "") => {
    if (typeof input !== 'string') return "";
    return input
      .replace(/<br\s*\/?>/gi, '\n') // Convert <br> to newlines
      .replace(/<\/p>/gi, '\n')     // Convert paragraph ends to newlines
      .replace(/<[^>]*>?/gm, '')    // Strip all other tags
      .replace(/&nbsp;/g, ' ')      // Clean common entities
      .replace(/&#8211;/g, '–')
      .replace(/&#8212;/g, '—')
      .replace(/&amp;/g, '&')
      .trim();
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    
    async function loadData() {
      setIsLoading(true);
      setError(null);

      try {
        const [pResult, nResult] = await Promise.all([
          fetchGraphQL(GET_PARTNERS_QUERY, {}, controller.signal),
          fetchGraphQL(GET_POSTS_QUERY, {}, controller.signal)
        ]);

        if (pResult?.partners?.nodes?.length > 0) {
          const mappedPartners = pResult.partners.nodes.map((node: WPPartnerNode, i: number) => {
            const acf = node.partnerFields;

            // Utility to convert text/textarea into a list for the UI
            const getArrayFromField = (value: any, separator: string | RegExp) => {
              if (!value) return [];
              
              // If it's already an array (old repeater data), return it cleaned
              if (Array.isArray(value)) {
                return value.map(v => cleanText(v.name || v.degree || v)).filter(Boolean);
              }

              if (typeof value === 'string') {
                const stripped = cleanText(value);
                // Split by newlines (standard for textareas)
                const lines = stripped.split(/[\n\r]+/);
                
                // If we have a specific separator (like comma for specs), split further
                let finalParts: string[] = [];
                if (separator !== '\n') {
                  lines.forEach(line => {
                    finalParts = finalParts.concat(line.split(separator));
                  });
                } else {
                  finalParts = lines;
                }

                return finalParts.map(s => s.trim()).filter(Boolean);
              }
              return [];
            };

            return {
              id: node.id || `wp-${i}`,
              name: node.title,
              title: cleanText(acf?.title) || 'Partner',
              role: cleanText(acf?.role) || 'Legal Counsel',
              bio: cleanText(acf?.bio || node.content || node.excerpt || ""),
              imageUrl: acf?.photo?.node?.sourceUrl || node.featuredImage?.node?.sourceUrl || STATIC_PARTNERS[i % STATIC_PARTNERS.length].imageUrl,
              specialization: getArrayFromField(acf?.specializations, ','),
              education: getArrayFromField(acf?.education, '\n'),
              email: cleanText(acf?.email) || 'info@zosalaw.ph',
              phone: cleanText(acf?.phone) || '+63 (32) 231-1551',
            };
          });
          setPartners(mappedPartners);
        }

        if (nResult?.posts?.nodes?.length > 0) {
          const mappedPosts = nResult.posts.nodes.map((node: WPPostNode) => ({
            id: node.id,
            title: node.title,
            excerpt: cleanText(node.excerpt),
            content: node.content,
            date: node.date,
            slug: node.slug,
            category: node.categories?.nodes?.[0]?.name || 'Insights'
          }));
          setPosts(mappedPosts);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error("App sync error:", err);
        setError("CMS Sync Offline");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, [cleanText]);

  const toggleServices = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setView(prev => prev === 'home' ? 'services' : 'home');
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [view]);

  if (view === 'services') {
    return (
      <div className="min-h-screen bg-stone-50">
        <Navbar onToggleServices={toggleServices} currentView={view} />
        <ServicesPage onBack={() => setView('home')} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 selection:bg-stone-900 selection:text-stone-50 overflow-x-hidden">
      <Navbar onToggleServices={toggleServices} currentView={view} />
      
      {error && !isLoading && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-white shadow-xl border border-red-100 px-6 py-3 text-xs text-red-600 rounded-full flex items-center space-x-3 animate-fade-in">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
          <span className="font-medium tracking-tight">System Offline: Using Cache</span>
        </div>
      )}

      <main>
        <Hero onToggleServices={toggleServices} />
        
        <section id="firm" className="py-32 md:py-48 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <h2 className="text-[10px] uppercase tracking-[0.4em] text-stone-400 mb-6 font-semibold">Our Identity</h2>
                <h3 className="text-5xl md:text-6xl font-light text-stone-900 leading-tight mb-8 serif">
                  Strategic Partners <br />
                  <span className="italic text-stone-500">to Enterprise.</span>
                </h3>
              </div>
            </div>
            <div className="lg:col-span-7">
              <div className="max-w-2xl prose prose-stone text-stone-600 font-light leading-relaxed space-y-8 text-lg">
                <p className="text-stone-900 font-normal">
                  Zosa, Borromeo, Ong Vaño, & Mirhan Law Firm represents a legacy of over 50 years of extensive experience in the practice of Philippine law.
                </p>
                <p>
                  We act as a strategic legal partner to business owners, advising on corporate structuring, regulatory compliance, and high-stakes commercial litigation.
                </p>
                <p>
                  Our modern approach is grounded in deep-seated knowledge of local jurisprudence, ensuring that our clients are protected across all Philippine business hubs.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Practices onToggleServices={toggleServices} />
        <Team partners={partners} isLoading={isLoading} />
        <News posts={posts} isLoading={isLoading} />
        <ContactForm />
      </main>

      <Footer />
    </div>
  );
};

export default App;