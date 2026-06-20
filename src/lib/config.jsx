import React, { createContext, useContext, useState, useEffect } from 'react';

// Color constants
const COLORS = {
  beige01: '#f5f4ed',
  beige02: '#e0e0d6',
  lightPink: '#f2c3d3',
  yellow: '#f7d56f',
  lightPurple: '#d4bfff', 
  black: '#101011',
};

// Color scheme definitions
const colorSchemes = {
  teal: {
    dotColor: COLORS.beige01,
    dotGhostColor: COLORS.beige01,
    circuitColor: COLORS.black,
    circuitNodeColor: COLORS.lightPink,
    particleColor: COLORS.yellow,
    glowColor: 'rgba(24, 129, 141, 0.5)',
    superGlowColor: 'rgba(37, 203, 223, 0.2)',
    connectionColor: COLORS.black,
    backgroundColor: 'transparent',
  },
  purple: {
    dotColor: 'rgba(124, 58, 237, 0.1)',
    dotGhostColor: 'rgb(124, 58, 237)',
    circuitColor: 'rgba(167, 139, 250, 1)',
    circuitNodeColor: 'rgba(167, 139, 250, 0.6)',
    particleColor: '#ddd6fe',
    glowColor: 'rgba(124, 58, 237, 0.6)',
    superGlowColor: 'rgba(139, 92, 246, 0.4)',
    connectionColor: '#A78BFA', // Purple connection color
    backgroundColor: 'transparent',
  },
  blue: {
    dotColor: 'rgba(37, 99, 235, 0.1)',
    dotGhostColor: 'rgb(37, 99, 235)',
    circuitColor: 'rgba(96, 165, 250, 1)',
    circuitNodeColor: 'rgba(96, 165, 250, 0.6)',
    particleColor: '#bfdbfe',
    glowColor: 'rgba(37, 99, 235, 0.6)',
    superGlowColor: 'rgba(59, 130, 246, 0.4)',
    connectionColor: '#60A5FA', // Blue connection color
    backgroundColor: 'transparent',
  },
  green: {
    dotColor: 'rgba(22, 163, 74, 0.1)',
    dotGhostColor: 'rgb(22, 163, 74)',
    circuitColor: 'rgba(74, 222, 128, 1)',
    circuitNodeColor: 'rgba(74, 222, 128, 0.6)',
    particleColor: '#bbf7d0',
    glowColor: 'rgba(22, 163, 74, 0.6)',
    superGlowColor: 'rgba(34, 197, 94, 0.4)',
    connectionColor: '#4ADE80', // Green connection color
    backgroundColor: 'transparent',
  },
  orange: {
    dotColor: 'rgba(234, 88, 12, 0.1)',
    dotGhostColor: 'rgb(234, 88, 12)',
    circuitColor: 'rgba(251, 146, 60, 1)',
    circuitNodeColor: 'rgba(251, 146, 60, 0.6)',
    particleColor: '#fed7aa',
    glowColor: 'rgba(234, 88, 12, 0.6)',
    superGlowColor: 'rgba(249, 115, 22, 0.4)',
    connectionColor: '#FB923C', // Orange connection color
    backgroundColor: 'transparent',
  },
};

// Default configuration
const defaultConfig = {
  // Animation parameters
  dotSpacing: 5,
  cellSize: 10,
  minLength: 2,
  maxLength: 15,
  particleSpeed: 0.3,  // Increased from 1.0 to 2.0 for better visibility
  lightEffects: false,

  // Mouse interaction
  mouseInteraction: true,
  mouseRadius: 100,  // 50px radius for mouse interaction
  showMouseRadius: false,  // Show visual indicator of mouse influence
  connectCircuits: true,  // Enable circuit connection feature

  // Connection appearance
  connectionThickness: 1,  // Thickness of connection lines (1-5)
  connectionOpacity: 0.2,  // Opacity of connection lines (0.1-1.0)
  tempConnectionColor: COLORS.lightPurple,  // Color for temporary circuit connections

  // Particle path recalculation
  enableParticleTransitions: true,  // Enable particles to move between connected circuits
  transitionSpeed: 0.3,  // Speed multiplier for transitions (0.5-2.0)
  transitionEffect: 'line',  // Visual effect for transitions ('line', 'arc', 'bounce')
  enhanceConnections: false, // Add extra particles to connected circuits

  // Debug options
  debugMode: false, // Enable visual debugging helpers

  // Visual appearance
  colorScheme: 'teal',
  
  // Individual color settings (initially set to teal scheme values)
  customColors: {
    dotColor: COLORS.beige01,
    dotGhostColor: COLORS.beige01,
    circuitColor: COLORS.black,
    circuitNodeColor: COLORS.lightPink,
    particleColor: COLORS.yellow,
    glowColor: 'rgba(24, 129, 141, 0.5)',
    superGlowColor: 'rgba(37, 203, 223, 0.2)',
    connectionColor: COLORS.lightPink,
    backgroundColor: 'transparent',
  },
  
  // Flag to use custom colors instead of scheme colors
  useCustomColors: false,
  
  ...colorSchemes.teal,
};

