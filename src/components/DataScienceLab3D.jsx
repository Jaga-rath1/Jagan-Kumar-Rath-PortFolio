import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DataScienceLab3D() {
  const containerRef = useRef(null);

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
    camera.position.set(0, 10, 24);
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

      if (!prefersReducedMotion) {
        labGroup.rotation.y = elapsed * 0.08;
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

  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[400px] relative pointer-events-none"
    />
  );
}
