import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface CosmicBackgroundProps {
  warpTrigger: number;
  pathname: string;
}

interface PlanetPreset {
  planetColor: number;
  wireColor: number;
  innerRingColor: number;
  outerRingColor: number;
  posX: number;
  posY: number;
  scale: number;
  ringTiltX: number;
  ringTiltY: number;
}

const PLANET_PRESETS: Record<string, PlanetPreset> = {
  '/': {
    planetColor: 0x14121d,
    wireColor: 0xec4899,
    innerRingColor: 0xff2a85,
    outerRingColor: 0x38bdf8,
    posX: 2.5,
    posY: 0.4,
    scale: 1.0,
    ringTiltX: Math.PI * 0.42,
    ringTiltY: -Math.PI * 0.14,
  },
  '/projects': {
    planetColor: 0x0b172a,
    wireColor: 0x38bdf8,
    innerRingColor: 0x38bdf8,
    outerRingColor: 0xec4899,
    posX: -3.2,
    posY: 1.1,
    scale: 0.88,
    ringTiltX: Math.PI * 0.34,
    ringTiltY: Math.PI * 0.22,
  },
  '/skills': {
    planetColor: 0x1a1030,
    wireColor: 0xa855f7,
    innerRingColor: 0xa855f7,
    outerRingColor: 0x38bdf8,
    posX: 3.4,
    posY: -0.6,
    scale: 0.92,
    ringTiltX: Math.PI * 0.48,
    ringTiltY: -Math.PI * 0.25,
  },
  '/about': {
    planetColor: 0x241022,
    wireColor: 0xf472b6,
    innerRingColor: 0xec4899,
    outerRingColor: 0x60a5fa,
    posX: -3.0,
    posY: -0.7,
    scale: 0.85,
    ringTiltX: Math.PI * 0.38,
    ringTiltY: Math.PI * 0.12,
  },
  '/publications': {
    planetColor: 0x0b2228,
    wireColor: 0x2dd4bf,
    innerRingColor: 0x38bdf8,
    outerRingColor: 0xf472b6,
    posX: 3.1,
    posY: 1.2,
    scale: 0.82,
    ringTiltX: Math.PI * 0.44,
    ringTiltY: -Math.PI * 0.18,
  },
  '/contact': {
    planetColor: 0x0d1b36,
    wireColor: 0x60a5fa,
    innerRingColor: 0x38bdf8,
    outerRingColor: 0xff2a85,
    posX: 0.0,
    posY: 1.5,
    scale: 0.78,
    ringTiltX: Math.PI * 0.4,
    ringTiltY: 0,
  },
};

