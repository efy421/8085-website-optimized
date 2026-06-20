import React, { useEffect, useRef } from 'react';
import { getHeroShader } from './hero-shaders';

const FALLBACK_COLORS = {
  background: { r: 243, g: 239, b: 230 },
  surface: { r: 251, g: 247, b: 239 },
  ink: { r: 16, g: 19, b: 18 },
  signal: { r: 22, g: 115, b: 106 },
  ember: { r: 195, g: 100, b: 43 },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function mixColor(from, to, amount) {
  return {
    r: from.r + (to.r - from.r) * amount,
    g: from.g + (to.g - from.g) * amount,
    b: from.b + (to.b - from.b) * amount,
  };
}

function parseCssColor(value) {
  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.startsWith('#')) {
    const hex = trimmed.slice(1);
    if (hex.length === 3) {
      return {
        r: Number.parseInt(`${hex[0]}${hex[0]}`, 16),
        g: Number.parseInt(`${hex[1]}${hex[1]}`, 16),
        b: Number.parseInt(`${hex[2]}${hex[2]}`, 16),
      };
    }

    if (hex.length === 6) {
      return {
        r: Number.parseInt(hex.slice(0, 2), 16),
        g: Number.parseInt(hex.slice(2, 4), 16),
        b: Number.parseInt(hex.slice(4, 6), 16),
      };
    }
  }

  const rgbMatch = trimmed.match(/rgba?\(([^)]+)\)/i);
  if (!rgbMatch) {
    return null;
  }

  const channels = rgbMatch[1]
    .split(',')
    .slice(0, 3)
    .map((channel) => Number.parseFloat(channel.trim()));

  if (channels.some((channel) => Number.isNaN(channel))) {
    return null;
  }

  return {
    r: clamp(channels[0], 0, 255),
    g: clamp(channels[1], 0, 255),
    b: clamp(channels[2], 0, 255),
  };
}

function resolveHeroShaderPalette(element) {
  const styles = window.getComputedStyle(element);
  const background = parseCssColor(styles.getPropertyValue('--color-bg')) ?? FALLBACK_COLORS.background;
  const surface = parseCssColor(styles.getPropertyValue('--color-surface')) ?? FALLBACK_COLORS.surface;
  const ink = parseCssColor(styles.getPropertyValue('--color-ink')) ?? FALLBACK_COLORS.ink;
  const signal = parseCssColor(styles.getPropertyValue('--color-signal')) ?? FALLBACK_COLORS.signal;
  const ember = parseCssColor(styles.getPropertyValue('--color-ember')) ?? FALLBACK_COLORS.ember;

  return {
    background,
    backgroundHighlight: mixColor(background, surface, 0.72),
    backgroundDeep: mixColor(background, ink, 0.08),
    ordered: mixColor(signal, background, 0.38),
    orderedHighlight: mixColor(signal, surface, 0.72),
    orderedGlow: mixColor(signal, surface, 0.5),
    chaotic: mixColor(ember, background, 0.26),
    chaoticHighlight: mixColor(ember, surface, 0.64),
    chaoticGlow: mixColor(ember, surface, 0.38),
    wave: mixColor(surface, signal, 0.18),
    line: mixColor(ink, signal, 0.26),
    vignette: mixColor(background, ink, 0.24),
  };
}

function HeroShaderCanvas({ className = '', hostRef, shaderId, options, reducedMotion = false }) {
  const shellRef = useRef(null);
  const canvasRef = useRef(null);
  const optionsSignature = JSON.stringify(options ?? {});

  useEffect(() => {
    const shellElement = shellRef.current;
    const canvasElement = canvasRef.current;
    const hostElement = hostRef.current;

    if (!shellElement || !canvasElement || !hostElement) {
      return undefined;
    }

    const shader = getHeroShader(shaderId);
    const controller = shader.create({
      canvas: canvasElement,
      palette: resolveHeroShaderPalette(hostElement),
      options,
      reducedMotion,
    });

    const resize = () => {
      const bounds = shellElement.getBoundingClientRect();
      controller.resize(bounds.width, bounds.height);
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(shellElement);

    let intersectionObserver = null;
    if (typeof window.IntersectionObserver === 'function' && typeof controller.setPaused === 'function') {
      intersectionObserver = new window.IntersectionObserver(
        ([entry]) => {
          controller.setPaused(!entry?.isIntersecting);
        },
        { threshold: 0.01 },
      );
      intersectionObserver.observe(hostElement);
    } else if (typeof controller.setPaused === 'function') {
      controller.setPaused(false);
    }

    let detachPointerHandlers = () => {};

    if (!reducedMotion) {
      const updatePointer = (event) => {
        const bounds = shellElement.getBoundingClientRect();
        const x = clamp((event.clientX - bounds.left) / bounds.width, 0, 1);
        const y = clamp((event.clientY - bounds.top) / bounds.height, 0, 1);
        controller.setPointer({ x, y, active: true });
      };

      const resetPointer = () => {
        controller.setPointer({ x: 0.5, y: 0.5, active: false });
      };

      hostElement.addEventListener('pointermove', updatePointer);
      hostElement.addEventListener('pointerenter', updatePointer);
      hostElement.addEventListener('pointerleave', resetPointer);
      hostElement.addEventListener('pointercancel', resetPointer);

      detachPointerHandlers = () => {
        hostElement.removeEventListener('pointermove', updatePointer);
        hostElement.removeEventListener('pointerenter', updatePointer);
        hostElement.removeEventListener('pointerleave', resetPointer);
        hostElement.removeEventListener('pointercancel', resetPointer);
      };
    } else {
      controller.setPointer({ x: 0.5, y: 0.5, active: false });
    }

    return () => {
      detachPointerHandlers();
      intersectionObserver?.disconnect();
      resizeObserver.disconnect();
      controller.destroy();
    };
  }, [hostRef, optionsSignature, reducedMotion, shaderId, options]);

  return (
    <div className={`landing-hero-shader ${className}`.trim()} ref={shellRef} aria-hidden="true">
      <canvas className="landing-hero-shader__canvas" ref={canvasRef} />
    </div>
  );
}

export default HeroShaderCanvas;
