import * as THREE from 'three';
import { createSignboardTexture, createKeycapTopTexture } from './proceduralTextures';
import { Project, AI_WORKFLOW_STEPS, TIMELINE } from '../../data/portfolioData';

/**
 * High-detail Composite 3D Procedural Models (`THREE.Group`) for the full-screen
 * Bruno Simon style 3D interactive portfolio world.
 */

export interface RoverController {
  group: THREE.Group;
  chassisGroup: THREE.Group;
  wheels: THREE.Object3D[];
  antennaRod: THREE.Group;
  headlights: THREE.Mesh[];
  boostFlames: THREE.Mesh[];
}

export interface KnockableProp {
  mesh: THREE.Mesh | THREE.Group;
  velocity: THREE.Vector3;
  angularVelocity: THREE.Vector3;
  initialPos: THREE.Vector3;
  initialRot: THREE.Euler;
  radius: number;
  halfHeight: number;
}

/**
 * 1. Upgraded 14-Part 4x4 Monster Off-Road Truck (Bruno Simon Signature Style)
 */
export function buildRoverVehicle(accentHex = '#FF4D1C'): RoverController {
  const group = new THREE.Group();
  const chassisGroup = new THREE.Group();
  group.add(chassisGroup);

  const paintMat = new THREE.MeshStandardMaterial({
    color: accentHex,
    roughness: 0.22,
    metalness: 0.12,
  });

  const whiteStripeMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf9,
    roughness: 0.3,
    metalness: 0.05,
  });

  const chassisDarkMat = new THREE.MeshStandardMaterial({
    color: 0x1e2024,
    roughness: 0.65,
    metalness: 0.4,
  });

  const chromeMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    roughness: 0.14,
    metalness: 0.92,
  });

  const glassMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.08,
    metalness: 0.88,
  });

  const headlightMat = new THREE.MeshStandardMaterial({
    color: 0xfffbeb,
    emissive: 0xfacc15,
    emissiveIntensity: 2.0,
    roughness: 0.1,
  });

  const taillightMat = new THREE.MeshStandardMaterial({
    color: 0xfef2f2,
    emissive: 0xef4444,
    emissiveIntensity: 1.6,
  });

  // 1. Heavy Suspension Skid Plate & Frame
  const frame = new THREE.Mesh(new THREE.BoxGeometry(1.65, 0.32, 3.05), chassisDarkMat);
  frame.position.y = 0.56;
  frame.castShadow = true;
  frame.receiveShadow = true;
  chassisGroup.add(frame);

  // 2. Main Truck Lower Body
  const hull = new THREE.Mesh(new THREE.BoxGeometry(1.78, 0.48, 2.85), paintMat);
  hull.position.y = 0.88;
  hull.castShadow = true;
  hull.receiveShadow = true;
  chassisGroup.add(hull);

  // 3. Racing Side Stripes
  const stripe = new THREE.Mesh(new THREE.BoxGeometry(1.82, 0.12, 2.6), whiteStripeMat);
  stripe.position.y = 0.86;
  chassisGroup.add(stripe);

  // 4. Sculpted Cabin Cockpit
  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.52, 1.45), paintMat);
  cabin.position.set(0, 1.32, -0.05);
  cabin.castShadow = true;
  chassisGroup.add(cabin);

  // 5. Wrap-Around Tinted Windows
  const windshield = new THREE.Mesh(new THREE.BoxGeometry(1.42, 0.38, 1.52), glassMat);
  windshield.position.set(0, 1.31, -0.04);
  chassisGroup.add(windshield);

  // 6. Tubular Roll Cage in Truck Bed
  const cageBarGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.72, 10);
  [-0.58, 0.58].forEach((rx) => {
    const bar = new THREE.Mesh(cageBarGeo, chromeMat);
    bar.position.set(rx, 1.28, -1.05);
    bar.rotation.x = 0.35;
    bar.castShadow = true;
    chassisGroup.add(bar);
  });

  // 7. Roof Light Bar with 4 Rally Spotlights
  const lightBar = new THREE.Mesh(new THREE.BoxGeometry(1.36, 0.07, 0.14), chromeMat);
  lightBar.position.set(0, 1.63, 0.52);
  chassisGroup.add(lightBar);

  const spotGeo = new THREE.CylinderGeometry(0.09, 0.09, 0.1, 12);
  spotGeo.rotateX(Math.PI / 2);
  [-0.45, -0.15, 0.15, 0.45].forEach((sx) => {
    const spot = new THREE.Mesh(spotGeo, headlightMat);
    spot.position.set(sx, 1.71, 0.54);
    chassisGroup.add(spot);
  });

  // 8. Rear Spare Tire Mounted on Tailgate
  const spareTire = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.32, 20), chassisDarkMat);
  spareTire.rotation.x = Math.PI / 2;
  spareTire.position.set(0, 1.05, -1.52);
  spareTire.castShadow = true;
  chassisGroup.add(spareTire);

  const spareHub = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.34, 12), chromeMat);
  spareHub.rotation.x = Math.PI / 2;
  spareHub.position.set(0, 1.05, -1.52);
  chassisGroup.add(spareHub);

  // 9. Front Bullbar & Winch Bumper
  const frontBumper = new THREE.Mesh(new THREE.BoxGeometry(1.92, 0.22, 0.28), chassisDarkMat);
  frontBumper.position.set(0, 0.62, 1.54);
  frontBumper.castShadow = true;
  chassisGroup.add(frontBumper);

  // 10. Headlights & Taillights
  const headlights: THREE.Mesh[] = [];
  const hlGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.12, 16);
  hlGeo.rotateX(Math.PI / 2);
  [-0.58, 0.58].forEach((hx) => {
    const hl = new THREE.Mesh(hlGeo, headlightMat);
    hl.position.set(hx, 0.9, 1.44);
    chassisGroup.add(hl);
    headlights.push(hl);

    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.14, 0.08), taillightMat);
    tl.position.set(hx, 0.88, -1.45);
    chassisGroup.add(tl);
  });

  // 11. Twin Turbo Exhaust Pipes + Dynamic Boost Flames
  const boostFlames: THREE.Mesh[] = [];
  const pipeGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.4, 12);
  pipeGeo.rotateX(Math.PI / 2);
  const flameGeo = new THREE.ConeGeometry(0.14, 0.65, 12);
  flameGeo.rotateX(-Math.PI / 2);
  const flameMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });

  [-0.48, 0.48].forEach((px) => {
    const pipe = new THREE.Mesh(pipeGeo, chromeMat);
    pipe.position.set(px, 0.52, -1.55);
    chassisGroup.add(pipe);

    const flame = new THREE.Mesh(flameGeo, flameMat);
    flame.position.set(px, 0.52, -1.95);
    flame.visible = false;
    chassisGroup.add(flame);
    boostFlames.push(flame);
  });

  // 12. Whipping Radio Antenna
  const antennaRod = new THREE.Group();
  antennaRod.position.set(-0.68, 1.12, -1.25);
  const wire = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.035, 1.15, 8), chromeMat);
  wire.position.y = 0.57;
  antennaRod.add(wire);
  const tip = new THREE.Mesh(
    new THREE.SphereGeometry(0.09, 12, 12),
    new THREE.MeshStandardMaterial({ color: 0xfacc15, emissive: 0xfacc15, emissiveIntensity: 1.5 })
  );
  tip.position.y = 1.15;
  antennaRod.add(tip);
  chassisGroup.add(antennaRod);

  // 13. 4 Chunky Monster Truck Wheels with Deep Treads
  const wheels: THREE.Object3D[] = [];
  const tireGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.46, 24);
  tireGeo.rotateZ(Math.PI / 2);
  const rimGeo = new THREE.CylinderGeometry(0.26, 0.26, 0.48, 12);
  rimGeo.rotateZ(Math.PI / 2);
  const lugGeo = new THREE.BoxGeometry(0.5, 0.08, 0.08);

  const wheelCoords: [number, number, number][] = [
    [-1.04, 0.52, 1.02],
    [1.04, 0.52, 1.02],
    [-1.04, 0.52, -1.02],
    [1.04, 0.52, -1.02],
  ];

  wheelCoords.forEach(([wx, wy, wz]) => {
    const wheelHolder = new THREE.Group();
    wheelHolder.position.set(wx, wy, wz);

    const spinGroup = new THREE.Group();
    const tire = new THREE.Mesh(tireGeo, chassisDarkMat);
    tire.castShadow = true;
    tire.receiveShadow = true;
    spinGroup.add(tire);

    const rim = new THREE.Mesh(rimGeo, chromeMat);
    spinGroup.add(rim);

    const crossBar = new THREE.Mesh(lugGeo, paintMat);
    spinGroup.add(crossBar);

    wheelHolder.add(spinGroup);
    group.add(wheelHolder);
    wheels.push(wheelHolder);
  });

  return { group, chassisGroup, wheels, antennaRod, headlights, boostFlames };
}

