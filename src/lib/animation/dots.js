/**
 * Dots class - Creates a field of dots with configurable properties
 */
export class Dots {
  constructor(width, height, spacing, dotColor, dotGhostColor) {
    this.spacing = spacing;
    this.dots = [];
    this.dotColor = dotColor || 'rgba(24, 129, 141, .1)';
    this.dotGhostColor = dotGhostColor || 'rgb(24, 129, 141)';
    this.alphaStep = 1 / 10;
    this.cols = Math.floor(width / spacing);
    this.rows = Math.floor(height / spacing);

    // Create canvas for dots
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = width;
    canvas.height = height;
    this.canvas = canvas;
    this.ctx = ctx;

    // Draw dots
    this.draw();
  }

  /**
   * Draw dots on the canvas
   */
  draw() {
    const ctx = this.ctx;
    const spacing = this.spacing;

    // Set dot color
    ctx.fillStyle = this.dotColor;
    
    // Create dots
    this.dots = Array.apply(null, Array(this.cols)).map((n, x) => {
      return Array.apply(null, Array(this.rows)).map((p, y) => {
        // Create dot object
        let dot = {
          opacity: 0.1,
          x: x * spacing,
          y: y * spacing
        };

        // Draw dot
        ctx.fillRect(dot.x, dot.y, 1, 1);
        return dot;
      });
    });
  }

  /**
   * Create a ghost version of the dots for clipping
   * This is used for masking the glow effects
   */
  ghost() {
    const ghostDots = document.createElement('canvas');
    ghostDots.width = this.canvas.width;
    ghostDots.height = this.canvas.height;

    const dotsCtx = ghostDots.getContext('2d');
    dotsCtx.fillStyle = this.dotGhostColor;
    
    // Draw all dots
    this.dots.forEach(col => {
      col.forEach(dot => {
        dotsCtx.fillRect(dot.x, dot.y, 1, 1);
      });
    });

    return ghostDots;
  }
  
  /**
   * Update dot colors
   */
  updateColors(dotColor, dotGhostColor) {
    if (dotColor) this.dotColor = dotColor;
    if (dotGhostColor) this.dotGhostColor = dotGhostColor;
    
    // Redraw with new colors
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
  }
}
