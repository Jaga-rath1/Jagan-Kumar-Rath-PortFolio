import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Move } from 'lucide-react';
import { skillOrbits } from '../data/portfolioData';

export default function SkillOrbit3D({ activeOrbitIndex, onSelectOrbit }) {
  const containerRef = useRef(null);
  const activeIndexRef = useRef(activeOrbitIndex);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCustomView, setIsCustomView] = useState(false);

  useEffect(() => {
    activeIndexRef.current = activeOrbitIndex;
  }, [activeOrbitIndex]);

  const resetViewFnRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 400;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    const defaultCamZ = isMobile ? 26 : 24;
    camera.position.set(0, 5, defaultCamZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Master Solar System Group
    const solarGroup = new THREE.Group();
    scene.add(solarGroup);

    // 1. Central Star (Engineering Core)
    const sphereGeo = new THREE.SphereGeometry(2.4, 24, 24);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x4c1d95,
      roughness: 0.15,
      metalness: 0.85,
      emissive: 0x6b21a8,
      emissiveIntensity: 0.8
    });
    const centerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    solarGroup.add(centerSphere);

    // Subtle golden wireframe aura
    const wireGeo = new THREE.IcosahedronGeometry(3.0, 1);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    solarGroup.add(wireSphere);

    // 2. Concentric Orbit Rings & Interactive Planets
    const orbitPlanets = [];
    const ringMeshes = [];

    const orbitColors = [0x8b5cf6, 0x06b6d4, 0x10b981, 0xf59e0b, 0xec4899];

    skillOrbits.forEach((orbit, i) => {
      const radius = 5.2 + i * 2.3;

      // Orbit Track Ring
      const ringGeo = new THREE.TorusGeometry(radius, 0.04, 16, 100);
      const ringMat = new THREE.MeshBasicMaterial({
        color: orbitColors[i % orbitColors.length],
        transparent: true,
        opacity: i === activeIndexRef.current ? 0.85 : 0.25
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      solarGroup.add(ring);
      ringMeshes.push(ring);

      // Orbit Planet Mesh
      const planetGeo = new THREE.SphereGeometry(0.7, 16, 16);
      const planetMat = new THREE.MeshStandardMaterial({
        color: orbitColors[i % orbitColors.length],
        roughness: 0.3,
        metalness: 0.7,
        emissive: orbitColors[i % orbitColors.length],
        emissiveIntensity: 0.5
      });
      const planet = new THREE.Mesh(planetGeo, planetMat);
      planet.userData = { orbitIndex: i };
      ring.userData = { orbitIndex: i };
      solarGroup.add(planet);

      orbitPlanets.push({
        mesh: planet,
        radius,
        speed: (0.35 / (i + 1)) * (i % 2 === 0 ? 1 : -1),
        angle: (i * Math.PI) / 2.5
      });
    });

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const purpleLight = new THREE.PointLight(0xa855f7, 6, 40);
    purpleLight.position.set(0, 10, 0);
    scene.add(purpleLight);

    const sideLight = new THREE.PointLight(0x6366f1, 4, 35);
    sideLight.position.set(15, 5, 10);
    scene.add(sideLight);

    // Raycaster for planet touch selection
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const checkIntersection = (clientX, clientY) => {
      if (!onSelectOrbit || !container) return false;
      const rect = container.getBoundingClientRect();
      mouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const interactables = [...orbitPlanets.map(p => p.mesh), ...ringMeshes];
      const intersects = raycaster.intersectObjects(interactables);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && typeof hit.userData.orbitIndex === 'number') {
          onSelectOrbit(hit.userData.orbitIndex);
          setHasInteracted(true);
          return true;
        }
      }
      return false;
    };

    // Touch & Pointer Gesture Engine
    let isDragging = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    let initialPinchDist = 0;
    let initialCamZ = defaultCamZ;
    let isHorizontalGesture = false;

    // Target rotation angles for smooth damping
    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    // Reset View Function
    resetViewFnRef.current = () => {
      targetRotX = 0;
      targetRotY = 0;
      camera.position.z = defaultCamZ;
      setIsCustomView(false);
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      touchStartTime = performance.now();
      isHorizontalGesture = false;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - touchStartX;
      const deltaY = e.clientY - touchStartY;

      targetRotY += deltaX * 0.005;
      targetRotX = THREE.MathUtils.clamp(targetRotX + deltaY * 0.005, -0.6, 0.6);

      touchStartX = e.clientX;
      touchStartY = e.clientY;
      setHasInteracted(true);
      setIsCustomView(true);
    };

    const handlePointerUp = (e) => {
      if (isDragging) {
        const duration = performance.now() - touchStartTime;
        if (duration < 300) {
          checkIntersection(e.clientX, e.clientY);
        }
      }
      isDragging = false;
    };

    // Mobile Touch Handlers
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = performance.now();
        isHorizontalGesture = false;
      } else if (e.touches.length === 2) {
        isDragging = true;
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialCamZ = camera.position.z;
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && isDragging) {
        const deltaX = e.touches[0].clientX - touchStartX;
        const deltaY = e.touches[0].clientY - touchStartY;

        if (!isHorizontalGesture && Math.abs(deltaX) > Math.abs(deltaY) + 4) {
          isHorizontalGesture = true;
        }

        if (isHorizontalGesture) {
          if (e.cancelable) e.preventDefault();
          targetRotY += deltaX * 0.008;
          targetRotX = THREE.MathUtils.clamp(targetRotX + deltaY * 0.006, -0.6, 0.6);
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
          setHasInteracted(true);
          setIsCustomView(true);
        }
      } else if (e.touches.length === 2 && isDragging && initialPinchDist > 0) {
        if (e.cancelable) e.preventDefault();
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const pinchRatio = initialPinchDist / currentDist;
        camera.position.z = THREE.MathUtils.clamp(initialCamZ * pinchRatio, 16, 38);
        setHasInteracted(true);
        setIsCustomView(true);
      }
    };

    const handleTouchEnd = (e) => {
      if (isDragging) {
        const duration = performance.now() - touchStartTime;
        if (duration < 280 && !isHorizontalGesture) {
          const touch = e.changedTouches[0];
          if (touch) {
            checkIntersection(touch.clientX, touch.clientY);
          }
        }
      }
      isDragging = false;
      isHorizontalGesture = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('pointerdown', handlePointerDown);
    dom.addEventListener('pointermove', handlePointerMove);
    dom.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('touchstart', handleTouchStart, { passive: false });
    dom.addEventListener('touchmove', handleTouchMove, { passive: false });
    dom.addEventListener('touchend', handleTouchEnd);

    // Animation Loop with delta time
    let animationFrameId;
    let lastTime = performance.now();
    const startTime = performance.now();

    let isIntersecting = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const animate = (currentTime = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isIntersecting) return;

      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      const elapsed = (currentTime - startTime) * 0.001;

      // Smooth damping on gesture rotations
      const lerpFactor = Math.min(1 - Math.exp(-8 * delta), 0.2);
      currentRotY += (targetRotY - currentRotY) * lerpFactor;
      currentRotX += (targetRotX - currentRotX) * lerpFactor;
      solarGroup.rotation.y = currentRotY;
      solarGroup.rotation.x = currentRotX;

      if (!prefersReducedMotion) {
        // Base rotation of core
        centerSphere.rotation.y += 0.005;
        wireSphere.rotation.y -= 0.008;
        wireSphere.rotation.x = Math.sin(elapsed * 0.4) * 0.15;

        // Move planets along orbits
        orbitPlanets.forEach((p, idx) => {
          p.angle += p.speed * delta;
          p.mesh.position.x = Math.cos(p.angle) * p.radius;
          p.mesh.position.z = Math.sin(p.angle) * p.radius;
          p.mesh.position.y = Math.sin(elapsed * 2 + idx) * 0.25;

          // Pulse active orbit
          if (idx === activeIndexRef.current) {
            ringMeshes[idx].material.opacity = 0.9;
            p.mesh.scale.setScalar(1.4);
          } else {
            ringMeshes[idx].material.opacity = 0.25;
            p.mesh.scale.setScalar(1.0);
          }
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animate(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      dom.removeEventListener('pointerdown', handlePointerDown);
      dom.removeEventListener('pointermove', handlePointerMove);
      dom.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('touchstart', handleTouchStart);
      dom.removeEventListener('touchmove', handleTouchMove);
      dom.removeEventListener('touchend', handleTouchEnd);

      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ringMeshes.forEach(r => {
        r.geometry.dispose();
        r.material.dispose();
      });
      orbitPlanets.forEach(p => {
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
      });
      renderer.forceContextLoss();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectOrbit]);

  const handleReset = (e) => {
    e.stopPropagation();
    if (resetViewFnRef.current) {
      resetViewFnRef.current();
    }
  };

  return (
    <div className="relative w-full h-[320px] sm:h-[400px] lg:h-[440px] touch-pan-y select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Gesture Hint Pill */}
      <div
        className={`absolute bottom-3 inset-x-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-700 ${
          hasInteracted ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/30 text-[10px] sm:text-[11px] font-mono text-purple-200 shadow-lg backdrop-blur-md">
          <Move className="w-3 h-3 text-purple-400 animate-pulse" />
          <span>Drag to orbit solar system · Tap planets to inspect</span>
        </div>
      </div>

      {/* Reset View Button */}
      {isCustomView && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-purple-400/40 text-[11px] font-mono text-purple-200 hover:text-white bg-purple-950/80 hover:bg-purple-900/90 shadow-xl backdrop-blur-md active:scale-95 transition-all cursor-pointer touch-manipulation"
          aria-label="Reset 3D solar system orientation"
        >
          <RotateCcw className="w-3 h-3 text-purple-300" />
          <span>Reset Orbit</span>
        </button>
      )}
    </div>
  );
}