/**
 * 2. Giant Knockable 3D Title Letters ("CHAE SOOHOON") at Spawn Plaza
 * Built out of multi-part 3D block segments that the truck can smash into!
 */
export function buildTitleMonumentBlocks(startX: number, startZ: number): KnockableProp[] {
  const props: KnockableProp[] = [];
  const letters = ['C', 'H', 'A', 'E', ' ', 'S', 'O', 'O', 'H', 'O', 'O', 'N'];
  const colors = [0xfffdf9, 0xfffdf9, 0xfffdf9, 0xfffdf9, 0x000000, 0x345beb, 0xfacc15, 0xff4d1c, 0x10b981, 0x345beb, 0xfacc15, 0xff4d1c];

  const letterSpacing = 1.65;
  const totalWidth = (letters.length - 1) * letterSpacing;

  letters.forEach((char, idx) => {
    if (char === ' ') return;
    const x = startX - totalWidth / 2 + idx * letterSpacing;
    const color = colors[idx % colors.length];

    const mat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.25,
      metalness: 0.1,
    });

    // Stack 2 heavy blocks per letter column so the truck can knock them flying
    for (let tier = 0; tier < 2; tier++) {
      const geo = new THREE.BoxGeometry(1.35, 1.15, 0.85);
      const mesh = new THREE.Mesh(geo, mat);
      const y = 0.58 + tier * 1.16;
      mesh.position.set(x, y, startZ);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      props.push({
        mesh,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3(),
        initialPos: new THREE.Vector3(x, y, startZ),
        initialRot: new THREE.Euler(0, 0, 0),
        radius: 0.85,
        halfHeight: 0.58,
      });
    }
  });

  return props;
}

