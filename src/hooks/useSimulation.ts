import { create } from 'zustand'
import type { PlanetData } from '../data/planets'

interface SimulationState {
  // Playback
  isPlaying: boolean
  speedMultiplier: number
  isCinematic: boolean

  // Selection
  selectedPlanet: PlanetData | null
  hoveredPlanet: string | null

  // Visual layers
  showOrbits: boolean
  showLabels: boolean
  showAtmospheres: boolean

  // Camera
  cameraTarget: [number, number, number] | null
  isFollowingPlanet: boolean

  // Actions
  togglePlay: () => void
  setSpeed: (speed: number) => void
  toggleCinematic: () => void
  selectPlanet: (planet: PlanetData | null) => void
  setHoveredPlanet: (id: string | null) => void
  toggleOrbits: () => void
  toggleLabels: () => void
  toggleAtmospheres: () => void
  setCameraTarget: (target: [number, number, number] | null) => void
  setFollowingPlanet: (following: boolean) => void
}

export const useSimulation = create<SimulationState>((set) => ({
  isPlaying: true,
  speedMultiplier: 1,
  isCinematic: false,
  selectedPlanet: null,
  hoveredPlanet: null,
  showOrbits: true,
  showLabels: true,
  showAtmospheres: true,
  cameraTarget: null,
  isFollowingPlanet: false,

  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setSpeed: (speed) => set({ speedMultiplier: speed }),
  toggleCinematic: () => set((s) => ({ isCinematic: !s.isCinematic })),
  selectPlanet: (planet) => set({ selectedPlanet: planet, cameraTarget: null }),
  setHoveredPlanet: (id) => set({ hoveredPlanet: id }),
  toggleOrbits: () => set((s) => ({ showOrbits: !s.showOrbits })),
  toggleLabels: () => set((s) => ({ showLabels: !s.showLabels })),
  toggleAtmospheres: () => set((s) => ({ showAtmospheres: !s.showAtmospheres })),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setFollowingPlanet: (following) => set({ isFollowingPlanet: following }),
}))
