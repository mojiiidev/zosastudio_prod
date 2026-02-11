
"use client";

import React, { useState } from 'react';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    inquiry: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', inquiry: '' });
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 bg-stone-900 text-stone-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <div>
            <h2 className="text-xs uppercase tracking-[0.4em] text-stone-400 mb-8">Get in Touch</h2>
            <h3 className="text-4xl md:text-5xl font-light serif leading-tight mb-8">
              Start a Conversation <br />
              <span className="italic text-stone-400">with our Partners.</span>
            </h3>
            <p className="text-stone-400 text-lg font-light leading-relaxed mb-12 max-w-md">
              Whether you are a growing enterprise or an established corporation, our team is ready to provide the strategic legal counsel you require.
            </p>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Priority Response</h4>
                <p className="text-sm font-light">Inquiries are typically addressed within one business day.</p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-stone-500 mb-2">Secure Communication</h4>
                <p className="text-sm font-light">Your information is handled with the highest level of confidentiality.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            {status === 'success' ? (
              <div className="h-full flex flex-col justify-center items-start">
                <div className="w-12 h-[1px] bg-stone-50 mb-8"></div>
                <h4 className="serif text-3xl mb-4">Thank You.</h4>
                <p className="text-stone-400 font-light">Your inquiry has been received. Our staff will contact you shortly via the email provided.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="group">
                  <label htmlFor="name" className="block text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-4 transition-colors group-focus-within:text-stone-300">
                    Name
                  </label>
                  <input
                    required
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-700 py-3 text-stone-50 focus:outline-none focus:border-stone-50 transition-colors font-light"
                    placeholder="Full Name"
                  />
                </div>

                <div className="group">
                  <label htmlFor="email" className="block text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-4 transition-colors group-focus-within:text-stone-300">
                    Email
                  </label>
                  <input
                    required
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-700 py-3 text-stone-50 focus:outline-none focus:border-stone-50 transition-colors font-light"
                    placeholder="email@company.com"
                  />
                </div>

                <div className="group">
                  <label htmlFor="inquiry" className="block text-[10px] uppercase tracking-[0.3em] text-stone-500 mb-4 transition-colors group-focus-within:text-stone-300">
                    Inquiry
                  </label>
                  <textarea
                    required
                    id="inquiry"
                    rows={4}
                    value={formData.inquiry}
                    onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                    className="w-full bg-transparent border-b border-stone-700 py-3 text-stone-50 focus:outline-none focus:border-stone-50 transition-colors font-light resize-none"
                    placeholder="Briefly describe your legal requirements..."
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full sm:w-auto px-12 py-4 bg-stone-50 text-stone-900 text-xs uppercase tracking-widest hover:bg-stone-200 transition-all disabled:opacity-50"
                  >
                    {status === 'submitting' ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