/**
 * 3. Giant 3D Mechanical Keyboard Keycaps on the Ground (W, A, S, D, SPACE)
 * Press down visually when user holds the corresponding keys!
 */
export function build3DKeycaps(
  centerX: number,
  centerZ: number,
  maxAnisotropy: number
): { group: THREE.Group; keysMap: Record<string, THREE.Mesh> } {
  const group = new THREE.Group();
  group.position.set(centerX, 0, centerZ);

  const keysMap: Record<string, THREE.Mesh> = {};
  const keyDefs = [
    { id: 'up', label: 'W', x: 0, z: -1.35, w: 1.15 },
    { id: 'left', label: 'A', x: -1.25, z: 0, w: 1.15 },
    { id: 'down', label: 'S', x: 0, z: 0, w: 1.15 },
    { id: 'right', label: 'D', x: 1.25, z: 0, w: 1.15 },
    { id: 'boost', label: 'BOOST', x: 0, z: 1.35, w: 3.65 },
  ];

  const baseSocketMat = new THREE.MeshStandardMaterial({ color: 0x17191c, roughness: 0.7 });
  const sideMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.4 });

  keyDefs.forEach((k) => {
    // Dark socket rim
    const socket = new THREE.Mesh(new THREE.BoxGeometry(k.w + 0.16, 0.12, 1.26), baseSocketMat);
    socket.position.set(k.x, 0.06, k.z);
    socket.receiveShadow = true;
    group.add(socket);

    const topTex = createKeycapTopTexture(k.label, maxAnisotropy);
    const topMat = new THREE.MeshStandardMaterial({ map: topTex, roughness: 0.3 });

    const capGeo = new THREE.BoxGeometry(k.w, 0.36, 1.08);
    const capMesh = new THREE.Mesh(capGeo, [sideMat, sideMat, topMat, sideMat, sideMat, sideMat]);
    capMesh.position.set(k.x, 0.24, k.z);
    capMesh.castShadow = true;
    capMesh.receiveShadow = true;
    group.add(capMesh);

    keysMap[k.id] = capMesh;
  });

  return { group, keysMap };
}

/**
 * 4. Interactive Project Showcase Station
 */
