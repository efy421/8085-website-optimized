import { Col } from './utils';
import { Circuit } from './utils';

/**
 * Circuits class - Generates circuit paths between dots
 */
export class Circuits {
  constructor(width, height, size, minLength, maxLength, circuitColor, circuitNodeColor, things, config) {
    // Store parameters
    this.size = size;
    this.width = width;
    this.height = height;
    this.cols = Math.floor(width / size);
    this.rows = Math.floor(height / size);
    this.circuitColor = circuitColor || 'rgba(59, 177, 188, 1)';
    this.circuitNodeColor = circuitNodeColor || 'rgba(59, 177, 188, .6)';
    this.things = things;
    this.config = config || {};  // Store config
    
    // Create grid for tracking used cells
    this.scene = Array.apply(null, Array(this.cols)).map(() => new Col(this.rows));
    
    this.collection = [];
    this.minLength = minLength;
    this.maxLength = maxLength;

    // Generate circuits
    this.populate();
    this.draw();
  }

  /**
   * Draw circuits on canvas
   */
  draw() {
    // Create canvas for circuits
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const size = this.size;

    canvas.width = this.width;
    canvas.height = this.height;

    // Draw circuit paths
    ctx.strokeStyle = this.circuitColor;
    ctx.lineWidth = Math.round(size / 10);
    
    this.collection.forEach(circuit => {
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
    });

    // Draw circuit nodes
    ctx.lineWidth = Math.floor(this.size / 5);
    ctx.strokeStyle = this.circuitNodeColor;
    
    this.collection.forEach(circuit => {
      // Start node
      ctx.beginPath();
      ctx.arc(
        circuit.start[0] * size + size / 2, 
        circuit.start[1] * size + size / 2, 
        size / 4, 0, 2 * Math.PI, false
      );
      ctx.stroke();
      
      // End node
      ctx.beginPath();
      ctx.arc(
        circuit.end[0] * size + size / 2, 
        circuit.end[1] * size + size / 2, 
        size / 4, 0, 2 * Math.PI, false
      );
      ctx.stroke();
    });

    this.canvas = canvas;
  }

  /**
   * Generate circuit paths
   */
  populate() {
    const size = this.size;

    let start = null;
    let n = 1000;
    let maxLength = this.maxLength;
    let minLength = this.minLength;
    let length = 0;
    let dir = null;
    
    // Generate circuits until we can't find more starting points or hit iteration limit
    while ((start = this.getStart()) && n--) {
      length = minLength + Math.floor(Math.random() * (maxLength - minLength));
      dir = this.getDir(start);

      this.setUsed(start[0], start[1]);
      
      // If we can move from this point
      if (dir[0] !== 0 || dir[1] !== 0) {
        let circuit = new Circuit(start, size);
        let moving = true;
        let path = [start[0], start[1]];
        let coords = [start[0], start[1]];
        length--;

        // Build the path
        while (moving && length) {
          circuit.path.push(dir);
          circuit.coords.push([path[0], path[1]]);

          path[0] += dir[0];
          path[1] += dir[1];

          // Mark cell as used
          this.setUsed(path[0], path[1]);
          
          // Get new direction
          dir = this.getDir(path, dir);
          
          // Stop if we can't move
          if (dir[0] === 0 && dir[1] === 0) {
            moving = false;
          }
          
          length--;
        }

        // If circuit meets minimum length requirement
        if (circuit.path.length >= minLength) {
          circuit.end = path;
          circuit.coords.push([path[0], path[1]]);

          // Add moving things to the circuit
          let speed = Math.random() * 0.5 + 0.5;
          circuit.things.push(this.things.create(circuit, speed * 1));

          // Add more things for longer circuits
          if (circuit.path.length > maxLength / 3) {
            speed = Math.random() * 0.5 + 0.5;
            circuit.things.push(this.things.create(circuit, -speed, circuit.path.length * size));
          }

          if (circuit.path.length > maxLength / 1.5) {
            speed = Math.random() * 0.5 + 0.5 * (Math.random() >= 0.5 ? -1 : 1);
            circuit.things.push(
              this.things.create(circuit, speed, Math.random() * circuit.path.length * size)
            );
          }

          circuit.length = circuit.path.length * size;
          this.collection.push(circuit);
        }
      }
    }
    
    // Create spatial index for faster circuit lookup
    this.createSpatialIndex();
    
  }
  
