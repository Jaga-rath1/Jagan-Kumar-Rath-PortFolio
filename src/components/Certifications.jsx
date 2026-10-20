import React from 'react';
import { Award, CheckCircle, Clock } from 'lucide-react';
import { certifications } from '../data/portfolioData';

export default function Certifications() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
              CREDENTIALS & SPECIALIZATIONS
            </span>
          </div>
          
          <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight silver-gradient-text">
            ALWAYS LEARNING.
          </h2>

          <p className="mt-3 text-base text-slate-300 font-normal">
            Specialized curriculum completions and active engineering courses pursued to maintain modern industry standards.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {certifications.map((cert) => {
            const isCompleted = cert.status === 'Completed';

            return (
              <div
                key={cert.title}
                className="group p-6 sm:p-7 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${cert.badgeColor}`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                      ) : (
                        <Clock className="w-3 h-3 text-violet-400 animate-spin-slow" />
                      )}
                      <span>{cert.status}</span>
                    </span>

                    <span className="text-xs font-mono text-slate-400">
                      {cert.issuer}
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {cert.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono text-purple-300">
                  <span>Authorized Curriculum</span>
                  <span className="text-slate-400 font-sans">Apna College</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