export function buildProjectStation(
  project: Project,
  index: number,
  maxAnisotropy: number
): {
  group: THREE.Group;
  sculptureGroup: THREE.Group;
  ringMesh: THREE.Mesh;
  hitboxMesh: THREE.Mesh;
} {
  const group = new THREE.Group();

  const accentColors = ['#345BEB', '#F59E0B', '#10B981', '#EC4899', '#6366F1', '#EF4444'];
  const accentHex = accentColors[index % accentColors.length];
  const accentColor = new THREE.Color(accentHex);

  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xfffdf9,
    roughness: 0.4,
    metalness: 0.1,
  });

  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    roughness: 0.4,
    metalness: 0.5,
  });

  const accentMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    roughness: 0.22,
    metalness: 0.2,
  });

  // 1. Stepped Platform Plinth
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.8, 0.34, 32), baseMat);
  plinth.position.y = 0.17;
  plinth.receiveShadow = true;
  plinth.castShadow = true;
  group.add(plinth);

  // 2. Interactive Proximity Glow Zone Ring
  const ringGeo = new THREE.RingGeometry(3.65, 4.05, 48);
  ringGeo.rotateX(-Math.PI / 2);
  const ringMat = new THREE.MeshStandardMaterial({
    color: accentColor,
    emissive: accentColor,
    emissiveIntensity: 0.55,
    roughness: 0.2,
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -1,
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.position.y = 0.04;
  group.add(ringMesh);

  // 3. Support Pillars
  const pillarGeo = new THREE.CylinderGeometry(0.14, 0.14, 4.1, 12);
  [-2.05, 2.05].forEach((px) => {
    const pillar = new THREE.Mesh(pillarGeo, darkMat);
    pillar.position.set(px, 2.05, -1.25);
    pillar.castShadow = true;
    group.add(pillar);
  });

  // 4. High-DPI Billboard Sign
  const signTex = createSignboardTexture(
    project.title,
    project.subtitle,
    `${project.categoryLabel} · ${project.year}`,
    accentHex,
    maxAnisotropy
  );

  const boardFrame = new THREE.Mesh(new THREE.BoxGeometry(4.7, 2.45, 0.24), darkMat);
  boardFrame.position.set(0, 2.95, -1.25);
  boardFrame.castShadow = true;
  group.add(boardFrame);

  const boardFace = new THREE.Mesh(
    new THREE.PlaneGeometry(4.45, 2.22),
    new THREE.MeshBasicMaterial({ map: signTex })
  );
  boardFace.position.set(0, 2.95, -1.11);
  group.add(boardFace);

  // 5. Thematic 3D Sculpture
  const sculptureGroup = new THREE.Group();
  sculptureGroup.position.set(0, 1.25, 0.95);

  if (index === 0) {
    const mBody = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 1.0), accentMat);
    mBody.castShadow = true;
    sculptureGroup.add(mBody);

    const hornGeo = new THREE.ConeGeometry(0.2, 0.5, 12);
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
    [-0.38, 0.38].forEach((hx) => {
      const horn = new THREE.Mesh(hornGeo, hornMat);
      horn.position.set(hx, 0.78, 0);
      horn.rotation.z = hx > 0 ? -0.25 : 0.25;
      sculptureGroup.add(horn);
    });
  } else if (index === 1) {
    const cone = new THREE.ConeGeometry(0.6, 0.78, 20);
    const topBulb = new THREE.Mesh(cone, accentMat);
    topBulb.position.y = 0.38;
    topBulb.rotation.x = Math.PI;
    topBulb.castShadow = true;
    sculptureGroup.add(topBulb);

    const botBulb = new THREE.Mesh(cone, accentMat);
    botBulb.position.y = -0.38;
    botBulb.castShadow = true;
    sculptureGroup.add(botBulb);
  } else if (index === 2) {
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 });
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.65, 24, 24), whiteMat);
    head.castShadow = true;
    sculptureGroup.add(head);

    const earGeo = new THREE.SphereGeometry(0.24, 16, 16);
    [-0.48, 0.48].forEach((ex) => {
      const ear = new THREE.Mesh(earGeo, darkMat);
      ear.position.set(ex, 0.52, 0);
      sculptureGroup.add(ear);
    });
  } else {
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.52, 0.16, 64, 16), accentMat);
    knot.castShadow = true;
    sculptureGroup.add(knot);
  }

  group.add(sculptureGroup);

  // 6. Invisible Raycast Hitbox
  const hitboxMesh = new THREE.Mesh(
    new THREE.BoxGeometry(5.6, 4.6, 4.6),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitboxMesh.position.y = 2.3;
  hitboxMesh.layers.set(1);
  hitboxMesh.userData = { type: 'project', project };
  group.add(hitboxMesh);

  return { group, sculptureGroup, ringMesh, hitboxMesh };
}

