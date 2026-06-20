import { Dots } from './dots';
import { Circuits } from './circuits';
import { Things } from './things';

/**
 * Main renderer class that coordinates all animation elements
 */
export class Renderer {
  constructor(canvas, config) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.config = config;
    
    // Mouse interaction
    this.mousePosition = null;
    this.lastMousePosition = null;  // Track last position to detect movement
    this.isMouseOver = false;
    this.connectionsCreated = false; // Flag to track if connections exist
    
    // Initialize components
    this.initialize();
  }
  
  /**
   * Initialize all animation components
   */
  initialize() {
    // Create dots field
    this.dots = new Dots(
      this.width, 
      this.height, 
      this.config.dotSpacing, 
      this.config.dotColor,
      this.config.dotGhostColor
    );
    
    // Create moving things
    this.things = new Things(
      this.width, 
      this.height, 
      this.config
    );
    
    // Set dots ghost for masking
    this.things.setDotsGhost(this.dots.ghost());
    this.things.setLight(this.config.dotSpacing * 4);
    
    // Create circuits
    this.circuits = new Circuits(
      this.width, 
      this.height, 
      this.config.cellSize, 
      this.config.minLength, 
      this.config.maxLength,
      this.config.circuitColor,
      this.config.circuitNodeColor,
      this.things,
      this.config  // Pass the config object
    );
    
    // Initialize nearby circuits array
    this.nearbyCircuits = [];
    
    // Create static background
    this.staticBackground = this.createStaticBackground();
    
    // Draw static background to main canvas
    this.ctx.drawImage(this.staticBackground, 0, 0);
    
    // Create animation canvas
    this.animationCanvas = document.createElement('canvas');
    this.animationCanvas.width = this.width;
    this.animationCanvas.height = this.height;
    this.animationCtx = this.animationCanvas.getContext('2d');
  }
  
  /**
   * Create the static background with dots and circuits
   */
  createStaticBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = this.width;
    canvas.height = this.height;
    
    // Set background color
    ctx.fillStyle = this.config.backgroundColor;
    ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw dots and circuits
    ctx.drawImage(this.dots.canvas, 0, 0);
    ctx.drawImage(this.circuits.canvas, 0, 0);
    
    return canvas;
  }
  
  /**
   * Render a frame of the animation
   */
  render() {
    // Update particle positions
    this.things.update();
    
    // Find circuits near mouse if mouse interaction is enabled
    if (this.config.mouseInteraction && this.mousePosition && this.isMouseOver) {
      // Find nearby circuits
      const previousNearbyCount = this.nearbyCircuits ? this.nearbyCircuits.length : 0;
      const previousNearbyIds = this.nearbyCircuits.map(item => item.circuit.id);
      
      // Get all circuits within the radius
      this.nearbyCircuits = this.circuits.findCircuitsNearPoint(
        this.mousePosition.x,
        this.mousePosition.y,
        this.config.mouseRadius
      );
      
      // Get current circuit IDs
      const currentNearbyIds = this.nearbyCircuits.map(item => item.circuit.id);
      
      // Connect circuits if enabled
      if (this.config.connectCircuits && this.nearbyCircuits.length > 1) {
        // Check if the set of nearby circuits has changed
        const circuitsChanged = 
          previousNearbyCount !== this.nearbyCircuits.length ||
          !previousNearbyIds.every(id => currentNearbyIds.includes(id)) ||
          !currentNearbyIds.every(id => previousNearbyIds.includes(id));
        
        if (circuitsChanged) {
          // Disconnect previous connections that are no longer needed
          this.circuits.disconnectAllCircuits();
          
          // Connect the new set of circuits
          const connected = this.circuits.connectHighlightedCircuits();
          if (connected) {
            this.connectionsCreated = true;
            
            // Update particles to be aware of new topology
            this.updateParticlesForNewConnections();
          }
        }
      } else if (this.connectionsCreated && this.nearbyCircuits.length <= 1) {
        // Not enough circuits to connect, disconnect all
        this.circuits.disconnectAllCircuits();
        this.connectionsCreated = false;
      }
    } else if (this.isMouseOver === false && this.connectionsCreated) {
      this.nearbyCircuits = [];
      
      // Disconnect circuits when mouse is away
      this.circuits.disconnectAllCircuits();
      this.connectionsCreated = false;
    }
    
    // Clear animation canvas
    this.animationCtx.clearRect(0, 0, this.width, this.height);
    
    // Draw particles
    if (this.config.lightEffects) {
      this.things.draw();
      this.animationCtx.drawImage(this.things.canvas, 0, 0);
    } else {
      // Simplified rendering without glow effects
      this.things.drawSimple(this.animationCtx);
    }
    
    // Redraw static background on main canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.drawImage(this.staticBackground, 0, 0);
    
    // Draw highlighted circuits if any
    if (this.nearbyCircuits && this.nearbyCircuits.length > 0) {
      this.drawHighlightedCircuits();
    }
    
    // Draw circuit connections
    if (this.connectionsCreated) {
      // Draw connections directly
      this.circuits.drawConnections(this.ctx);
    }
    
    // Draw animation on top
    this.ctx.save();
    this.ctx.globalCompositeOperation = 'lighter';
    this.ctx.drawImage(this.animationCanvas, 0, 0);
    this.ctx.restore();

    
    // Draw mouse radius indicator if enabled
    if (this.config.mouseInteraction && this.config.showMouseRadius && this.mousePosition) {
      this.drawMouseRadiusIndicator();
    }
    
    // Visualize active particle transitions if debug mode enabled
    if (this.config.debugMode && this.connectionsCreated) {
      this.visualizeParticleTransitions();
    }
  }
  
  /**
   * Update particles when new connections are made
   */
  updateParticlesForNewConnections() {
    // Add some extra particles to connections for better visual effect
    if (this.config.enhanceConnections) {
      this.enhanceConnectedCircuitsWithParticles();
    }
  }
  
  /**
   * Add extra particles to connected circuits for better visual interest
   */
  enhanceConnectedCircuitsWithParticles() {
    // Get all connected circuits
    const connectedCircuits = this.circuits.collection.filter(circuit => circuit.isConnected);
    
    if (connectedCircuits.length < 2) return;
    
    // For each connected circuit, check if it needs more particles
    connectedCircuits.forEach(circuit => {
      // Add 1-2 more particles if the circuit is longer
      if (circuit.path.length > 8 && circuit.things.length < 3) {
        // Create a particle at a random position in the circuit
        const randomPosition = Math.random() * circuit.length;
        const speed = (Math.random() * 0.5 + 0.5) * this.config.particleSpeed;
        const direction = Math.random() > 0.5 ? 1 : -1;
        
        // Add the particle
        this.things.create(circuit, speed * direction, randomPosition);
      }
    });
  }
  
  /**
   * Visualize particle transitions for debugging
   */
  visualizeParticleTransitions() {
    const ctx = this.ctx;
    
    ctx.save();
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    
    this.things.collection.forEach(thing => {
      if (thing.transitioning && thing.nextCircuit) {
        // Draw path from start to end
        ctx.beginPath();
        ctx.moveTo(thing.startX, thing.startY);
        ctx.lineTo(thing.targetX, thing.targetY);
        ctx.stroke();
        
        // Draw transition progress
        ctx.fillStyle = '#FFFF00';
        ctx.beginPath();
        ctx.arc(thing.x, thing.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });
    
    ctx.restore();
  }
  
  /**
   * Handle window resize
   */
  resize(width, height) {
    this.width = width;
    this.height = height;
    
    // Clear any existing connections before reinitializing
    if (this.connectionsCreated) {
      this.circuits.disconnectAllCircuits();
      this.connectionsCreated = false;
    }
    
    // Reinitialize with new dimensions
    this.initialize();
  }
  
  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    // Store old config to check what changed
    const oldConfig = { ...this.config };
    this.config = newConfig;
    
    // Check what needs to be updated
    const needsReinitialize = (
      oldConfig.dotSpacing !== newConfig.dotSpacing ||
      oldConfig.cellSize !== newConfig.cellSize ||
      oldConfig.minLength !== newConfig.minLength ||
      oldConfig.maxLength !== newConfig.maxLength ||
      oldConfig.dotColor !== newConfig.dotColor ||
      oldConfig.dotGhostColor !== newConfig.dotGhostColor ||
      oldConfig.circuitColor !== newConfig.circuitColor ||
      oldConfig.circuitNodeColor !== newConfig.circuitNodeColor ||
      oldConfig.backgroundColor !== newConfig.backgroundColor
    );
    
    if (needsReinitialize) {
      // Full reinitialize required
      this.initialize();
    } else {
      // Just update things that can change dynamically
      this.things.updateConfig(newConfig);
    }
  }
  
  /**
   * Reset the animation
   */
  reset() {
    this.initialize();
  }
  
  /**
   * Draw highlighted circuits
   */
  drawHighlightedCircuits() {
    if (!this.nearbyCircuits || this.nearbyCircuits.length === 0) return;
    
    const ctx = this.ctx;
    const size = this.circuits.size;
    
    // Set highlighting style
    ctx.save();
    ctx.strokeStyle = this.config.circuitColor;
    ctx.lineWidth = Math.round(size / 8);
    ctx.globalAlpha = 0.8;
    
    // Draw each highlighted circuit
    this.nearbyCircuits.forEach(({ circuit }) => {
      let point = [circuit.start[0], circuit.start[1]];
      let path = circuit.path;
      
      ctx.beginPath();
      ctx.moveTo(
        point[0] * size + size / 2 + path[0][0] * size / 4, 
        point[1] * size + size / 2 + path[0][1] * size / 4
      );
      
      path.forEach((dir, index) => {
        point[0] += dir[0];
        point[1] += dir[1];
        
        if (index === path.length - 1) {
          ctx.lineTo(
            point[0] * size + size / 2 - dir[0] * size / 4, 
            point[1] * size + size / 2 - dir[1] * size / 4
          );
        } else {
          ctx.lineTo(
            point[0] * size + size / 2, 
            point[1] * size + size / 2
          );
        }
      });
      
      ctx.stroke();
      
      // Highlight nodes with glowing effect
      ctx.fillStyle = this.config.glowColor;
      ctx.globalAlpha = 0.7;
      
      // Start node
      ctx.beginPath();
      ctx.arc(
        circuit.start[0] * size + size / 2, 
        circuit.start[1] * size + size / 2, 
        size / 3, 0, 2 * Math.PI, false
      );
      ctx.fill();
      
      // End node
      ctx.beginPath();
      ctx.arc(
        circuit.end[0] * size + size / 2, 
        circuit.end[1] * size + size / 2, 
        size / 3, 0, 2 * Math.PI, false
      );
      ctx.fill();
    });
    
    ctx.restore();
  }
  
  /**
   * Update mouse position
   */
  updateMousePosition(x, y) {
    // Store the new mouse position
    this.mousePosition = { x, y };
    this.lastMousePosition = { ...this.mousePosition };
    this.isMouseOver = true;
  }
  
  /**
   * Clear mouse position when mouse leaves canvas
   */
  clearMousePosition() {
    this.isMouseOver = false;
    this.nearbyCircuits = [];
    this.lastMousePosition = null;
    
    // Reset all circuit highlights
    if (this.circuits && this.circuits.collection) {
      this.circuits.collection.forEach(circuit => {
        circuit.isHighlighted = false;
      });
    }
    
    // Disconnect all circuits when mouse leaves canvas
    if (this.config && this.config.connectCircuits && this.circuits) {
      this.circuits.disconnectAllCircuits();
    }
  }
  
  /**
   * Draw visual indicator for mouse interaction radius
   */
  drawMouseRadiusIndicator() {
    if (!this.mousePosition) return;
    
    const ctx = this.ctx;
    const x = this.mousePosition.x;
    const y = this.mousePosition.y;
    const radius = this.config.mouseRadius;
    
    // Draw circle with color matching the current color scheme
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = this.config.circuitColor;
    ctx.lineWidth = 1;
    ctx.globalAlpha = 0.4;
    ctx.stroke();
    
    // Add subtle glow effect
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = this.config.circuitColor;
    ctx.globalAlpha = 0.6;
    ctx.fill();
    
    ctx.restore();
  }
}