import { Thing } from './utils';

/**
 * Things class - Manages the moving particles on the circuits
 */
export class Things {
  constructor(width, height, config) {
    this.width = width;
    this.height = height;
    this.config = config;
    
    // Create canvas for rendering
    this.canvas = document.createElement('canvas');
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx = this.canvas.getContext('2d');
    
    // Collection of moving things
    this.collection = [];
  }
  
  /**
   * Create a new moving thing
   */
  create(circuit, velocity, done = 0) {
    // Apply speed multiplier from config
    velocity *= this.config.particleSpeed;
    
    const thing = new Thing(circuit, velocity, done);
    this.collection.push(thing);
    return thing;
  }
  
  /**
   * Update all things' positions
   */
  update() {
    // Debug counter to count actual position changes
    let updatedCount = 0;
    let transitionCount = 0;
    let beforePos = [];
    let afterPos = [];
    
    // Sample first 3 particles for debug
    if (this.collection.length > 0) {
      const sampleSize = Math.min(3, this.collection.length);
      for (let i = 0; i < sampleSize; i++) {
        beforePos.push({
          x: this.collection[i].x,
          y: this.collection[i].y,
          done: this.collection[i].done,
          velocity: this.collection[i].velocity,
          transitioning: this.collection[i].transitioning,
          circuit: this.collection[i].circuit?.id || 'none'
        });
      }
    }
    
    this.collection.forEach(thing => {
      const oldX = thing.x;
      const oldY = thing.y;
      const wasTransitioning = thing.transitioning;
      
      // Update the particle
      thing.update();
      
      // Count particles that actually moved
      if (oldX !== thing.x || oldY !== thing.y) {
        updatedCount++;
      }
      
      // Count particles that are transitioning between circuits
      if (thing.transitioning || wasTransitioning) {
        transitionCount++;
      }
    });
    
    // Sample same particles after update
    if (this.collection.length > 0 && beforePos.length > 0) {
      const sampleSize = beforePos.length;
      for (let i = 0; i < sampleSize; i++) {
        afterPos.push({
          x: this.collection[i].x,
          y: this.collection[i].y,
          done: this.collection[i].done,
          velocity: this.collection[i].velocity,
          transitioning: this.collection[i].transitioning,
          circuit: this.collection[i].circuit?.id || 'none'
        });
      }
      
      // Only log occasionally to avoid console flood
      if (Math.random() < 0.005 || transitionCount > 0) {
        // Animation debugging removed - particles updated tracking
      }
    }
  }
  
  /**
   * Draw all things with glow effects
   */
  draw() {
    const ctx = this.ctx;
    if (!this.lightRadius || !this.ghostRadial || !this.ghostSuperRadial || !this.dotsGhost) {
      console.error('Light effects not properly initialized');
      this.drawSimple(ctx);
      return;
    }
    
    const radius = this.lightRadius;
    const space = radius / 3;
    
    // Clear canvas
    ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw each thing with appropriate glow
    this.collection.forEach(thing => {
      let radial = this.ghostRadial;
      let diffX = radius;
      let diffY = radius;
      
      // Check if things are close to each other for enhanced glow
      if (thing.distFromSister() <= space) {
        radial = this.ghostSuperRadial;
        diffX = radial.width / 2;
        diffY = radial.height / 2;
      }
      
      // Draw the glow
      ctx.drawImage(radial, thing.x - diffX, thing.y - diffY, radial.width, radial.height);
    });
    
    // Apply dot mask to restrict glow to dots
    ctx.save();
    ctx.globalCompositeOperation = 'destination-in';
    ctx.drawImage(this.dotsGhost, 0, 0);
    ctx.restore();
    
    // Draw the particles
    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = this.config.particleColor || '#afe3e9';
    
    this.collection.forEach(thing => {
      ctx.beginPath();
      ctx.arc(thing.x, thing.y, radius / 6, 0, 2 * Math.PI, false);
      ctx.fill();
    });
    
    ctx.restore();
  }
  
