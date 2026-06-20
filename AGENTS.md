# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Project Overview

Design 8085 is a React-based interactive circuit board animation with configurable visual parameters. It renders dynamic circuit patterns with flowing particles, mouse interactions, and customizable styling through a comprehensive control system.

## Development Commands

- **Development**: `npm run dev` - Starts Vite development server
- **Build**: `npm run build` - Creates production build
- **Lint**: `npm run lint` - Runs ESLint with JSX support
- **Preview**: `npm run preview` - Preview production build locally

## Architecture

### Core Technology Stack
- React 18 with functional components and hooks
- Vite as build tool and dev server
- Tailwind CSS for styling with custom component system
- Canvas API for real-time 2D animation rendering
- shadcn/ui component library for controls

### Key Architectural Patterns

**Configuration System**: Centralized React Context (`src/lib/config.jsx`) manages all animation parameters, color schemes, and user preferences. Uses React Context with custom hooks for state management across components.

**Animation Engine**: Modular animation system in `src/lib/animation/`:
- `renderer.js` - Main animation loop and canvas operations
- `circuits.js` - Circuit path generation and connection logic  
- `dots.js` - Grid dot positioning and rendering
- `things.js` - Particle movement and behaviors
- `utils.js` - Animation utilities and mathematical helpers

**Component Structure**: Single main canvas component (`CircuitCanvas.jsx`) handles all animation rendering and user interactions, with separate UI components for controls.

### Animation System Details

The animation uses a grid-based approach where:
1. Dots are positioned in a regular grid pattern
2. Circuits are generated as connected paths between dots
3. Particles move along circuit paths with configurable behaviors
4. Mouse interaction creates temporary connections between nearby circuits
5. All rendering happens on a single Canvas element with RequestAnimationFrame

### Configuration Architecture

- **Color Schemes**: Predefined themes (teal, purple, blue, green, orange) with full color customization
- **Animation Parameters**: Dot spacing, circuit density, particle speed, visual effects
- **Mouse Interaction**: Configurable radius, connection visualization, particle transitions
- **Persistence**: Custom color schemes saved to localStorage

### Development Controls

Control panel is only shown in development mode (`import.meta.env.MODE === 'development'`) and provides real-time parameter adjustment without restart.

## File Structure Significance

- `src/lib/config.jsx` - Central configuration with React Context
- `src/components/CircuitCanvas.jsx` - Main animation component
- `src/lib/animation/` - Core animation modules (renderer, circuits, particles, utilities)
- `src/components/ui/` - shadcn/ui component library
- All animation logic is Canvas-based, not DOM-based for performance