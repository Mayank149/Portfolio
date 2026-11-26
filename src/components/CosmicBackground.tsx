import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  warpTrigger: number;
  isHome: boolean;
}

export function CosmicBackground({ warpTrigger, isHome }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpRef = useRef(0);
  const isHomeRef = useRef(isHome);

  useEffect(() => {
    isHomeRef.current = isHome;
  }, [isHome]);

  useEffect(() => {
    if (warpTrigger > 0) {
      warpRef.current = 1.0;
    }
  }, [warpTrigger]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      120
    );
    camera.position.set(0, 0.35, 9);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    scene.add(new THREE.AmbientLight(0xffffff, 0.32));

    const pinkLight = new THREE.PointLight(0xff2a85, 3.4, 28);
    pinkLight.position.set(4.5, 2.5, 4.5);
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2.4, 26);
    blueLight.position.set(-4.5, 1.5, 3.5);
    scene.add(blueLight);

    const violetLight = new THREE.PointLight(0xa855f7, 1.8, 24);
    violetLight.position.set(-4, -2.5, 3);
    scene.add(violetLight);

    // Planet + Glowing Orbital Ring (Signature Image 2 Cosmic Centerpiece)
    const planetGroup = new THREE.Group();
    planetGroup.position.set(2.5, 0.4, -2.2);
    scene.add(planetGroup);

    const planetMesh = new THREE.Mesh(
      new THREE.SphereGeometry(2.15, 48, 48),
      new THREE.MeshStandardMaterial({
        color: 0x14121d,
        roughness: 0.85,
        metalness: 0.28,
      })
    );
    planetGroup.add(planetMesh);

    const wirePlanet = new THREE.Mesh(
      new THREE.SphereGeometry(2.18, 22, 22),
      new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.08,
      })
    );
    planetGroup.add(wirePlanet);

    const orbitalRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.3, 0.045, 16, 120),
      new THREE.MeshBasicMaterial({
        color: 0xff2a85,
        transparent: true,
        opacity: 0.72,
      })
    );
    orbitalRing.rotation.x = Math.PI * 0.42;
    orbitalRing.rotation.y = -Math.PI * 0.14;
    planetGroup.add(orbitalRing);

    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.8, 0.018, 12, 120),
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.34,
      })
    );
    outerRing.rotation.x = Math.PI * 0.45;
    outerRing.rotation.y = Math.PI * 0.1;
    planetGroup.add(outerRing);

    // 3D Starfield (supports hyperdrive warp streaks on route change)
    const starCount = 900;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 38;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 36 - 6;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf9a8d4,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // Wireframe Horizon Terrain (nodding to Image 1)
    const terrainGeo = new THREE.PlaneGeometry(32, 14, 42, 22);
    const tPos = terrainGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      const x = tPos.getX(i);
      const y = tPos.getY(i);
      tPos.setZ(i, Math.sin(x * 0.45) * 0.35 + Math.cos(y * 0.55) * 0.25);
    }
    terrainGeo.computeVertexNormals();
    const terrain = new THREE.Mesh(
      terrainGeo,
      new THREE.MeshBasicMaterial({
        color: 0xec4899,
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      })
    );
    terrain.rotation.x = -Math.PI / 2.25;
    terrain.position.set(0, -3.2, -2.5);
    scene.add(terrain);

    let targetX = 0;
    let targetY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smoothly decay warp pulse
      warpRef.current *= 0.94;
      const warp = warpRef.current;

      // Move stars forward during cosmic transition warp
      const posAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const speed = 0.015 + warp * 0.42;
      for (let i = 0; i < starCount; i++) {
        let z = posAttr.getZ(i) + speed;
        if (z > 10) z = -26;
        posAttr.setZ(i, z);
      }
      posAttr.needsUpdate = true;
      starMat.size = 0.05 + warp * 0.045;

      // Smoothly shift planet position slightly off-center on non-home pages
      const targetPlanetX = isHomeRef.current ? 2.5 : 3.9;
      const targetPlanetOpacity = isHomeRef.current ? 1 : 0.45;
      planetGroup.position.x += (targetPlanetX - planetGroup.position.x) * 0.04;
      orbitalRing.material.opacity += (0.72 * targetPlanetOpacity - orbitalRing.material.opacity) * 0.05;

      planetMesh.rotation.y = t * 0.08;
      orbitalRing.rotation.z = t * 0.12 + warp * 0.25;
      outerRing.rotation.z = -t * 0.07;

      camera.fov = 52 + warp * 4.5;
      camera.updateProjectionMatrix();

      camera.position.x += (targetX * 0.5 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 0.3 + 0.35 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -1);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="cosmic-webgl-canvas" aria-hidden="true" />;
}
