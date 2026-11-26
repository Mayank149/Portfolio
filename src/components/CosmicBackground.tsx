import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface OrbitSlotScreenPos {
  x: number;
  y: number;
  depth: number; // -1 (back) to +1 (front)
  occluded: boolean; // true when passing behind the 3D planet core
}

interface CosmicBackgroundProps {
  warpTrigger: number;
  pathname: string;
  orbitPaused?: boolean;
  orbitStepDelta?: number;
  orbitCount?: number;
  onOrbitFrame?: (slots: OrbitSlotScreenPos[]) => void;
}

/** Generate a detailed cyber-exoplanet surface texture with glowing magenta/blue nodes */
function createDetailedHomePlanetTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d')!;

  const bg = ctx.createRadialGradient(256, 128, 20, 256, 128, 260);
  bg.addColorStop(0, '#1e1338');
  bg.addColorStop(0.55, '#0d1024');
  bg.addColorStop(1, '#05060d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 512, 256);

  for (let i = 0; i < 45; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    const r = 10 + Math.random() * 34;
    const g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, i % 2 === 0 ? 'rgba(236, 72, 153, 0.22)' : 'rgba(56, 189, 248, 0.18)');
    g.addColorStop(1, 'transparent');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 240; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 256;
    ctx.fillStyle = i % 3 === 0 ? 'rgba(56, 189, 248, 0.75)' : 'rgba(255, 42, 133, 0.8)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/** Generate a procedural banded gas-giant texture on an offscreen canvas */
function createBandedTexture(): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 512;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0.0, '#1e1035');
  grad.addColorStop(0.22, '#be185d');
  grad.addColorStop(0.38, '#38bdf8');
  grad.addColorStop(0.54, '#ec4899');
  grad.addColorStop(0.72, '#0f172a');
  grad.addColorStop(0.88, '#a855f7');
  grad.addColorStop(1.0, '#1e1035');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  for (let i = 0; i < 18; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.06)' : 'rgba(5,5,12,0.16)';
    ctx.fillRect(0, Math.random() * 256, 512, 3 + Math.random() * 10);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  return tex;
}