  /**
   * Create a simple spatial index to speed up circuit proximity detection
   * Divides the canvas into cells and stores which circuits intersect each cell
   */
  createSpatialIndex() {
    const cellSize = this.size * 4; // Use larger cells for spatial index
    const gridCols = Math.ceil(this.width / cellSize);
    const gridRows = Math.ceil(this.height / cellSize);
    
    // Create empty grid
    this.spatialIndex = new Array(gridCols);
    for (let x = 0; x < gridCols; x++) {
      this.spatialIndex[x] = new Array(gridRows);
      for (let y = 0; y < gridRows; y++) {
        this.spatialIndex[x][y] = [];
      }
    }
    
    // Add circuits to spatial index
    this.collection.forEach((circuit, index) => {
      // Add circuit to cells it intersects
      // Start with start and end points
      this.addCircuitToSpatialCell(circuit, index, circuit.start[0], circuit.start[1]);
      this.addCircuitToSpatialCell(circuit, index, circuit.end[0], circuit.end[1]);
      
      // Add cells along the path
      let point = [...circuit.start];
      for (let i = 0; i < circuit.path.length; i++) {
        point[0] += circuit.path[i][0];
        point[1] += circuit.path[i][1];
        this.addCircuitToSpatialCell(circuit, index, point[0], point[1]);
      }
    });
    
    // Animation debugging removed - spatial index creation
  }
  
  /**
   * Add a circuit to a cell in the spatial index
   */
  addCircuitToSpatialCell(circuit, circuitIndex, gridX, gridY) {
    const cellSize = this.size * 4;
    const cellX = Math.floor((gridX * this.size) / cellSize);
    const cellY = Math.floor((gridY * this.size) / cellSize);
    
    // Check if cell is valid
    if (cellX >= 0 && cellX < this.spatialIndex.length && 
        cellY >= 0 && cellY < this.spatialIndex[cellX].length) {
      
      // Add circuit index to cell if not already present
      const cell = this.spatialIndex[cellX][cellY];
      if (!cell.includes(circuitIndex)) {
        cell.push(circuitIndex);
      }
    }
  }
  
  /**
   * Find circuits within a certain radius of a point
   * @param {number} x - X coordinate of point
   * @param {number} y - Y coordinate of point
   * @param {number} radius - Radius to search within
   * @returns {Array} - Array of circuits within radius
   */
  findCircuitsNearPoint(x, y, radius) {
    // Reset all circuit highlights
    this.collection.forEach(circuit => {
      circuit.isHighlighted = false;
    });
    
    const cellSize = this.size * 4;
    const candidates = new Set();
    
    // Determine which cells to search
    const minCellX = Math.max(0, Math.floor((x - radius) / cellSize));
    const maxCellX = Math.min(this.spatialIndex.length - 1, Math.floor((x + radius) / cellSize));
    const minCellY = Math.max(0, Math.floor((y - radius) / cellSize));
    const maxCellY = Math.min(this.spatialIndex[0].length - 1, Math.floor((y + radius) / cellSize));
    
    // Get candidate circuits from spatial index
    for (let cellX = minCellX; cellX <= maxCellX; cellX++) {
      for (let cellY = minCellY; cellY <= maxCellY; cellY++) {
        const cell = this.spatialIndex[cellX][cellY];
        cell.forEach(circuitIndex => {
          candidates.add(circuitIndex);
        });
      }
    }
    
    // Calculate actual distances and filter circuits within radius
    const nearby = [];
    candidates.forEach(circuitIndex => {
      const circuit = this.collection[circuitIndex];
      const distance = circuit.distanceFromPoint(x, y);
      
      if (distance <= radius) {
        circuit.isHighlighted = true;
        nearby.push({ circuit, distance, index: circuitIndex });
      }
    });
    
    // Sort by distance (closest first)
    nearby.sort((a, b) => a.distance - b.distance);
    
    // Debug info - log information about nearby circuits occasionally
    if (nearby.length > 0 && Math.random() < 0.01) {
      // Animation debugging removed - circuit proximity search
    }
    
    return nearby;
  }
  