  /**
   * Draw things in simple mode without glow effects
   */
  drawSimple(ctx) {
    ctx.fillStyle = this.config.particleColor;
    const radius = this.lightRadius ? this.lightRadius / 6 : 4; // Default radius if lightRadius not set
    
    this.collection.forEach(thing => {
      ctx.beginPath();
      ctx.arc(thing.x, thing.y, radius, 0, 2 * Math.PI, false);
      ctx.fill();
    });
  }
  
  /**
   * Set the dots ghost for masking
   */
  setDotsGhost(canvas) {
    this.dotsGhost = canvas;
  }
  
  /**
   * Set up light effects
   */
  setLight(lightRadius) {
    this.lightRadius = lightRadius;
    
    // Create regular glow effect
    this.ghostRadial = document.createElement('canvas');
    this.ghostRadial.width = lightRadius * 2;
    this.ghostRadial.height = lightRadius * 2;
    
    const radialCtx = this.ghostRadial.getContext('2d');
    let gradient = radialCtx.createRadialGradient(
      lightRadius, lightRadius, lightRadius,
      lightRadius, lightRadius, 0
    );
    
    gradient.addColorStop(0, "rgba(24, 129, 141, 0)");
    gradient.addColorStop(1, this.config.glowColor || "rgba(24, 129, 141, .6)");
    
    radialCtx.fillStyle = gradient;
    radialCtx.fillRect(0, 0, lightRadius * 2, lightRadius * 2);
    
    // Create enhanced glow effect (star shape)
    this.ghostSuperRadial = document.createElement('canvas');
    const radWidth = this.ghostSuperRadial.width = lightRadius * 15;
    const radHeight = this.ghostSuperRadial.height = lightRadius * 20;
    
    const superRadialCtx = this.ghostSuperRadial.getContext('2d');
    
    gradient = superRadialCtx.createRadialGradient(
      radWidth / 2, radHeight / 2, radWidth / 2,
      radWidth / 2, radHeight / 2, 0
    );
    
    gradient.addColorStop(0, "rgba(37, 203, 223, 0)");
    gradient.addColorStop(1, this.config.superGlowColor || "rgba(37, 203, 223, .4)");
    
    superRadialCtx.fillStyle = gradient;
    
    // Draw star shape
    superRadialCtx.beginPath();
    superRadialCtx.moveTo(radWidth / 2 + lightRadius / 6, radHeight / 2 - lightRadius / 3);
    superRadialCtx.lineTo(radWidth, 0);
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 3, radHeight / 2 - lightRadius / 6);
    superRadialCtx.lineTo(3 * radWidth / 4, radHeight / 2);
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 3, radHeight / 2 + lightRadius / 6);
    superRadialCtx.lineTo(radWidth, radHeight);
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 6, radHeight / 2 + lightRadius / 3);
    superRadialCtx.lineTo(radWidth / 2, 3 * radHeight / 4);
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 6, radHeight / 2 + lightRadius / 3);
    superRadialCtx.lineTo(0, radHeight);
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 3, radHeight / 2 + lightRadius / 6);
    superRadialCtx.lineTo(radWidth / 4, radHeight / 2);
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 3, radHeight / 2 - lightRadius / 6);
    superRadialCtx.lineTo(0, 0);
    superRadialCtx.lineTo(radWidth / 2 - lightRadius / 6, radHeight / 2 - lightRadius / 3);
    superRadialCtx.lineTo(radWidth / 2, radHeight / 4);
    superRadialCtx.lineTo(radWidth / 2 + lightRadius / 6, radHeight / 2 - lightRadius / 3);
    superRadialCtx.fill();
  }
  
  /**
   * Update configuration
   */
  updateConfig(newConfig) {
    this.config = newConfig;
    
    // Update particle speeds if they changed
    if (newConfig.particleSpeed) {
      this.collection.forEach(thing => {
        const originalSpeed = thing.velocity / (this.config.particleSpeed || 1);
        thing.velocity = originalSpeed * newConfig.particleSpeed;
      });
    }
    
    // Regenerate light effects if colors changed
    if (
      newConfig.glowColor || 
      newConfig.superGlowColor || 
      newConfig.particleColor
    ) {
      this.setLight(this.lightRadius);
    }
  }
}