/**
 * 5. AI 6-Stage Pipeline 3D Factory Gates (East Sector)
 */
export function buildAIPipelineArches(
  startX: number,
  startZ: number,
  maxAnisotropy: number
): { group: THREE.Group; spinners: THREE.Object3D[]; hitbox: THREE.Mesh } {
  const group = new THREE.Group();
  group.position.set(startX, 0, startZ);

  const spinners: THREE.Object3D[] = [];
  const colors = ['#345BEB', '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'];

  AI_WORKFLOW_STEPS.forEach((step, idx) => {
    const zOffset = (idx - 2.5) * 4.8;
    const gateGroup = new THREE.Group();
    gateGroup.position.set(0, 0, zOffset);

    const color = new THREE.Color(colors[idx % colors.length]);
    const archMat = new THREE.MeshStandardMaterial({
      color,
      roughness: 0.25,
      metalness: 0.3,
    });

    // Left & Right Columns
    const colGeo = new THREE.BoxGeometry(0.55, 3.8, 0.55);
    [-3.1, 3.1].forEach((cx) => {
      const col = new THREE.Mesh(colGeo, archMat);
      col.position.set(cx, 1.9, 0);
      col.castShadow = true;
      gateGroup.add(col);
    });

    // Overhead Sign Beam
    const signTex = createSignboardTexture(
      `STEP ${step.step}. ${step.name}`,
      `${step.tools.join(' · ')} — ${step.description}`,
      step.enName,
      colors[idx % colors.length],
      maxAnisotropy
    );
    const beam = new THREE.Mesh(
      new THREE.BoxGeometry(6.8, 1.65, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x17191c })
    );
    beam.position.set(0, 4.1, 0);
    beam.castShadow = true;
    gateGroup.add(beam);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(6.5, 1.48),
      new THREE.MeshBasicMaterial({ map: signTex })
    );
    face.position.set(0, 4.1, 0.19);
    gateGroup.add(face);

    // Spinning Gear / Node on top
    const gear = new THREE.Mesh(new THREE.OctahedronGeometry(0.48, 0), archMat);
    gear.position.set(0, 5.4, 0);
    gateGroup.add(gear);
    spinners.push(gear);

    group.add(gateGroup);
  });

  const hitbox = new THREE.Mesh(
    new THREE.BoxGeometry(8, 5, 28),
    new THREE.MeshBasicMaterial({ visible: false })
  );
  hitbox.position.y = 2.5;
  hitbox.layers.set(1);
  hitbox.userData = { type: 'drawer', drawerId: 'ai-lab' };
  group.add(hitbox);

  return { group, spinners, hitbox };
}

/**
 * 6. Knockable Domino Brick Walls & Bowling Pins + Stunt Jump Ramp
 */
export function buildBrickWall(
  centerX: number,
  centerZ: number,
  rows = 4,
  cols = 5
): KnockableProp[] {
  const bricks: KnockableProp[] = [];
  const palette = [0xfffdf9, 0xff4d1c, 0xfacc15, 0x345beb, 0x10b981];
  const brickGeo = new THREE.BoxGeometry(0.95, 0.62, 0.48);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const mat = new THREE.MeshStandardMaterial({
        color: palette[(r + c) % palette.length],
        roughness: 0.3,
        metalness: 0.08,
      });
      const mesh = new THREE.Mesh(brickGeo, mat);
      const x = centerX + (c - (cols - 1) / 2) * 1.0 + (r % 2 === 1 ? 0.22 : 0);
      const y = 0.31 + r * 0.63;
      const z = centerZ;

      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      bricks.push({
        mesh,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3(),
        initialPos: new THREE.Vector3(x, y, z),
        initialRot: new THREE.Euler(0, 0, 0),
        radius: 0.62,
        halfHeight: 0.31,
      });
    }
  }
  return bricks;
}

