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

    // Viewport-based sizing
    const getViewportSize = () => ({
      width: window.innerWidth || 360,
      height: window.innerHeight || 640
    });

    const initialSize = getViewportSize();

    // Scene, Fog, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030014, 0.003);

    const camera = new THREE.PerspectiveCamera(
      55,
      initialSize.width / initialSize.height,
      0.1,
      1000
    );
    camera.position.set(0, 0, 80);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(initialSize.width, initialSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Master universe group
    const universeGroup = new THREE.Group();
    scene.add(universeGroup);

    // 1. Starfield Particles (multi-depth layers)
    const particleCount = isMobile ? 320 : 680;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorViolet = new THREE.Color(0xa855f7);
    const colorIndigo = new THREE.Color(0x6366f1);
    const colorSilver = new THREE.Color(0xf1f5f9);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 260;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 180;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

      const mixedColor = i % 3 === 0 ? colorViolet : i % 3 === 1 ? colorIndigo : colorSilver;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Glow disc canvas texture for particles
    const canvas = document.createElement('canvas');
    canvas.width = 16;
    canvas.height = 16;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.5, 'rgba(192,132,252,0.85)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 16, 16);
    const particleTexture = new THREE.CanvasTexture(canvas);

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 1.4 : 1.8,
      map: particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    universeGroup.add(particles);

    // 2. Cinematic Central Quantum Astrolabe Core
    const coreGroup = new THREE.Group();
    universeGroup.add(coreGroup);

    // Inner wireframe icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(isMobile ? 10 : 13, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.28
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreGroup.add(coreMesh);

    // Inner glowing sphere
    const innerSphereGeo = new THREE.SphereGeometry(isMobile ? 4.5 : 6, 24, 24);
    const innerSphereMat = new THREE.MeshStandardMaterial({
      color: 0x22104b,
      emissive: 0x7c3aed,
      emissiveIntensity: 0.7,
      roughness: 0.2,
      metalness: 0.85
    });
    const innerSphere = new THREE.Mesh(innerSphereGeo, innerSphereMat);
    coreGroup.add(innerSphere);

    // 3. Concentric Astrolabe Rings
    const ringMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x8b5cf6, transparent: true, opacity: 0.32, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xc084fc, transparent: true, opacity: 0.25, wireframe: true }),
      new THREE.MeshBasicMaterial({ color: 0xe2e8f0, transparent: true, opacity: 0.18, wireframe: true })
    ];

    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(36, 0.2, 16, isMobile ? 64 : 100), ringMaterials[0]);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 6;
    universeGroup.add(ring1);

    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(52, 0.16, 16, isMobile ? 72 : 120), ringMaterials[1]);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 5;
    universeGroup.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(68, 0.12, 16, isMobile ? 80 : 140), ringMaterials[2]);
    ring3.rotation.x = Math.PI / 2.2;
    universeGroup.add(ring3);

    // 4. Floating Abstract Geometric Nodes
    const nodeGeo = new THREE.OctahedronGeometry(1.6, 0);
    const nodeMat = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      wireframe: true,
      transparent: true,
      opacity: 0.4
    });

    const nodeCount = isMobile ? 5 : 8;
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
        initialY: mesh.position.y
      });
    }

    // 5. Dynamic Section-Linked Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const primaryLight = new THREE.PointLight(0xa855f7, 4, 150);
    primaryLight.position.set(10, 20, 30);
    scene.add(primaryLight);

    const accentLight = new THREE.PointLight(0x6366f1, 3, 140);
    accentLight.position.set(-20, -15, 20);
    scene.add(accentLight);

    // Parallax tracking (supports both mouse and mobile touch)
    let pointerX = 0;
    let pointerY = 0;
    let targetPointerX = 0;
    let targetPointerY = 0;

    const handlePointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const { innerWidth, innerHeight } = window;
      targetPointerX = (clientX / innerWidth - 0.5) * 2;
      targetPointerY = (clientY / innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Scroll progress tracking
    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    const calculateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0;
    };

    window.addEventListener('scroll', calculateScroll, { passive: true });
    calculateScroll();

    // Resize handling
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop with delta time and smooth scroll-driven cinematic choreography
    let animationFrameId;
    let lastTime = performance.now();
    const startTime = performance.now();

    // Color checkpoints for scroll progression
    const lightColorHero = new THREE.Color(0xa855f7); // Violet
    const lightColorAbout = new THREE.Color(0x6366f1); // Indigo
    const lightColorExp = new THREE.Color(0x9333ea); // Purple
    const lightColorSkills = new THREE.Color(0xc084fc); // Bright Orchid
    const lightColorProjects = new THREE.Color(0x06b6d4); // Cyan
    const lightColorDS = new THREE.Color(0x8b5cf6); // Amethyst
    const lightColorContact = new THREE.Color(0xec4899); // Pink-Violet

    const animate = (currentTime = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min((currentTime - lastTime) * 0.001, 0.1);
      lastTime = currentTime;
      const elapsedTime = (currentTime - startTime) * 0.001;

      // Exponential smoothing for scroll progress and pointer
      const scrollLerp = Math.min(1 - Math.exp(-6 * delta), 0.2);
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * scrollLerp;

      const pointerLerp = Math.min(1 - Math.exp(-5 * delta), 0.2);
      pointerX += (targetPointerX - pointerX) * pointerLerp;
      pointerY += (targetPointerY - pointerY) * pointerLerp;

      const p = currentScrollProgress; // normalized scroll progress 0.0 -> 1.0

      // Cinematic Camera Trajectory across sections
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 80;
      let targetLookY = 0;

      if (p < 0.16) {
        // Hero Section (0.00 -> 0.16)
        const t = p / 0.16;
        targetCamX = THREE.MathUtils.lerp(0, 18, t);
        targetCamY = THREE.MathUtils.lerp(0, -8, t);
        targetCamZ = THREE.MathUtils.lerp(80, 68, t);
        primaryLight.color.lerpColors(lightColorHero, lightColorAbout, t);
      } else if (p < 0.36) {
        // About Section (0.16 -> 0.36)
        const t = (p - 0.16) / 0.2;
        targetCamX = THREE.MathUtils.lerp(18, -16, t);
        targetCamY = THREE.MathUtils.lerp(-8, 12, t);
        targetCamZ = THREE.MathUtils.lerp(68, 56, t);
        targetLookY = THREE.MathUtils.lerp(0, 4, t);
        primaryLight.color.lerpColors(lightColorAbout, lightColorExp, t);
      } else if (p < 0.54) {
        // Experience Timeline Section (0.36 -> 0.54)
        const t = (p - 0.36) / 0.18;
        targetCamX = THREE.MathUtils.lerp(-16, 0, t);
        targetCamY = THREE.MathUtils.lerp(12, -4, t);
        targetCamZ = THREE.MathUtils.lerp(56, 88, t);
        primaryLight.color.lerpColors(lightColorExp, lightColorSkills, t);
      } else if (p < 0.72) {
        // Skills Section (0.54 -> 0.72)
        const t = (p - 0.54) / 0.18;
        targetCamX = THREE.MathUtils.lerp(0, 16, t);
        targetCamY = THREE.MathUtils.lerp(-4, -14, t);
        targetCamZ = THREE.MathUtils.lerp(88, 58, t);
        primaryLight.color.lerpColors(lightColorSkills, lightColorProjects, t);
      } else if (p < 0.88) {
        // Projects Section (0.72 -> 0.88)
        const t = (p - 0.72) / 0.16;
        targetCamX = THREE.MathUtils.lerp(16, -12, t);
        targetCamY = THREE.MathUtils.lerp(-14, 8, t);
        targetCamZ = THREE.MathUtils.lerp(58, 52, t);
        primaryLight.color.lerpColors(lightColorProjects, lightColorDS, t);
      } else {
        // Contact Section (0.88 -> 1.00)
        const t = (p - 0.88) / 0.12;
        targetCamX = THREE.MathUtils.lerp(-12, 0, t);
        targetCamY = THREE.MathUtils.lerp(8, -2, t);
        targetCamZ = THREE.MathUtils.lerp(52, 42, t);
        primaryLight.color.lerpColors(lightColorDS, lightColorContact, t);
      }

      // Apply Camera Position & subtle pointer parallax
      camera.position.x = targetCamX + pointerX * (isMobile ? 2.5 : 5);
      camera.position.y = targetCamY - pointerY * (isMobile ? 2 : 4);
      camera.position.z = targetCamZ;
      camera.lookAt(0, targetLookY, 0);

      // Rotate and morph central quantum core
      if (!prefersReducedMotion) {
        coreGroup.rotation.y = elapsedTime * 0.18 + p * Math.PI * 2;
        coreGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.15 + p * Math.PI;
        coreMesh.rotation.z = -elapsedTime * 0.12;

        const pulseScale = 1 + Math.sin(elapsedTime * 1.5) * 0.05;
        coreGroup.scale.setScalar(pulseScale);

        // Delta-based and scroll-driven rotation of concentric rings
        ring1.rotation.z += 0.05 * delta + p * 0.01;
        ring1.rotation.y = Math.PI / 6 + p * Math.PI;
        ring2.rotation.z -= 0.04 * delta + p * 0.015;
        ring2.rotation.x = -Math.PI / 4 + p * Math.PI * 0.8;
        ring3.rotation.z += 0.03 * delta;

        // Particle cloud slow drift with scroll acceleration
        particles.rotation.y = elapsedTime * 0.015 + p * 0.5;
        particles.rotation.x = Math.sin(p * Math.PI) * 0.1;

        // Nodes animation along helix
        nodes.forEach((node, idx) => {
          node.mesh.rotation.x += node.rotSpeed * delta;
          node.mesh.rotation.y += node.rotSpeed * 1.2 * delta;
          node.mesh.position.y = node.initialY + Math.sin(elapsedTime * 1.5 + idx + p * 4) * 2;
        });

        // Parallax universe tilt
        universeGroup.rotation.y = pointerX * 0.08;
        universeGroup.rotation.x = -pointerY * 0.06;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Pause rendering when tab is hidden
    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        lastTime = performance.now();
        animate(performance.now());
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('scroll', calculateScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);

      // Clean up WebGL resources
      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      innerSphereGeo.dispose();
      innerSphereMat.dispose();
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
