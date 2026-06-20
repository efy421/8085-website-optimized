/**
 * Col class - Represents a column in the grid
 */
export class Col {
  constructor(rows) {
    this.rows = Array.apply(null, Array(rows)).map(() => 0);
    this.free = rows;
  }
}

/**
 * Circuit class - Represents a circuit path with its properties
 */
export class Circuit {
  constructor(start, size) {
    this.id = `circuit-${Math.floor(Math.random() * 1000000)}`; // Add unique ID
    this.start = start;
    this.cellSize = size;
    this.path = [];
    this.end = null;
    this.things = [];
    this.length = 0;
    this.coords = [];
    this.isHighlighted = false; // Track if circuit is highlighted by mouse proximity
    
    // Dynamic connection properties
    this.originalState = null;      // Stores original state when connected
    this.isConnected = false;       // Whether this circuit is part of a connection
    this.connections = [];          // References to connected circuits
    this.connectionPoints = [];     // Points where this circuit connects to others
    this.connectionMap = {};        // Maps segment indices to connected circuits and their segments
  }
  
  /**
   * Save the current state before making connections
   */
  saveOriginalState() {
    if (!this.originalState) {
      this.originalState = {
        start: [...this.start],
        end: this.end ? [...this.end] : null,
        path: this.path.map(p => [...p]),
        coords: this.coords.map(c => [...c]),
        length: this.length
      };
    }
  }
  
  /**
   * Restore the original state when disconnecting
   */
  restoreOriginalState() {
    if (this.originalState) {
      this.start = [...this.originalState.start];
      this.end = this.originalState.end ? [...this.originalState.end] : null;
      this.path = this.originalState.path.map(p => [...p]);
      this.coords = this.originalState.coords.map(c => [...c]);
      this.length = this.originalState.length;
      this.originalState = null;
      this.isConnected = false;
      this.connections = [];
      this.connectionPoints = [];
      this.connectionMap = {};  // Clear connection map
    }
  }
  
  /**
   * Get pixel coordinates for a specific segment index
   * @param {number} segmentIndex - The segment index
   * @returns {Object} - The x,y pixel coordinates
   */
  getSegmentPixelCoordinates(segmentIndex) {
    const size = this.cellSize;
    
    // Handle start point
    if (segmentIndex === 0) {
      return {
        x: this.start[0] * size + size / 2,
        y: this.start[1] * size + size / 2
      };
    }
    
    // Handle end point
    if (segmentIndex === this.path.length) {
      return {
        x: this.end[0] * size + size / 2,
        y: this.end[1] * size + size / 2
      };
    }
    
    // Handle mid-circuit point
    if (segmentIndex > 0 && segmentIndex < this.path.length && this.coords[segmentIndex]) {
      const point = this.coords[segmentIndex];
      return {
        x: point[0] * size + size / 2,
        y: point[1] * size + size / 2
      };
    }
    
    // Invalid segment index
    console.error(`Invalid segment index: ${segmentIndex}`);
    return null;
  }
  
  /**
   * Find the distance between this circuit and another circuit's endpoints
   * @param {Circuit} otherCircuit - The other circuit to check
   * @param {string} thisEnd - Which end of this circuit to check ('start' or 'end')
   * @param {string} otherEnd - Which end of other circuit to check ('start' or 'end')
   * @returns {Object} - Connection information
   */
  getEndToEndDistance(otherCircuit, thisEnd, otherEnd) {
    const size = this.cellSize;
    let thisPos, otherPos, thisSegmentIndex, otherSegmentIndex;
    
    // Get position and segment index for this circuit's end
    if (thisEnd === 'start') {
      thisPos = this.start;
      thisSegmentIndex = 0;
    } else { // end
      thisPos = this.end;
      thisSegmentIndex = this.path.length;
    }
    
    // Get position and segment index for other circuit's end
    if (otherEnd === 'start') {
      otherPos = otherCircuit.start;
      otherSegmentIndex = 0;
    } else { // end
      otherPos = otherCircuit.end;
      otherSegmentIndex = otherCircuit.path.length;
    }
    
    // Calculate pixel coordinates
    const thisX = thisPos[0] * size + size / 2;
    const thisY = thisPos[1] * size + size / 2;
    const otherX = otherPos[0] * size + size / 2;
    const otherY = otherPos[1] * size + size / 2;
    
    // Calculate distance
    const distance = this.distanceBetweenPoints(thisX, thisY, otherX, otherY);
    
    return {
      distance,
      thisEnd,
      otherEnd,
      thisPos,
      otherPos,
      thisSegmentIndex,
      otherSegmentIndex
    };
  }
  
