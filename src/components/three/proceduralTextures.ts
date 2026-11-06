import * as THREE from 'three';

/**
 * Generates high-DPI procedural 2D canvas textures for the Bruno Simon style
 * warm sunlit terracotta & golden-ochre 3D playground, ground decals, directional
 * arrows, and arcade station signboards.
 */

export function createWarmPlaygroundGroundTexture(maxAnisotropy = 4): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Bruno Simon signature warm terracotta-apricot base
  ctx.fillStyle = '#E89565';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle warm tile grid lines
  ctx.strokeStyle = 'rgba(138, 62, 27, 0.14)';
  ctx.lineWidth = 3;

  const step = 64;
  for (let i = 0; i <= 512; i += step) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  // Crisp white/cream micro-crosshairs at intersections
  ctx.fillStyle = 'rgba(255, 247, 237, 0.35)';
  for (let x = 0; x <= 512; x += step * 2) {
    for (let y = 0; y <= 512; y += step * 2) {
      ctx.fillRect(x - 5, y - 1, 10, 2);
      ctx.fillRect(x - 1, y - 5, 2, 10);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(44, 44);
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createSignboardTexture(
  title: string,
  subtitle: string,
  badge: string,
  accentHex = '#345BEB',
  maxAnisotropy = 4
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Deep arcade slate background
  ctx.fillStyle = '#FFFDF9';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Bold chunk frame
  ctx.strokeStyle = '#17191C';
  ctx.lineWidth = 18;
  ctx.strokeRect(18, 18, canvas.width - 36, canvas.height - 36);

  // Top color ribbon
  ctx.fillStyle = accentHex;
  ctx.fillRect(27, 27, canvas.width - 54, 96);

  // Badge label
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 34px "Plus Jakarta Sans", "Pretendard", sans-serif';
  ctx.textBaseline = 'middle';
  ctx.fillText(badge.toUpperCase(), 58, 75);

  // Action prompt pill in top right
  ctx.fillStyle = '#17191C';
  ctx.fillRect(canvas.width - 310, 43, 255, 64);
  ctx.fillStyle = '#FACC15';
  ctx.font = '800 26px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('PRESS ENTER ↵', canvas.width - 182, 76);
  ctx.textAlign = 'left';

  // Project Title
  ctx.fillStyle = '#17191C';
  ctx.font = '900 72px "Pretendard", "Plus Jakarta Sans", sans-serif';
  ctx.fillText(title, 58, 224);

  // Accent bar
  ctx.fillStyle = accentHex;
  ctx.fillRect(58, 286, 140, 10);
  ctx.fillStyle = '#E5E7EB';
  ctx.fillRect(210, 289, canvas.width - 268, 4);

  // Wrapped Subtitle
  ctx.fillStyle = '#374151';
  ctx.font = '600 35px "Pretendard", sans-serif';
  const words = subtitle.split(' ');
  let line = '';
  let y = 350;
  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i] + ' ';
    if (ctx.measureText(testLine).width > canvas.width - 120 && i > 0) {
      ctx.fillText(line, 58, y);
      line = words[i] + ' ';
      y += 48;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 58, y);

  // Bottom footer bar
  ctx.fillStyle = '#74787C';
  ctx.font = '700 24px monospace';
  ctx.fillText('DRIVE INTO GLOW ZONE OR CLICK SIGNBOARD TO INSPECT', 58, 456);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createGroundLabelTexture(
  mainText: string,
  subText: string,
  accentHex = '#FF5522',
  maxAnisotropy = 4
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Crisp road-paint stencil box
  ctx.fillStyle = 'rgba(23, 25, 28, 0.92)';
  ctx.beginPath();
  ctx.roundRect(16, 16, canvas.width - 32, canvas.height - 32, 32);
  ctx.fill();

  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 10;
  ctx.stroke();

  // Accent side stripes
  ctx.fillStyle = accentHex;
  ctx.fillRect(42, 48, 18, canvas.height - 96);
  ctx.fillRect(canvas.width - 60, 48, 18, canvas.height - 96);

  // Main headline
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 62px "Plus Jakarta Sans", "Pretendard", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(mainText, canvas.width / 2, 100);

  // Sub instruction
  ctx.fillStyle = '#FACC15';
  ctx.font = '700 32px "Pretendard", monospace';
  ctx.fillText(subText, canvas.width / 2, 180);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

export function createKeycapTopTexture(
  label: string,
  maxAnisotropy = 4
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#FFFDF9';
  ctx.fillRect(0, 0, 256, 256);

  ctx.strokeStyle = '#D1D5DB';
  ctx.lineWidth = 12;
  ctx.strokeRect(18, 18, 220, 220);

  ctx.fillStyle = '#17191C';
  ctx.font = '900 110px "Plus Jakarta Sans", monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(label, 128, 134);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

// Keep alias for compatibility
export const createCheckerTexture = createWarmPlaygroundGroundTexture;