  /**
   * Find potential connections between highlighted circuits
   * @returns {Array} - Array of potential connections
   */
  findCircuitConnections() {
    const highlightedCircuits = this.collection.filter(circuit => circuit.isHighlighted);
    const connections = [];
    
    // Connection analysis debugging removed
    
    // Find all possible connections between highlighted circuits
    for (let i = 0; i < highlightedCircuits.length; i++) {
      for (let j = i + 1; j < highlightedCircuits.length; j++) {
        const circuit1 = highlightedCircuits[i];
        const circuit2 = highlightedCircuits[j];
        
        
        // Find all possible connections between the ends of these two circuits
        // We'll check start-to-start, start-to-end, end-to-start, end-to-end
        const possibleConnections = [];
        
        // Define circuit ends (0 = start, 1 = end)
        const circuit1Ends = [
          { circuitIndex: i, circuit: circuit1, type: 'start', position: circuit1.start, segmentIndex: 0 },
          { circuitIndex: i, circuit: circuit1, type: 'end', position: circuit1.end, segmentIndex: circuit1.path.length }
        ];
        
        const circuit2Ends = [
          { circuitIndex: j, circuit: circuit2, type: 'start', position: circuit2.start, segmentIndex: 0 },
          { circuitIndex: j, circuit: circuit2, type: 'end', position: circuit2.end, segmentIndex: circuit2.path.length }
        ];
        
        
        // Check all combinations of ends
        for (const end1 of circuit1Ends) {
          for (const end2 of circuit2Ends) {
            // Create a unique key for this end
            const end1Key = `${i}-${end1.type}`;
            const end2Key = `${j}-${end2.type}`;
            
            // Calculate distance between these ends
            const size = this.size;
            const x1 = end1.position[0] * size + size / 2;
            const y1 = end1.position[1] * size + size / 2;
            const x2 = end2.position[0] * size + size / 2;
            const y2 = end2.position[1] * size + size / 2;
            
            const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
            
            
            // More permissive threshold for forming connections
            const distanceThreshold = this.size * 20;
            if (distance <= distanceThreshold) {
              possibleConnections.push({
                distance,
                circuit1: circuit1,
                circuit2: circuit2,
                point1: end1.position,
                point2: end2.position,
                segmentIndex1: end1.segmentIndex,
                segmentIndex2: end2.segmentIndex,
                end1Key,
                end2Key
              });
            } else {
            }
          }
        }
        
        // Sort possible connections by distance and add to connections array
        possibleConnections.sort((a, b) => a.distance - b.distance);
        connections.push(...possibleConnections);
      }
    }
    
    // Sort all connections by distance (shortest first)
    connections.sort((a, b) => a.distance - b.distance);
    
    return connections;
  }
  
  /**
   * Connect circuits that are highlighted (near the mouse)
   * @returns {boolean} - Whether any connections were made
   */
  connectHighlightedCircuits() {
    
    // Get all highlighted circuits
    const highlightedCircuits = this.collection.filter(circuit => circuit.isHighlighted);
    
    // If we don't have at least 2 circuits, we can't make connections
    if (highlightedCircuits.length < 2) {
      return false;
    }
    
    
    // For each highlighted circuit, save its original state if not already saved
    highlightedCircuits.forEach(circuit => {
      if (!circuit.originalState) {
        circuit.saveOriginalState();
      }
      
      // Reset existing connections
      circuit.connections = [];
      circuit.connectionPoints = [];
      circuit.connectionMap = {};
      circuit.isConnected = true; // Mark as connected
    });
    
    // Connect all circuits to each other in a mesh topology
    for (let i = 0; i < highlightedCircuits.length; i++) {
      for (let j = i + 1; j < highlightedCircuits.length; j++) {
        const circuit1 = highlightedCircuits[i];
        const circuit2 = highlightedCircuits[j];
        
        // Create connections between different circuit points (start, end, and possibly mid-points)
        this.createCircuitConnections(circuit1, circuit2);
      }
    }
    
    // Update all particles to be aware of the new connections
    this.notifyParticlesOfConnections();
    
    
    return true;
  }
  
  /**
   * Create connections between two circuits at various connection points
   * @param {Circuit} circuit1 - First circuit
   * @param {Circuit} circuit2 - Second circuit
   */
  createCircuitConnections(circuit1, circuit2) {
    const size = this.cellSize;
    
    // Add circuit references
    circuit1.connections.push(circuit2);
    circuit2.connections.push(circuit1);
    
    // Connect start points
    this.addConnectionPoint(circuit1, circuit2, 0, 0);
    
    // Connect end points
    this.addConnectionPoint(circuit1, circuit2, circuit1.path.length, circuit2.path.length);
    
    // Connect start to end
    this.addConnectionPoint(circuit1, circuit2, 0, circuit2.path.length);
    this.addConnectionPoint(circuit1, circuit2, circuit1.path.length, 0);
    
    // Optionally add mid-circuit connection points
    // Only for longer circuits and with limited frequency to avoid too many connections
    if (circuit1.path.length >= 6 && circuit2.path.length >= 6) {
      // Add a mid-point connection (approximately in the middle of each circuit)
      const midPoint1 = Math.floor(circuit1.path.length / 2);
      const midPoint2 = Math.floor(circuit2.path.length / 2);
      
      this.addConnectionPoint(circuit1, circuit2, midPoint1, midPoint2);
    }
  }
  
