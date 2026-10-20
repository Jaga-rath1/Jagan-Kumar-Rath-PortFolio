import React, { useState } from 'react';
import { Orbit, Sparkles, Layers, Database, Cloud, Brain, Code, CheckCircle, Eye } from 'lucide-react';
import { skillOrbits, toolsAndConcepts } from '../data/portfolioData';
import SkillOrbit3D from './SkillOrbit3D';

export default function SkillUniverse() {
  const [activeOrbitIndex, setActiveOrbitIndex] = useState(0);
  const [viewMode, setViewMode] = useState('3d'); // '3d' or 'grid'

  const activeOrbit = skillOrbits[activeOrbitIndex];

  const getOrbitIcon = (id) => {
    switch (id) {
      case 'orbit-a':
        return <Layers className="w-4 h-4" />;
      case 'orbit-b':
        return <Database className="w-4 h-4" />;
      case 'orbit-c':
        return <Cloud className="w-4 h-4" />;
      case 'orbit-d':
        return <Brain className="w-4 h-4" />;
      case 'orbit-e':
        return <Code className="w-4 h-4" />;
      default:
        return <Orbit className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-purple-900/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-900/15 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
              <Orbit className="w-3.5 h-3.5 text-purple-400 animate-spin-slow" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
                THE TECHNOLOGY ORBIT
              </span>
            </div>
            
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight silver-gradient-text">
              ENGINEERED TOOLKIT.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal">
              An interactive 3D solar system of technical domains. Centralized around core engineering principles and extending outward into distributed systems and data exploration.
            </p>
          </div>

          {/* View Mode Toggle Button */}
          <div className="flex items-center p-1 rounded-xl glass-card border border-white/10 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setViewMode('3d')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === '3d'
                  ? 'bg-purple-600/40 text-white border border-purple-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Orbit className="w-3.5 h-3.5" />
              <span>3D Orbit View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'grid'
                  ? 'bg-purple-600/40 text-white border border-purple-400/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Accessible Cards</span>
            </button>
          </div>
        </div>

        {/* Orbit Category Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/[0.08] mb-8">
          {skillOrbits.map((orbit, index) => {
            const isActive = activeOrbitIndex === index;
            return (
              <button
                key={orbit.id}
                type="button"
                onClick={() => setActiveOrbitIndex(index)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium tracking-wide whitespace-nowrap transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/40 to-violet-600/40 text-white border border-purple-400/50 shadow-lg shadow-purple-950/40'
                    : 'text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.06]'
                }`}
              >
                <span className={isActive ? 'text-purple-300' : 'text-slate-400'}>
                  {getOrbitIcon(orbit.id)}
                </span>
                <span>{orbit.name}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: orbit.color }}
                />
              </button>
            );
          })}
        </div>

        {/* 3D Orbit Display View */}
        {viewMode === '3d' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-2xl glass-panel p-6 sm:p-8 border border-white/10">
            {/* 3D Orbit Canvas */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
              <SkillOrbit3D
                activeOrbitIndex={activeOrbitIndex}
                onSelectOrbit={(idx) => setActiveOrbitIndex(idx)}
              />
              <div className="absolute bottom-2 text-center pointer-events-none">
                <span className="text-[11px] font-mono text-purple-300/70 tracking-widest uppercase">
                  ACTIVE ORBIT: {activeOrbit.name.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Orbit Details & Technologies List */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="px-2.5 py-0.5 rounded text-[10px] font-mono font-medium tracking-wider uppercase border"
                    style={{
                      borderColor: `${activeOrbit.color}60`,
                      backgroundColor: `${activeOrbit.color}15`,
                      color: activeOrbit.color
                    }}
                  >
                    {activeOrbit.badge}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Orbit #{activeOrbitIndex + 1} of {skillOrbits.length}
                  </span>
                </div>

                <h3 className="font-heading font-bold text-2xl text-white">
                  {activeOrbit.name}
                </h3>
                <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                  {activeOrbit.description}
                </p>
              </div>

              {/* Technologies Grid */}
              <div className="space-y-2 pt-2 border-t border-white/[0.08]">
                <p className="text-[11px] font-mono text-purple-300 uppercase tracking-wider">
                  Associated Technologies ({activeOrbit.skills.length})
                </p>
                <div className="grid grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
                  {activeOrbit.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-purple-500/30 transition-all flex flex-col justify-between"
                    >
                      <span className="text-xs font-medium text-slate-100">{skill.name}</span>
                      <span className="text-[10px] font-mono text-purple-300/70 mt-1">
                        {skill.type}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Accessible All-Category Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillOrbits.map((orbit) => (
              <div
                key={orbit.id}
                className="p-6 rounded-2xl glass-card border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-2 py-0.5 rounded text-[10px] font-mono font-medium uppercase border"
                      style={{
                        borderColor: `${orbit.color}50`,
                        backgroundColor: `${orbit.color}10`,
                        color: orbit.color
                      }}
                    >
                      {orbit.badge}
                    </span>
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: orbit.color }} />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-white mb-2">
                    {orbit.name}
                  </h3>
                  <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                    {orbit.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {orbit.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="px-2 py-1 rounded-md text-[11px] font-mono bg-white/[0.03] text-slate-300 border border-white/[0.05]"
                      >
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tools & Concepts Section */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl glass-card border border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h4 className="font-heading font-bold text-base text-white tracking-wide">
              DEVELOPMENT TOOLS & ARCHITECTURAL CONCEPTS
            </h4>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {toolsAndConcepts.map((tool) => (
              <div
                key={tool}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-purple-950/20 border border-purple-500/20 text-xs font-mono text-purple-200"
              >
                <CheckCircle className="w-3.5 h-3.5 text-purple-400" />
                <span>{tool}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
