import React, { useState } from 'react';
import { ExternalLink, ArrowUpRight, Layers, Sparkles, Shield, Car, FileText, Map, Activity } from 'lucide-react';
import { GithubIcon } from './Icons';
import { projects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const filters = [
    { id: 'all', label: 'All Builds' },
    { id: 'featured', label: 'Featured Live' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'devops', label: 'DevOps & Cloud' },
    { id: 'frontend', label: 'Frontend SaaS' }
  ];

  const filteredProjects = projects.filter((p) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'featured') return p.featured;
    if (selectedFilter === 'fullstack') return p.category.includes('Full Stack');
    if (selectedFilter === 'devops') return p.tech.includes('Docker') || p.category.includes('DevOps');
    if (selectedFilter === 'frontend') return p.category.includes('Frontend');
    return true;
  });

  // Visual representation widgets for each project
  const renderProjectVisual = (project) => {
    switch (project.id) {
      case 'carzodrive':
        return (
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#0c0524] via-[#120736] to-[#050114] border border-purple-500/30 flex items-center justify-center p-6 group-hover:border-purple-400/60 transition-colors">
            {/* Ambient car headlight glows */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-32 h-16 bg-blue-500/20 blur-2xl pointer-events-none" />
            <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-32 h-16 bg-purple-500/25 blur-2xl pointer-events-none" />

            {/* Stylized Automotive HUD Silhouette */}
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-400/40 flex items-center justify-center shadow-[0_0_25px_rgba(168,85,247,0.3)] mb-3">
                <Car className="w-8 h-8 text-purple-300" />
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>carzodrive1.vercel.app · Production Live</span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                <span>Luxury Cars</span>
                <span>•</span>
                <span>Self-Drive Bikes</span>
                <span>•</span>
                <span>Chauffeur</span>
              </div>
            </div>

            {/* Subtle Speed Lines */}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
          </div>
        );

      case 'careflow-health':
        return (
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#09031c] via-[#0d0426] to-[#040112] border border-white/10 flex items-center justify-center p-6 group-hover:border-purple-400/50 transition-colors">
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-950/50 border border-purple-400/30 flex items-center justify-center shadow-lg mb-3">
                <Activity className="w-8 h-8 text-purple-300 animate-pulse" />
              </div>
              
              {/* Telemetry Wave Simulation */}
              <div className="w-48 h-8 flex items-center justify-center opacity-80 mb-2">
                <svg className="w-full h-full text-purple-400" viewBox="0 0 200 40" fill="none">
                  <path
                    d="M0 20 L50 20 L65 5 L80 35 L95 10 L105 25 L115 20 L200 20"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-purple-300">
                <span>Doctor Scheduling & Patient Records</span>
              </div>
            </div>
          </div>
        );

      case 'docupulse':
        return (
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#080219] via-[#0b0322] to-[#030014] border border-white/10 flex items-center justify-center p-6 group-hover:border-purple-400/50 transition-colors">
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="relative mb-3">
                {/* Layered Document Sheets */}
                <div className="absolute -top-1.5 -left-1.5 w-14 h-16 rounded-xl bg-purple-950/40 border border-white/10 transform -rotate-6" />
                <div className="relative w-14 h-16 rounded-xl bg-purple-900/40 border border-purple-400/40 flex items-center justify-center shadow-xl">
                  <FileText className="w-7 h-7 text-purple-200" />
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-[11px] font-mono mb-2">
                <Shield className="w-3 h-3 text-purple-400" />
                <span>Client-Side In-Browser Processing</span>
              </div>

              <span className="text-xs font-mono text-slate-400">
                Merge · Split · Compress · Encrypt
              </span>
            </div>
          </div>
        );

      case 'carnest':
        return (
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#07011d] via-[#0f0430] to-[#040014] border border-white/10 flex items-center justify-center p-6 group-hover:border-purple-400/50 transition-colors">
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-indigo-950/60 border border-indigo-400/30 flex items-center justify-center shadow-xl mb-3">
                <Layers className="w-8 h-8 text-indigo-300" />
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-[11px] font-mono mb-2">
                <span>Docker Compose & Kubernetes Ready</span>
              </div>

              <span className="text-xs font-mono text-slate-400">
                Vehicle CRUD · Multer · Cloudinary · CI/CD
              </span>
            </div>
          </div>
        );

      case 'wanderlust':
        return (
          <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-br from-[#08021a] via-[#110433] to-[#030014] border border-white/10 flex items-center justify-center p-6 group-hover:border-purple-400/50 transition-colors">
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-950/60 border border-purple-400/30 flex items-center justify-center shadow-xl mb-3">
                <Map className="w-8 h-8 text-purple-300" />
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[11px] font-mono mb-2">
                <span>Leaflet.js & Geoapify Geolocation</span>
              </div>

              <span className="text-xs font-mono text-slate-400">
                MVC Architecture · Passport.js · Vacation Rentals
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-[36rem] h-[36rem] bg-purple-900/15 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full silver-badge mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200">
                THE DIGITAL WORKSHOP
              </span>
            </div>
            
            <h2 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight silver-gradient-text">
              SELECTED BUILDS.
            </h2>

            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal">
              Practical engineering, real projects, continuous improvement. Each showcase reflects hands-on architecture, verified repositories, and active deployments.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar self-start md:self-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedFilter(f.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all ${
                  selectedFilter === f.id
                    ? 'bg-purple-600/40 text-white border border-purple-400/50 shadow-md shadow-purple-950/40'
                    : 'text-slate-400 hover:text-white bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Live Banner Callout for CarZodrive */}
        {selectedFilter !== 'devops' && selectedFilter !== 'frontend' && (
          <div className="mb-10 p-6 sm:p-8 rounded-2xl glass-panel border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-[#0e042b]/60 to-[#050116]/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  FEATURED LIVE DEPLOYMENT
                </span>
                <span className="text-xs font-mono text-purple-300">CARZODRIVE PLATFORM</span>
              </div>
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-white">
                Live Automotive Web Experience
              </h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Experience the live production application deployed on Vercel at <strong className="text-white">carzodrive1.vercel.app</strong>, engineered with responsive vehicle catalogs, dynamic pricing, and booking workflows.
              </p>
            </div>

            <div className="relative z-10 flex flex-wrap items-center gap-3 shrink-0">
              <a
                href="https://carzodrive1.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-bold font-heading text-white bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 border border-purple-400/40 shadow-lg shadow-purple-950/50 hover:scale-[1.02] transition-all"
              >
                <span>Launch Live Website</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Jaga-rath1/CarNest"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/15 transition-all"
              >
                <GithubIcon className="w-4 h-4 text-purple-300" />
                <span>Source Code</span>
              </a>
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-2xl glass-card border border-white/10 hover:border-purple-500/40 p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Visual Artwork Showcase */}
                {renderProjectVisual(project)}

                {/* Content Section */}
                <div className="mt-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-wider uppercase text-purple-300/80">
                      {project.shortCategory}
                    </span>
                    {project.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Live</span>
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-black text-xl text-white group-hover:text-purple-200 transition-colors">
                    {project.title}
                  </h3>

                  <p className="mt-2.5 text-xs text-slate-300 leading-relaxed font-normal line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-slate-300 border border-white/[0.06]"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-purple-300/70">
                      +{project.tech.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Explore Architecture</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-white bg-purple-600/40 hover:bg-purple-500/60 border border-purple-400/40 transition-colors"
                      title="Open Live Website"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                      title="View GitHub Repository"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Deep-dive Project Architecture Modal */}
      {activeModalProject && (
        <ProjectModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />
      )}
    </section>
  );
}