  /**
   * Add a connection point between two circuits at specific segment indices
   * @param {Circuit} circuit1 - First circuit
   * @param {Circuit} circuit2 - Second circuit
   * @param {number} segmentIndex1 - Segment index in first circuit
   * @param {number} segmentIndex2 - Segment index in second circuit
   */
  addConnectionPoint(circuit1, circuit2, segmentIndex1, segmentIndex2) {
    const size = this.cellSize;
    
    // Get coordinates for segment in circuit1
    let point1;
    if (segmentIndex1 === 0) {
      point1 = circuit1.start;
    } else if (segmentIndex1 === circuit1.path.length) {
      point1 = circuit1.end;
    } else if (circuit1.coords && circuit1.coords[segmentIndex1]) {
      point1 = circuit1.coords[segmentIndex1];
    } else {
      console.error("Invalid segment index for circuit1:", segmentIndex1);
      return;
    }
    
    // Get coordinates for segment in circuit2
    let point2;
    if (segmentIndex2 === 0) {
      point2 = circuit2.start;
    } else if (segmentIndex2 === circuit2.path.length) {
      point2 = circuit2.end;
    } else if (circuit2.coords && circuit2.coords[segmentIndex2]) {
      point2 = circuit2.coords[segmentIndex2];
    } else {
      console.error("Invalid segment index for circuit2:", segmentIndex2);
      return;
    }
    
    // Add connection points
    circuit1.connectionPoints.push({ 
      point: point1, 
      connectedTo: circuit2, 
      segmentIndex: segmentIndex1
    });
    
    circuit2.connectionPoints.push({ 
      point: point2, 
      connectedTo: circuit1, 
      segmentIndex: segmentIndex2
    });
    
    // Build connection maps for particle traversal
    if (!circuit1.connectionMap[segmentIndex1]) {
      circuit1.connectionMap[segmentIndex1] = [];
    }
    if (!circuit2.connectionMap[segmentIndex2]) {
      circuit2.connectionMap[segmentIndex2] = [];
    }
    
    // Add the connection to both circuits' connection maps
    circuit1.connectionMap[segmentIndex1].push({ 
      circuit: circuit2, 
      segmentIndex: segmentIndex2,
      point1: point1,
      point2: point2
    });
    
    circuit2.connectionMap[segmentIndex2].push({ 
      circuit: circuit1, 
      segmentIndex: segmentIndex1,
      point1: point2,
      point2: point1
    });
    
  }
  
  /**
   * Notify all particles about circuit connections so they can potentially recalculate paths
   */
  notifyParticlesOfConnections() {
    const connectedCircuits = this.collection.filter(circuit => circuit.isConnected);
    
    if (connectedCircuits.length < 2) return;
    
    // Count particles on connected circuits
    let particlesOnConnectedCircuits = 0;
    
    // Notify each particle on connected circuits
    connectedCircuits.forEach(circuit => {
      circuit.things.forEach(thing => {
        // Particle is now aware that its circuit is connected
        if (!thing.onConnectedCircuit) {
          thing.onConnectedCircuit = true;
          particlesOnConnectedCircuits++;
        }
      });
    });
    
  }
  
  /**
   * Disconnect all connected circuits
   */
  disconnectAllCircuits() {
    // Count connected circuits before disconnection
    const connectedBefore = this.collection.filter(circuit => circuit.isConnected).length;
    
    // Stop any active particle transitions
    this.stopParticleTransitions();
    
    // Restore original circuit states
    this.collection.forEach(circuit => {
      if (circuit.isConnected) {
        circuit.restoreOriginalState();
      }
    });
    
    // Count connected circuits after disconnection
    const connectedAfter = this.collection.filter(circuit => circuit.isConnected).length;
    if (connectedBefore > 0) {
    }
  }
  
  /**
   * Stop any in-progress particle transitions between circuits
   */
  stopParticleTransitions() {
    // Find all particles that are currently transitioning
    let transitioningCount = 0;
    
    this.collection.forEach(circuit => {
      if (circuit.isConnected) {
        // Check each particle on this circuit
        circuit.things.forEach(thing => {
          if (thing.transitioning) {
            // Stop the transition and keep the particle on its current circuit
            thing.cancelTransition();
            transitioningCount++;
          }
          
          // Reset connected circuit flag
          thing.onConnectedCircuit = false;
        });
      }
    });
  }
  
