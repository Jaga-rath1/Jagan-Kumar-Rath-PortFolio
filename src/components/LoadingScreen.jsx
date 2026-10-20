import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LoadingScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('entering'); // 'entering' | 'loading' | 'complete' | 'exiting'
  const isFinishedRef = useRef(false);

  const completeAndExit = (callback) => {
    if (isFinishedRef.current) return;
    isFinishedRef.current = true;
    setPhase('exiting');
    setTimeout(() => {
      if (callback) callback();
    }, 650);
  };

  useEffect(() => {
    // Lock body scroll while welcome screen is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReduced ? 500 : 2100; // 2.1s smooth luxury timeline (500ms for reduced motion)

    // Fail-safe hard timeout: screen can NEVER hang or block homepage under any circumstance
    const failSafeTimer = setTimeout(() => {
      completeAndExit(onFinish);
    }, prefersReduced ? 1000 : 3200);

    // Initial sequence timing
    const enterTimer = setTimeout(() => {
      setPhase('loading');
    }, 150);

    // Cinematic progress animation loop
    const startTime = performance.now();
    let animationFrameId;

    const animateProgress = (currentTime) => {
      const elapsed = currentTime - startTime;
      const fraction = Math.min(elapsed / duration, 1);

      // Smooth cubic-bezier curve for authentic high-end pacing
      const easeProgress = fraction < 0.5
        ? 4 * fraction * fraction * fraction
        : 1 - Math.pow(-2 * fraction + 2, 3) / 2;

      const currentProgress = Math.round(easeProgress * 100);
      setProgress(currentProgress);

      if (fraction < 1) {
        animationFrameId = requestAnimationFrame(animateProgress);
      } else {
        setPhase('complete');
        // Brief moment to appreciate 100% completion before smooth cinematic reveal
        setTimeout(() => {
          clearTimeout(failSafeTimer);
          completeAndExit(onFinish);
        }, 320);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    // Keyboard support: Escape, Space, Enter to enter immediately
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        cancelAnimationFrame(animationFrameId);
        clearTimeout(failSafeTimer);
        clearTimeout(enterTimer);
        completeAndExit(onFinish);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(failSafeTimer);
      clearTimeout(enterTimer);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [onFinish]);

  const handleSkip = (e) => {
    e.stopPropagation();
    completeAndExit(onFinish);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome experience"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014] select-none transition-all duration-700 ease-out overflow-hidden ${
        phase === 'exiting' ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Deep Space Ambient Nebula Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[32rem] sm:w-[44rem] h-[32rem] sm:h-[44rem] bg-gradient-to-tr from-purple-700/25 via-violet-600/18 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse-glow"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20rem] sm:w-[28rem] h-[20rem] sm:h-[28rem] bg-indigo-600/15 rounded-full blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Floating Micro Light Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <span className="absolute top-1/4 left-1/5 w-1 h-1 rounded-full bg-purple-300 opacity-60 animate-ping" />
        <span className="absolute top-2/3 right-1/4 w-1.5 h-1.5 rounded-full bg-violet-400 opacity-50 animate-pulse" />
        <span className="absolute bottom-1/4 left-1/3 w-1 h-1 rounded-full bg-white opacity-40 animate-ping" />
      </div>

      {/* Central Composition with Staggered Entrance */}
      <div className="relative z-10 flex flex-col items-center max-w-sm sm:max-w-md px-6 text-center">
        
        {/* Animated Multi-Ring Astrolabe Brandmark */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center mb-6 sm:mb-8 transition-transform duration-700 ease-out">
          
          {/* Outer Cosmic Halo Ring */}
          <div
            className="absolute inset-0 rounded-full border border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.25)] animate-spin-slow"
            aria-hidden="true"
          />

          {/* Orbiting Satellite Light Beacon */}
          <div
            className="absolute inset-0 animate-spin-slow pointer-events-none"
            aria-hidden="true"
          >
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_#ffffff]" />
          </div>

          {/* Middle Concentric Ring - Counter-Clockwise */}
          <div
            className="absolute inset-2.5 rounded-full border border-violet-400/35 border-dashed animate-spin-reverse-slow"
            aria-hidden="true"
          />

          {/* SVG Circular Dynamic Progress Arc */}
          <svg
            className="absolute inset-1.5 w-[calc(100%-12px)] h-[calc(100%-12px)] -rotate-90 pointer-events-none"
            aria-hidden="true"
            viewBox="0 0 120 120"
          >
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="rgba(192, 132, 252, 0.65)"
              strokeWidth="2"
              strokeDasharray="327"
              strokeDashoffset={327 - (327 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-75 ease-out"
            />
          </svg>

          {/* Sculpted JR Medallion with Specular Reflection */}
          <div className="relative z-10 w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-b from-[#22104b] via-[#100430] to-[#050117] border border-white/30 flex items-center justify-center shadow-[0_0_35px_rgba(168,85,247,0.4)] transform hover:scale-105 transition-transform duration-300">
            {/* Top Specular Glare */}
            <div
              className="absolute top-1 inset-x-2 h-3.5 rounded-t-xl bg-gradient-to-b from-white/25 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            
            <span className="font-heading font-black text-2xl sm:text-3xl tracking-tighter silver-gradient-text drop-shadow-md">
              JR
            </span>

            {/* Core Pulsing Emerald Radar Status */}
            <span className="absolute -bottom-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-[#030014] shadow-[0_0_6px_#10b981]" />
            </span>
          </div>
        </div>

        {/* Sophisticated Typographic Branding with Staggered Entrance */}
        <div className="space-y-1.5 sm:space-y-2">
          {/* Eyebrow Status */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full silver-badge mb-1">
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span className="text-[9px] sm:text-[10px] font-mono tracking-[0.24em] text-purple-200 uppercase">
              {phase === 'complete' ? 'SYSTEMS SYNCHRONIZED' : 'INITIALIZING DIGITAL ATELIER'}
            </span>
          </div>

          <h1 className="font-heading font-black text-2xl sm:text-3xl tracking-tight text-white">
            <span className="block silver-gradient-text">JAGAN KUMAR RATH</span>
          </h1>

          <p className="text-xs sm:text-sm text-purple-300/80 font-mono tracking-wider uppercase">
            ASSOCIATE SOFTWARE ENGINEER · MERN STACK & SYSTEMS
          </p>
        </div>

        {/* Luminous Precision Progress Gauge */}
        <div className="mt-6 sm:mt-7 w-48 sm:w-56 flex flex-col items-center">
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1.5">
            <span className="text-purple-300/70 uppercase tracking-wider text-[10px]">
              {phase === 'complete' ? 'READY' : 'LOADING EXPERIENCE'}
            </span>
            <span className="text-purple-200 font-semibold tabular-nums">
              {String(progress).padStart(3, '0')}%
            </span>
          </div>

          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden p-[0.5px]">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-violet-300 to-white rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_#a855f7]"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
        </div>

        {/* Interactive "Enter Atelier" Skip Pill */}
        <div className="mt-7 sm:mt-8">
          <button
            type="button"
            onClick={handleSkip}
            className="group inline-flex items-center justify-center gap-2 px-5 py-2.5 min-h-[44px] min-w-[140px] rounded-full text-xs font-mono tracking-wider text-slate-300 hover:text-white bg-white/[0.05] hover:bg-white/[0.12] border border-white/15 hover:border-purple-400/50 shadow-sm transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-400 cursor-pointer touch-manipulation"
            aria-label="Skip intro animation and enter portfolio"
          >
            <span>Enter Portfolio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-purple-400" />
          </button>
        </div>

      </div>
    </div>
  );
}
