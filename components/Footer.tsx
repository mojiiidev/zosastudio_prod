
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="py-24 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
          <div className="md:col-span-2">
            <div className="flex flex-col mb-8">
              <span className="serif text-2xl font-bold tracking-tight text-stone-900 leading-none">
                Zosa Borromeo
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-stone-500 mt-2">
                Ong Vaño & Mirhan Law
              </span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed max-w-sm">
              Strategic legal solutions for growing enterprises and established corporations across their full legal lifecycle. Delivering practical, responsive advocacy nationwide.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-stone-900 font-bold mb-6">Offices</h4>
            <div className="text-sm text-stone-600 space-y-4">
              <div>
                <p className="font-medium text-stone-900">Cebu (Headquarters)</p>
                <p className="text-stone-500">Business District, Cebu City</p>
              </div>
              <div>
                <p className="font-medium text-stone-900">Makati</p>
                <p className="text-stone-500">Central Business District, Makati</p>
              </div>
              <div>
                <p className="font-medium text-stone-900">Clark</p>
                <p className="text-stone-500">Clark Freeport Zone, Pampanga</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-stone-900 font-bold mb-6">Connect</h4>
            <div className="text-sm text-stone-600 space-y-2">
              <p>Email: <a href="mailto:info@zosalaw.ph" className="underline hover:text-stone-900 transition-colors">info@zosalaw.ph</a></p>
              <div className="pt-4 space-y-1">
                <p className="text-[10px] uppercase text-stone-400">General Inquiries</p>
                <p>+63 (32) 231-1551</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-stone-200 flex flex-col sm:flex-row justify-between items-center text-[10px] uppercase tracking-widest text-stone-400">
          <p>© 2024 ZOSA, BORROMEO, ONG VAÑO & MIRHAN LAW OFFICES. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-stone-600">Privacy Policy</a>
            <a href="#" className="hover:text-stone-600">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