export function buildBowlingAlley(centerX: number, centerZ: number): KnockableProp[] {
  const pins: KnockableProp[] = [];
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfffdf9, roughness: 0.2 });
  const redStripeMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.25 });

  // 10-pin triangle formation
  let count = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col <= row; col++) {
      const pinGroup = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.28, 1.15, 16), whiteMat);
      body.castShadow = true;
      pinGroup.add(body);

      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.19, 0.18, 16), redStripeMat);
      neck.position.y = 0.25;
      pinGroup.add(neck);

      const x = centerX + (col - row / 2) * 0.95;
      const z = centerZ - row * 0.85;
      const y = 0.58;
      pinGroup.position.set(x, y, z);

      pins.push({
        mesh: pinGroup,
        velocity: new THREE.Vector3(),
        angularVelocity: new THREE.Vector3(),
        initialPos: new THREE.Vector3(x, y, z),
        initialRot: new THREE.Euler(0, 0, 0),
        radius: 0.5,
        halfHeight: 0.58,
      });
      count++;
    }
  }

  return pins;
}

export interface StuntRamp {
  group: THREE.Group;
  x: number;
  z: number;
  width: number;
  length: number;
}

export function buildStuntRamp(x: number, z: number): StuntRamp {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const rampMat = new THREE.MeshStandardMaterial({
    color: 0x17191c,
    roughness: 0.5,
  });
  const stripeMat = new THREE.MeshStandardMaterial({
    color: 0xfacc15,
    emissive: 0xfacc15,
    emissiveIntensity: 0.4,
  });

  // Inclined ramp board
  const board = new THREE.Mesh(new THREE.BoxGeometry(4.6, 0.25, 4.8), rampMat);
  board.position.set(0, 0.65, 0);
  board.rotation.x = 0.28; // Sloped upward toward -Z
  board.castShadow = true;
  board.receiveShadow = true;
  group.add(board);

  // Side chevron rails
  [-2.15, 2.15].forEach((rx) => {
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.42, 4.8), stripeMat);
    rail.position.set(rx, 0.75, 0);
    rail.rotation.x = 0.28;
    group.add(rail);
  });

  return { group, x, z, width: 4.6, length: 4.8 };
}

/**
 * 7. Stylized Low-Poly Trees & Animated Windmill Landmark
 */
export function buildStylizedTree(scale = 1, variant = 0): THREE.Group {
  const tree = new THREE.Group();

  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.85 });
  const leafColors = [0x15803d, 0x65a30d, 0xd97706];
  const leafMat = new THREE.MeshStandardMaterial({
    color: leafColors[variant % leafColors.length],
    roughness: 0.55,
  });

  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 1.2, 8), trunkMat);
  trunk.position.y = 0.6;
  trunk.castShadow = true;
  tree.add(trunk);

  const tier1 = new THREE.Mesh(new THREE.ConeGeometry(1.2, 1.6, 7), leafMat);
  tier1.position.y = 1.6;
  tier1.castShadow = true;
  tree.add(tier1);

  const tier2 = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.35, 7), leafMat);
  tier2.position.y = 2.45;
  tier2.castShadow = true;
  tree.add(tier2);

  tree.scale.setScalar(scale);
  return tree;
}

export function buildWindmillTower(x: number, z: number): {
  group: THREE.Group;
  blades: THREE.Group;
} {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const towerMat = new THREE.MeshStandardMaterial({ color: 0xfffdf9, roughness: 0.4 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xff4d1c, roughness: 0.3 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x17191c, roughness: 0.5 });

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.5, 5.5, 12), towerMat);
  tower.position.y = 2.75;
  tower.castShadow = true;
  tower.receiveShadow = true;
  group.add(tower);

  const dome = new THREE.Mesh(new THREE.ConeGeometry(1.1, 1.4, 12), roofMat);
  dome.position.y = 6.2;
  dome.castShadow = true;
  group.add(dome);

  const blades = new THREE.Group();
  blades.position.set(0, 4.8, 1.05);

  const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.4, 12), darkMat);
  hub.rotation.x = Math.PI / 2;
  blades.add(hub);

  const bladeGeo = new THREE.BoxGeometry(0.38, 2.6, 0.08);
  for (let i = 0; i < 4; i++) {
    const pivot = new THREE.Group();
    pivot.rotation.z = (i * Math.PI) / 2;
    const blade = new THREE.Mesh(bladeGeo, roofMat);
    blade.position.y = 1.4;
    blade.castShadow = true;
    pivot.add(blade);
    blades.add(pivot);
  }

  group.add(blades);
  return { group, blades };
}
