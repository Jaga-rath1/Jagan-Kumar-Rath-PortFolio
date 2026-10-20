import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Move } from 'lucide-react';

export default function ContactOrb3D() {
  const containerRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCustomView, setIsCustomView] = useState(false);
  const resetFnRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 280;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      width / height,
      0.1,
      100
    );
    const defaultCamZ = 16;
    camera.position.z = defaultCamZ;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Central Polished Metallic Sphere
    const sphereGeo = new THREE.SphereGeometry(3.2, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x1f0e42,
      roughness: 0.18,
      metalness: 0.9,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.4
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphere);

    // 2. Concentric Silver & Violet Orbital Rings
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.4, wireframe: true });
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.3 });
    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.35 });

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(5.2, 0.06, 16, 80), ringMat1);
    ring1.rotation.x = Math.PI / 3;
    group.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(6.6, 0.05, 16, 100), ringMat2);
    ring2.rotation.y = Math.PI / 4;
    group.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(8.0, 0.04, 16, 120), ringMat3);
    ring3.rotation.x = -Math.PI / 3;
    group.add(ring3);

    // 3. Floating Sparkle Particles
    const pGeo = new THREE.BufferGeometry();
    const pCount = 90;
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
      pPos[i] = (Math.random() - 0.5) * 20;
      pPos[i + 1] = (Math.random() - 0.5) * 20;
      pPos[i + 2] = (Math.random() - 0.5) * 12;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0xd8b4fe,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(pGeo, pMat);
    group.add(points);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambient);

    const pointLight = new THREE.PointLight(0xa855f7, 5, 25);
    pointLight.position.set(8, 8, 8);
    scene.add(pointLight);

    // Touch & Pointer Gesture Engine
    let isDragging = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalGesture = false;
    let initialPinchDist = 0;
    let initialCamZ = defaultCamZ;

    let targetRotY = 0;
    let targetRotX = 0;
    let currentRotY = 0;
    let currentRotX = 0;

    resetFnRef.current = () => {
      targetRotX = 0;
      targetRotY = 0;
      camera.position.z = defaultCamZ;
      setIsCustomView(false);
    };

    const handlePointerDown = (e) => {
      isDragging = true;
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      isHorizontalGesture = false;
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - touchStartX;
      const deltaY = e.clientY - touchStartY;
      targetRotY += deltaX * 0.006;
      targetRotX = THREE.MathUtils.clamp(targetRotX + deltaY * 0.006, -0.7, 0.7);
      touchStartX = e.clientX;
      touchStartY = e.clientY;
      setHasInteracted(true);
      setIsCustomView(true);
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
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
          targetRotY += deltaX * 0.009;
          targetRotX = THREE.MathUtils.clamp(targetRotX + deltaY * 0.007, -0.7, 0.7);
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
        camera.position.z = THREE.MathUtils.clamp(initialCamZ * pinchRatio, 10, 28);
        setHasInteracted(true);
        setIsCustomView(true);
      }
    };

    const handleTouchEnd = () => {
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

    let animId;
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
      animId = requestAnimationFrame(animate);
      if (!isIntersecting) return;

      const elapsed = (currentTime - startTime) * 0.001;

      currentRotY += (targetRotY - currentRotY) * 0.1;
      currentRotX += (targetRotX - currentRotX) * 0.1;
      group.rotation.y = currentRotY;
      group.rotation.x = currentRotX;

      if (!prefersReducedMotion) {
        sphere.rotation.y = elapsed * 0.15;
        ring1.rotation.z = elapsed * 0.12;
        ring2.rotation.x = -elapsed * 0.09;
        ring3.rotation.y = elapsed * 0.07;
        points.rotation.y = elapsed * 0.03;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        animate();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 280;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
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
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ring3.geometry.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.forceContextLoss();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  const handleReset = (e) => {
    e.stopPropagation();
    if (resetFnRef.current) resetFnRef.current();
  };

  return (
    <div className="w-full h-[280px] sm:h-[340px] relative touch-pan-y select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Hint Pill */}
      <div
        className={`absolute bottom-2 inset-x-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-700 ${
          hasInteracted ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-400/30 text-[10px] font-mono text-purple-200 shadow-lg backdrop-blur-md">
          <Move className="w-3 h-3 text-purple-400 animate-pulse" />
          <span>Drag to rotate orb</span>
        </div>
      </div>

      {/* Reset View Button */}
      {isCustomView && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-2 right-2 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full glass-card border border-purple-400/40 text-[10px] font-mono text-purple-200 hover:text-white bg-purple-950/80 hover:bg-purple-900/90 shadow-xl backdrop-blur-md active:scale-95 transition-all cursor-pointer touch-manipulation"
          aria-label="Reset 3D orb orientation"
        >
          <RotateCcw className="w-3 h-3 text-purple-300" />
          <span>Reset</span>
        </button>
      )}
    </div>
  );
}
