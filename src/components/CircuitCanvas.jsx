import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useConfig } from '../lib/config.jsx';
import ColorSettings from './ColorSettings';

const CircuitCanvas = () => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const { config, updateConfig } = useConfig();
  const [showControls, setShowControls] = useState(false);

  // State for circuits, dots, and things
  const [renderer, setRenderer] = useState(null);

  // State for mouse position
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOver, setIsMouseOver] = useState(false);

  // Throttling state
  const lastUpdateTimeRef = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize the animation
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create the animation renderer
    import('../lib/animation/renderer').then(({ Renderer }) => {
      const newRenderer = new Renderer(canvas, config);
      setRenderer(newRenderer);

      // Start animation loop
      const animate = () => {
        newRenderer.render();
        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    });

    // Mouse event handlers
    const handleMouseMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Throttle updates to avoid performance issues
      const now = Date.now();
      if (now - lastUpdateTimeRef.current > 16) { // ~60fps
        setMousePosition({ x, y });
        lastUpdateTimeRef.current = now;
      }
    };

    const handleMouseEnter = (event) => {
      setIsMouseOver(true);
      // Immediately update position when mouse enters to avoid position mismatch
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseLeave = () => {
      setIsMouseOver(false);
    };

    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseenter', handleMouseEnter);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Handle window resize
    const handleResize = () => {
      if (renderer) {
        const prevWidth = canvas.width;
        const prevHeight = canvas.height;
        
        // Update canvas dimensions
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        // Update renderer
        renderer.resize(window.innerWidth, window.innerHeight);
        
        // Recalculate mouse position after resize if mouse is over canvas
        if (isMouseOver && mousePosition) {
          // Get the scale factors if the canvas was resized
          const scaleX = canvas.width / prevWidth;
          const scaleY = canvas.height / prevHeight;
          
          // Calculate new position based on scaling
          const newX = mousePosition.x * scaleX;
          const newY = mousePosition.y * scaleY;
          
          // Update mouse position state
          setMousePosition({
            x: Math.min(Math.max(0, newX), canvas.width),
            y: Math.min(Math.max(0, newY), canvas.height)
          });
        }
      }
    };
    
    // Handle window focus to reacquire correct mouse position
    const handleWindowFocus = () => {
      if (isMouseOver) {
        // Force mouse position update on next mouse move
        lastUpdateTimeRef.current = 0;
      }
    };
    
    // Handle visibility change (tab switch)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && isMouseOver) {
        // When tab becomes visible again, reset mouse tracking
        lastUpdateTimeRef.current = 0;
        
        // Update mouse position in renderer without disrupting connections
        if (renderer && mousePosition) {
          // Just update the position without clearing connections
          renderer.updateMousePosition(mousePosition.x, mousePosition.y);
        }
      }
    };

    // Handle mouse movement in document to keep track of position even outside canvas
    const handleDocumentMouseMove = (event) => {
      // Only process if mouse is over canvas to avoid conflicts
      if (!isMouseOver) return;
      
      const rect = canvas.getBoundingClientRect();
      if (
        event.clientX >= rect.left && 
        event.clientX <= rect.right && 
        event.clientY >= rect.top && 
        event.clientY <= rect.bottom
      ) {
        // Mouse is over the canvas, update position if significantly changed
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // Only update if position has changed significantly to avoid unnecessary renders
        if (
          !mousePosition || 
          Math.abs(mousePosition.x - x) > 5 || 
          Math.abs(mousePosition.y - y) > 5
        ) {
          setMousePosition({ x, y });
          lastUpdateTimeRef.current = Date.now();
        }
      }
    };
    
    document.addEventListener('mousemove', handleDocumentMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseenter', handleMouseEnter);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Apply config changes
  useEffect(() => {
    if (renderer) {
      renderer.updateConfig(config);
    }
  }, [config, renderer]);

  // Update mouse position in renderer
  useEffect(() => {
    if (renderer && isMouseOver && config.mouseInteraction) {
      // Ensure mouse position is correctly set in renderer
      renderer.updateMousePosition(mousePosition.x, mousePosition.y);
    } else if (renderer && !isMouseOver && config.mouseInteraction) {
      renderer.clearMousePosition();
    }
  }, [mousePosition, isMouseOver, renderer, config.mouseInteraction]);

  // Force immediate mouse position update when renderer changes
  useEffect(() => {
    if (renderer && isMouseOver && config.mouseInteraction && mousePosition) {
      // When renderer is first created or changed, immediately update with current position
      renderer.updateMousePosition(mousePosition.x, mousePosition.y);
    }
  }, [renderer]);

  return (
    <div className="w-full h-full" style={{ backgroundColor: '#f5f4ed' }}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ backgroundColor: 'transparent' }}
      />

      {/* Control panel toggle button - Development only */}
      {import.meta.env.MODE === 'development' && (
        <Button
          className="fixed bottom-4 right-4 z-20"
          style={{ pointerEvents: 'auto' }}
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? 'Hide Controls' : 'Show Controls'}
        </Button>
      )}

      {/* Control panel */}
      {showControls && (
        <div className="fixed bottom-16 right-4 w-72 z-20" style={{ pointerEvents: 'auto' }}>
          {/* Color Settings Panel */}
          <ColorSettings />
          
          {/* Main Settings Panel */}
          <Card className="bg-black/80 text-white border-gray-700">
            <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Animation Settings</h3>

            {/* Color Scheme */}
            <div className="mb-4">
              <Label htmlFor="colorScheme" className="block mb-2">Color Scheme</Label>
              <Select
                value={config.colorScheme}
                onValueChange={(value) => updateConfig({ colorScheme: value })}
              >
                <SelectTrigger id="colorScheme" className="w-full bg-gray-900 border-gray-700">
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem value="teal">Teal</SelectItem>
                  <SelectItem value="purple">Purple</SelectItem>
                  <SelectItem value="blue">Blue</SelectItem>
                  <SelectItem value="green">Green</SelectItem>
                  <SelectItem value="orange">Orange</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dot Spacing */}
            <div className="mb-4">
              <Label htmlFor="dotSpacing" className="block mb-2">
                Dot Spacing: {config.dotSpacing}px
              </Label>
              <Slider
                id="dotSpacing"
                min={1}
                max={5}
                step={1}
                value={[config.dotSpacing]}
                onValueChange={([value]) => updateConfig({ dotSpacing: value })}
                className="w-full"
              />
            </div>

            {/* Circuit Density */}
            <div className="mb-4">
              <Label htmlFor="cellSize" className="block mb-2">
                Circuit Size: {config.cellSize}px
              </Label>
              <Slider
                id="cellSize"
                min={5}
                max={20}
                step={1}
                value={[config.cellSize]}
                onValueChange={([value]) => updateConfig({ cellSize: value })}
                className="w-full"
              />
            </div>

            {/* Particle Speed */}
            <div className="mb-4">
              <Label htmlFor="particleSpeed" className="block mb-2">
                Particle Speed: {config.particleSpeed.toFixed(1)}
              </Label>
              <Slider
                id="particleSpeed"
                min={0.5}
                max={2}
                step={0.1}
                value={[config.particleSpeed]}
                onValueChange={([value]) => updateConfig({ particleSpeed: value })}
                className="w-full"
              />
            </div>

            {/* Light Effects */}
            <div className="flex items-center mb-4">
              <Switch
                id="lightEffects"
                checked={config.lightEffects}
                onCheckedChange={(checked) => updateConfig({ lightEffects: checked })}
              />
              <Label htmlFor="lightEffects" className="ml-2">Light Effects</Label>
            </div>

            {/* Mouse Interaction */}
            <div className="flex items-center mb-4">
              <Switch
                id="mouseInteraction"
                checked={config.mouseInteraction}
                onCheckedChange={(checked) => updateConfig({ mouseInteraction: checked })}
              />
              <Label htmlFor="mouseInteraction" className="ml-2">Mouse Interaction</Label>
            </div>

            {/* Circuit Connection */}
            {config.mouseInteraction && (
              <>
                <div className="flex items-center mb-4">
                  <Switch
                    id="connectCircuits"
                    checked={config.connectCircuits}
                    onCheckedChange={(checked) => updateConfig({ connectCircuits: checked })}
                  />
                  <Label htmlFor="connectCircuits" className="ml-2">Connect Circuits</Label>
                </div>

                {/* Connection settings only shown if connections are enabled */}
                {config.connectCircuits && (
                  <>
                    <div className="mb-4">
                      <Label htmlFor="connectionThickness" className="block mb-2">
                        Connection Thickness: {config.connectionThickness}
                      </Label>
                      <Slider
                        id="connectionThickness"
                        min={1}
                        max={5}
                        step={1}
                        value={[config.connectionThickness]}
                        onValueChange={([value]) => updateConfig({ connectionThickness: value })}
                        className="w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="connectionOpacity" className="block mb-2">
                        Connection Opacity: {config.connectionOpacity.toFixed(1)}
                      </Label>
                      <Slider
                        id="connectionOpacity"
                        min={0.1}
                        max={1.0}
                        step={0.1}
                        value={[config.connectionOpacity]}
                        onValueChange={([value]) => updateConfig({ connectionOpacity: value })}
                        className="w-full"
                      />
                    </div>

                    <div className="mb-4">
                      <Label htmlFor="tempConnectionColor" className="block mb-2">Connection Color</Label>
                      <div className="flex items-center">
                        <input
                          type="color"
                          id="tempConnectionColor"
                          value={config.tempConnectionColor}
                          onChange={(e) => updateConfig({ tempConnectionColor: e.target.value })}
                          className="w-10 h-10 p-0 border-0 rounded-md mr-2"
                        />
                        <span className="text-sm">{config.tempConnectionColor}</span>
                      </div>
                    </div>

                    {/* Particle Path Recalculation */}
                    <div className="flex items-center mb-4">
                      <Switch
                        id="enableParticleTransitions"
                        checked={config.enableParticleTransitions}
                        onCheckedChange={(checked) => updateConfig({ enableParticleTransitions: checked })}
                      />
                      <Label htmlFor="enableParticleTransitions" className="ml-2">Particle Transitions</Label>
                    </div>

                    {config.enableParticleTransitions && (
                      <>
                        <div className="mb-4">
                          <Label htmlFor="transitionSpeed" className="block mb-2">
                            Transition Speed: {config.transitionSpeed.toFixed(1)}
                          </Label>
                          <Slider
                            id="transitionSpeed"
                            min={0.5}
                            max={2.0}
                            step={0.1}
                            value={[config.transitionSpeed]}
                            onValueChange={([value]) => updateConfig({ transitionSpeed: value })}
                            className="w-full"
                          />
                        </div>

                        <div className="mb-4">
                          <Label htmlFor="transitionEffect" className="block mb-2">Transition Effect</Label>
                          <Select
                            value={config.transitionEffect}
                            onValueChange={(value) => updateConfig({ transitionEffect: value })}
                          >
                            <SelectTrigger id="transitionEffect" className="w-full bg-gray-900 border-gray-700">
                              <SelectValue placeholder="Select transition effect" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-900 border-gray-700">
                              <SelectItem value="line">Straight Line</SelectItem>
                              <SelectItem value="arc">Arc</SelectItem>
                              <SelectItem value="bounce">Bounce</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center mb-4">
                          <Switch
                            id="enhanceConnections"
                            checked={config.enhanceConnections}
                            onCheckedChange={(checked) => updateConfig({ enhanceConnections: checked })}
                          />
                          <Label htmlFor="enhanceConnections" className="ml-2">Add Particles to Connections</Label>
                        </div>
                      </>
                    )}

                    {/* Debug Mode */}
                    <div className="flex items-center mb-4">
                      <Switch
                        id="debugMode"
                        checked={config.debugMode}
                        onCheckedChange={(checked) => updateConfig({ debugMode: checked })}
                      />
                      <Label htmlFor="debugMode" className="ml-2">Debug Mode</Label>
                    </div>
                  </>
                )}
              </>
            )}

            {/* Mouse Radius */}
            {config.mouseInteraction && (
              <>
                <div className="mb-4">
                  <Label htmlFor="mouseRadius" className="block mb-2">
                    Mouse Radius: {config.mouseRadius}px
                  </Label>
                  <Slider
                    id="mouseRadius"
                    min={20}
                    max={100}
                    step={5}
                    value={[config.mouseRadius]}
                    onValueChange={([value]) => updateConfig({ mouseRadius: value })}
                    className="w-full"
                  />
                </div>

                {/* Show Mouse Radius Indicator */}
                <div className="flex items-center mb-4">
                  <Switch
                    id="showMouseRadius"
                    checked={config.showMouseRadius}
                    onCheckedChange={(checked) => updateConfig({ showMouseRadius: checked })}
                  />
                  <Label htmlFor="showMouseRadius" className="ml-2">Show Mouse Radius</Label>
                </div>
              </>
            )}

            {/* Reset Button */}
            <Button
              className="w-full mt-2 bg-gray-800 hover:bg-gray-700"
              onClick={() => {
                if (renderer) {
                  renderer.reset();
                }
              }}
            >
              Reset Animation
            </Button>
          </CardContent>
        </Card>
      </div>
    )}
    </div>
  );
};

export default CircuitCanvas;
