import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, WhatsAppIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative py-12 px-4 sm:px-6 lg:px-8 border-t border-white/[0.08] bg-[#02000c]/90">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand Mark and Tagline */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-[#22104b] to-[#07011d] border border-white/20 flex items-center justify-center shadow-lg">
            <span className="font-heading font-black text-sm silver-gradient-text">
              JR
            </span>
          </div>
          <div>
            <p className="font-heading font-bold text-sm text-white">
              {personalInfo.fullName}
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Designed with curiosity. Built with code.
            </p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-3">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href={personalInfo.linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <a
            href="https://wa.me/916371561513?text=Hi!%20I%20visited%20your%20website%20and%20would%20like%20to%20know%20more."
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl text-slate-400 hover:text-emerald-400 bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors"
            aria-label="Chat on WhatsApp"
            title="Chat on WhatsApp"
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 transition-colors"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl text-purple-300 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 transition-colors"
            aria-label="Back to top"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p className="text-xs font-mono text-slate-400">
            © 2026 Jagan Kumar Rath. All rights reserved.
          </p>
          <p className="text-[11px] text-purple-300/70 font-mono mt-0.5">
            BEYOND THE CODE · DIGITAL UNIVERSE
          </p>
        </div>

      </div>
    </footer>
  );
}
