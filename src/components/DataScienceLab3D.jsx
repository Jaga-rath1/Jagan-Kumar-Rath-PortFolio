import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCcw, Move } from 'lucide-react';

export default function DataScienceLab3D() {
  const containerRef = useRef(null);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isCustomView, setIsCustomView] = useState(false);
  const resetFnRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 320;
    const height = container.clientHeight || 320;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      width / height,
      0.1,
      100
    );
    const defaultCamZ = 24;
    camera.position.set(0, 10, defaultCamZ);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    const labGroup = new THREE.Group();
    scene.add(labGroup);

    // 1. Subtle 3D Coordinate Grid Plane
    const grid = new THREE.GridHelper(24, 16, 0x8b5cf6, 0x221345);
    grid.position.y = -6;
    grid.material.opacity = 0.25;
    grid.material.transparent = true;
    labGroup.add(grid);

    // 2. 3D Connected Data Points (Simulated Data Manifold)
    const nodeCount = 42;
    const nodePositions = [];
    const nodeGeometry = new THREE.SphereGeometry(0.28, 12, 12);
    const nodeMaterial = new THREE.MeshStandardMaterial({
      color: 0xc084fc,
      emissive: 0x9333ea,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8
    });

    const nodeMeshes = [];
    for (let i = 0; i < nodeCount; i++) {
      const u = Math.random() * Math.PI * 2;
      const v = (Math.random() - 0.5) * Math.PI;
      const radius = 6.5 + Math.sin(u * 3) * 1.5;

      const x = radius * Math.cos(v) * Math.cos(u);
      const y = radius * Math.sin(v) + (Math.random() - 0.5) * 2;
      const z = radius * Math.cos(v) * Math.sin(u);

      const mesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
      mesh.position.set(x, y, z);
      labGroup.add(mesh);
      nodeMeshes.push(mesh);
      nodePositions.push(new THREE.Vector3(x, y, z));
    }

    // Connect near nodes with lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x7c3aed,
      transparent: true,
      opacity: 0.28
    });

    const linePoints = [];
    for (let i = 0; i < nodePositions.length; i++) {
      for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < 4.2) {
          linePoints.push(nodePositions[i]);
          linePoints.push(nodePositions[j]);
        }
      }
    }

    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const linesMesh = new THREE.LineSegments(lineGeo, lineMaterial);
    labGroup.add(linesMesh);

    // 3. Central Wireframe Geometry (Analytical Core)
    const coreGeo = new THREE.IcosahedronGeometry(3.5, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    labGroup.add(coreMesh);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambient);

    const violetLight = new THREE.PointLight(0xa855f7, 5, 30);
    violetLight.position.set(5, 12, 10);
    scene.add(violetLight);

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
      targetRotY += deltaX * 0.005;
      targetRotX = THREE.MathUtils.clamp(targetRotX + deltaY * 0.005, -0.6, 0.6);
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

      // Gesture rotation damping
      currentRotY += (targetRotY - currentRotY) * 0.1;
      currentRotX += (targetRotX - currentRotX) * 0.1;
      labGroup.rotation.y = elapsed * 0.08 + currentRotY;
      labGroup.rotation.x = currentRotX;

      if (!prefersReducedMotion) {
        coreMesh.rotation.x = -elapsed * 0.1;
        coreMesh.rotation.z = elapsed * 0.06;
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
      const w = container.clientWidth || 320;
      const h = container.clientHeight || 320;
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

      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineGeo.dispose();
      lineMaterial.dispose();
      coreGeo.dispose();
      coreMat.dispose();
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
    <div className="w-full h-[320px] sm:h-[400px] relative touch-pan-y select-none">
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating Hint Pill */}
      <div
        className={`absolute bottom-3 inset-x-0 z-20 flex items-center justify-center pointer-events-none transition-all duration-700 ${
          hasInteracted ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/80 border border-purple-400/30 text-[10px] sm:text-[11px] font-mono text-purple-200 shadow-lg backdrop-blur-md">
          <Move className="w-3 h-3 text-purple-400 animate-pulse" />
          <span>Drag to rotate 3D data manifold</span>
        </div>
      </div>

      {/* Reset View Button */}
      {isCustomView && (
        <button
          type="button"
          onClick={handleReset}
          className="absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-card border border-purple-400/40 text-[11px] font-mono text-purple-200 hover:text-white bg-purple-950/80 hover:bg-purple-900/90 shadow-xl backdrop-blur-md active:scale-95 transition-all cursor-pointer touch-manipulation"
          aria-label="Reset 3D data manifold orientation"
        >
          <RotateCcw className="w-3 h-3 text-purple-300" />
          <span>Reset View</span>
        </button>
      )}
    </div>
  );
}
