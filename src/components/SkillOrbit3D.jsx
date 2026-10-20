import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SkillOrbit3D({ activeOrbitIndex, onSelectOrbit }) {
  const containerRef = useRef(null);
  const activeIndexRef = useRef(activeOrbitIndex);

  useEffect(() => {
    activeIndexRef.current = activeOrbitIndex;
  }, [activeOrbitIndex]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Center metallic sphere
    const sphereGeo = new THREE.SphereGeometry(2.4, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x221345,
      roughness: 0.15,
      metalness: 0.9,
      emissive: 0x4c1d95,
      emissiveIntensity: 0.35
    });
    const centerSphere = new THREE.Mesh(sphereGeo, sphereMat);
    scene.add(centerSphere);

    // Inner wireframe sphere
    const wireGeo = new THREE.IcosahedronGeometry(2.6, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const wireSphere = new THREE.Mesh(wireGeo, wireMat);
    scene.add(wireSphere);

    // 5 Orbital Rings
    const orbitRadii = [4.5, 6.5, 8.5, 10.5, 12.5];
    const orbitColors = [0x8b5cf6, 0xa855f7, 0x6366f1, 0xc084fc, 0xe2e8f0];
    const ringMeshes = [];
    const orbitPlanets = [];

    orbitRadii.forEach((radius, i) => {
      // Ring
      const ringGeo = new THREE.RingGeometry(radius - 0.04, radius + 0.04, 80);
      const ringMat = new THREE.MeshBasicMaterial({
        color: orbitColors[i],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      ringMeshes.push(ring);

      // Planet nodes orbiting on this ring
      const planetGeo = new THREE.SphereGeometry(0.45, 16, 16);
      const planetMat = new THREE.MeshStandardMaterial({
        color: orbitColors[i],
        emissive: orbitColors[i],
        emissiveIntensity: 0.6,
        roughness: 0.3,
        metalness: 0.8
      });
      const planet = new THREE.Mesh(planetGeo, planetMat);
      planet.userData = { orbitIndex: i };
      ring.userData = { orbitIndex: i };
      scene.add(planet);

      orbitPlanets.push({
        mesh: planet,
        radius,
        speed: (0.35 / (i + 1)) * (i % 2 === 0 ? 1 : -1),
        angle: (i * Math.PI) / 2.5
      });
    });

    // Raycaster for interactive click selection on 3D planets
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e) => {
      if (!onSelectOrbit || !container) return;
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const interactables = [...orbitPlanets.map(p => p.mesh), ...ringMeshes];
      const intersects = raycaster.intersectObjects(interactables);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData && typeof hit.userData.orbitIndex === 'number') {
          onSelectOrbit(hit.userData.orbitIndex);
        }
      }
    };

    container.addEventListener('click', handleClick);

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambient);

    const purpleLight = new THREE.PointLight(0xa855f7, 6, 40);
    purpleLight.position.set(0, 10, 0);
    scene.add(purpleLight);

    const sideLight = new THREE.PointLight(0x6366f1, 4, 35);
    sideLight.position.set(15, 5, 10);
    scene.add(sideLight);

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

      if (!prefersReducedMotion) {
        // Rotate center sphere
        centerSphere.rotation.y += 0.005;
        wireSphere.rotation.y -= 0.008;
        wireSphere.rotation.x = Math.sin(elapsed * 0.4) * 0.15;

        // Move planets along orbits
        orbitPlanets.forEach((p, idx) => {
          p.angle += p.speed * delta;
          p.mesh.position.x = Math.cos(p.angle) * p.radius;
          p.mesh.position.z = Math.sin(p.angle) * p.radius;
          p.mesh.position.y = Math.sin(elapsed * 2 + idx) * 0.2;

          // Pulse active orbit
          if (idx === activeIndexRef.current) {
            ringMeshes[idx].material.opacity = 0.85;
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
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      container.removeEventListener('click', handleClick);
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


  return (
    <div
      ref={containerRef}
      className="w-full h-[320px] sm:h-[400px] lg:h-[440px] relative select-none"
    />
  );
}
