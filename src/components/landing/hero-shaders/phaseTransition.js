function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) {
    return value < edge0 ? 0 : 1;
  }

  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function mixColor(from, to, amount) {
  return {
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  };
}

function rgba(color, alpha) {
  return `rgba(${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}, ${clamp(alpha, 0, 1).toFixed(3)})`;
}

function createNoiseSampler() {
  const permutation = new Uint8Array(512);
  const gradients = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
    [-1, -1],
  ];

  const base = new Uint8Array(256);
  for (let index = 0; index < 256; index += 1) {
    base[index] = index;
  }

  for (let index = 255; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    const temp = base[index];
    base[index] = base[swapIndex];
    base[swapIndex] = temp;
  }

  for (let index = 0; index < 512; index += 1) {
    permutation[index] = base[index & 255];
  }

  function noise2d(x, y) {
    const cellX = Math.floor(x) & 255;
    const cellY = Math.floor(y) & 255;
    const localX = x - Math.floor(x);
    const localY = y - Math.floor(y);
    const easeX = localX * localX * (3 - 2 * localX);
    const easeY = localY * localY * (3 - 2 * localY);

    const g00 = gradients[permutation[cellX + permutation[cellY]] & 7];
    const g10 = gradients[permutation[cellX + 1 + permutation[cellY]] & 7];
    const g01 = gradients[permutation[cellX + permutation[cellY + 1]] & 7];
    const g11 = gradients[permutation[cellX + 1 + permutation[cellY + 1]] & 7];

    const d00 = g00[0] * localX + g00[1] * localY;
    const d10 = g10[0] * (localX - 1) + g10[1] * localY;
    const d01 = g01[0] * localX + g01[1] * (localY - 1);
    const d11 = g11[0] * (localX - 1) + g11[1] * (localY - 1);

    const blendX0 = d00 + easeX * (d10 - d00);
    const blendX1 = d01 + easeX * (d11 - d01);
    return blendX0 + easeY * (blendX1 - blendX0);
  }

  function fbm(x, y, octaves = 3) {
    let value = 0;
    let amplitude = 0.5;
    let frequency = 1;

    for (let octave = 0; octave < octaves; octave += 1) {
      value += amplitude * noise2d(x * frequency, y * frequency);
      amplitude *= 0.5;
      frequency *= 2;
    }

    return value;
  }

  return { fbm };
}

function createGlowSprite(color) {
  const radius = 64;
  const spriteCanvas = document.createElement('canvas');
  spriteCanvas.width = radius * 2;
  spriteCanvas.height = radius * 2;

  const spriteContext = spriteCanvas.getContext('2d');
  if (!spriteContext) {
    throw new Error('Unable to create glow sprite context for phase transition shader.');
  }

  const gradient = spriteContext.createRadialGradient(radius, radius, 0, radius, radius, radius);
  gradient.addColorStop(0, rgba(color, 0.58));
  gradient.addColorStop(0.3, rgba(color, 0.22));
  gradient.addColorStop(0.72, rgba(color, 0.05));
  gradient.addColorStop(1, rgba(color, 0));

  spriteContext.fillStyle = gradient;
  spriteContext.beginPath();
  spriteContext.arc(radius, radius, radius, 0, Math.PI * 2);
  spriteContext.fill();

  return spriteCanvas;
}

function normalizePalette(palette) {
  return {
    background: palette.background,
    backgroundHighlight: palette.backgroundHighlight,
    backgroundDeep: palette.backgroundDeep,
    ordered: palette.ordered,
    orderedHighlight: palette.orderedHighlight,
    orderedGlow: palette.orderedGlow,
    chaotic: palette.chaotic,
    chaoticHighlight: palette.chaoticHighlight,
    chaoticGlow: palette.chaoticGlow,
    wave: palette.wave,
    line: palette.line,
    vignette: palette.vignette,
  };
}

function getEffectiveOptions(options, reducedMotion) {
  const particleDensity = clamp(Number(options.particleDensity ?? 2), 0.3, 2);
  const waveSpeed = clamp(Number(options.waveSpeed ?? 1.3), 0.1, 1.5);
  const pixelScale = clamp(Number(options.pixelScale ?? 1), 0.75, 1.25);
  const maxPixelRatio = clamp(Number(options.maxPixelRatio ?? 1), 1, 2);
  const activeFps = clamp(Number(options.activeFps ?? (reducedMotion ? 24 : 60)), 12, 60);
  const idleFps = clamp(Number(options.idleFps ?? (reducedMotion ? 12 : 30)), 8, activeFps);

  return {
    particleDensity: reducedMotion ? Math.max(0.5, particleDensity * 0.58) : particleDensity,
    waveSpeed: reducedMotion ? Math.max(0.18, waveSpeed * 0.3) : waveSpeed,
    pixelScale,
    maxPixelRatio,
    activeFps,
    idleFps,
    reducedMotion,
  };
}

