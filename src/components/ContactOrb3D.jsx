import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ContactOrb3D() {
  const containerRef = useRef(null);

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
    camera.position.z = 16;

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

  return (
    <div
      ref={containerRef}
      className="w-full h-[280px] sm:h-[340px] relative pointer-events-none"
    />
  );
}
