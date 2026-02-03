# Runic Representation Converter

A web application that converts numbers (0-9999) into visual runic representations using a custom segment-based display system. The converter displays numbers as runic symbols and allows users to download the representations as SVG files.

## How It Works

The converter uses a quadrant-based display system where numbers are drawn across four quadrants of a square canvas:
- **Quadrant Layout**: The display is divided into four quadrants: top-right (units), top-left (decades), bottom-right (hundreds) and bottom-left (thousands)
- **Symmetrical Transformations**: Each quadrant uses the same segment pattern but with different transformations creating a symmetrical runic symbols
- **Segment System**: Each digit (0-9) is represented by a combination of 5 line segments (horizontal, vertical, and diagonal) that are drawn within each quadrant
- **Central Line**: A vertical line runs through the center of the display when the number is non-zero, connecting the quadrants

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server

## How to run
```bash
npm install
npm run dev
```

## Project Structure

```
src/
├── components/
│   ├── segmentDisplay/    # Segment display component
│   └── svgIcon/           # SVG icon wrapper component
├── constants/
│   └── runicRepresentations.ts  # Segment mappings and path constants
├── views/
│   └── converter/         # Main converter view
└── App.tsx               # Root component
```