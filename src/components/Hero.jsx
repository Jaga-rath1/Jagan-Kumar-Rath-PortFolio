import React from 'react';
import { ArrowRight, Download, Mail, ChevronDown } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import Portrait3D from './Portrait3D';

export default function Hero() {
  const resumeAvailable = true;

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      const topOffset = 85;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction Hero Section"
      className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Cinematic Ambient Radial Lighting Blooms */}
      <div
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[24rem] sm:w-[36rem] h-[24rem] sm:h-[36rem] bg-purple-600/12 rounded-full blur-[140px] pointer-events-none transform -translate-z-0"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[24rem] sm:w-[40rem] h-[24rem] sm:h-[40rem] bg-violet-500/10 rounded-full blur-[160px] pointer-events-none transform -translate-z-0"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[36rem] sm:w-[48rem] h-[16rem] bg-indigo-950/25 rounded-full blur-[130px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center min-h-[calc(100vh-9rem)]">
          
          {/* Left Column: Personal Introduction & Cinematic Headline */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-5 sm:space-y-6">
            
            {/* Live Availability & Role Eyebrow Pill */}
            <div className="hero-enter-1 inline-flex items-center gap-2 px-3 sm:px-3.5 py-1.5 rounded-full silver-badge w-fit backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
              </span>
              <span className="text-[9px] xs:text-[10px] sm:text-xs font-mono font-medium tracking-[0.16em] sm:tracking-[0.2em] text-purple-200 uppercase">
                ASSOCIATE SOFTWARE ENGINEER · MERN STACK
              </span>
            </div>

            {/* Main Headline with Coordinated Timing */}
            <div className="hero-enter-2 space-y-1 sm:space-y-2">
              <h1 className="font-heading font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl xl:text-[5.1rem] tracking-tight leading-[1.02]">
                <span className="block silver-gradient-text">I BUILD.</span>
                <span className="block silver-gradient-text">I ENGINEER.</span>
                <span className="block silver-violet-text relative">
                  I EXPLORE.
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent bg-[length:200%_100%] animate-shimmer pointer-events-none opacity-40"
                    aria-hidden="true"
                  />
                </span>
              </h1>
            </div>

            {/* Introduction Paragraph */}
            <p className="hero-enter-3 text-sm sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
              I'm <span className="text-white font-semibold">{personalInfo.fullName}</span>, a full-stack engineer at <span className="text-purple-300 font-medium">{personalInfo.company}</span> dedicated to crafting modern web and mobile applications, engineering resilient microservices, and exploring intelligent data systems.
            </p>

            {/* Three Concise Capability Badges */}
            <div className="hero-enter-4 flex flex-wrap gap-2 sm:gap-2.5 pt-1">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-slate-200 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_6px_#c084fc]" />
                <span>FULL STACK DEVELOPMENT</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] sm:text-xs font-mono text-slate-200 backdrop-blur-sm hover:border-violet-500/30 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#a855f7]" />
                <span>DEVOPS & CLOUD</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/30 text-[11px] sm:text-xs font-mono text-purple-200 backdrop-blur-sm hover:border-purple-400/50 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-300 shadow-[0_0_6px_#d8b4fe]" />
                <span>DATA SCIENCE IN PROGRESS</span>
              </div>
            </div>

            {/* Action CTA Buttons */}
            <div className="hero-enter-5 flex flex-wrap items-center gap-3 sm:gap-3.5 pt-2">
              {/* Primary CTA */}
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 min-h-[48px] rounded-xl font-heading font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-purple-500 to-violet-600 hover:from-purple-500 hover:to-violet-500 border border-purple-400/50 shadow-xl shadow-purple-950/60 hover:shadow-purple-700/40 transition-all duration-300 hover:scale-[1.03] active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 overflow-hidden"
              >
                {/* Subtle Inner Glow Layer */}
                <span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                  aria-hidden="true"
                />
                <span className="relative z-10">Explore My Projects</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              {/* Secondary CTA */}
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-3.5 min-h-[48px] rounded-xl font-heading font-semibold text-sm text-slate-200 bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 hover:border-purple-400/50 transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <Mail className="w-4 h-4 text-purple-300" />
                <span>Let's Connect</span>
              </a>

              {/* Additional CTA: Download Resume */}
              {resumeAvailable && (
                <a
                  href={personalInfo.resumePath}
                  download="Jagan-Kumar-Rath-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 min-h-[48px] rounded-xl font-heading font-medium text-xs text-slate-300 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/10 hover:border-slate-300/40 transition-all duration-200 hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  title="Download Official Resume PDF"
                >
                  <Download className="w-3.5 h-3.5 text-slate-300" />
                  <span>Download Resume</span>
                </a>
              )}
            </div>


            {/* Current Position Quick Info Strip */}
            <div className="hero-enter-6 pt-3 border-t border-white/[0.07] flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
              <span className="font-mono text-[11px] text-purple-300/80 font-semibold tracking-wider">CURRENT:</span>
              <span className="text-slate-200 font-semibold">{personalInfo.currentRole}</span>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <span className="text-purple-300/90">{personalInfo.company}</span>
              <span className="text-slate-600 hidden sm:inline">·</span>
              <span className="text-slate-400 font-mono text-[11px]">{personalInfo.employmentPeriod}</span>
            </div>
          </div>

          {/* Right Column: 3D Portrait Environment with Real Uploaded Photo */}
          <div className="hero-enter-2 lg:col-span-5 flex items-center justify-center relative">
            <Portrait3D />
          </div>

        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <a
        href="#about"
        onClick={(e) => scrollToSection(e, 'about')}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-400 hover:text-purple-300 transition-colors cursor-pointer group focus:outline-none"
        aria-label="Scroll down to About section"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase opacity-75 group-hover:opacity-100">
          EXPLORE
        </span>
        <ChevronDown className="w-4 h-4 animate-bounce text-purple-400" />
      </a>
    </section>
  );
}
