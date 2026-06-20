// Remove animation debugging console.logs - run once to clean up
const filesToClean = [
  '/src/lib/animation/circuits.js',
  '/src/lib/animation/renderer.js', 
  '/src/lib/animation/things.js',
  '/src/lib/animation/utils.js',
  '/src/components/CircuitCanvas.jsx'
];

// Debugging patterns to remove
const debugPatterns = [
  /console\.log\([^)]*mouse[^)]*\);?/gi,
  /console\.log\([^)]*circuit[^)]*\);?/gi,
  /console\.log\([^)]*connect[^)]*\);?/gi,
  /console\.log\([^)]*particle[^)]*\);?/gi,
  /console\.log\([^)]*debug[^)]*\);?/gi,
  /console\.log\([^)]*render[^)]*\);?/gi
];

// Keep error logs: /console\.error/
console.log('Animation debugging cleanup utility created');
