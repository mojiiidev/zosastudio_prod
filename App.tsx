"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
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

  const parser = useMemo(() => typeof window !== 'undefined' ? new DOMParser() : null, []);

  const stripHtml = useCallback((html: string = "") => {
    if (!html || !parser) return html || "";
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  }, [parser]);

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

        // Process Partners
        if (pResult?.partners?.nodes?.length > 0) {
          const mappedPartners = pResult.partners.nodes.map((node: WPPartnerNode, i: number) => {
            const acf = node.partnerFields;

            // Helper to handle the transition from repeater (array) to text (string)
            // This ensures .map() doesn't fail on the new string fields
            const getArrayFromField = (value: any, separator: string | RegExp = /[\n,]/) => {
              if (typeof value === 'string') {
                return value.split(separator).map(s => s.trim()).filter(Boolean);
              }
              if (Array.isArray(value)) {
                return value.map((item: any) => item.name || item.degree || item);
              }
              return [];
            };

            return {
              id: node.id || `wp-${i}`,
              name: node.title,
              title: acf?.title || 'Partner',
              role: acf?.role || 'Legal Counsel',
              bio: acf?.bio || stripHtml(node.content || node.excerpt || "Partner at Zosa Borromeo Law."),
              imageUrl: acf?.photo?.node?.sourceUrl || node.featuredImage?.node?.sourceUrl || STATIC_PARTNERS[i % STATIC_PARTNERS.length].imageUrl,
              specialization: getArrayFromField(acf?.specializations, ','),
              education: getArrayFromField(acf?.education, '\n'),
              email: acf?.email || 'info@zosalaw.ph',
              phone: acf?.phone || '+63 (32) 231-1551',
            };
          });
          setPartners(mappedPartners);
        }

        // Process News/Posts
        if (nResult?.posts?.nodes?.length > 0) {
          const mappedPosts = nResult.posts.nodes.map((node: WPPostNode) => ({
            id: node.id,
            title: node.title,
            excerpt: node.excerpt,
            content: node.content,
            date: node.date,
            slug: node.slug,
            category: node.categories?.nodes?.[0]?.name || 'Insights'
          }));
          setPosts(mappedPosts);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error("App: Failed to initialize data", err);
        setError("Failed to sync with WordPress.");
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
    return () => controller.abort();
  }, [stripHtml]);

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
          <span className="font-medium tracking-tight">Offline Mode: Displaying cached content</span>
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
                  Our modern approach is grounded in deep-seated knowledge of local jurisprudence, ensuring that our clients are protected across all Philippine business hubs including Cebu, Makati, and Clark.
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