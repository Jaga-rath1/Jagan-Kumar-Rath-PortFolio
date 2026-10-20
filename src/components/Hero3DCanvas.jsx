import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check reduced motion & mobile viewport
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // Viewport-based sizing for mobile and desktop stability
    const getViewportSize = () => ({
      width: window.innerWidth || 360,
      height: window.innerHeight || 640
    });

    const initialSize = getViewportSize();

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.002);

    const camera = new THREE.PerspectiveCamera(
      60,
      initialSize.width / initialSize.height,
      0.1,
      1000
    );
    camera.position.z = 80;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for objects
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Starfield Particles (adaptive count for 144Hz & mobile efficiency)
    const particleCount = isMobile ? 320 : 700;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xa855f7); // Violet
    const color2 = new THREE.Color(0x6366f1); // Indigo
    const color3 = new THREE.Color(0xffffff); // Silver-white

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 240;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 160;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 180;

      const mixedColor = i % 3 === 0 ? color1 : i % 3 === 1 ? color2 : color3;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(192,132,252,0.8)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 1.4 : 1.8,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    universeGroup.add(particles);

    // 2. Elegant Orbital Rings in background
    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.22, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.15, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.12, wireframe: true })
    ];

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(38, 0.2, 16, isMobile ? 60 : 100), ringMaterials[0]);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    universeGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(52, 0.15, 16, isMobile ? 70 : 120), ringMaterials[1]);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 5;
    universeGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(68, 0.1, 16, isMobile ? 80 : 140), ringMaterials[2]);
    ring3.rotation.x = Math.PI / 2.2;
    universeGroup.add(ring3);

    // 3. Floating abstract geometric nodes
    const nodeGeo = new THREE.OctahedronGeometry(1.6, 0);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });

    const nodeCount = isMobile ? 4 : 7;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
      const mesh = new THREE.Mesh(nodeGeo, nodeMat);
      mesh.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 60
      );
      mesh.scale.setScalar(0.8 + Math.random() * 0.8);
      universeGroup.add(mesh);
      nodes.push({
        mesh,
        rotSpeed: (Math.random() - 0.5) * 0.8,
        floatSpeed: 0.005 + Math.random() * 0.01,
        initialY: mesh.position.y
      });
    }

    // Mouse movement parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize handling using window viewport size
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with delta time for 144Hz refresh rate independence
    let animationFrameId;
    let lastTime = performance.now();
    const startTime = performance.now();

    const animate = (currentTime = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1); // clamp to prevent delta spike
      lastTime = currentTime;
      const elapsedTime = (currentTime - startTime) * 0.001;

      if (!prefersReducedMotion) {
        // Delta-based rotation of rings
        ring1.rotation.z += 0.05 * delta;
        ring2.rotation.z -= 0.04 * delta;
        ring3.rotation.z += 0.03 * delta;

        // Particles slow drift
        particles.rotation.y = elapsedTime * 0.015;

        // Nodes movement
        nodes.forEach((node, idx) => {
          node.mesh.rotation.x += node.rotSpeed * delta;
          node.mesh.rotation.y += node.rotSpeed * 1.2 * delta;
          node.mesh.position.y = node.initialY + Math.sin(elapsedTime * 1.5 + idx) * 2;
        });

        // Mouse Parallax with framerate-independent exponential smoothing
        targetX = mouseX * 6;
        targetY = -mouseY * 6;
        const lerpFactor = 1 - Math.exp(-5 * delta);
        universeGroup.rotation.y += (targetX * 0.015 - universeGroup.rotation.y) * lerpFactor;
        universeGroup.rotation.x += (targetY * 0.015 - universeGroup.rotation.x) * lerpFactor;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Pause rendering when tab is hidden to conserve GPU/battery
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now(); // flush delta
        animate(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      // Clean up WebGL resources
      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      ringMaterials.forEach(m => m.dispose());
      ring1.geometry.dispose();
      ring2.geometry.dispose();
      ring3.geometry.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
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
      className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
}