  /**
   * Calculate minimum distance from a point to this circuit
   * @param {number} px - X coordinate of point
   * @param {number} py - Y coordinate of point
   * @returns {number} - Minimum distance from point to circuit
   */
  distanceFromPoint(px, py) {
    if (!this.path.length || !this.coords.length) return Infinity;
    
    const size = this.cellSize;
    let minDistance = Infinity;
    
    // Check distance to start node
    const startX = this.start[0] * size + size / 2;
    const startY = this.start[1] * size + size / 2;
    minDistance = Math.min(minDistance, this.distanceBetweenPoints(px, py, startX, startY));
    
    // Check distance to end node
    const endX = this.end[0] * size + size / 2;
    const endY = this.end[1] * size + size / 2;
    minDistance = Math.min(minDistance, this.distanceBetweenPoints(px, py, endX, endY));
    
    // Check distance to each segment
    let point = [...this.start];
    let nextPoint = [...point];
    
    for (let i = 0; i < this.path.length; i++) {
      // Calculate next point
      nextPoint[0] = point[0] + this.path[i][0];
      nextPoint[1] = point[1] + this.path[i][1];
      
      // Calculate segment endpoints in pixel coordinates
      const x1 = point[0] * size + size / 2;
      const y1 = point[1] * size + size / 2;
      const x2 = nextPoint[0] * size + size / 2;
      const y2 = nextPoint[1] * size + size / 2;
      
      // Calculate distance to segment
      const segmentDist = this.distanceToSegment(px, py, x1, y1, x2, y2);
      minDistance = Math.min(minDistance, segmentDist);
      
      // Move to next point
      point[0] = nextPoint[0];
      point[1] = nextPoint[1];
    }
    
    return minDistance;
  }
  
  /**
   * Calculate distance between two points
   */
  distanceBetweenPoints(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  /**
   * Calculate distance from point to line segment
   * Based on the algorithm from https://stackoverflow.com/a/1501725
   */
  distanceToSegment(px, py, x1, y1, x2, y2) {
    const A = px - x1;
    const B = py - y1;
    const C = x2 - x1;
    const D = y2 - y1;
    
    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;
    
    if (lenSq !== 0) {
      param = dot / lenSq;
    }
    
    let xx, yy;
    
    if (param < 0) {
      xx = x1;
      yy = y1;
    } else if (param > 1) {
      xx = x2;
      yy = y2;
    } else {
      xx = x1 + param * C;
      yy = y1 + param * D;
    }
    
    const dx = px - xx;
    const dy = py - yy;
    
    return Math.sqrt(dx * dx + dy * dy);
  }
}

/**
 * Thing class - Represents a moving particle on a circuit
 */
export class Thing {
  constructor(circuit, velocity, done = 0) {
    this.circuit = circuit;
    this.velocity = velocity;
    this.done = done;
    this.x = 0;
    this.y = 0;
    this.dots = [];
    this.transitioning = false;
    this.nextCircuit = null;
    this.transitionProgress = 0;
  }
  