export function CosmicBackground({ warpTrigger, pathname }: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const warpRef = useRef(0);
  const presetRef = useRef<PlanetPreset>(PLANET_PRESETS[pathname] ?? PLANET_PRESETS['/']);

  useEffect(() => {
    presetRef.current = PLANET_PRESETS[pathname] ?? PLANET_PRESETS['/'];
  }, [pathname]);

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

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const pinkLight = new THREE.PointLight(0xff2a85, 3.4, 28);
    pinkLight.position.set(4.5, 2.5, 4.5);
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 2.6, 26);
    blueLight.position.set(-4.5, 1.5, 3.5);
    scene.add(blueLight);

    // Morphing Exoplanet Group (transitions across galaxies/planets per route)
    const planetGroup = new THREE.Group();
    planetGroup.position.set(2.5, 0.4, -2.2);
    scene.add(planetGroup);

    const planetMat = new THREE.MeshStandardMaterial({
      color: 0x14121d,
      roughness: 0.85,
      metalness: 0.28,
    });
    const planetMesh = new THREE.Mesh(new THREE.SphereGeometry(2.15, 48, 48), planetMat);
    planetGroup.add(planetMesh);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    planetGroup.add(new THREE.Mesh(new THREE.SphereGeometry(2.19, 22, 22), wireMat));

    const innerRingMat = new THREE.MeshBasicMaterial({
      color: 0xff2a85,
      transparent: true,
      opacity: 0.72,
    });
    const orbitalRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.3, 0.045, 16, 120),
      innerRingMat
    );
    orbitalRing.rotation.x = Math.PI * 0.42;
    orbitalRing.rotation.y = -Math.PI * 0.14;
    planetGroup.add(orbitalRing);

    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.58,
    });
    const outerRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.8, 0.028, 12, 120),
      outerRingMat
    );
    outerRing.rotation.x = Math.PI * 0.45;
    outerRing.rotation.y = Math.PI * 0.1;
    planetGroup.add(outerRing);

    // Dual Pink + Blue Hyperdrive Starfield
    const starCount = 520;
    const makeStars = () => {
      const arr = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 38;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 24;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 36 - 6;
      }
      return arr;
    };

    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(makeStars(), 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xf9a8d4,
      size: 0.05,
      transparent: true,
      opacity: 0.72,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    const blueStarGeo = new THREE.BufferGeometry();
    blueStarGeo.setAttribute('position', new THREE.BufferAttribute(makeStars(), 3));
    const blueStarMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.055,
      transparent: true,
      opacity: 0.72,
    });
    scene.add(new THREE.Points(blueStarGeo, blueStarMat));

    // Wireframe Terrain Horizon
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
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.12,
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

    const targetPlanetCol = new THREE.Color();
    const targetWireCol = new THREE.Color();
    const targetInnerCol = new THREE.Color();
    const targetOuterCol = new THREE.Color();

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      warpRef.current *= 0.935;
      const warp = warpRef.current;

      // Hyperdrive star streaking during page warp
      const posAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const bluePosAttr = blueStarGeo.attributes.position as THREE.BufferAttribute;
      const speed = 0.015 + warp * 0.72;
      for (let i = 0; i < starCount; i++) {
        let z = posAttr.getZ(i) + speed;
        if (z > 10) z = -26;
        posAttr.setZ(i, z);

        let bz = bluePosAttr.getZ(i) + speed * 1.15;
        if (bz > 10) bz = -26;
        bluePosAttr.setZ(i, bz);
      }
      posAttr.needsUpdate = true;
      bluePosAttr.needsUpdate = true;
      starMat.size = 0.05 + warp * 0.075;
      blueStarMat.size = 0.055 + warp * 0.08;

      // Morph planet toward current route's galaxy preset
      const preset = presetRef.current;
      targetPlanetCol.setHex(preset.planetColor);
      targetWireCol.setHex(preset.wireColor);
      targetInnerCol.setHex(preset.innerRingColor);
      targetOuterCol.setHex(preset.outerRingColor);

      planetMat.color.lerp(targetPlanetCol, 0.05);
      wireMat.color.lerp(targetWireCol, 0.05);
      innerRingMat.color.lerp(targetInnerCol, 0.05);
      outerRingMat.color.lerp(targetOuterCol, 0.05);

      planetGroup.position.x += (preset.posX - planetGroup.position.x) * 0.045;
      planetGroup.position.y += (preset.posY - planetGroup.position.y) * 0.045;
      // Brief warp-shrink/emerge pulse when switching galaxies
      const targetScale = preset.scale * (1 - warp * 0.28);
      const s = planetGroup.scale.x + (targetScale - planetGroup.scale.x) * 0.08;
      planetGroup.scale.setScalar(s);

      orbitalRing.rotation.x += (preset.ringTiltX - orbitalRing.rotation.x) * 0.05;
      orbitalRing.rotation.y += (preset.ringTiltY - orbitalRing.rotation.y) * 0.05;

      planetMesh.rotation.y = t * 0.08 + warp * 0.3;
      orbitalRing.rotation.z = t * 0.12 + warp * 0.35;
      outerRing.rotation.z = -t * 0.08;

      camera.fov = 52 + warp * 8;
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
