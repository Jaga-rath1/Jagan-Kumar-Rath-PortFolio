import React from 'react';
import { GraduationCap, MapPin, Award } from 'lucide-react';
import { educationList } from '../data/portfolioData';

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-80 h-80 bg-violet-900/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
            <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
              ACADEMIC JOURNEY
            </span>
          </div>
          
          <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight silver-gradient-text">
            EDUCATIONAL FOUNDATION.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal">
            Formal computer science training and quantitative scientific education forming the backbone of my algorithmic and software engineering career.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Metallic Divider */}
          <div className="absolute left-4 sm:left-8 top-3 bottom-3 w-[2px] bg-gradient-to-b from-purple-400 via-violet-500/50 to-purple-900/10" />

          <div className="space-y-8">
            {educationList.map((edu) => (
              <div key={edu.degree} className="relative pl-12 sm:pl-20">
                
                {/* Illuminated Marker */}
                <div className="absolute left-2.5 sm:left-6.5 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-[#030014] border-2 border-purple-400 flex items-center justify-center shadow-[0_0_10px_#8b5cf6]">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-200" />
                </div>

                {/* Card */}
                <div className="rounded-2xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-purple-500/40 transition-all duration-300 shadow-xl">
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                    <div>
                      <span className="inline-block px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold tracking-wider uppercase bg-purple-500/15 text-purple-300 border border-purple-500/30 mb-2">
                        {edu.period}
                      </span>
                      <h3 className="font-heading font-black text-xl sm:text-2xl text-white">
                        {edu.degree}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-purple-300 mt-1">
                        {edu.institution}
                      </p>
                    </div>

                    <div className="flex flex-col sm:items-end text-xs font-mono text-slate-400 space-y-1.5">
                      <span className="flex items-center gap-1.5 text-purple-300 font-semibold">
                        <Award className="w-3.5 h-3.5 text-purple-400" />
                        <span>{edu.grade}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{edu.location}</span>
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed font-normal">
                    {edu.note}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
