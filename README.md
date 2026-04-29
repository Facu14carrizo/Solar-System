# COSMOS — Solar System Explorer

A cinematic, interactive 3D solar system built with React, Three.js, and React Three Fiber.

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Open http://localhost:5173 in your browser.

## Controls

| Action | Input |
|--------|-------|
| Orbit camera | Left-click + drag |
| Zoom | Scroll wheel |
| Select planet | Click on planet or use left nav |
| Close panel | × button or click elsewhere |

## Features

- **8 planets + Sun** — all with individual orbits, rotation speeds, and visual properties
- **Post-processing** — Bloom glow, vignette via @react-three/postprocessing
- **Glassmorphism UI** — Control bar, info panel, planet nav
- **Cinematic mode** — subtle camera drift for passive viewing
- **Visual toggles** — Orbits, labels, atmospheres on/off
- **Speed control** — 0.25× to 5× simulation speed
- **Planet details** — diameter, distance, orbital period, facts
- **Loading screen** — animated intro with progress indicator

## Project Structure

```
src/
├── components/
│   ├── scene/           # Three.js / R3F 3D components
│   │   ├── SolarSystemScene.tsx
│   │   ├── Sun.tsx
│   │   ├── Planet.tsx
│   │   ├── OrbitRing.tsx
│   │   ├── StarsBackground.tsx
│   │   ├── SpaceDust.tsx
│   │   └── CameraController.tsx
│   └── ui/              # React UI components
│       ├── Header.tsx
│       ├── PlanetNav.tsx
│       ├── PlanetInfoPanel.tsx
│       ├── ControlBar.tsx
│       └── LoadingScreen.tsx
├── data/
│   └── planets.ts       # All planet data & types
├── hooks/
│   └── useSimulation.ts # Zustand state store
├── App.tsx
├── main.tsx
└── index.css
```

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** (build tool)
- **Three.js** + **React Three Fiber** (3D)
- **@react-three/drei** (helpers: OrbitControls, Sphere, Ring, Html)
- **@react-three/postprocessing** (Bloom, Vignette)
- **Framer Motion** (UI animations)
- **Zustand** (state management)
- **Tailwind CSS** (styling)
