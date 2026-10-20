import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RotateCcw, Move, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Portrait3D() {
  const containerRef = useRef(null);
  const canvasContainerRef = useRef(null);

  // 3D Rotation and Zoom State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isTappedPulse, setIsTappedPulse] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Touch tracking references
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const initialRotRef = useRef({ x: 0, y: 0 });
  const initialPinchDistRef = useRef(0);
  const initialZoomRef = useRef(1);
  const isHorizontalDragRef = useRef(false);

  // Reference for passing current rotation & zoom into Three.js render loop
  const currentRotRef = useRef({ x: 0, y: 0 });
  const currentZoomRef = useRef(1);

  useEffect(() => {
    currentRotRef.current = rotation;
    currentZoomRef.current = zoom;
  }, [rotation, zoom]);

  // Background Three.js sculpture behind portrait
  useEffect(() => {
    const container = canvasContainerRef.current;
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

    // Sculpture Group to link directly with touch rotations
    const sculptureGroup = new THREE.Group();
    scene.add(sculptureGroup);

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
    sculptureGroup.add(knot);

    // Orbital silver ring
    const ringGeo = new THREE.TorusGeometry(8.5, 0.08, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.35
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    sculptureGroup.add(ring);

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
    sculptureGroup.add(particleField);

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
        // Base idle ambient movement
        knot.rotation.x = elapsed * 0.12;
        knot.rotation.y = elapsed * 0.18;
        ring.rotation.z = -elapsed * 0.08;
        particleField.rotation.y = elapsed * 0.04;

        // Synchronize 3D sculpture orientation with finger touch tilt
        const rot = currentRotRef.current;
        const targetZoom = currentZoomRef.current;
        sculptureGroup.rotation.y = THREE.MathUtils.degToRad(rot.y * 0.9);
        sculptureGroup.rotation.x = THREE.MathUtils.degToRad(-rot.x * 0.9);
        camera.position.z = 18 / targetZoom;
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

  // Mouse tilt tracking (desktop)
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setRotation({
      x: -y * 14,
      y: x * 16
    });
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    // Smoothly return toward neutral position
    setRotation({ x: 0, y: 0 });
  };

  // Touch handlers for mobile finger interaction (1-finger drag, 2-finger pinch)
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      touchStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
        time: performance.now()
      };
      initialRotRef.current = { ...rotation };
      isHorizontalDragRef.current = false;
      setIsDragging(true);
    } else if (e.touches.length === 2) {
      // Initialize pinch gesture
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDistRef.current = dist;
      initialZoomRef.current = zoom;
      setIsDragging(true);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - touchStartRef.current.x;
      const deltaY = e.touches[0].clientY - touchStartRef.current.y;

      // Determine gesture intent: if horizontal movement is dominant, capture for 3D rotation
      if (!isHorizontalDragRef.current && Math.abs(deltaX) > Math.abs(deltaY) + 5) {
        isHorizontalDragRef.current = true;
      }

      if (isHorizontalDragRef.current) {
        if (e.cancelable) e.preventDefault(); // prevent unwanted page drift while actively rotating 3D object
        const newRotY = THREE.MathUtils.clamp(initialRotRef.current.y + deltaX * 0.45, -36, 36);
        const newRotX = THREE.MathUtils.clamp(initialRotRef.current.x - deltaY * 0.4, -32, 32);
        setRotation({ x: newRotX, y: newRotY });
        setHasInteracted(true);
      }
    } else if (e.touches.length === 2 && isDragging) {
      // 2-finger pinch zoom
      if (e.cancelable) e.preventDefault();
      const currentDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (initialPinchDistRef.current > 0) {
        const pinchRatio = currentDist / initialPinchDistRef.current;
        const newZoom = THREE.MathUtils.clamp(initialZoomRef.current * pinchRatio, 0.85, 1.45);
        setZoom(newZoom);
        setHasInteracted(true);
      }
    }
  };

  const handleTouchEnd = (e) => {
    const elapsed = performance.now() - touchStartRef.current.time;
    const distanceMoved = Math.hypot(
      (e.changedTouches[0]?.clientX || 0) - touchStartRef.current.x,
      (e.changedTouches[0]?.clientY || 0) - touchStartRef.current.y
    );

    // Tap detection: short duration + minimal movement triggers visual pulse feedback
    if (elapsed < 280 && distanceMoved < 8) {
      setIsTappedPulse(true);
      setTimeout(() => setIsTappedPulse(false), 600);
      setHasInteracted(true);
    }

    setIsDragging(false);
    isHorizontalDragRef.current = false;
  };

  // Reset 3D View to original state
  const handleResetView = (e) => {
    e.stopPropagation();
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setIsTappedPulse(true);
    setTimeout(() => setIsTappedPulse(false), 500);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full max-w-[480px] aspect-[4/5] mx-auto flex items-center justify-center touch-pan-y select-none"
      style={{ perspective: 1200 }}
    >
      {/* 3D Background Sculpture Container */}
      <div
        ref={canvasContainerRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-80"
      />

      {/* Radial soft purple glow under frame */}
      <div
        className={`absolute -inset-4 bg-gradient-to-tr from-purple-600/30 via-violet-500/20 to-transparent rounded-3xl blur-2xl pointer-events-none transform transition-all duration-700 ${
          isTappedPulse ? 'scale-110 opacity-80' : 'scale-95 opacity-50'
        }`}
      />

      {/* Main 3D Framed Card with Touch-Linked Orientation and Zoom */}
      <div
        className="relative z-10 w-[84%] h-[90%] rounded-2xl p-[2px] transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
          transformStyle: 'preserve-3d',
          boxShadow: isDragging || isTappedPulse
            ? '0 25px 50px -12px rgba(124, 58, 237, 0.45), 0 0 35px 4px rgba(168, 85, 247, 0.35)'
            : '0 20px 40px -15px rgba(0, 0, 0, 0.7), 0 0 20px 1px rgba(139, 92, 246, 0.15)'
        }}
      >
        {/* Polished Silver & Violet Metallic Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/60 via-purple-400/40 to-slate-400/50 p-[1.5px] pointer-events-none" />

        {/* Inner Glass Container */}
        <div className="relative w-full h-full rounded-[14px] overflow-hidden bg-[#09031a]/85 backdrop-blur-xl border border-white/10 flex flex-col">
          
          {/* Top Metallic Glare */}
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
                className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.01] transition-transform duration-500 ease-out"
                style={{
                  transform: `scale(${isDragging ? 1.04 : 1.01})`
                }}
                loading="eager"
              />
            </picture>

            {/* Gradient Mask at Bottom */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#060114] via-[#060114]/80 to-transparent z-10" />

            {/* Holographic Corner Accents with Tap Feedback */}
            <div
              className={`absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 transition-all duration-300 pointer-events-none z-30 ${
                isTappedPulse ? 'border-purple-300 shadow-[0_0_12px_#c084fc] scale-125' : 'border-purple-400/80'
              }`}
            />
            <div
              className={`absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 transition-all duration-300 pointer-events-none z-30 ${
                isTappedPulse ? 'border-white shadow-[0_0_12px_#ffffff] scale-125' : 'border-slate-200/80'
              }`}
            />
            <div
              className={`absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 transition-all duration-300 pointer-events-none z-30 ${
                isTappedPulse ? 'border-white shadow-[0_0_12px_#ffffff] scale-125' : 'border-slate-200/80'
              }`}
            />
            <div
              className={`absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 transition-all duration-300 pointer-events-none z-30 ${
                isTappedPulse ? 'border-purple-300 shadow-[0_0_12px_#c084fc] scale-125' : 'border-purple-400/80'
              }`}
            />
          </div>

          {/* Integrated Status Bar on Card Bottom */}
          <div className="absolute bottom-0 inset-x-0 p-4 z-30 flex items-center justify-between border-t border-white/10 bg-[#060117]/85 backdrop-blur-md">
            <div className="flex items-center space-x-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_6px_#10b981]"></span>
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

      {/* Floating Interactive 3D Hint Badge (Fades after interaction) */}
      <div
        className={`absolute -bottom-8 sm:-bottom-10 inset-x-0 z-30 flex items-center justify-center pointer-events-none transition-all duration-700 ${
          hasInteracted ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/30 shadow-lg shadow-purple-950/50 backdrop-blur-md">
          <Move className="w-3 h-3 text-purple-300 animate-pulse" />
          <span className="text-[10px] sm:text-[11px] font-mono font-medium text-purple-200 tracking-wide">
            Drag to explore · Pinch to zoom
          </span>
        </div>
      </div>

      {/* Reset 3D View Button (Always accessible when rotated or zoomed) */}
      {(rotation.x !== 0 || rotation.y !== 0 || zoom !== 1) && (
        <button
          type="button"
          onClick={handleResetView}
          className="absolute -top-3 left-4 z-30 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-purple-400/40 text-[11px] font-mono text-purple-200 hover:text-white bg-purple-950/80 hover:bg-purple-900/90 shadow-xl backdrop-blur-md active:scale-95 transition-all animate-in fade-in zoom-in-95 cursor-pointer touch-manipulation"
          aria-label="Reset 3D view orientation and zoom"
        >
          <RotateCcw className="w-3 h-3 text-purple-300" />
          <span>Reset 3D</span>
        </button>
      )}

      {/* Floating Badges */}
      <div
        className="hidden sm:flex absolute -top-3 -right-3 z-20 items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-white/15 text-xs text-slate-200 font-medium shadow-lg backdrop-blur-md transition-transform duration-300"
        style={{
          transform: `translate3d(${rotation.y * -0.5}px, ${rotation.x * 0.5}px, 20px)`
        }}
      >
        <Sparkles className="w-3 h-3 text-purple-400" />
        <span>Assoc. Software Engineer</span>
      </div>
    </div>
  );
}