  /**
   * Update position along the circuit
   */
  update() {
    const circuit = this.circuit;
    if (!circuit || circuit.path.length === 0) {
      console.error('Invalid circuit or empty path:', circuit);
      return;
    }
    
    const size = circuit.cellSize;
    
    // Handle transition between connected circuits
    if (this.transitioning && this.nextCircuit) {
      this.updateTransition();
      return;
    }
    
    let x = 0;
    let y = 0;
    
    const length = circuit.length;
    const start = circuit.start;
    const end = circuit.end;
    const path = circuit.path;
    
    // Update position
    this.done += this.velocity;
    
    // Check for circuit transition at endpoints
    if (this.done <= 0) {
      // At start of circuit - check for connections
      if (circuit.isConnected && circuit.connectionMap[0] && circuit.connectionMap[0].length > 0) {
        this.startTransition(0);
        // Return early since we've started a transition
        return;
      } else {
        // No connection, reverse direction
        this.done = 0;
        this.velocity = -this.velocity;
      }
    } else if (this.done >= length) {
      // At end of circuit - check for connections
      if (circuit.isConnected && circuit.connectionMap[path.length] && circuit.connectionMap[path.length].length > 0) {
        this.startTransition(path.length);
        // Return early since we've started a transition
        return;
      } else {
        // No connection, reverse direction
        this.done = length;
        this.velocity = -this.velocity;
      }
    }
    
    // Calculate segment index for possible mid-circuit connections
    const segmentIndex = Math.floor(this.done / size);
    
    // Check for mid-circuit connection points
    if (segmentIndex > 0 && 
        segmentIndex < path.length && 
        circuit.isConnected && 
        circuit.connectionMap[segmentIndex] && 
        circuit.connectionMap[segmentIndex].length > 0 && 
        Math.random() < 0.02) { // 2% chance to take a mid-circuit connection
        
      const connectionThreshold = 5; // Distance in pixels to trigger transition
      const segmentDone = this.done - (segmentIndex * size);
      
      // Only transition if we're close to the connection point (near the center of the segment)
      if (Math.abs(segmentDone - (size / 2)) < connectionThreshold) {
        this.startTransition(segmentIndex);
        return;
      }
    }
    
    // Calculate position at start of circuit
    if (this.done <= size / 2) {
      x = (start[0] * size + size / 2) + this.done * path[0][0];
      y = (start[1] * size + size / 2) + this.done * path[0][1];
    } 
    // Calculate position at end of circuit
    else if (this.done > (length - size / 2)) {
      x = (end[0] * size + size / 2) - (length - this.done) * path[path.length - 1][0];
      y = (end[1] * size + size / 2) - (length - this.done) * path[path.length - 1][1];
    } 
    // Calculate position along the circuit
    else {
      const index = Math.floor(this.done / size);
      // Safety check for index out of bounds
      if (index >= circuit.path.length || index >= circuit.coords.length) {
        console.error('Index out of bounds:', index, 'path length:', circuit.path.length, 'coords length:', circuit.coords.length);
        return;
      }
      
      const done = this.done - index * size;
      const dir = [path[index][0], path[index][1]];
      const point = circuit.coords[index];
      
      x = point[0] * size + size / 2 + done * dir[0];
      y = point[1] * size + size / 2 + done * dir[1];
    }
    
    // Set final position (round to integer)
    this.x = Math.floor(x);
    this.y = Math.floor(y);
  }
  
  /**
   * Start transition to a connected circuit
   */
  startTransition(segmentIndex) {
    if (!this.circuit.connectionMap[segmentIndex] || this.circuit.connectionMap[segmentIndex].length === 0) {
      return;
    }
    
    // Randomly select one of the possible connections
    const connections = this.circuit.connectionMap[segmentIndex];
    const connection = connections[Math.floor(Math.random() * connections.length)];
    
    // Log transition start
    
    this.transitioning = true;
    this.nextCircuit = connection.circuit;
    this.transitionProgress = 0;
    this.startX = this.x;
    this.startY = this.y;
    
    // Calculate end coordinates based on where we'll enter the next circuit
    const targetSegmentIndex = connection.segmentIndex;
    const targetCircuit = connection.circuit;
    const size = this.circuit.cellSize;
    
    let targetX, targetY;
    
    // If connecting to start of target circuit
    if (targetSegmentIndex === 0) {
      targetX = targetCircuit.start[0] * size + size / 2;
      targetY = targetCircuit.start[1] * size + size / 2;
      this.targetDone = 0;
      // Set velocity to move away from start
      this.velocity = Math.abs(this.velocity);
    } 
    // If connecting to end of target circuit
    else if (targetSegmentIndex === targetCircuit.path.length) {
      targetX = targetCircuit.end[0] * size + size / 2;
      targetY = targetCircuit.end[1] * size + size / 2;
      this.targetDone = targetCircuit.length;
      // Set velocity to move away from end
      this.velocity = -Math.abs(this.velocity);
    }
    // For mid-circuit connections (future enhancement)
    else {
      // Calculate position in the target circuit segment
      const targetCoord = targetCircuit.coords[targetSegmentIndex];
      targetX = targetCoord[0] * size + size / 2;
      targetY = targetCoord[1] * size + size / 2;
      this.targetDone = targetSegmentIndex * size + (size / 2);
      
      // Randomize direction after connecting to mid-circuit point
      this.velocity = Math.random() < 0.5 ? -Math.abs(this.velocity) : Math.abs(this.velocity);
    }
    
    this.targetX = targetX;
    this.targetY = targetY;
    this.sourceCircuit = this.circuit;
    this.sourceSegmentIndex = segmentIndex;
    this.targetSegmentIndex = targetSegmentIndex;
  }
  