// Create context
const ConfigContext = createContext(null);

// Config provider component
export const ConfigProvider = ({ children }) => {
  const [config, setConfig] = useState(defaultConfig);
  const [savedSchemes, setSavedSchemes] = useState({});

  // Update config and apply color scheme if needed
  const updateConfig = (newValues) => {
    setConfig(current => {
      // If color scheme is being updated and not using custom colors, apply its colors
      if (newValues.colorScheme && newValues.colorScheme !== current.colorScheme && !current.useCustomColors) {
        return {
          ...current,
          ...newValues,
          ...colorSchemes[newValues.colorScheme],
        };
      }
      
      // If updating custom colors, update them in the customColors object
      if (newValues.customColors) {
        return {
          ...current,
          ...newValues,
          customColors: {
            ...current.customColors,
            ...newValues.customColors
          }
        };
      }
      
      // If toggling to use custom colors, apply them
      if (newValues.useCustomColors === true && !current.useCustomColors) {
        return {
          ...current,
          ...newValues,
          ...current.customColors,
        };
      }
      
      // If toggling to use scheme colors, reapply the current scheme
      if (newValues.useCustomColors === false && current.useCustomColors) {
        return {
          ...current,
          ...newValues,
          ...colorSchemes[current.colorScheme],
        };
      }

      // Otherwise just update specified values
      return { ...current, ...newValues };
    });
  };

  // Save current colors as a custom scheme
  const saveCustomScheme = (schemeName) => {
    if (!schemeName) return false;
    
    // Extract color values from current config
    const colorValues = {};
    Object.keys(defaultConfig.customColors).forEach(key => {
      colorValues[key] = config[key];
    });
    
    // Save the scheme
    setSavedSchemes(prev => ({
      ...prev,
      [schemeName]: colorValues
    }));
    
    // Try to persist to localStorage if available
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const allSchemes = {
          ...savedSchemes,
          [schemeName]: colorValues
        };
        window.localStorage.setItem('customColorSchemes', JSON.stringify(allSchemes));
      }
    } catch (e) {
      console.error('Failed to save scheme to localStorage:', e);
    }
    
    return true;
  };
  
  // Load a custom scheme
  const loadCustomScheme = (schemeName) => {
    if (!savedSchemes[schemeName]) return false;
    
    // Apply the saved scheme
    setConfig(current => ({
      ...current,
      ...savedSchemes[schemeName],
      customColors: { ...savedSchemes[schemeName] },
      useCustomColors: true
    }));
    
    return true;
  };
  
  // Load saved schemes from localStorage on initial mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const savedData = window.localStorage.getItem('customColorSchemes');
        if (savedData) {
          setSavedSchemes(JSON.parse(savedData));
        }
      }
    } catch (e) {
      console.error('Failed to load schemes from localStorage:', e);
    }
  }, []);

  // Reset to defaults
  const resetConfig = () => {
    setConfig(defaultConfig);
  };

  return (
    <ConfigContext.Provider value={{ 
      config, 
      updateConfig, 
      resetConfig, 
      colorSchemes,
      savedSchemes,
      saveCustomScheme,
      loadCustomScheme,
      COLORS
    }}>
      {children}
    </ConfigContext.Provider>
  );
};

// Hook for using config
export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
};

export default ConfigContext;
