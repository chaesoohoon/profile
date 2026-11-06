import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { Project, PROJECTS } from '../../data/portfolioData';
import {
  createWarmPlaygroundGroundTexture,
  createGroundLabelTexture,
  createSignboardTexture,
} from './proceduralTextures';
import {
  buildRoverVehicle,
  buildTitleMonumentBlocks,
  build3DKeycaps,
  buildProjectStation,
  buildAIPipelineArches,
  buildBrickWall,
  buildBowlingAlley,
  buildStuntRamp,
  buildStylizedTree,
  buildWindmillTower,
  KnockableProp,
} from './worldBuilders';
import { soundEngine } from './soundEffects';
import {
  Gamepad2,
  Compass,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Zap,
  Volume2,
  VolumeX,
  Volume1,
  Award,
  BookOpen,
  User,
  Sparkles,
  Mail,
} from 'lucide-react';

export type DrawerSectionId = 'works' | 'ai-lab' | 'about' | 'education' | 'contact' | null;

interface BrunoWorld3DProps {
  onSelectProject: (project: Project) => void;
  onOpenSectionDrawer: (drawerId: DrawerSectionId) => void;
  onOpenGuide: () => void;
  onOpenResume: () => void;
}

interface ZoneTarget {
  id: string;
  label: string;
  x: number;
  z: number;
  drawerId?: DrawerSectionId;
}

const ZONE_TARGETS: ZoneTarget[] = [
  { id: 'spawn', label: '01. 스타트 광장', x: 0, z: 9 },
  { id: 'works', label: '02. 작품 파빌리온', x: -16, z: -10, drawerId: 'works' },
  { id: 'ailab', label: '03. AI 파이프라인 팩토리', x: 22, z: -8, drawerId: 'ai-lab' },
  { id: 'bowling', label: '04. 스턴트 & 볼링 파크', x: 0, z: -15 },
  { id: 'education', label: '05. 교육·경력 캠퍼스', x: -15, z: 18, drawerId: 'education' },
  { id: 'contact', label: '06. 협업 포털', x: 15, z: 18, drawerId: 'contact' },
];

// Pre-allocated math helpers at module scope to prevent GC inside animation loop
const _forwardVec = new THREE.Vector3();
const _desiredCamPos = new THREE.Vector3();
const _desiredLookAt = new THREE.Vector3();
const _mouseVec = new THREE.Vector2();