  /**
   * Update position during circuit transition
   */
  updateTransition() {
    // Animate transition between circuits with easing
    const transitionSpeed = Math.abs(this.velocity) * 0.05;
    
    // Apply easing for smoother transitions (ease-in-out)
    if (this.transitionProgress < 0.5) {
      // Ease in (accelerate)
      this.transitionProgress += transitionSpeed * (0.5 + this.transitionProgress);
    } else {
      // Ease out (decelerate)
      this.transitionProgress += transitionSpeed * (1.5 - this.transitionProgress);
    }
    
    if (this.transitionProgress >= 1) {
      // Log transition complete
      
      // Transition complete, move to next circuit
      this.circuit = this.nextCircuit;
      this.done = this.targetDone;
      this.x = this.targetX;
      this.y = this.targetY;
      
      // Reset transition state
      this.transitioning = false;
      this.nextCircuit = null;
      this.transitionProgress = 0;
      this.sourceCircuit = null;
      this.sourceSegmentIndex = null;
      this.targetSegmentIndex = null;
    } else {
      // Calculate interpolated position with improved curve
      // Use sine easing for smooth acceleration and deceleration
      const t = Math.sin(this.transitionProgress * Math.PI / 2);
      
      // Add a slight arc to the path for visual interest
      const directX = this.startX + (this.targetX - this.startX) * t;
      const directY = this.startY + (this.targetY - this.startY) * t;
      
      // Calculate an arc offset perpendicular to the motion path
      const dx = this.targetX - this.startX;
      const dy = this.targetY - this.startY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      // Only add an arc if the distance is sufficient
      if (distance > 20) {
        // Calculate perpendicular vector
        const perpX = -dy / distance;
        const perpY = dx / distance;
        
        // Create arc with maximum height at the middle of the transition
        const arcHeight = distance * 0.2; // 20% of distance
        const arcFactor = Math.sin(this.transitionProgress * Math.PI);
        
        // Apply arc offset
        this.x = Math.floor(directX + perpX * arcHeight * arcFactor);
        this.y = Math.floor(directY + perpY * arcHeight * arcFactor);
      } else {
        // For short distances, just use linear interpolation
        this.x = Math.floor(directX);
        this.y = Math.floor(directY);
      }
    }
  }
  
  /**
   * Cancel an in-progress transition
   */
  cancelTransition() {
    if (!this.transitioning) return;
    
    
    // Reset transition flags
    this.transitioning = false;
    this.nextCircuit = null;
    this.sourceCircuit = null;
    this.sourceSegmentIndex = null;
    this.targetSegmentIndex = null;
    this.transitionProgress = 0;
    
    // Make sure we don't get stuck at the edge of a circuit
    if (this.done <= 0) {
      this.done = 0;
      this.velocity = Math.abs(this.velocity); // Move away from the start
    } else if (this.done >= this.circuit.length) {
      this.done = this.circuit.length;
      this.velocity = -Math.abs(this.velocity); // Move away from the end
    }
  }
  
  /**
   * Calculate distance to the closest other thing on the same circuit
   */
  distFromSister() {
    const circuit = this.circuit;
    let dist = Infinity;
    let tmp = null;
    
    circuit.things.forEach(thing => {
      if (thing !== this) {
        tmp = Math.abs(thing.done - this.done);
        if (tmp < dist) {
          dist = tmp;
        }
      }
    });
    
    return dist;
  }
}
