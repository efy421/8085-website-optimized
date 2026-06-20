# Design 8085 - Circuit Animation

A React-based interactive circuit board animation with configurable styles and behaviors.

## Features

- Interactive circuit animation with customizable parameters
- Multiple color schemes (teal, purple, blue, green, orange)
- Adjustable dot spacing and circuit density
- Particle speed control
- Toggle for light/glow effects
- Responsive design that adapts to screen size

## Technologies Used

- React 18
- Vite
- Tailwind CSS
- shadcn/ui components
- Canvas API for animations

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Build for production:

```bash
npm run build
```

## Usage

- Click "Show Controls" in the top-right corner to adjust animation settings
- Change color schemes, dot spacing, circuit size, and particle speed
- Toggle light effects on/off for different visual styles
- Click "Reset Animation" to regenerate the circuit layout

## Project Structure

```
src/
├── components/
│   ├── CircuitCanvas.jsx     # Main canvas component
│   └── ui/                   # shadcn components
├── lib/
│   ├── config.js             # Configuration system
│   ├── utils.js              # Utility functions
│   └── animation/            # Animation modules
│       ├── dots.js           # Dot generation logic
│       ├── circuits.js       # Circuit path generation
│       ├── things.js         # Moving elements logic
│       ├── renderer.js       # Canvas rendering operations
│       └── utils.js          # Animation utility classes
├── styles/
│   └── globals.css           # Global styles
├── App.jsx                   # Main application component
└── main.jsx                  # Entry point
```

## Customization

The animation can be customized through the control panel or by modifying the default configuration in the `config.js` file.

## License

MIT
