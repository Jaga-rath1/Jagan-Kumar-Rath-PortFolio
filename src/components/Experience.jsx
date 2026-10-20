import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { workExperience } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-purple-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
            <Briefcase className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
              ENGINEERING IN PRACTICE
            </span>
          </div>
          
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight silver-gradient-text">
            BUILDING IN THE REAL WORLD.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal">
            Professional industry experience engineering cross-platform client interfaces, reliable server microservices, and automated container deployment pipelines.
          </p>
        </div>

        {/* Illuminated Metallic Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Metallic Connector Line */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-purple-400 via-violet-500/60 to-purple-900/20" />

          {workExperience.map((exp) => (
            <div key={exp.company} className="relative pl-12 sm:pl-20 mb-8 last:mb-0">
              
              {/* Glowing Metallic Node */}
              <div className="absolute left-2.5 sm:left-6.5 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#030014] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_12px_#a855f7]">
                <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </div>

              {/* Experience Card */}
              <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl">
                
                {/* Header Information */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/[0.08]">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2">
                      CURRENT ROLE · {exp.type}
                    </span>
                    <h3 className="font-heading font-bold text-2xl text-white">
                      {exp.role}
                    </h3>
                    <p className="text-base font-semibold text-purple-300 mt-0.5">
                      {exp.company}
                    </p>
                  </div>

                  <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1">
                    <span className="flex items-center gap-1.5 text-slate-300">
                      <Calendar className="w-3.5 h-3.5 text-purple-400" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Summary */}
                <p className="text-sm text-slate-300 mt-5 leading-relaxed">
                  {exp.summary}
                </p>

                {/* Core Responsibilities */}
                <div className="mt-6 space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-purple-300">
                    Key Engineering Contributions:
                  </h4>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-7 pt-5 border-t border-white/[0.08]">
                  <div className="flex flex-wrap gap-2">
                    {exp.stack.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-white/[0.03] text-slate-200 border border-white/[0.08]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