export default function BrunoWorld3D({
  onSelectProject,
  onOpenSectionDrawer,
  onOpenGuide,
  onOpenResume,
}: BrunoWorld3DProps) {
  const canvasMountRef = useRef<HTMLDivElement>(null);

  const [nearbyProject, setNearbyProject] = useState<Project | null>(null);
  const [nearbyPortal, setNearbyPortal] = useState<{ id: DrawerSectionId; title: string } | null>(null);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [speedDisplay, setSpeedDisplay] = useState(0);
  const [activeZoneId, setActiveZoneId] = useState<string>('spawn');
  const [isMuted, setIsMuted] = useState(false);
  const [smashedCount, setSmashedCount] = useState(0);

  const callbacksRef = useRef({ onSelectProject, onOpenSectionDrawer });
  callbacksRef.current = { onSelectProject, onOpenSectionDrawer };

  const nearbyProjectRef = useRef<Project | null>(null);
  const nearbyPortalRef = useRef<{ id: DrawerSectionId; title: string } | null>(null);

  const controlsStateRef = useRef({
    up: false,
    down: false,
    left: false,
    right: false,
    boost: false,
    teleportTo: (_x: number, _z: number) => {},
    resetWorld: () => {},
    honk: () => {},
  });

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

    // 1. Scene, Warm Terracotta Atmosphere & Studio Reflection
    const scene = new THREE.Scene();
    const skyColor = new THREE.Color('#E89565');
    scene.background = skyColor;
    scene.fog = new THREE.FogExp2('#E89565', 0.0115);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 2. Camera Setup (Bruno Simon Isometric Chase Angle)
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.5, 200);
    camera.position.set(0, 17, 25);
    const currentCamLookAt = new THREE.Vector3(0, 1, 4);

    // 3. Golden-Hour 3-Point Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xfff7ed, 0xc2410c, 0.95);
    hemiLight.position.set(0, 40, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffbeb, 2.5);
    keyLight.position.set(28, 42, 30);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 5;
    keyLight.shadow.camera.far = 120;
    const d = 46;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfde047, 0.85);
    rimLight.position.set(-30, 20, -28);
    scene.add(rimLight);

    // 4. Warm Terracotta Ground Plane
    const groundTex = createWarmPlaygroundGroundTexture(maxAnisotropy);
    const groundGeo = new THREE.PlaneGeometry(240, 240);
    groundGeo.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      map: groundTex,
      roughness: 0.82,
      metalness: 0.04,
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // 5. Central Spawn Pad + 3D Mechanical Keycaps on the Ground
    const spawnPad = new THREE.Mesh(
      new THREE.CylinderGeometry(7.2, 7.6, 0.1, 48),
      new THREE.MeshStandardMaterial({ color: 0x17191c, roughness: 0.55 })
    );
    spawnPad.position.set(0, 0.05, 9);
    spawnPad.receiveShadow = true;
    scene.add(spawnPad);

    const welcomeTex = createGroundLabelTexture(
      'CHAE SOOHOON // 3D PLAYGROUND',
      'WASD · 방향키로 주행 | Space 부스트 | H 경적 | R 리셋',
      '#FF4D1C',
      maxAnisotropy
    );
    const welcomeSign = new THREE.Mesh(
      new THREE.PlaneGeometry(10.5, 2.5),
      new THREE.MeshBasicMaterial({ map: welcomeTex, transparent: true })
    );
    welcomeSign.rotation.x = -Math.PI / 2;
    welcomeSign.position.set(0, 0.11, 14.2);
    scene.add(welcomeSign);

    // Interactive 3D Mechanical Keyboard Keycaps right beside Spawn Pad
    const keycapsObj = build3DKeycaps(-8.8, 9.5, maxAnisotropy);
    scene.add(keycapsObj.group);

    // 6. Knockable 3D Monument Blocks ("CHAE SOOHOON") at North Edge of Spawn Plaza
    const monumentBlocks = buildTitleMonumentBlocks(0, 1.5);
    monumentBlocks.forEach((b) => scene.add(b.mesh));

    // 7. Build 6 Project Showcase Stations (West & North-West Sector)
    const stationCoords: [number, number, number][] = [
      [-14, -4, 0.35],
      [-23, -11, 0.45],
      [-17, -21, 0.2],
      [-6, -26, 0.05],
      [8, -26, -0.1],
      [16, -19, -0.3],
    ];

    const clickableHitboxes: THREE.Mesh[] = [];
    const projectStations: {
      project: Project;
      position: THREE.Vector3;
      sculptureGroup: THREE.Group;
      ringMesh: THREE.Mesh;
    }[] = [];

    PROJECTS.forEach((project, idx) => {
      const [sx, sz, rotY] = stationCoords[idx % stationCoords.length];
      const st = buildProjectStation(project, idx, maxAnisotropy);
      st.group.position.set(sx, 0, sz);
      st.group.rotation.y = rotY;
      scene.add(st.group);

      clickableHitboxes.push(st.hitboxMesh);
      projectStations.push({
        project,
        position: new THREE.Vector3(sx, 0, sz),
        sculptureGroup: st.sculptureGroup,
        ringMesh: st.ringMesh,
      });
    });

    // 8. Build AI 6-Stage Pipeline Factory Arches (East Sector)
    const aiFactory = buildAIPipelineArches(22, -6, maxAnisotropy);
    scene.add(aiFactory.group);
    clickableHitboxes.push(aiFactory.hitbox);

    // 9. Build Section Portals (South Sector: About, Education, Contact, All Works)
    const portalConfigs: {
      id: DrawerSectionId;
      title: string;
      badge: string;
      x: number;
      z: number;
      color: string;
    }[] = [
      { id: 'education', title: '실무 디자인·AI 교육 커리큘럼', badge: 'EDUCATION & CURRICULUM', x: -15, z: 19, color: '#10B981' },
      { id: 'about', title: '10년 시각디자인 경력 & 타임라인', badge: 'ABOUT & CAREER', x: 0, z: 22, color: '#345BEB' },
      { id: 'contact', title: '채용·외주·특강 협업 문의하기', badge: 'CONTACT & EMAIL', x: 15, z: 19, color: '#FF4D1C' },
    ];

    const portals: {
      id: DrawerSectionId;
      title: string;
      position: THREE.Vector3;
      archMesh: THREE.Mesh;
    }[] = [];

    portalConfigs.forEach((p) => {
      const pGroup = new THREE.Group();
      pGroup.position.set(p.x, 0, p.z);

      const archGeo = new THREE.TorusGeometry(2.4, 0.26, 16, 40, Math.PI);
      const archMat = new THREE.MeshStandardMaterial({
        color: p.color,
        emissive: p.color,
        emissiveIntensity: 0.45,
        roughness: 0.2,
      });
      const archMesh = new THREE.Mesh(archGeo, archMat);
      archMesh.position.y = 0.1;
      archMesh.castShadow = true;
      pGroup.add(archMesh);

      const labelTex = createGroundLabelTexture(p.title, `${p.badge} · 접근 후 Enter`, p.color, maxAnisotropy);
      const labelPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(6.2, 1.5),
        new THREE.MeshBasicMaterial({ map: labelTex, transparent: true })
      );
      labelPlane.rotation.x = -Math.PI / 2;
      labelPlane.position.set(0, 0.06, 1.8);
      pGroup.add(labelPlane);

      scene.add(pGroup);
      portals.push({
        id: p.id,
        title: p.title,
        position: new THREE.Vector3(p.x, 0, p.z),
        archMesh,
      });
    });

    // 10. Stunt Jump Ramp + Giant Bowling Alley + Knockable Domino Walls
    const stuntRamp = buildStuntRamp(0, -8);
    scene.add(stuntRamp.group);

    const bowlingPins = buildBowlingAlley(0, -17);
    bowlingPins.forEach((pin) => scene.add(pin.mesh));

    const dominoWalls = [
      ...buildBrickWall(-7, -12, 4, 4),
      ...buildBrickWall(7, -12, 4, 4),
    ];
    dominoWalls.forEach((b) => scene.add(b.mesh));

    const allKnockables: KnockableProp[] = [
      ...monumentBlocks,
      ...bowlingPins,
      ...dominoWalls,
    ];

    // 11. Animated Windmill Tower & Stylized Autumn/Summer Trees
    const windmill = buildWindmillTower(-25, 6);
    scene.add(windmill.group);

    const treeSpots: [number, number, number, number][] = [
      [-30, -24, 1.25, 0], [-32, -8, 1.1, 1], [-28, 14, 1.2, 2], [-22, 26, 1.0, 0],
      [30, -24, 1.15, 2], [32, -4, 1.3, 1], [29, 14, 1.05, 0], [22, 26, 1.15, 2],
      [-12, -33, 1.2, 1], [0, -34, 1.35, 2], [12, -33, 1.1, 0],
    ];
    treeSpots.forEach(([tx, tz, sc, variant]) => {
      const tree = buildStylizedTree(sc, variant);
      tree.position.set(tx, 0, tz);
      scene.add(tree);
    });

    // 12. Build Hero 4x4 Monster Truck Rover
    const rover = buildRoverVehicle('#FF4D1C');
    rover.group.position.set(0, 0, 9);
    scene.add(rover.group);

    // Soft Radial Contact Shadow under Rover
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(64, 64, 12, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0,0,0,0.62)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 128, 128);
    const contactShadowTex = new THREE.CanvasTexture(shadowCanvas);
    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(3.2, 4.2),
      new THREE.MeshBasicMaterial({
        map: contactShadowTex,
        transparent: true,
        depthWrite: false,
      })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = 0.03;
    rover.group.add(contactShadow);

    // 13. Dust & Boost Exhaust Particle Pool (InstancedMesh, Zero GC)
    const particleCount = 36;
    const particleGeo = new THREE.SphereGeometry(0.28, 8, 8);
    const particleMat = new THREE.MeshStandardMaterial({
      color: 0xfff7ed,
      roughness: 0.9,
      transparent: true,
      opacity: 0.75,
    });
    const particleMesh = new THREE.InstancedMesh(particleGeo, particleMat, particleCount);
    particleMesh.frustumCulled = false;
    scene.add(particleMesh);

    const particleStates = Array.from({ length: particleCount }, () => ({
      pos: new THREE.Vector3(0, -10, 0),
      vel: new THREE.Vector3(),
      scale: 0.001,
      life: 0,
    }));
    let particleCursor = 0;
    let spawnParticleTimer = 0;
    const _dummyObj = new THREE.Object3D();

    // 14. Vehicle Kinematics & Jump Physics State
    let carSpeed = 0;
    let carHeading = Math.PI; // Facing North (-Z)
    let carVerticalVel = 0;
    let wheelSpin = 0;
    let knockedTotal = 0;

    controlsStateRef.current.teleportTo = (tx: number, tz: number) => {
      rover.group.position.set(tx, 0, tz);
      carSpeed = 0;
      carVerticalVel = 0;
      soundEngine.playPortalOpen();
    };

    controlsStateRef.current.resetWorld = () => {
      rover.group.position.set(0, 0, 9);
      carHeading = Math.PI;
      carSpeed = 0;
      carVerticalVel = 0;
      knockedTotal = 0;
      setSmashedCount(0);
      allKnockables.forEach((p) => {
        p.mesh.position.copy(p.initialPos);
        p.mesh.rotation.copy(p.initialRot);
        p.velocity.set(0, 0, 0);
        p.angularVelocity.set(0, 0, 0);
      });
      soundEngine.playPortalOpen();
    };

    controlsStateRef.current.honk = () => {
      soundEngine.playHorn();
      // Hop the chassis slightly when honking!
      if (rover.group.position.y <= 0.05) {
        carVerticalVel = 4.8;
      }
    };

    // 15. Keyboard & Raycast Event Listeners
    const onKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(e.code)) {
        e.preventDefault();
      }
      if (e.code === 'KeyW' || e.code === 'ArrowUp') controlsStateRef.current.up = true;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') controlsStateRef.current.down = true;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') controlsStateRef.current.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') controlsStateRef.current.right = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'Space') {
        if (!controlsStateRef.current.boost) {
          soundEngine.playBoost();
        }
        controlsStateRef.current.boost = true;
      }
      if (e.code === 'KeyH') {
        controlsStateRef.current.honk();
      }
      if (e.code === 'KeyR') {
        controlsStateRef.current.resetWorld();
      }
      if (e.code === 'Enter') {
        if (nearbyProjectRef.current) {
          soundEngine.playPortalOpen();
          callbacksRef.current.onSelectProject(nearbyProjectRef.current);
        } else if (nearbyPortalRef.current && nearbyPortalRef.current.id) {
          soundEngine.playPortalOpen();
          callbacksRef.current.onOpenSectionDrawer(nearbyPortalRef.current.id);
        }
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyW' || e.code === 'ArrowUp') controlsStateRef.current.up = false;
      if (e.code === 'KeyS' || e.code === 'ArrowDown') controlsStateRef.current.down = false;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') controlsStateRef.current.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') controlsStateRef.current.right = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight' || e.code === 'Space') {
        controlsStateRef.current.boost = false;
      }
    };

    const raycaster = new THREE.Raycaster();
    raycaster.layers.set(1);

    const onCanvasClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      _mouseVec.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _mouseVec.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(_mouseVec, camera);
      const hits = raycaster.intersectObjects(clickableHitboxes, false);
      if (hits.length > 0) {
        const data = hits[0].object.userData;
        if (data?.type === 'project' && data.project) {
          soundEngine.playPortalOpen();
          callbacksRef.current.onSelectProject(data.project);
        } else if (data?.type === 'drawer' && data.drawerId) {
          soundEngine.playPortalOpen();
          callbacksRef.current.onOpenSectionDrawer(data.drawerId);
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    renderer.domElement.addEventListener('click', onCanvasClick);

    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // 16. Main Game Loop
    const clock = new THREE.Clock();
    let frameId = 0;
    let hudUpdateCounter = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const dt = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.getElapsedTime();

      const ctrl = controlsStateRef.current;
      const maxSpeed = ctrl.boost ? 24.5 : 15.0;

      if (ctrl.up) {
        carSpeed = THREE.MathUtils.damp(carSpeed, maxSpeed, 4.8, dt);
      } else if (ctrl.down) {
        carSpeed = THREE.MathUtils.damp(carSpeed, -maxSpeed * 0.65, 4.8, dt);
      } else {
        carSpeed = THREE.MathUtils.damp(carSpeed, 0, 5.5, dt);
      }

      // Animate 3D Mechanical Keycaps on the ground
      const kMap = keycapsObj.keysMap;
      if (kMap.up) kMap.up.position.y = THREE.MathUtils.damp(kMap.up.position.y, ctrl.up ? 0.12 : 0.24, 15, dt);
      if (kMap.down) kMap.down.position.y = THREE.MathUtils.damp(kMap.down.position.y, ctrl.down ? 0.12 : 0.24, 15, dt);
      if (kMap.left) kMap.left.position.y = THREE.MathUtils.damp(kMap.left.position.y, ctrl.left ? 0.12 : 0.24, 15, dt);
      if (kMap.right) kMap.right.position.y = THREE.MathUtils.damp(kMap.right.position.y, ctrl.right ? 0.12 : 0.24, 15, dt);
      if (kMap.boost) kMap.boost.position.y = THREE.MathUtils.damp(kMap.boost.position.y, ctrl.boost ? 0.12 : 0.24, 15, dt);

      // Steering
      const turnFactor = Math.min(Math.abs(carSpeed) / 3.2, 1) * (carSpeed >= 0 ? 1 : -1);
      const turnRate = 2.85;
      let steerInput = 0;
      if (ctrl.left) steerInput += 1;
      if (ctrl.right) steerInput -= 1;

      if (Math.abs(carSpeed) > 0.15) {
        carHeading += steerInput * turnRate * turnFactor * dt;
      }

      _forwardVec.set(Math.sin(carHeading), 0, Math.cos(carHeading));
      rover.group.position.addScaledVector(_forwardVec, carSpeed * dt);
      rover.group.position.x = THREE.MathUtils.clamp(rover.group.position.x, -38, 38);
      rover.group.position.z = THREE.MathUtils.clamp(rover.group.position.z, -38, 30);
      rover.group.rotation.y = carHeading;

      // Check Stunt Ramp Elevation & Launch Jump!
      const rx = rover.group.position.x - stuntRamp.x;
      const rz = rover.group.position.z - stuntRamp.z;
      let groundTargetY = 0;
      if (Math.abs(rx) < stuntRamp.width / 2 && Math.abs(rz) < stuntRamp.length / 2) {
        // Progress from south (+2.4) to north (-2.4) of the ramp
        const t = THREE.MathUtils.clamp((2.4 - rz) / stuntRamp.length, 0, 1);
        groundTargetY = t * 1.35;
        if (t > 0.85 && carSpeed > 9 && carVerticalVel <= 0.1) {
          carVerticalVel = carSpeed * 0.48;
          soundEngine.playBoost();
        }
      }

      // Apply Vertical Jump Gravity
      if (rover.group.position.y > groundTargetY || carVerticalVel > 0) {
        rover.group.position.y += carVerticalVel * dt;
        carVerticalVel -= 22 * dt;
        if (rover.group.position.y <= groundTargetY) {
          rover.group.position.y = groundTargetY;
          carVerticalVel = 0;
        }
      } else {
        rover.group.position.y = groundTargetY;
      }

      // Suspension Pitch, Roll & Antenna Whip
      const targetPitch =
        (ctrl.up ? -0.065 : ctrl.down ? 0.065 : 0) * (ctrl.boost ? 1.5 : 1) +
        (rover.group.position.y > 0.1 ? -0.18 : 0);
      const targetRoll = -steerInput * Math.min(Math.abs(carSpeed) / 14, 1) * 0.11;
      rover.chassisGroup.rotation.x = THREE.MathUtils.damp(rover.chassisGroup.rotation.x, targetPitch, 9, dt);
      rover.chassisGroup.rotation.z = THREE.MathUtils.damp(rover.chassisGroup.rotation.z, targetRoll, 9, dt);

      rover.antennaRod.rotation.x = THREE.MathUtils.damp(
        rover.antennaRod.rotation.x,
        -carSpeed * 0.035 + Math.sin(elapsed * 18) * 0.06,
        8,
        dt
      );
      rover.antennaRod.rotation.z = THREE.MathUtils.damp(
        rover.antennaRod.rotation.z,
        steerInput * 0.25,
        8,
        dt
      );

      // Boost Flames
      rover.boostFlames.forEach((flame) => {
        flame.visible = ctrl.boost && Math.abs(carSpeed) > 2;
        if (flame.visible) {
          flame.scale.setScalar(0.85 + Math.sin(elapsed * 45) * 0.25);
        }
      });

      // Spin Wheels
      wheelSpin += carSpeed * dt * 2.1;
      rover.wheels.forEach((w, idx) => {
        w.children[0].rotation.x = wheelSpin;
        if (idx < 2) {
          w.rotation.y = THREE.MathUtils.damp(w.rotation.y, steerInput * 0.42, 12, dt);
        }
      });

      // Spawn Exhaust & Tire Dust Particles
      spawnParticleTimer += dt;
      if (Math.abs(carSpeed) > 2.5 && spawnParticleTimer > (ctrl.boost ? 0.03 : 0.065)) {
        spawnParticleTimer = 0;
        const p = particleStates[particleCursor];
        particleCursor = (particleCursor + 1) % particleCount;
        p.pos.set(
          rover.group.position.x - _forwardVec.x * 1.55 + (Math.random() - 0.5) * 0.9,
          rover.group.position.y + 0.25,
          rover.group.position.z - _forwardVec.z * 1.55 + (Math.random() - 0.5) * 0.9
        );
        p.vel.set(
          (Math.random() - 0.5) * 1.5,
          1.2 + Math.random() * 1.2,
          (Math.random() - 0.5) * 1.5
        );
        p.scale = ctrl.boost ? 1.35 : 0.9;
        p.life = 1.0;
      }

      for (let i = 0; i < particleCount; i++) {
        const p = particleStates[i];
        if (p.life > 0) {
          p.life -= dt * 1.8;
          p.pos.addScaledVector(p.vel, dt);
          const s = Math.max(0.001, p.scale * p.life);
          _dummyObj.position.copy(p.pos);
          _dummyObj.scale.setScalar(s);
          _dummyObj.updateMatrix();
          particleMesh.setMatrixAt(i, _dummyObj.matrix);
        } else {
          _dummyObj.position.set(0, -20, 0);
          _dummyObj.scale.setScalar(0.001);
          _dummyObj.updateMatrix();
          particleMesh.setMatrixAt(i, _dummyObj.matrix);
        }
      }
      particleMesh.instanceMatrix.needsUpdate = true;

      // Knockable Props Physics (Title Letters, Bowling Pins, Domino Walls)
      for (let i = 0; i < allKnockables.length; i++) {
        const b = allKnockables[i];
        const dx = b.mesh.position.x - rover.group.position.x;
        const dz = b.mesh.position.z - rover.group.position.z;
        const distSq = dx * dx + dz * dz;
        const hitDist = 1.65 + b.radius;

        if (distSq < hitDist * hitDist && Math.abs(b.mesh.position.y - rover.group.position.y) < 1.6) {
          const dist = Math.sqrt(distSq) || 0.1;
          const pushStrength = Math.max(Math.abs(carSpeed) * 1.25, 6.5);
          if (b.velocity.lengthSq() < 1.0) {
            knockedTotal++;
            soundEngine.playHit(pushStrength / 8);
          }
          b.velocity.x = (dx / dist) * pushStrength;
          b.velocity.y = 3.8 + Math.random() * 2.8;
          b.velocity.z = (dz / dist) * pushStrength;
          b.angularVelocity.set(
            (Math.random() - 0.5) * 9,
            (Math.random() - 0.5) * 9,
            (Math.random() - 0.5) * 9
          );
        }

        if (b.velocity.lengthSq() > 0.01 || b.mesh.position.y > b.halfHeight + 0.02) {
          b.mesh.position.addScaledVector(b.velocity, dt);
          b.velocity.y -= 16 * dt;
          b.mesh.rotation.x += b.angularVelocity.x * dt;
          b.mesh.rotation.y += b.angularVelocity.y * dt;
          b.mesh.rotation.z += b.angularVelocity.z * dt;

          if (b.mesh.position.y <= b.halfHeight) {
            b.mesh.position.y = b.halfHeight;
            b.velocity.y = -b.velocity.y * 0.25;
            b.velocity.x *= 0.86;
            b.velocity.z *= 0.86;
            b.angularVelocity.multiplyScalar(0.84);
          }
        }
      }

      // Spin Windmill & AI Factory Nodes
      windmill.blades.rotation.z = -elapsed * 1.1;
      aiFactory.spinners.forEach((sp, idx) => {
        sp.rotation.y = elapsed * 1.5 + idx;
        sp.rotation.x = elapsed * 0.8;
      });

      // Animate Project Sculptures & Check Proximity
      let closestProj: Project | null = null;
      let minProjDist = 5.4;

      for (let idx = 0; idx < projectStations.length; idx++) {
        const st = projectStations[idx];
        st.sculptureGroup.rotation.y = elapsed * 0.8 + idx;
        st.sculptureGroup.position.y = 1.25 + Math.sin(elapsed * 2.2 + idx) * 0.12;

        const dist = rover.group.position.distanceTo(st.position);
        const mat = st.ringMesh.material as THREE.MeshStandardMaterial;
        if (dist < minProjDist) {
          minProjDist = dist;
          closestProj = st.project;
          mat.emissiveIntensity = 1.4;
          st.ringMesh.scale.setScalar(1.08);
        } else {
          mat.emissiveIntensity = 0.45;
          st.ringMesh.scale.setScalar(1.0);
        }
      }

      if (nearbyProjectRef.current?.id !== closestProj?.id) {
        nearbyProjectRef.current = closestProj;
        setNearbyProject(closestProj);
      }

      // Check Portal Proximity (including AI Factory Zone)
      let closestPortal: { id: DrawerSectionId; title: string } | null = null;
      for (let i = 0; i < portals.length; i++) {
        const pt = portals[i];
        const dist = rover.group.position.distanceTo(pt.position);
        if (dist < 4.6) {
          closestPortal = { id: pt.id, title: pt.title };
        }
      }
      if (!closestPortal && Math.abs(rover.group.position.x - 22) < 5.5 && Math.abs(rover.group.position.z - -6) < 13) {
        closestPortal = { id: 'ai-lab', title: '엔드투엔드 AI 6단계 파이프라인 랩 열기' };
      }

      if (nearbyPortalRef.current?.id !== closestPortal?.id) {
        nearbyPortalRef.current = closestPortal;
        setNearbyPortal(closestPortal);
      }

      // Smooth Isometric Chase Camera
      _desiredCamPos.set(
        rover.group.position.x + 12.5,
        15.5 + Math.abs(carSpeed) * 0.14,
        rover.group.position.z + 17.5
      );
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _desiredCamPos.x, 4.5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _desiredCamPos.y, 4.5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _desiredCamPos.z, 4.5, dt);

      _desiredLookAt.set(
        rover.group.position.x + _forwardVec.x * 2.4,
        1.0,
        rover.group.position.z + _forwardVec.z * 2.4
      );
      currentCamLookAt.x = THREE.MathUtils.damp(currentCamLookAt.x, _desiredLookAt.x, 6.8, dt);
      currentCamLookAt.y = THREE.MathUtils.damp(currentCamLookAt.y, _desiredLookAt.y, 6.8, dt);
      currentCamLookAt.z = THREE.MathUtils.damp(currentCamLookAt.z, _desiredLookAt.z, 6.8, dt);
      camera.lookAt(currentCamLookAt);

      hudUpdateCounter++;
      if (hudUpdateCounter % 6 === 0) {
        setSpeedDisplay(Math.round(Math.abs(carSpeed) * 4.5));
        setSmashedCount(knockedTotal);
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('click', onCanvasClick);
      renderer.dispose();
    };
  }, []);

  const handleToggleMute = () => {
    soundEngine.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleZoneClick = (zone: ZoneTarget) => {
    setActiveZoneId(zone.id);
    controlsStateRef.current.teleportTo(zone.x, zone.z);
  };

  return (
    <div className="relative w-screen h-screen bg-[#E89565] overflow-hidden select-none">
      {/* Full-Screen 100vw x 100vh WebGL Canvas */}
      <div ref={canvasMountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top Game HUD Bar (No Traditional Website Header) */}
      <header className="absolute top-0 inset-x-0 z-20 p-4 sm:p-6 pointer-events-none flex flex-wrap items-start justify-between gap-4">
        {/* Left: Game Identity & Mission Status */}
        <div className="pointer-events-auto flex flex-col gap-1.5 bg-[#17191C] text-white p-3.5 sm:px-5 sm:py-4 border-2 border-white shadow-xl max-w-md">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#FACC15] tracking-wider uppercase">
            <Gamepad2 className="w-4 h-4 text-[#FF4D1C]" />
            <span>CHAE SOOHOON // 3D INTERACTIVE WORLD</span>
          </div>
          <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight">
            디자인의 경험에 <span className="text-[#FACC15]">AI의 가능성</span>을 더하다
          </div>
          <div className="text-[11px] text-white/75 flex items-center gap-2">
            <span>4x4 몬스터 트럭으로 월드를 주행하며 포트폴리오를 탐험하세요</span>
          </div>
        </div>

        {/* Center/Right: Quick Section Drawers + Speedometer + Audio + Horn */}
        <div className="pointer-events-auto flex flex-wrap items-center gap-2">
          {/* Direct Section Modal Triggers for instant access */}
          <div className="hidden lg:flex items-center bg-[#17191C] border-2 border-white p-1 gap-1 shadow-lg">
            <button
              onClick={() => onOpenSectionDrawer('works')}
              type="button"
              className="px-3 py-1.5 text-xs font-bold text-white hover:bg-[#FF4D1C] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FACC15]" />
              <span>전체 작품 (6)</span>
            </button>
            <button
              onClick={() => onOpenSectionDrawer('ai-lab')}
              type="button"
              className="px-3 py-1.5 text-xs font-bold text-white hover:bg-[#345BEB] transition-colors"
            >
              <span>AI 워크플로</span>
            </button>
            <button
              onClick={() => onOpenSectionDrawer('about')}
              type="button"
              className="px-3 py-1.5 text-xs font-bold text-white hover:bg-[#345BEB] transition-colors flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" />
              <span>경력·소개</span>
            </button>
            <button
              onClick={() => onOpenSectionDrawer('education')}
              type="button"
              className="px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-600 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>교육 과정</span>
            </button>
            <button
              onClick={() => onOpenSectionDrawer('contact')}
              type="button"
              className="px-3 py-1.5 text-xs font-bold bg-[#FF4D1C] text-white hover:bg-[#345BEB] transition-colors flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>협업 문의</span>
            </button>
          </div>

          {/* Brick Smash Counter */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#17191C] text-white text-xs font-mono border-2 border-white shadow-lg">
            <Award className="w-4 h-4 text-[#FACC15]" />
            <span className="text-white/70">HIT:</span>
            <span className="tabular-nums font-extrabold text-[#FACC15]">{smashedCount}</span>
          </div>

          {/* Speedometer */}
          <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#17191C] text-white text-xs font-mono border-2 border-white shadow-lg">
            <Zap className="w-4 h-4 text-[#FF4D1C]" />
            <span className="tabular-nums font-extrabold text-sm">{speedDisplay}</span>
            <span className="text-white/60">KM/H</span>
          </div>

          {/* Horn Button */}
          <button
            onClick={() => controlsStateRef.current.honk()}
            type="button"
            className="px-3.5 py-2.5 bg-[#FACC15] hover:bg-amber-300 text-[#17191C] font-extrabold text-xs font-mono border-2 border-[#17191C] shadow-lg transition-transform active:scale-95 flex items-center gap-1.5"
            title="클락션 경적 & 점프 (단축키 H)"
          >
            <Volume1 className="w-4 h-4" />
            <span>HORN (H)</span>
          </button>

          {/* Audio Mute Toggle */}
          <button
            onClick={handleToggleMute}
            type="button"
            className="p-2.5 bg-[#17191C] hover:bg-[#345BEB] text-white border-2 border-white shadow-lg transition-colors"
            title={isMuted ? '효과음 켜기' : '효과음 끄기'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
          </button>
        </div>
      </header>

      {/* Proximity Context Action Prompt (When Rover parks near a Project or Portal) */}
      {(nearbyProject || nearbyPortal) && (
        <div className="absolute top-28 left-1/2 -translate-x-1/2 z-30 w-[92vw] max-w-lg bg-[#17191C] text-white border-4 border-[#FACC15] p-4 shadow-2xl flex items-center justify-between gap-4">
          {nearbyProject ? (
            <>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-[#FACC15] uppercase tracking-wider font-bold">
                  PROJECT STATION // {nearbyProject.categoryLabel}
                </div>
                <div className="font-display text-lg font-extrabold truncate">
                  {nearbyProject.title}
                </div>
                <div className="text-xs text-white/80 truncate">{nearbyProject.subtitle}</div>
              </div>
              <button
                onClick={() => {
                  soundEngine.playPortalOpen();
                  onSelectProject(nearbyProject);
                }}
                type="button"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-3 bg-[#FF4D1C] hover:bg-[#345BEB] text-white text-xs font-extrabold border-2 border-white transition-colors"
              >
                <span>상세 열기 (Enter)</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </>
          ) : nearbyPortal ? (
            <>
              <div className="min-w-0">
                <div className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider font-bold">
                  PORTAL ZONE DETECTED
                </div>
                <div className="font-display text-base sm:text-lg font-extrabold truncate">
                  {nearbyPortal.title}
                </div>
              </div>
              <button
                onClick={() => {
                  soundEngine.playPortalOpen();
                  onOpenSectionDrawer(nearbyPortal.id);
                }}
                type="button"
                className="shrink-0 inline-flex items-center gap-1.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-[#17191C] text-xs font-extrabold border-2 border-white transition-colors"
              >
                <span>열람하기 (Enter)</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </>
          ) : null}
        </div>
      )}

      {/* Mobile / Touch On-Screen Arcade Controls */}
      <div className="md:hidden absolute bottom-28 right-4 z-20 flex flex-col items-end gap-2">
        <button
          type="button"
          onTouchStart={() => {
            soundEngine.playBoost();
            controlsStateRef.current.boost = true;
          }}
          onTouchEnd={() => { controlsStateRef.current.boost = false; }}
          className="px-4 py-2 bg-[#FF4D1C] text-white font-extrabold text-xs border-2 border-white shadow-lg"
        >
          ⚡ TURBO BOOST
        </button>
        <div className="grid grid-cols-3 gap-1.5 w-36">
          <div />
          <button
            type="button"
            onTouchStart={() => { controlsStateRef.current.up = true; }}
            onTouchEnd={() => { controlsStateRef.current.up = false; }}
            className="h-11 bg-[#17191C] text-white font-extrabold text-sm border-2 border-white active:bg-[#FF4D1C]"
          >
            ▲
          </button>
          <div />
          <button
            type="button"
            onTouchStart={() => { controlsStateRef.current.left = true; }}
            onTouchEnd={() => { controlsStateRef.current.left = false; }}
            className="h-11 bg-[#17191C] text-white font-extrabold text-sm border-2 border-white active:bg-[#FF4D1C]"
          >
            ◀
          </button>
          <button
            type="button"
            onTouchStart={() => { controlsStateRef.current.down = true; }}
            onTouchEnd={() => { controlsStateRef.current.down = false; }}
            className="h-11 bg-[#17191C] text-white font-extrabold text-sm border-2 border-white active:bg-[#FF4D1C]"
          >
            ▼
          </button>
          <button
            type="button"
            onTouchStart={() => { controlsStateRef.current.right = true; }}
            onTouchEnd={() => { controlsStateRef.current.right = false; }}
            className="h-11 bg-[#17191C] text-white font-extrabold text-sm border-2 border-white active:bg-[#FF4D1C]"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Unified Collapsible Bottom Arcade Dock */}
      <div
        className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[95vw] max-w-[1040px] transition-transform duration-300 ${
          dockCollapsed ? 'translate-y-[calc(100%-34px)]' : 'translate-y-0'
        }`}
      >
        <div className="flex justify-center">
          <button
            onClick={() => setDockCollapsed(!dockCollapsed)}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-1 bg-[#17191C] text-white text-[11px] font-mono font-bold border-2 border-b-0 border-white hover:bg-[#FF4D1C] transition-colors"
          >
            {dockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" />
                <span>3D 월드 내비게이션 열기</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" />
                <span>내비게이션 숨기기</span>
              </>
            )}
          </button>
        </div>

        <div className="bg-[#17191C] text-white border-2 border-white px-4 py-3 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-3">
          {/* Zone Teleport Map Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-0.5">
            <Compass className="w-4 h-4 text-[#FACC15] shrink-0 mr-1" />
            {ZONE_TARGETS.map((zone) => (
              <button
                key={zone.id}
                onClick={() => handleZoneClick(zone)}
                type="button"
                className={`px-3 py-1.5 text-xs font-bold whitespace-nowrap shrink-0 transition-colors border ${
                  activeZoneId === zone.id
                    ? 'bg-[#FF4D1C] text-white border-white'
                    : 'bg-white/10 text-white/85 border-transparent hover:bg-white/20 hover:text-white'
                }`}
              >
                {zone.label}
              </button>
            ))}
          </div>

          {/* Right Utility Actions: Guide, Resume, Reset */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onOpenResume}
              type="button"
              className="px-3 py-1.5 bg-white/10 hover:bg-[#345BEB] text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              이력서 PDF
            </button>
            <button
              onClick={onOpenGuide}
              type="button"
              className="px-3 py-1.5 bg-white/10 hover:bg-[#345BEB] text-white text-xs font-bold transition-colors whitespace-nowrap"
            >
              기획 가이드
            </button>
            <button
              onClick={() => {
                controlsStateRef.current.resetWorld();
                setActiveZoneId('spawn');
              }}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FACC15] hover:bg-amber-300 text-[#17191C] text-xs font-extrabold whitespace-nowrap transition-colors"
              title="차량 및 모든 블록 초기화 (단축키 R)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>월드 리셋 (R)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
