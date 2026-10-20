import React, { useState, useEffect } from 'react';
import { WhatsAppIcon } from './Icons';

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Reveal button gracefully after initial hero animation
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl =
    'https://wa.me/916371561513?text=Hi!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more.';

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 pb-[env(safe-area-inset-bottom)] pr-[env(safe-area-inset-right)] transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <div className="relative flex items-center justify-end group">
        {/* Expanded Tooltip / Pill on Desktop Hover & Focus */}
        <div
          role="tooltip"
          id="whatsapp-tooltip"
          className={`hidden md:flex items-center gap-2 mr-3 px-3.5 py-1.5 rounded-full bg-[#08021a]/90 backdrop-blur-md border border-emerald-500/30 text-emerald-200 text-xs font-medium shadow-xl shadow-emerald-950/40 pointer-events-none transition-all duration-300 origin-right ${
            isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-3 scale-95'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="whitespace-nowrap tracking-wide">Chat with me on WhatsApp</span>
        </div>

        {/* Ambient Emerald Glow Aura */}
        <div
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-emerald-500/30 via-emerald-400/20 to-teal-500/30 blur-md pointer-events-none opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
          aria-hidden="true"
        />

        {/* Main WhatsApp Action Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsHovered(true)}
          onBlur={() => setIsHovered(false)}
          aria-label="Chat with us on WhatsApp"
          aria-describedby="whatsapp-tooltip"
          className="relative flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#25D366] via-[#1EBE5D] to-[#128C7E] text-white shadow-2xl shadow-emerald-950/60 border border-emerald-300/40 transform transition-all duration-300 ease-out hover:scale-108 hover:shadow-[0_0_30px_rgba(37,211,102,0.45)] focus:outline-none focus:ring-3 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-[#030014] active:scale-95"
        >
          {/* Subtle Specular Top Reflection */}
          <div
            className="absolute inset-x-2 top-1 h-3 rounded-full bg-gradient-to-b from-white/40 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          {/* Official WhatsApp Icon */}
          <WhatsAppIcon className="w-7 h-7 sm:w-7.5 sm:h-7.5 drop-shadow-md text-white group-hover:scale-105 transition-transform duration-300" />
        </a>
      </div>
    </aside>
  );
}
