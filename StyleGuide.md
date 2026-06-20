# Style Guide for 8085.ai Website

This document outlines the design system for the 8085.ai website, ensuring consistency across all pages and components.

## Typography

### Font Family
- **Primary Heading Font**: Poppins
- **Secondary Font**: Livvic
- **Variants**: 
  - Poppins Regular (400)
  - Poppins Semi-Bold (600)
  - Poppins Bold (700)
  - Poppins Black (900) - used for logo
  - Livvic Regular (400)
  - Livvic Medium (500)
  - Livvic Semi-Bold (600)

### Font Sizes
| Element | Size | Weight | Font Family |
|---------|------|--------|------------|
| H1 | 80px | Semi-Bold (600) | Poppins |
| H2 | 48px | Semi-Bold (600) | Livvic |
| H3 | 38px | Semi-Bold (600) | Livvic |
| H4 | 32px | Semi-Bold (600) | Livvic |
| H5 | 28px | Semi-Bold (600) | Livvic |
| H6 | 24px | Semi-Bold (600) | Livvic |
| Large Text | 28px | Regular | Livvic |
| Body Text | 18px | Regular (400) | Poppins |

### Usage Guidelines
- Use H1 for main page titles and hero sections (Poppins)
- Use H2-H6 for section headers in descending importance (Livvic)
- Use Large Text for emphasized content, quotes, or statistics (Livvic)
- Use Body Text for paragraphs and general content (Poppins)

## Color Palette

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Beige 01 | #F5F4ED | Primary background color |
| Beige 02 | #E0E0D6 | Secondary background color |
| Light Pink | #F2C3D3 | Accent color |
| Yellow | #F7D56F | Accent color, highlights (used for ".ai" in logo) |
| Light Purple | #D4BFFF | Accent color |
| Black | #101011 | Primary text color, buttons |

### Color Usage
- Use Beige 01 as the primary background color
- Use Beige 02 for secondary or alternating sections
- Use accent colors (Light Pink, Yellow, Light Purple) to highlight important elements
- Use Black for text and primary UI elements like buttons

## Spacing

### Standard Spacers
| Size | Usage |
|------|-------|
| 10px | Minimal spacing between close elements |
| 20px | Standard spacing between related elements |
| 30px | Medium spacing between content blocks |
| 50px | Large spacing between major content sections |
| 64px | Extra-large spacing for visual separation |
| 80px | Maximum spacing for major page sections |

### Spacing Guidelines
- Use consistent spacing within components
- Use larger spacing values (50px, 64px, 80px) between major sections
- Use smaller spacing values (10px, 20px, 30px) within components or related elements
- Maintain consistent vertical rhythm throughout pages

## Components

### Buttons
- Primary buttons: Black background with white text
- Border-radius: Full rounded (pill shape)
- Padding: 16px 24px (horizontal), 8px 16px (vertical)
- Hover state: Slight transparency (80% opacity)



### Cards/Sections
- Background: Usually Beige 01 or Beige 02
- Border-radius: 12px (if applicable)
- Box-shadow: Subtle shadow for elevated components

## Responsive Design
- Maintain proportional spacing at different breakpoints
- Adjust font sizes proportionally on smaller devices
- Standard breakpoints:
  - Mobile: 0-640px
  - Tablet: 641px-1024px
  - Desktop: 1025px+



---

## Implementation Notes

### CSS Variables
```css
:root {
  /* Colors */
  --beige-01: #F5F4ED;
  --beige-02: #E0E0D6;
  --light-pink: #F2C3D3;
  --yellow: #F7D56F;
  --light-purple: #D4BFFF;
  --black: #101011;
  
  /* Spacing */
  --space-xs: 10px;
  --space-sm: 20px;
  --space-md: 30px;
  --space-lg: 50px;
  --space-xl: 64px;
  --space-xxl: 80px;
}
```

### Tailwind Configuration
If using Tailwind CSS, the following settings can be added to the configuration:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'beige-01': '#F5F4ED',
        'beige-02': '#E0E0D6',
        'light-pink': '#F2C3D3',
        'yellow': '#F7D56F',
        'light-purple': '#D4BFFF',
        'black': '#101011',
      },
      spacing: {
        '10': '10px',
        '20': '20px',
        '30': '30px',
        '50': '50px',
        '64': '64px',
        '80': '80px',
      },
      fontSize: {
        'h1': '80px',
        'h2': '48px',
        'h3': '38px',
        'h4': '32px',
        'h5': '28px',
        'h6': '24px',
        'large': '28px',
        'body': '18px',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```