/** Build 6 visually distinct 3D planets/systems, one per route */
function buildPlanetSystems(): Record<string, THREE.Group> {
  const systems: Record<string, THREE.Group> = {};

  // 1. HOME ('/')
  const home = new THREE.Group();
  home.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(2.45, 56, 56),
      new THREE.MeshStandardMaterial({
        map: createDetailedHomePlanetTexture(),
        roughness: 0.72,
        metalness: 0.3,
      })
    )
  );
  home.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(2.48, 32, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.16 })
    )
  );
  home.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(2.62, 36, 36),
      new THREE.MeshBasicMaterial({
        color: 0xec4899,
        transparent: true,
        opacity: 0.07,
        side: THREE.BackSide,
      })
    )
  );
  const hRing1 = new THREE.Mesh(
    new THREE.TorusGeometry(3.45, 0.036, 16, 140),
    new THREE.MeshBasicMaterial({ color: 0xff2a85, transparent: true, opacity: 0.8 })
  );
  hRing1.rotation.set(Math.PI * 0.42, -Math.PI * 0.18, 0);
  const sat1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 16, 16),
    new THREE.MeshBasicMaterial({ color: 0xff2a85 })
  );
  sat1.position.set(3.45, 0, 0);
  hRing1.add(sat1);
  hRing1.name = 'slow_ring_1';
  home.add(hRing1);

  const hRing2 = new THREE.Mesh(
    new THREE.TorusGeometry(3.85, 0.028, 14, 140),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.72 })
  );
  hRing2.rotation.set(Math.PI * 0.36, Math.PI * 0.22, 0);
  hRing2.name = 'slow_ring_2';
  home.add(hRing2);

  home.userData = { targetPos: new THREE.Vector3(1.85, 0.35, -2.5), spin: 0.03 };
  systems['/'] = home;

  // 2. PROJECTS ('/projects'): Centered Cyber-Tech Dyson Sphere with wide 3D ring
  const projects = new THREE.Group();
  projects.add(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.35, 1),
      new THREE.MeshStandardMaterial({
        color: 0x0ea5e9,
        emissive: 0x0284c7,
        emissiveIntensity: 0.6,
        flatShading: true,
      })
    )
  );
  projects.add(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.85, 2),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.45 })
    )
  );
  const mainProjectRing = new THREE.Mesh(
    new THREE.TorusGeometry(3.65, 0.036, 16, 140),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 })
  );
  mainProjectRing.rotation.set(Math.PI * 0.39, 0, 0);
  mainProjectRing.name = 'project_main_ring';
  projects.add(mainProjectRing);

  const secondaryProjectRing = new THREE.Mesh(
    new THREE.TorusGeometry(4.0, 0.022, 12, 140),
    new THREE.MeshBasicMaterial({ color: 0xff2a85, transparent: true, opacity: 0.55 })
  );
  secondaryProjectRing.rotation.set(Math.PI * 0.39, 0, 0);
  secondaryProjectRing.name = 'slow_ring_2';
  projects.add(secondaryProjectRing);

  projects.userData = { targetPos: new THREE.Vector3(0, -1.55, -2.1), spin: 0.1 };
  systems['/projects'] = projects;

  // 3. SKILLS ('/skills')
  const skills = new THREE.Group();
  skills.add(
    new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.75, 1),
      new THREE.MeshStandardMaterial({
        color: 0x9333ea,
        emissive: 0xc026d3,
        emissiveIntensity: 0.5,
        roughness: 0.35,
        flatShading: true,
      })
    )
  );
  skills.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(2.2, 24, 24),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.18 })
    )
  );
  const moonGroup = new THREE.Group();
  moonGroup.name = 'moons';
  for (let i = 0; i < 4; i++) {
    const angle = (i / 4) * Math.PI * 2;
    const moon = new THREE.Mesh(
      new THREE.OctahedronGeometry(0.24, 0),
      new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x38bdf8 : 0xff2a85 })
    );
    moon.position.set(Math.cos(angle) * 3.1, Math.sin(angle * 2) * 0.7, Math.sin(angle) * 3.1);
    moonGroup.add(moon);
  }
  skills.add(moonGroup);
  skills.userData = { targetPos: new THREE.Vector3(3.1, -0.3, -2.4), spin: 0.14 };
  systems['/skills'] = skills;

  // 4. ABOUT ('/about')
  const about = new THREE.Group();
  about.add(
    new THREE.Mesh(
      new THREE.SphereGeometry(2.0, 48, 48),
      new THREE.MeshStandardMaterial({
        map: createBandedTexture(),
        roughness: 0.7,
        metalness: 0.15,
      })
    )
  );
  const disc = new THREE.Mesh(
    new THREE.RingGeometry(2.55, 3.85, 80),
    new THREE.MeshBasicMaterial({
      color: 0xf472b6,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
    })
  );
  disc.rotation.set(Math.PI * 0.4, Math.PI * 0.12, 0);
  about.add(disc);
  const saturnRim = new THREE.Mesh(
    new THREE.TorusGeometry(3.85, 0.025, 12, 100),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.65 })
  );
  saturnRim.rotation.copy(disc.rotation);
  about.add(saturnRim);
  about.userData = { targetPos: new THREE.Vector3(-2.9, -0.4, -2.4), spin: 0.1 };
  systems['/about'] = about;

  // 5. PUBLICATIONS ('/publications')
  const pubs = new THREE.Group();
  pubs.add(
    new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.85, 1),
      new THREE.MeshStandardMaterial({
        color: 0x06b6d4,
        emissive: 0x0e7490,
        emissiveIntensity: 0.35,
        roughness: 0.25,
        metalness: 0.65,
        flatShading: true,
      })
    )
  );
  const belt = new THREE.Group();
  belt.name = 'belt';
  for (let i = 0; i < 48; i++) {
    const a = (i / 48) * Math.PI * 2;
    const r = 2.75 + (Math.random() - 0.5) * 0.65;
    const rock = new THREE.Mesh(
      new THREE.TetrahedronGeometry(0.08 + Math.random() * 0.07),
      new THREE.MeshBasicMaterial({ color: i % 3 === 0 ? 0xff2a85 : 0x7dd3fc })
    );
    rock.position.set(Math.cos(a) * r, (Math.random() - 0.5) * 0.25, Math.sin(a) * r);
    belt.add(rock);
  }
  belt.rotation.set(0.35, 0, -0.2);
  pubs.add(belt);
  pubs.userData = { targetPos: new THREE.Vector3(2.9, 0.7, -2.4), spin: 0.11 };
  systems['/publications'] = pubs;

  // 6. CONTACT ('/contact')
  const contact = new THREE.Group();
  const blueStar = new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 36, 36),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.65 })
  );
  blueStar.position.set(-1.3, 0.2, 0);
  contact.add(blueStar);

  const pinkCompanion = new THREE.Mesh(
    new THREE.SphereGeometry(0.85, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xec4899, emissive: 0xbe185d, emissiveIntensity: 0.6 })
  );
  pinkCompanion.position.set(1.45, -0.25, 0.3);
  contact.add(pinkCompanion);

  const beaconRing = new THREE.Mesh(
    new THREE.TorusGeometry(2.7, 0.03, 12, 100),
    new THREE.MeshBasicMaterial({ color: 0x7dd3fc, transparent: true, opacity: 0.55 })
  );
  beaconRing.rotation.set(Math.PI * 0.42, 0, 0);
  contact.add(beaconRing);
  contact.userData = { targetPos: new THREE.Vector3(0, 1.1, -3.2), spin: 0.22 };
  systems['/contact'] = contact;

  return systems;
}