const BASE_PARTICLE_COUNT = 2500;
const MAX_PARTICLE_COUNT = 5000;
const MAX_SPEED = 300;
const TURBULENCE_SCALE = 0.003;
const DAMPING = 3.5;
const SPRING_STRENGTH = 4;

const phaseTransitionShader = {
  id: 'phase-transition',
  create({ canvas, palette, options = {}, reducedMotion = false }) {
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) {
      throw new Error('Unable to create 2D context for phase transition shader.');
    }

    const trailCanvas = document.createElement('canvas');
    const trailContext = trailCanvas.getContext('2d', { alpha: true });
    if (!trailContext) {
      throw new Error('Unable to create trail context for phase transition shader.');
    }

    const { fbm } = createNoiseSampler();
    const config = getEffectiveOptions(options, reducedMotion);
    const theme = normalizePalette(palette);

    let glowOrdered = createGlowSprite(theme.orderedHighlight);
    let glowChaotic = createGlowSprite(theme.chaoticHighlight);
    let glowWave = createGlowSprite(theme.wave);

    let width = 1;
    let height = 1;
    let dpr = 1;
    let centerX = 0.5;
    let centerY = 0.5;

    let count = 0;
    let cols = 1;
    let rows = 1;
    let spacingX = 1;
    let spacingY = 1;

    let posX = new Float32Array(0);
    let posY = new Float32Array(0);
    let velX = new Float32Array(0);
    let velY = new Float32Array(0);
    let homeX = new Float32Array(0);
    let homeY = new Float32Array(0);
    let latticeCol = new Int32Array(0);
    let latticeRow = new Int32Array(0);

    let wavePos = 0.5;
    let waveDir = 1;
    let wavePhase = 0;
    let waveCycleTime = 0;
    let pointerBlend = 0;
    let pointerWavePos = 0.5;
    let pointerVerticalPos = 0.5;
    let frameId = 0;
    let lastTime = 0;
    let lastRenderTimestamp = 0;
    let pausedForDocument = document.hidden;
    let pausedForViewport = false;

    const pointer = {
      x: 0.5,
      y: 0.5,
      active: false,
    };

    function isPaused() {
      return pausedForDocument || pausedForViewport;
    }

    function resetTiming() {
      lastTime = 0;
      lastRenderTimestamp = 0;
    }

    function scheduleRender() {
      if (frameId || isPaused()) {
        return;
      }

      frameId = window.requestAnimationFrame(render);
    }

    function fillTrailBase() {
      trailContext.clearRect(0, 0, width, height);
      trailContext.fillStyle = rgba(theme.background, 1);
      trailContext.fillRect(0, 0, width, height);
    }

    function initParticles() {
      const area = width * height;
      const scaledCount = Math.round(BASE_PARTICLE_COUNT * config.particleDensity * Math.sqrt(area / (1920 * 1080)));
      count = Math.max(400, Math.min(scaledCount, MAX_PARTICLE_COUNT));

      const aspect = width / height;
      rows = Math.max(1, Math.round(Math.sqrt(count / aspect)));
      cols = Math.max(1, Math.round(rows * aspect));
      count = rows * cols;

      spacingX = width / (cols + 1);
      spacingY = height / (rows + 1);

      posX = new Float32Array(count);
      posY = new Float32Array(count);
      velX = new Float32Array(count);
      velY = new Float32Array(count);
      homeX = new Float32Array(count);
      homeY = new Float32Array(count);
      latticeCol = new Int32Array(count);
      latticeRow = new Int32Array(count);

      let index = 0;
      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const homePointX = (col + 1) * spacingX;
          const homePointY = (row + 1) * spacingY;

          homeX[index] = homePointX;
          homeY[index] = homePointY;
          posX[index] = homePointX + (Math.random() - 0.5) * spacingX * 0.3;
          posY[index] = homePointY + (Math.random() - 0.5) * spacingY * 0.3;
          velX[index] = 0;
          velY[index] = 0;
          latticeCol[index] = col;
          latticeRow[index] = row;
          index += 1;
        }
      }
    }

    function resize(nextWidth, nextHeight) {
      width = Math.max(1, Math.round(nextWidth));
      height = Math.max(1, Math.round(nextHeight));
      dpr = Math.min(window.devicePixelRatio || 1, config.maxPixelRatio) * config.pixelScale;

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);

      trailCanvas.width = Math.round(width * dpr);
      trailCanvas.height = Math.round(height * dpr);
      trailContext.setTransform(dpr, 0, 0, dpr, 0, 0);

      centerX = width / 2;
      centerY = height / 2;

      fillTrailBase();
      initParticles();
    }

    function setPointer(nextPointer) {
      pointer.x = clamp(nextPointer.x ?? pointer.x, 0, 1);
      pointer.y = clamp(nextPointer.y ?? pointer.y, 0, 1);
      pointer.active = Boolean(nextPointer.active);
    }

    function drawBaseLayer() {
      context.clearRect(0, 0, width, height);

      const verticalWash = context.createLinearGradient(0, 0, 0, height);
      verticalWash.addColorStop(0, rgba(theme.backgroundHighlight, 0.98));
      verticalWash.addColorStop(0.42, rgba(theme.background, 0.94));
      verticalWash.addColorStop(1, rgba(theme.backgroundDeep, 0.99));
      context.fillStyle = verticalWash;
      context.fillRect(0, 0, width, height);

      const orderedGlow = context.createRadialGradient(width * 0.18, height * 0.2, 0, width * 0.18, height * 0.2, Math.max(width, height) * 0.56);
      orderedGlow.addColorStop(0, rgba(theme.orderedGlow, 0.16));
      orderedGlow.addColorStop(1, rgba(theme.orderedGlow, 0));
      context.fillStyle = orderedGlow;
      context.fillRect(0, 0, width, height);

      const chaoticGlow = context.createRadialGradient(width * 0.84, height * 0.26, 0, width * 0.84, height * 0.26, Math.max(width, height) * 0.42);
      chaoticGlow.addColorStop(0, rgba(theme.chaoticGlow, 0.14));
      chaoticGlow.addColorStop(1, rgba(theme.chaoticGlow, 0));
      context.fillStyle = chaoticGlow;
      context.fillRect(0, 0, width, height);

      const focusX = width * pointerWavePos;
      const focusY = height * pointerVerticalPos;
      const pointerLight = context.createRadialGradient(focusX, focusY, 0, focusX, focusY, Math.max(width, height) * 0.22);
      pointerLight.addColorStop(0, rgba(theme.wave, 0.18 + pointerBlend * 0.08));
      pointerLight.addColorStop(0.32, rgba(theme.wave, 0.08 + pointerBlend * 0.04));
      pointerLight.addColorStop(1, rgba(theme.wave, 0));
      context.fillStyle = pointerLight;
      context.fillRect(0, 0, width, height);
    }

    function update(dt, time) {
      const cycleDuration = (width * 1.4) / (config.waveSpeed * 180);
      waveCycleTime += dt;

      const rawProgress = waveCycleTime / cycleDuration;
      const cycleIndex = Math.floor(rawProgress);
      const cycleProgress = rawProgress - cycleIndex;
      const easedProgress = cycleProgress * cycleProgress * (3 - 2 * cycleProgress);
      const baseWavePos = cycleIndex % 2 === 0 ? easedProgress : 1 - easedProgress;

      waveDir = cycleIndex % 2 === 0 ? 1 : -1;
      wavePhase = cycleIndex % 4 < 2 ? 0 : 1;

      pointerWavePos += (pointer.x - pointerWavePos) * Math.min(1, dt * 8);
      pointerVerticalPos += (pointer.y - pointerVerticalPos) * Math.min(1, dt * 6);
      pointerBlend += ((pointer.active ? 1 : 0) - pointerBlend) * Math.min(1, dt * 4.5);

      wavePos = baseWavePos * (1 - pointerBlend) + pointerWavePos * pointerBlend;

      const wavePositionX = wavePos * width;
      const transitionWidth = width * 0.12;
      const noiseTime = time * (config.reducedMotion ? 0.18 : 0.4);
      const swirlCenterX = width * (0.5 + (pointerWavePos - 0.5) * 0.16 * pointerBlend);
      const swirlCenterY = height * (0.5 + (pointerVerticalPos - 0.5) * 0.12 * pointerBlend);
      const kickMultiplier = config.reducedMotion ? 90 : 200;

      for (let index = 0; index < count; index += 1) {
        const particleX = posX[index];
        const particleY = posY[index];
        const distanceToWave = (particleX - wavePositionX) * waveDir;

        const phase = wavePhase === 0
          ? 1 - smoothstep(-transitionWidth, transitionWidth, distanceToWave)
          : smoothstep(-transitionWidth, transitionWidth, distanceToWave);

        let transitionEnergy = 1 - Math.abs(distanceToWave) / transitionWidth;
        transitionEnergy = Math.max(0, transitionEnergy);
        transitionEnergy *= transitionEnergy;

        const deltaX = homeX[index] - particleX;
        const deltaY = homeY[index] - particleY;
        const orderedForceX = deltaX * SPRING_STRENGTH - velX[index] * DAMPING;
        const orderedForceY = deltaY * SPRING_STRENGTH - velY[index] * DAMPING;

        const noiseX = particleX * TURBULENCE_SCALE;
        const noiseY = particleY * TURBULENCE_SCALE;
        const angle = fbm(noiseX + noiseTime, noiseY + noiseTime * 0.7, 3) * Math.PI * 4;
        let chaoticForceX = Math.cos(angle) * 120;
        let chaoticForceY = Math.sin(angle) * 120;

        const swirlAngle = Math.atan2(particleY - swirlCenterY, particleX - swirlCenterX);
        const swirlDistance = Math.hypot(particleX - swirlCenterX, particleY - swirlCenterY);
        const swirlStrength = 28 * Math.min(1, swirlDistance / (width * 0.3));
        chaoticForceX += Math.cos(swirlAngle + Math.PI * 0.5) * swirlStrength;
        chaoticForceY += Math.sin(swirlAngle + Math.PI * 0.5) * swirlStrength;
        chaoticForceX -= velX[index] * 1.2;
        chaoticForceY -= velY[index] * 1.2;

        let kickForceX = 0;
        let kickForceY = 0;
        if (transitionEnergy > 0.01) {
          const kickAngle = fbm(noiseX * 2 + noiseTime * 1.5, noiseY * 2 + 100, 2) * Math.PI * 2;
          const kickStrength = transitionEnergy * kickMultiplier;
          kickForceX = Math.cos(kickAngle) * kickStrength;
          kickForceY = Math.sin(kickAngle) * kickStrength;
        }

        const forceX = orderedForceX * (1 - phase) + chaoticForceX * phase + kickForceX;
        const forceY = orderedForceY * (1 - phase) + chaoticForceY * phase + kickForceY;

        velX[index] += forceX * dt;
        velY[index] += forceY * dt;

        const speed = Math.hypot(velX[index], velY[index]);
        if (speed > MAX_SPEED) {
          velX[index] = (velX[index] / speed) * MAX_SPEED;
          velY[index] = (velY[index] / speed) * MAX_SPEED;
        }

        posX[index] += velX[index] * dt;
        posY[index] += velY[index] * dt;

        const margin = 20;
        if (posX[index] < -margin) {
          posX[index] = -margin;
          velX[index] = Math.abs(velX[index]) * 0.5;
        }
        if (posX[index] > width + margin) {
          posX[index] = width + margin;
          velX[index] = -Math.abs(velX[index]) * 0.5;
        }
        if (posY[index] < -margin) {
          posY[index] = -margin;
          velY[index] = Math.abs(velY[index]) * 0.5;
        }
        if (posY[index] > height + margin) {
          posY[index] = height + margin;
          velY[index] = -Math.abs(velY[index]) * 0.5;
        }
      }
    }

    function render(timestamp) {
      frameId = 0;

      if (isPaused()) {
        return;
      }

      const frameInterval = 1000 / (pointer.active ? config.activeFps : config.idleFps);
      if (lastRenderTimestamp && timestamp - lastRenderTimestamp < frameInterval) {
        scheduleRender();
        return;
      }

      lastRenderTimestamp = timestamp;

      if (!lastTime) {
        lastTime = timestamp;
      }

      let dt = Math.min((timestamp - lastTime) / 1000, 0.033);
      lastTime = timestamp;

      if (config.reducedMotion) {
        dt *= 0.2;
      }

      const time = timestamp / 1000;
      update(dt, time);
      drawBaseLayer();

      trailContext.fillStyle = rgba(theme.background, config.reducedMotion ? 0.24 : 0.16);
      trailContext.fillRect(0, 0, width, height);

      const wavePositionX = wavePos * width;
      const transitionWidth = width * 0.12;
      const noiseTime = time * (config.reducedMotion ? 0.18 : 0.4);

      if (!config.reducedMotion) {
        const backgroundStep = 44;
        for (let stepX = 0; stepX < width; stepX += backgroundStep) {
          for (let stepY = 0; stepY < height; stepY += backgroundStep) {
            const distanceToWave = (stepX - wavePositionX) * waveDir;
            const backgroundPhase = wavePhase === 0
              ? 1 - smoothstep(-transitionWidth, transitionWidth, distanceToWave)
              : smoothstep(-transitionWidth, transitionWidth, distanceToWave);

            const noiseValue = fbm(stepX * 0.005 + noiseTime * 0.3, stepY * 0.005 + noiseTime * 0.2, 2);
            const alpha = (0.006 + Math.abs(noiseValue) * 0.022) * backgroundPhase;

            if (alpha < 0.0025) {
              continue;
            }

            trailContext.fillStyle = rgba(theme.chaoticGlow, alpha);
            trailContext.fillRect(stepX, stepY, backgroundStep, backgroundStep);
          }
        }
      }

      trailContext.lineWidth = 0.5;
      for (let index = 0; index < count; index += 1) {
        const distanceToWave = (posX[index] - wavePositionX) * waveDir;
        const phase = wavePhase === 0
          ? 1 - smoothstep(-transitionWidth, transitionWidth, distanceToWave)
          : smoothstep(-transitionWidth, transitionWidth, distanceToWave);

        if (phase > 0.5) {
          continue;
        }

        const orderedAmount = 1 - phase * 2;
        const lineAlpha = orderedAmount * (config.reducedMotion ? 0.06 : 0.09);
        if (lineAlpha < 0.004) {
          continue;
        }

        const col = latticeCol[index];
        const row = latticeRow[index];

        if (col < cols - 1) {
          const rightIndex = index + 1;
          const distance = Math.hypot(posX[rightIndex] - posX[index], posY[rightIndex] - posY[index]);
          if (distance < spacingX * 2) {
            const alpha = lineAlpha * (1 - distance / (spacingX * 2));
            trailContext.strokeStyle = rgba(theme.line, alpha);
            trailContext.beginPath();
            trailContext.moveTo(posX[index], posY[index]);
            trailContext.lineTo(posX[rightIndex], posY[rightIndex]);
            trailContext.stroke();
          }
        }

        if (row < rows - 1) {
          const bottomIndex = index + cols;
          const distance = Math.hypot(posX[bottomIndex] - posX[index], posY[bottomIndex] - posY[index]);
          if (distance < spacingY * 2) {
            const alpha = lineAlpha * (1 - distance / (spacingY * 2));
            trailContext.strokeStyle = rgba(theme.line, alpha);
            trailContext.beginPath();
            trailContext.moveTo(posX[index], posY[index]);
            trailContext.lineTo(posX[bottomIndex], posY[bottomIndex]);
            trailContext.stroke();
          }
        }
      }

      if (!config.reducedMotion) {
        const waveGlowWidth = transitionWidth * 2.4;
        const waveGradient = trailContext.createLinearGradient(wavePositionX - waveGlowWidth, 0, wavePositionX + waveGlowWidth, 0);
        waveGradient.addColorStop(0, rgba(theme.wave, 0));
        waveGradient.addColorStop(0.3, rgba(theme.wave, 0.025));
        waveGradient.addColorStop(0.5, rgba(theme.wave, 0.075));
        waveGradient.addColorStop(0.7, rgba(theme.wave, 0.025));
        waveGradient.addColorStop(1, rgba(theme.wave, 0));
        trailContext.fillStyle = waveGradient;
        trailContext.fillRect(wavePositionX - waveGlowWidth, 0, waveGlowWidth * 2, height);

        trailContext.strokeStyle = rgba(theme.wave, 0.18);
        trailContext.lineWidth = 1.4;
        trailContext.beginPath();
        for (let y = 0; y <= height; y += 8) {
          const wobble = fbm(y * 0.01 + time * 0.5, time * 0.3, 2) * 14;
          if (y === 0) {
            trailContext.moveTo(wavePositionX + wobble, y);
          } else {
            trailContext.lineTo(wavePositionX + wobble, y);
          }
        }
        trailContext.stroke();
      }

      for (let index = 0; index < count; index += 1) {
        const distanceToWave = (posX[index] - wavePositionX) * waveDir;
        const phase = wavePhase === 0
          ? 1 - smoothstep(-transitionWidth, transitionWidth, distanceToWave)
          : smoothstep(-transitionWidth, transitionWidth, distanceToWave);

        if (phase <= 0.3) {
          continue;
        }

        const speed = Math.hypot(velX[index], velY[index]);
        const alpha = phase * Math.min(1, speed / 100) * (config.reducedMotion ? 0.08 : 0.14);
        if (alpha < 0.004) {
          continue;
        }

        const trailColor = mixColor(theme.ordered, theme.chaotic, phase);
        trailContext.fillStyle = rgba(trailColor, alpha);
        trailContext.beginPath();
        trailContext.arc(posX[index], posY[index], 1.4, 0, Math.PI * 2);
        trailContext.fill();
      }

      context.drawImage(trailCanvas, 0, 0, trailCanvas.width, trailCanvas.height, 0, 0, width, height);

      for (let index = 0; index < count; index += 1) {
        const particleX = posX[index];
        const particleY = posY[index];
        const distanceToWave = (particleX - wavePositionX) * waveDir;
        const phase = wavePhase === 0
          ? 1 - smoothstep(-transitionWidth, transitionWidth, distanceToWave)
          : smoothstep(-transitionWidth, transitionWidth, distanceToWave);

        let transitionEnergy = 1 - Math.abs(distanceToWave) / transitionWidth;
        transitionEnergy = Math.max(0, transitionEnergy);
        transitionEnergy *= transitionEnergy;

        const speed = Math.hypot(velX[index], velY[index]);
        const energyBrightness = Math.min(1, speed / 150);
        const size = 1.05 + phase * 0.75 + transitionEnergy * 2.2;

        let color;
        if (transitionEnergy > 0.1) {
          color = mixColor(theme.wave, theme.backgroundHighlight, transitionEnergy * 0.45);
        } else if (phase < 0.5) {
          const settleDistance = Math.hypot(particleX - homeX[index], particleY - homeY[index]);
          const settledAmount = 1 - Math.min(1, settleDistance / spacingX);
          color = mixColor(theme.ordered, theme.orderedHighlight, settledAmount);
        } else {
          color = mixColor(theme.chaotic, theme.chaoticHighlight, energyBrightness);
        }

        const alpha = Math.min(1, 0.52 + transitionEnergy * 0.35 + energyBrightness * 0.12);

        if (transitionEnergy > 0.05 || (phase > 0.5 && speed > 50)) {
          const glowSize = size * 3.1;
          const glowAlpha = (transitionEnergy * 0.28 + energyBrightness * 0.08) * alpha;
          if (glowAlpha > 0.005) {
            const sprite = transitionEnergy > 0.1 ? glowWave : (phase < 0.5 ? glowOrdered : glowChaotic);
            context.globalAlpha = Math.min(glowAlpha, 0.78);
            context.drawImage(sprite, particleX - glowSize, particleY - glowSize, glowSize * 2, glowSize * 2);
            context.globalAlpha = 1;
          }
        }

        context.fillStyle = rgba(color, alpha);
        context.beginPath();
        context.arc(particleX, particleY, size, 0, Math.PI * 2);
        context.fill();

        if (transitionEnergy > 0.3) {
          context.fillStyle = rgba(theme.backgroundHighlight, transitionEnergy * 0.4);
          context.beginPath();
          context.arc(particleX, particleY, size * 0.38, 0, Math.PI * 2);
          context.fill();
        }
      }

      const maxDimension = Math.max(width, height);
      const vignette = context.createRadialGradient(centerX, centerY, maxDimension * 0.28, centerX, centerY, maxDimension * 0.85);
      vignette.addColorStop(0, rgba(theme.vignette, 0));
      vignette.addColorStop(1, rgba(theme.vignette, 0.22));
      context.fillStyle = vignette;
      context.fillRect(0, 0, width, height);

      scheduleRender();
    }

    function setPaused(nextPaused) {
      pausedForViewport = Boolean(nextPaused);
      if (isPaused()) {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        return;
      }

      resetTiming();
      scheduleRender();
    }

    function handleVisibilityChange() {
      pausedForDocument = document.hidden;
      if (isPaused()) {
        if (frameId) {
          window.cancelAnimationFrame(frameId);
          frameId = 0;
        }
        return;
      }

      resetTiming();
      scheduleRender();
    }

    document.addEventListener('visibilitychange', handleVisibilityChange);
    scheduleRender();

    return {
      resize,
      setPointer,
      setPaused,
      destroy() {
        window.cancelAnimationFrame(frameId);
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        glowOrdered = null;
        glowChaotic = null;
        glowWave = null;
      },
    };
  },
};

export default phaseTransitionShader;
