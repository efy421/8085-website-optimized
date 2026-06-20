import React, { useRef } from 'react';
import { act, render } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import HeroShaderCanvas from '../HeroShaderCanvas';

const { controller, createMock, getHeroShaderMock } = vi.hoisted(() => {
  const controller = {
    resize: vi.fn(),
    setPointer: vi.fn(),
    setPaused: vi.fn(),
    destroy: vi.fn(),
  };

  return {
    controller,
    createMock: vi.fn(() => controller),
    getHeroShaderMock: vi.fn(() => ({ create: createMock })),
  };
});

vi.mock('../hero-shaders', () => ({
  getHeroShader: getHeroShaderMock,
}));

function TestHarness() {
  const hostRef = useRef(null);

  return (
    <div ref={hostRef}>
      <HeroShaderCanvas hostRef={hostRef} shaderId="phase-transition" options={{}} />
    </div>
  );
}

describe('HeroShaderCanvas', () => {
  let resizeObserverInstance;
  let intersectionObserverInstance;
  let intersectionCallback;

  beforeEach(() => {
    controller.resize.mockClear();
    controller.setPointer.mockClear();
    controller.setPaused.mockClear();
    controller.destroy.mockClear();
    createMock.mockClear();
    getHeroShaderMock.mockClear();

    class ResizeObserverMock {
      constructor() {
        this.observe = vi.fn();
        this.disconnect = vi.fn();
        resizeObserverInstance = this;
      }
    }

    class IntersectionObserverMock {
      constructor(callback) {
        intersectionCallback = callback;
        this.observe = vi.fn();
        this.disconnect = vi.fn();
        intersectionObserverInstance = this;
      }
    }

    window.ResizeObserver = ResizeObserverMock;
    window.IntersectionObserver = IntersectionObserverMock;
  });

  it('pauses the shader when the hero leaves the viewport and resumes it when visible again', () => {
    const { unmount } = render(<TestHarness />);

    expect(getHeroShaderMock).toHaveBeenCalledWith('phase-transition');
    expect(createMock).toHaveBeenCalledTimes(1);
    expect(controller.resize).toHaveBeenCalledTimes(1);
    expect(resizeObserverInstance.observe).toHaveBeenCalledTimes(1);
    expect(intersectionObserverInstance.observe).toHaveBeenCalledTimes(1);

    act(() => {
      intersectionCallback([{ isIntersecting: false }]);
    });

    expect(controller.setPaused).toHaveBeenCalledWith(true);

    act(() => {
      intersectionCallback([{ isIntersecting: true }]);
    });

    expect(controller.setPaused).toHaveBeenCalledWith(false);

    unmount();

    expect(intersectionObserverInstance.disconnect).toHaveBeenCalledTimes(1);
    expect(resizeObserverInstance.disconnect).toHaveBeenCalledTimes(1);
    expect(controller.destroy).toHaveBeenCalledTimes(1);
  });
});
