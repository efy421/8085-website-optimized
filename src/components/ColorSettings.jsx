import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { useConfig } from '../lib/config.jsx';

const ColorSettings = () => {
  const { 
    config, 
    updateConfig, 
    resetConfig, 
    COLORS,
    saveCustomScheme,
    loadCustomScheme,
    savedSchemes 
  } = useConfig();
  
  const [schemeName, setSchemeName] = useState('');
  const [showColorSettings, setShowColorSettings] = useState(false);
  
  // Colors that can be customized
  const colorSettings = [
    { key: 'dotColor', label: 'Dot Color', description: 'Color of the background dots' },
    { key: 'dotGhostColor', label: 'Dot Ghost Color', description: 'Color of the glowing dots' },
    { key: 'circuitColor', label: 'Circuit Color', description: 'Color of the circuit lines' },
    { key: 'circuitNodeColor', label: 'Circuit Node Color', description: 'Color of the circuit connection points' },
    { key: 'particleColor', label: 'Particle Color', description: 'Color of the moving particles' },
    { key: 'glowColor', label: 'Glow Color', description: 'Color of the particle glow effect' },
    { key: 'superGlowColor', label: 'Super Glow Color', description: 'Color of the enhanced glow effect' },
    { key: 'connectionColor', label: 'Connection Color', description: 'Color of temporary circuit connections' },
    { key: 'backgroundColor', label: 'Background Color', description: 'Background color for the canvas' },
  ];
  
  // Predefined color suggestions
  const colorSuggestions = [
    { label: 'Beige Light', value: COLORS.beige01 },
    { label: 'Beige Dark', value: COLORS.beige02 },
    { label: 'Light Pink', value: COLORS.lightPink },
    { label: 'Yellow', value: COLORS.yellow },
    { label: 'Light Purple', value: COLORS.lightPurple },
    { label: 'Black', value: COLORS.black },
  ];
  
  // Handle color change
  const handleColorChange = (key, value) => {
    // Update only the customColors first
    updateConfig({
      customColors: {
        [key]: value
      }
    });
    
    // If we're already using custom colors, apply the change immediately
    if (config.useCustomColors) {
      updateConfig({
        [key]: value
      });
    }
  };
  
  // Toggle between custom colors and scheme colors
  const toggleCustomColors = (enabled) => {
    updateConfig({ useCustomColors: enabled });
  };
  
  // Handle saving the current color scheme
  const handleSaveScheme = () => {
    if (!schemeName.trim()) {
      alert('Please enter a name for your color scheme');
      return;
    }
    
    if (saveCustomScheme(schemeName.trim())) {
      alert(`Color scheme "${schemeName}" saved successfully!`);
      setSchemeName('');
    } else {
      alert('Failed to save color scheme');
    }
  };
  
  // Handle loading a saved scheme
  const handleLoadScheme = (name) => {
    if (loadCustomScheme(name)) {
      // Success message could be added
    } else {
      alert(`Failed to load scheme "${name}"`);
    }
  };
  
  return (
    <Card className="w-full bg-black/80 text-white border-gray-700 mb-4">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Color Settings</span>
          <Button 
            variant="ghost" 
            className="h-8 text-xs"
            onClick={() => setShowColorSettings(!showColorSettings)}
          >
            {showColorSettings ? 'Hide Settings' : 'Show Settings'}
          </Button>
        </CardTitle>
      </CardHeader>
      
      {showColorSettings && (
        <CardContent>
          {/* Enable custom colors toggle */}
          <div className="flex items-center mb-4">
            <Switch
              id="useCustomColors"
              checked={config.useCustomColors}
              onCheckedChange={toggleCustomColors}
            />
            <Label htmlFor="useCustomColors" className="ml-2">
              Use Custom Colors
            </Label>
          </div>
          
          {/* Color settings */}
          <div className="space-y-4">
            {colorSettings.map(({ key, label, description }) => (
              <div key={key} className="mb-4">
                <Label htmlFor={key} className="block mb-2 font-medium">
                  {label}
                </Label>
                <p className="text-xs text-gray-400 mb-2">{description}</p>
                
                <div className="flex items-center">
                  <input
                    type="color"
                    id={key}
                    value={config.useCustomColors ? config[key] : config.customColors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    disabled={!config.useCustomColors}
                    className="w-10 h-10 p-0 border-0 rounded-md mr-2"
                  />
                  <input
                    type="text"
                    value={config.useCustomColors ? config[key] : config.customColors[key]}
                    onChange={(e) => handleColorChange(key, e.target.value)}
                    disabled={!config.useCustomColors}
                    className="bg-gray-900 text-white text-sm rounded-md border-gray-700 px-2 py-1 w-32"
                  />
                </div>
                
                {/* Color suggestions */}
                <div className="flex flex-wrap mt-2 gap-2">
                  {colorSuggestions.map((color) => (
                    <button
                      key={`${key}-${color.value}`}
                      onClick={() => handleColorChange(key, color.value)}
                      disabled={!config.useCustomColors}
                      className="w-6 h-6 rounded-full border border-gray-600 hover:border-white transition-colors"
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Save/Load Scheme */}
          <div className="mt-6 border-t border-gray-700 pt-4">
            <h3 className="text-lg font-medium mb-2">Save Current Colors</h3>
            <div className="flex mb-4">
              <input
                type="text"
                value={schemeName}
                onChange={(e) => setSchemeName(e.target.value)}
                placeholder="Scheme name"
                className="bg-gray-900 text-white rounded-md border-gray-700 px-2 py-1 mr-2 flex-grow"
              />
              <Button 
                onClick={handleSaveScheme}
                disabled={!schemeName.trim() || !config.useCustomColors}
                className="bg-gray-800 hover:bg-gray-700"
              >
                Save
              </Button>
            </div>
            
            {/* Saved schemes */}
            {Object.keys(savedSchemes).length > 0 && (
              <div>
                <h3 className="text-lg font-medium mb-2">Saved Schemes</h3>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(savedSchemes).map((name) => (
                    <Button
                      key={name}
                      onClick={() => handleLoadScheme(name)}
                      className="bg-gray-800 hover:bg-gray-700 text-left overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Reset to default */}
            <div className="mt-4">
              <Button
                onClick={resetConfig}
                className="bg-red-800 hover:bg-red-700 w-full"
              >
                Reset All Settings
              </Button>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default ColorSettings;