  /**
   * Draw connections between connected circuits
   * @param {CanvasRenderingContext2D} ctx - Canvas context to draw on
   */
  drawConnections(ctx) {
    const connectedCircuits = this.collection.filter(circuit => circuit.isConnected);
    
    if (connectedCircuits.length < 2) return;
    
    
    // Get connection color from config
    const connectionColor = this.config.tempConnectionColor || '#FF00FF';
    const connectionThickness = this.config.connectionThickness || 2;
    const connectionOpacity = this.config.connectionOpacity || 0.7;
    
    // Set connection drawing style
    const size = this.size;
    ctx.save();
    
    // Track connections we've already drawn to avoid duplicates
    const drawnConnections = new Set();
    
    // Draw all connections between circuits in a mesh topology
    for (let i = 0; i < connectedCircuits.length; i++) {
      const circuit1 = connectedCircuits[i];
      
      for (let j = i + 1; j < connectedCircuits.length; j++) {
        const circuit2 = connectedCircuits[j];
        
        // Create a unique connection ID to avoid duplicate connections
        const connectionId1 = `${circuit1.id}-${circuit2.id}`;
        const connectionId2 = `${circuit2.id}-${circuit1.id}`;
        
        // Skip if we've already drawn this connection
        if (drawnConnections.has(connectionId1) || drawnConnections.has(connectionId2)) {
          continue;
        }
        
        // Draw directly using pixel coordinates
        const x1 = circuit1.start[0] * size + size / 2;
        const y1 = circuit1.start[1] * size + size / 2;
        const x2 = circuit2.start[0] * size + size / 2;
        const y2 = circuit2.start[1] * size + size / 2;
        
        // Draw the connection line
        ctx.strokeStyle = connectionColor;
        ctx.lineWidth = connectionThickness;
        ctx.globalAlpha = connectionOpacity;
        
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        
        // Mark this connection as drawn
        drawnConnections.add(connectionId1);
        drawnConnections.add(connectionId2);
      }
    }
    
    ctx.restore();
  }

  /**
   * Find an available starting point for a circuit
   */
  getStart() {
    let col = null;
    let row = null;
    let free = [];
    let result = false;

    const scene = this.scene;

    // Find columns with free cells
    scene.forEach((col, index) => {
      if (col.free) {
        free.push(index);
      }
    });

    if (free.length) {
      // Pick a random column
      col = this.pickOne(free);

      // Find free cells in the column
      free = [];
      scene[col].rows.forEach((row, index) => {
        if (row === 0) {
          free.push(index);
        }
      });

      // Pick a random cell
      row = this.pickOne(free);

      result = [col, row];
    }
    
    return result;
  }

  /**
   * Pick a random element from an array
   */
  pickOne(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Mark a cell as used
   */
  setUsed(x, y) {
    this.scene[x].rows[y] = 1;
    this.scene[x].free--;
  }

  /**
   * Check if a cell is available
   */
  isAvailable(x, y) {
    const scene = this.scene;
    let result = false;
    
    if (typeof scene[x] !== 'undefined') {
      if (typeof scene[x].rows[y] !== 'undefined') {
        if (scene[x].rows[y] === 0) {
          result = true;
        }
      }
    }
    
    return result;
  }

  /**
   * Get a movement direction from a point
   * If a current direction is provided, there's a 50% chance to continue in that direction
   */
  getDir(fromPoint, oldDir = null) {
    const possibleX = [];
    const possibleY = [];
    const result = [0, 0];

    // Try to continue in the same direction
    if (oldDir && Math.random() <= 0.5) {
      if (this.isAvailable(fromPoint[0] + oldDir[0], fromPoint[1] + oldDir[1])) {
        return oldDir;
      }
    }

    // Check horizontal directions
    if (this.isAvailable(fromPoint[0] - 1, fromPoint[1])) {
      possibleX.push(-1);
    }
    if (this.isAvailable(fromPoint[0] + 1, fromPoint[1])) {
      possibleX.push(1);
    }

    // Check vertical directions
    if (this.isAvailable(fromPoint[0], fromPoint[1] - 1)) {
      possibleY.push(-1);
    }
    if (this.isAvailable(fromPoint[0], fromPoint[1] + 1)) {
      possibleY.push(1);
    }

    // Choose direction with preference for horizontal movement
    if (possibleX.length && Math.random() < 0.5) {
      result[0] = this.pickOne(possibleX);
    } else if (possibleY.length) {
      result[1] = this.pickOne(possibleY);
    }

    return result;
  }
}
