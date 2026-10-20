import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { personalInfo } from '../data/portfolioData';

export default function Portrait3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Background Three.js sculpture behind portrait
  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 18;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Abstract Purple-and-Silver Torus Knot Sculpture
    const knotGeo = new THREE.TorusKnotGeometry(6.2, 0.45, 120, 24, 2, 3);
    const knotMat = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: true,
      transparent: true,
      opacity: 0.45
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    scene.add(knot);

    // Orbital silver ring
    const ringGeo = new THREE.TorusGeometry(8.5, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    // Ambient floating particles around portrait
    const partGeo = new THREE.BufferGeometry();
    const partCount = 80;
    const partPos = new Float32Array(partCount * 3);
    for (let i = 0; i < partCount * 3; i += 3) {
      partPos[i] = (Math.random() - 0.5) * 22;
      partPos[i + 1] = (Math.random() - 0.5) * 22;
      partPos[i + 2] = (Math.random() - 0.5) * 10;
    }
    partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
    const partMat = new THREE.PointsMaterial({
      size: 0.4,
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(partGeo, partMat);
    scene.add(particleField);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const violetLight = new THREE.PointLight(0xa855f7, 4, 30);
    violetLight.position.set(10, 8, 10);
    scene.add(violetLight);

    const silverLight = new THREE.PointLight(0xffffff, 2, 25);
    silverLight.position.set(-8, -6, 8);
    scene.add(silverLight);

    let reqId;
    const startTime = performance.now();

    let isIntersecting = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (time = performance.now()) => {
      reqId = requestAnimationFrame(animate);
      if (!isIntersecting) return;

      const elapsed = (time - startTime) * 0.001;

      if (!prefersReducedMotion) {
        knot.rotation.x = elapsed * 0.12;
        knot.rotation.y = elapsed * 0.18;
        ring.rotation.z = -elapsed * 0.08;
        particleField.rotation.y = elapsed * 0.04;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(reqId);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 360;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      knotGeo.dispose();
      knotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      partGeo.dispose();
      partMat.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle mouse movement over container for smooth 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  const tiltX = -mousePos.y * 10;
  const tiltY = mousePos.x * 12;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[480px] aspect-[4/5] mx-auto flex items-center justify-center touch-pan-y"
      style={{ perspective: 1200 }}
    >
      {/* 3D Background Sculpture Container */}
      <div
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Radial soft purple glow under frame */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-violet-500/20 to-transparent rounded-3xl blur-2xl pointer-events-none transform scale-95 transition-all duration-700" />

      {/* Main 3D Framed Card */}
      <div
        className="relative z-10 w-[84%] h-[90%] rounded-2xl p-[2px] transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(124, 58, 237, 0.4), 0 0 30px 2px rgba(168, 85, 247, 0.25)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 1px rgba(139, 92, 246, 0.15)'
        }}
      >
        {/* Polished Silver & Violet Multi-layered Metallic Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-purple-400/40 to-slate-400/50 p-[1.5px] pointer-events-none" />

        {/* Inner Glass Container */}
        <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#09031a]/85 backdrop-blur-xl border border-white/10 flex flex-col">
          
          {/* Subtle Top Metallic Glare */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-white/10 to-transparent pointer-events-none z-20" />
          
          {/* Violet Rim Lighting Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-transparent to-purple-900/10 pointer-events-none z-20" />

          {/* Real Portrait Image of Jagan Kumar Rath */}
          <div className="relative w-full h-full overflow-hidden bg-black/40">
            <picture>
              <source srcSet={personalInfo.portraitImage} type="image/webp" />
              <img
                src={personalInfo.portraitFallback}
                alt={`${personalInfo.fullName} - Associate Software Engineer`}
                className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.01] transition-transform duration-700 ease-out"
                style={{
                  transform: `scale(${isHovered ? 1.05 : 1.01})`,
                }}
                loading="eager"
              />
            </picture>

            {/* Gradient Mask at Bottom for Cinematic Blending */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#060114] via-[#060114]/80 to-transparent z-10" />

            {/* Inner Holographic Corner Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-purple-400/80 pointer-events-none z-30" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-slate-200/80 pointer-events-none z-30" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-slate-200/80 pointer-events-none z-30" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-purple-400/80 pointer-events-none z-30" />
          </div>

          {/* Integrated Status Bar on Card Bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4 z-30 flex items-center justify-between border-t border-white/10 bg-[#060117]/85 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <p className="text-xs font-semibold text-white tracking-wide">{personalInfo.fullName}</p>
                <p className="text-[10px] text-purple-300/80 font-mono">NEXNUV Private Limited</p>
              </div>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-medium tracking-wider uppercase bg-purple-500/15 text-purple-200 border border-purple-500/30">
                MERN STACK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Orbital Badges (Surrounding the 3D Composition) */}
      <div
        className="hidden sm:flex absolute -top-3 -right-3 z-20 items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/15 text-xs text-slate-200 font-medium shadow-lg backdrop-blur-md transition-transform duration-300"
        style={{
          transform: `translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 20px)`
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
        <span>Assoc. Software Engineer</span>
      </div>

      <div
        className="hidden sm:flex absolute -bottom-4 -left-4 z-20 items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-purple-500/20 text-xs text-slate-300 font-medium shadow-lg backdrop-blur-md transition-transform duration-300"
        style={{
          transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -8}px, 25px)`
        }}
      >
        <span className="text-purple-400 font-mono text-[11px]">DS Lab</span>
        <span className="text-[11px] text-slate-400">· Exploring Data</span>
      </div>
    </div>
  );
}