export function CosmicBackground({
  warpTrigger,
  pathname,
  orbitPaused = false,
  orbitStepDelta = 0,
  orbitCount = 8,
  onOrbitFrame,
}: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const routeRef = useRef<string>(pathname);
  const pendingRouteRef = useRef<string | null>(null);
  const warpProgressRef = useRef<number>(0);
  const swappedRef = useRef<boolean>(false);

  const orbitPausedRef = useRef(orbitPaused);
  const orbitCountRef = useRef(orbitCount);
  const onOrbitFrameRef = useRef(onOrbitFrame);
  const orbitAngleRef = useRef(0);
  const orbitTargetAngleRef = useRef<number | null>(null);
  const prevStepDeltaRef = useRef(orbitStepDelta);

  useEffect(() => {
    orbitPausedRef.current = orbitPaused;
  }, [orbitPaused]);

  useEffect(() => {
    orbitCountRef.current = orbitCount;
  }, [orbitCount]);

  useEffect(() => {
    onOrbitFrameRef.current = onOrbitFrame;
  }, [onOrbitFrame]);

  useEffect(() => {
    const diff = orbitStepDelta - prevStepDeltaRef.current;
    if (diff !== 0) {
      prevStepDeltaRef.current = orbitStepDelta;
      const step = (Math.PI * 2) / Math.max(orbitCountRef.current, 1);
      orbitTargetAngleRef.current =
        (orbitTargetAngleRef.current ?? orbitAngleRef.current) + diff * step;
    }
  }, [orbitStepDelta]);

  useEffect(() => {
    if (warpTrigger > 0 && pathname !== routeRef.current) {
      pendingRouteRef.current = pathname;
      warpProgressRef.current = 1.0;
      swappedRef.current = false;
    }
  }, [warpTrigger, pathname]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.1,
      140
    );
    camera.position.set(0, 0.35, 9);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const pinkLight = new THREE.PointLight(0xff2a85, 3.8, 30);
    pinkLight.position.set(5, 3, 5);
    scene.add(pinkLight);

    const blueLight = new THREE.PointLight(0x38bdf8, 3.0, 28);
    blueLight.position.set(-5, 2, 4);
    scene.add(blueLight);

    const systems = buildPlanetSystems();
    const stageRoot = new THREE.Group();
    scene.add(stageRoot);

    let activeKey = systems[routeRef.current] ? routeRef.current : '/';
    let activePlanet = systems[activeKey];
    activePlanet.position.copy(activePlanet.userData.targetPos);
    stageRoot.add(activePlanet);

    // Ambient Stars
    const starCount = 480;
    const makeStars = () => {
      const arr = new Float32Array(starCount * 3);
      for (let i = 0; i < starCount; i++) {
        arr[i * 3] = (Math.random() - 0.5) * 40;
        arr[i * 3 + 1] = (Math.random() - 0.5) * 26;
        arr[i * 3 + 2] = (Math.random() - 0.5) * 38 - 6;
      }
      return arr;
    };
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(makeStars(), 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({ color: 0xf9a8d4, size: 0.05, transparent: true, opacity: 0.72 })
      )
    );
    const blueStarGeo = new THREE.BufferGeometry();
    blueStarGeo.setAttribute('position', new THREE.BufferAttribute(makeStars(), 3));
    scene.add(
      new THREE.Points(
        blueStarGeo,
        new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.055, transparent: true, opacity: 0.72 })
      )
    );

    // Hyperspace Star Tunnel
    const tunnelCount = 380;
    const tunnelPositions = new Float32Array(tunnelCount * 6);
    const tunnelSeeds: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < tunnelCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.2 + Math.random() * 12;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const z = -Math.random() * 45;
      tunnelSeeds.push({ x, y, z, speed: 0.7 + Math.random() * 1.1 });
      tunnelPositions[i * 6] = x;
      tunnelPositions[i * 6 + 1] = y;
      tunnelPositions[i * 6 + 2] = z;
      tunnelPositions[i * 6 + 3] = x;
      tunnelPositions[i * 6 + 4] = y;
      tunnelPositions[i * 6 + 5] = z - 0.5;
    }
    const tunnelGeo = new THREE.BufferGeometry();
    tunnelGeo.setAttribute('position', new THREE.BufferAttribute(tunnelPositions, 3));
    const tunnelMat = new THREE.LineBasicMaterial({
      color: 0x7dd3fc,
      transparent: true,
      opacity: 0,
    });
    scene.add(new THREE.LineSegments(tunnelGeo, tunnelMat));

    // Wireframe Terrain
    const terrainGeo = new THREE.PlaneGeometry(32, 14, 42, 22);
    const tPos = terrainGeo.attributes.position;
    for (let i = 0; i < tPos.count; i++) {
      tPos.setZ(i, Math.sin(tPos.getX(i) * 0.45) * 0.35 + Math.cos(tPos.getY(i) * 0.55) * 0.25);
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

    const tempVec = new THREE.Vector3();
    const planetScreenVec = new THREE.Vector3();
    const clock = new THREE.Clock();
    let lastTime = performance.now();
    let rafId = 0;

    const animate = (now: number) => {
      rafId = requestAnimationFrame(animate);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const t = clock.getElapsedTime();

      if (warpProgressRef.current > 0.001) {
        warpProgressRef.current = Math.max(0, warpProgressRef.current - 0.022);
      } else {
        warpProgressRef.current = 0;
      }
      const w = warpProgressRef.current;
      const tunnelIntensity = Math.sin(w * Math.PI);

      if (w > 0 && w <= 0.5 && !swappedRef.current && pendingRouteRef.current) {
        swappedRef.current = true;
        const nextKey = systems[pendingRouteRef.current] ? pendingRouteRef.current : '/';
        routeRef.current = nextKey;
        pendingRouteRef.current = null;

        stageRoot.remove(activePlanet);
        activeKey = nextKey;
        activePlanet = systems[activeKey];
        const dest: THREE.Vector3 = activePlanet.userData.targetPos;
        activePlanet.position.set(dest.x * 0.4, dest.y * 0.4, -22);
        activePlanet.scale.setScalar(0.25);
        stageRoot.add(activePlanet);
      }

      const dest: THREE.Vector3 = activePlanet.userData.targetPos;
      if (w > 0.5) {
        activePlanet.position.z += 0.65;
        activePlanet.scale.multiplyScalar(0.95);
      } else {
        activePlanet.position.lerp(dest, 0.075);
        const s = activePlanet.scale.x + (1 - activePlanet.scale.x) * 0.075;
        activePlanet.scale.setScalar(s);
      }

      const spinSpeed = activePlanet.userData.spin || 0.08;
      // Don't rotate the /projects root around Y so its ring stays locked with projected cards
      if (activeKey !== '/projects') {
        activePlanet.rotation.y = t * spinSpeed;
      } else {
        // Spin only the Dyson core spheres inside /projects
        activePlanet.children.forEach((c) => {
          if (c instanceof THREE.Mesh && c.geometry instanceof THREE.IcosahedronGeometry) {
            c.rotation.y = t * spinSpeed;
          }
        });
      }

      activePlanet.traverse((child) => {
        if (child.name === 'slow_ring_1') {
          child.rotation.z = t * 0.1;
        } else if (child.name === 'slow_ring_2') {
          child.rotation.z = -t * 0.07;
        } else if (child.name === 'moons' || child.name === 'belt') {
          child.rotation.y = t * 0.25;
        }
      });

      if (tunnelIntensity > 0.02) {
        tunnelMat.opacity = tunnelIntensity * 0.92;
        const tAttr = tunnelGeo.attributes.position as THREE.BufferAttribute;
        const streakLen = 0.8 + tunnelIntensity * 6.5;
        for (let i = 0; i < tunnelCount; i++) {
          const seed = tunnelSeeds[i];
          seed.z += seed.speed * (0.4 + tunnelIntensity * 1.9);
          if (seed.z > 10) seed.z = -42;
          tAttr.setXYZ(i * 2, seed.x, seed.y, seed.z);
          tAttr.setXYZ(i * 2 + 1, seed.x, seed.y, seed.z - streakLen);
        }
        tAttr.needsUpdate = true;
      } else {
        tunnelMat.opacity = 0;
      }

      const pAttr = starGeo.attributes.position as THREE.BufferAttribute;
      const bAttr = blueStarGeo.attributes.position as THREE.BufferAttribute;
      const starDrift = 0.014 + tunnelIntensity * 0.5;
      for (let i = 0; i < starCount; i++) {
        let z = pAttr.getZ(i) + starDrift;
        if (z > 10) z = -28;
        pAttr.setZ(i, z);
        let bz = bAttr.getZ(i) + starDrift * 1.1;
        if (bz > 10) bz = -28;
        bAttr.setZ(i, bz);
      }
      pAttr.needsUpdate = true;
      bAttr.needsUpdate = true;

      camera.fov = 52 + tunnelIntensity * 28;
      camera.updateProjectionMatrix();

      camera.position.x += (targetX * 0.35 - camera.position.x) * 0.04;
      camera.position.y += (-targetY * 0.22 + 0.35 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, -1);

      renderer.render(scene, camera);

      // Project /projects 3D ring points directly to screen coordinates for HTML cards
      if (activeKey === '/projects' && onOrbitFrameRef.current) {
        if (orbitTargetAngleRef.current !== null) {
          const diff = orbitTargetAngleRef.current - orbitAngleRef.current;
          if (Math.abs(diff) < 0.003) {
            orbitAngleRef.current = orbitTargetAngleRef.current;
            orbitTargetAngleRef.current = null;
          } else {
            orbitAngleRef.current += diff * 0.1;
          }
        } else if (!orbitPausedRef.current) {
          orbitAngleRef.current += dt * 0.16;
        }

        const ringMesh = activePlanet.getObjectByName('project_main_ring');
        if (ringMesh) {
          activePlanet.updateMatrixWorld(true);
          planetScreenVec.copy(activePlanet.position).project(camera);
          const pScreenX = (planetScreenVec.x * 0.5 + 0.5) * window.innerWidth;
          const pScreenY = (-planetScreenVec.y * 0.5 + 0.5) * window.innerHeight;
          const planetZ = activePlanet.position.z;

          const n = Math.max(orbitCountRef.current, 1);
          const step = (Math.PI * 2) / n;
          const slots: OrbitSlotScreenPos[] = [];

          for (let i = 0; i < n; i++) {
            const theta = i * step + orbitAngleRef.current - Math.PI / 2;
            tempVec.set(Math.cos(theta) * 3.65, Math.sin(theta) * 3.65, 0);
            ringMesh.localToWorld(tempVec);

            const worldZ = tempVec.z;
            // Normalized depth relative to planet center (-1 back to +1 front)
            const depth = Math.max(-1, Math.min(1, (worldZ - planetZ) / 3.5));

            tempVec.project(camera);
            const sx = (tempVec.x * 0.5 + 0.5) * window.innerWidth;
            const sy = (-tempVec.y * 0.5 + 0.5) * window.innerHeight;

            const distToPlanet = Math.hypot(sx - pScreenX, sy - pScreenY);
            const occluded = depth < -0.15 && distToPlanet < 165;

            slots.push({ x: sx, y: sy, depth, occluded });
          }
          onOrbitFrameRef.current(slots);
        }
      }
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="cosmic-webgl-canvas" aria-hidden="true" />;
}
