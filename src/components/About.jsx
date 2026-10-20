import React from 'react';
import { Layers, Cpu, Compass, ArrowRight } from 'lucide-react';
import { capabilityPillars } from '../data/portfolioData';

export default function About() {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Layers':
        return <Layers className="w-6 h-6 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-violet-400" />;
      case 'Compass':
        return <Compass className="w-6 h-6 text-indigo-400" />;
      default:
        return <Layers className="w-6 h-6 text-purple-400" />;
    }
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-purple-950/20 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
              THE ENGINEER BEHIND THE CODE
            </span>
          </div>
          
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight silver-gradient-text">
            MORE THAN JUST CODE.
          </h2>

          <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            <p>
              I'm a software engineer focused on building useful digital products, developing reliable backend systems, and creating intuitive user experiences.
            </p>
            <p>
              My work spans the MERN stack, API development, database design, authentication, containerization, and deployment workflows.
            </p>
            <p className="text-slate-400">
              Alongside my engineering journey, I'm building a foundation in Data Science to better understand data, uncover patterns, and eventually explore data-driven solutions.
            </p>
          </div>
        </div>

        {/* Three Distinct Visual Pillars: BUILD, DEPLOY, DISCOVER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {capabilityPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative rounded-2xl p-7 glass-panel hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Subtle top edge glow on hover */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div>
                {/* Pillar Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shadow-inner group-hover:border-purple-400/50 transition-colors">
                    {getIcon(pillar.icon)}
                  </div>
                  <span className="font-mono text-xs font-bold tracking-widest text-purple-300/80 uppercase">
                    {pillar.label}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-purple-200 transition-colors">
                  {pillar.tagline}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {pillar.description}
                </p>
              </div>

              {/* Technologies Pill Container */}
              <div className="pt-4 border-t border-white/[0.08]">
                <p className="text-[10px] font-mono tracking-wider text-slate-400 uppercase mb-2.5">
                  Core Technologies:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {pillar.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/[0.06] group-hover:border-purple-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Current Working Philosophy Bar */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-card border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold tracking-wider text-purple-300 uppercase">
                ENGINEERING PHILOSOPHY
              </span>
              <span className="text-xs text-slate-500">|</span>
              <span className="text-xs text-slate-400">NEXNUV Private Limited</span>
            </div>
            <p className="text-sm text-slate-200 max-w-2xl">
              Clean code architecture, predictable REST APIs, modular component systems, and a commitment to continuous growth through hands-on implementation.
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-400/40 transition-all shrink-0"
          >
            <span>View Practical Work</span>
            <ArrowRight className="w-3.5 h-3.5 text-purple-300" />
          </a>
        </div>

      </div>
    </section>
  );
}
