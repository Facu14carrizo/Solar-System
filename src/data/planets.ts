export interface MoonData {
  id: string
  name: string
  radius: number
  orbitRadius: number
  orbitSpeed: number
  color: string
  description?: string
}

export interface PlanetData {
  id: string
  name: string
  radius: number           // visual radius (scene units)
  orbitRadius: number      // distance from sun (scene units)
  orbitSpeed: number       // radians per second (base speed)
  rotationSpeed: number    // self-rotation speed
  color: string            // primary color
  emissive: string         // emissive color
  roughness: number
  metalness: number
  rings?: boolean          // has rings
  ringColor?: string
  tilt: number             // axial tilt in radians
  moons: number
  mainMoons?: MoonData[]   // Specific data for main moons
  // Info panel data
  realDiameter: string
  realDistance: string
  orbitalPeriod: string
  description: string
  facts: string[]
  atmosphereColor?: string
  atmosphereOpacity?: number
  glowColor: string
}

export const PLANETS: PlanetData[] = [
  {
    id: 'mercury',
    name: 'Mercurio',
    radius: 0.38,
    orbitRadius: 6,
    orbitSpeed: 0.047,
    rotationSpeed: 0.003,
    color: '#b5b5b5',
    emissive: '#3a3a3a',
    roughness: 0.9,
    metalness: 0.1,
    tilt: 0.03,
    moons: 0,
    realDiameter: '4.879 km',
    realDistance: '77.3M km',
    orbitalPeriod: '88 días terrestres',
    description: 'El planeta más pequeño e interno del Sistema Solar. Un mundo de temperaturas extremas, sin atmósfera para retener el calor.',
    facts: [
      'Las temperaturas superficiales oscilan entre -180°C y 430°C',
      'Orbita el Sol más rápido que cualquier otro planeta',
      'Tiene un gran núcleo de hierro que ocupa el 85% de su radio',
    ],
    atmosphereColor: '#b5b5b5',
    atmosphereOpacity: 0.02,
    glowColor: '#9ca3af',
  },
  {
    id: 'venus',
    name: 'Venus',
    radius: 0.95,
    orbitRadius: 9,
    orbitSpeed: 0.035,
    rotationSpeed: -0.002,
    color: '#e8c17a',
    emissive: '#7a5a20',
    roughness: 0.7,
    metalness: 0.0,
    tilt: 3.096,
    moons: 0,
    realDiameter: '12.104 km',
    realDistance: '261M km',
    orbitalPeriod: '225 días terrestres',
    description: 'El planeta más caliente de nuestro sistema solar, envuelto en espesas nubes de ácido sulfúrico. A menudo llamado el gemelo de la Tierra debido a su tamaño similar.',
    facts: [
      'La temperatura superficial alcanza los 465°C, más caliente que Mercurio',
      'Gira hacia atrás en comparación con la mayoría de los planetas',
      'Un día en Venus es más largo que su año',
    ],
    atmosphereColor: '#f0c060',
    atmosphereOpacity: 0.25,
    glowColor: '#d4a017',
  },
  {
    id: 'earth',
    name: 'Tierra',
    radius: 1.0,
    orbitRadius: 13,
    orbitSpeed: 0.029,
    rotationSpeed: 0.02,
    color: '#4b9cd3',
    emissive: '#0a2a4a',
    roughness: 0.6,
    metalness: 0.1,
    tilt: 0.408,
    moons: 1,
    mainMoons: [
      { 
        id: 'moon', 
        name: 'Luna', 
        radius: 0.27, 
        orbitRadius: 1.8, 
        orbitSpeed: 0.8, 
        color: '#d5d5d5',
        description: 'El único satélite natural de la Tierra y el quinto más grande del sistema solar.'
      }
    ],
    realDiameter: '12.742 km',
    realDistance: '149.6M km',
    orbitalPeriod: '365.25 días',
    description: 'Nuestro hogar: el único planeta conocido que alberga vida. Los vastos océanos, la atmósfera rica en oxígeno y el campo magnético de la Tierra la hacen excepcionalmente habitable.',
    facts: [
      'El 71% de la superficie está cubierta por agua',
      'El único planeta conocido que alberga vida',
      'Tiene un poderoso campo magnético que protege del viento solar',
    ],
    atmosphereColor: '#4b9cd3',
    atmosphereOpacity: 0.15,
    glowColor: '#3b82f6',
  },
  {
    id: 'mars',
    name: 'Marte',
    radius: 0.53,
    orbitRadius: 17,
    orbitSpeed: 0.024,
    rotationSpeed: 0.019,
    color: '#c1440e',
    emissive: '#5a1e05',
    roughness: 0.85,
    metalness: 0.05,
    tilt: 0.44,
    moons: 2,
    mainMoons: [
      { id: 'phobos', name: 'Fobos', radius: 0.12, orbitRadius: 0.9, orbitSpeed: 1.2, color: '#a1958b', description: 'La más grande de las dos lunas de Marte, con una órbita muy cercana.' },
      { id: 'deimos', name: 'Deimos', radius: 0.08, orbitRadius: 1.3, orbitSpeed: 0.7, color: '#8b8b8b', description: 'La más pequeña y externa de las lunas de Marte.' }
    ],
    realDiameter: '6.779 km',
    realDistance: '225M km',
    orbitalPeriod: '687 días terrestres',
    description: 'El Planeta Rojo: un mundo desértico y frío con el volcán más alto del sistema solar. Un objetivo principal para la exploración humana.',
    facts: [
      'Hogar del Olympus Mons, el volcán más alto (21 km de altura)',
      'Tiene el cañón más grande: Valles Marineris — 4.000 km de largo',
      'Atmósfera delgada de CO₂, presión superficial del 1% de la Tierra',
    ],
    atmosphereColor: '#c1440e',
    atmosphereOpacity: 0.08,
    glowColor: '#ef4444',
  },
  {
    id: 'jupiter',
    name: 'Júpiter',
    radius: 2.8,
    orbitRadius: 26,
    orbitSpeed: 0.013,
    rotationSpeed: 0.04,
    color: '#c88b3a',
    emissive: '#4a2e10',
    roughness: 0.4,
    metalness: 0.0,
    tilt: 0.054,
    moons: 95,
    mainMoons: [
      { id: 'io', name: 'Ío', radius: 0.28, orbitRadius: 3.8, orbitSpeed: 1.5, color: '#f5e050', description: 'El cuerpo con mayor actividad volcánica del sistema solar.' },
      { id: 'europa', name: 'Europa', radius: 0.24, orbitRadius: 4.5, orbitSpeed: 1.2, color: '#e5e5e5', description: 'Posee una superficie de hielo lisa y un posible océano subterráneo.' },
      { id: 'ganymede', name: 'Ganímedes', radius: 0.41, orbitRadius: 5.4, orbitSpeed: 0.9, color: '#9a8b7a', description: 'La luna más grande del sistema solar, incluso mayor que Mercurio.' },
      { id: 'callisto', name: 'Calisto', radius: 0.38, orbitRadius: 6.5, orbitSpeed: 0.6, color: '#7a7a7a', description: 'El cuerpo con más cráteres del sistema solar.' }
    ],
    realDiameter: '139.820 km',
    realDistance: '778.5M km',
    orbitalPeriod: '11.86 años terrestres',
    description: 'El gigante: más del doble de masivo que todos los demás planetas combinados. Su icónica Gran Mancha Roja es una tormenta que ha rugido durante siglos.',
    facts: [
      'La Gran Mancha Roja es una tormenta 1,3 veces el tamaño de la Tierra',
      'Tiene al menos 95 lunas conocidas',
      'Campo magnético 20.000 veces más fuerte que el de la Tierra',
    ],
    atmosphereColor: '#d4a060',
    atmosphereOpacity: 0.2,
    glowColor: '#f59e0b',
  },
  {
    id: 'saturn',
    name: 'Saturno',
    radius: 2.3,
    orbitRadius: 36,
    orbitSpeed: 0.0097,
    rotationSpeed: 0.038,
    color: '#e4d191',
    emissive: '#4a3e10',
    roughness: 0.35,
    metalness: 0.0,
    rings: true,
    ringColor: '#c8b560',
    tilt: 0.466,
    moons: 146,
    mainMoons: [
      { id: 'titan', name: 'Titán', radius: 0.4, orbitRadius: 4.2, orbitSpeed: 1.1, color: '#f5b041', description: 'La única luna conocida con una atmósfera densa y lagos de metano.' },
      { id: 'enceladus', name: 'Encélado', radius: 0.15, orbitRadius: 3.2, orbitSpeed: 1.4, color: '#ffffff', description: 'Famosa por sus géiseres de agua que brotan del polo sur.' }
    ],
    realDiameter: '116.460 km',
    realDistance: '1.43B km',
    orbitalPeriod: '29.5 años terrestres',
    description: 'La joya del sistema solar. El magnífico sistema de anillos de Saturno, hecho de hielo y roca, lo convierte en el planeta más impresionante visualmente.',
    facts: [
      'Los anillos se extienden hasta 282.000 km desde el planeta',
      'Menos denso que el agua: flotaría en un océano gigante',
      'Tiene 146 lunas conocidas, incluyendo Titán con una atmósfera espesa',
    ],
    atmosphereColor: '#e8d890',
    atmosphereOpacity: 0.2,
    glowColor: '#fde68a',
  },
  {
    id: 'uranus',
    name: 'Urano',
    radius: 1.7,
    orbitRadius: 46,
    orbitSpeed: 0.0068,
    rotationSpeed: -0.03,
    color: '#7de8e8',
    emissive: '#1a4a4a',
    roughness: 0.3,
    metalness: 0.1,
    rings: true,
    ringColor: '#5ab8c8',
    tilt: 1.707,
    moons: 27,
    mainMoons: [
      { id: 'titania', name: 'Titania', radius: 0.2, orbitRadius: 2.8, orbitSpeed: 1.0, color: '#cfcfcf', description: 'La luna más grande de Urano, compuesta de hielo y roca.' },
      { id: 'oberon', name: 'Oberón', radius: 0.18, orbitRadius: 3.2, orbitSpeed: 0.8, color: '#bfbfbf', description: 'La luna más externa de Urano, con cráteres y montañas.' }
    ],
    realDiameter: '50.724 km',
    realDistance: '2.87B km',
    orbitalPeriod: '84 años terrestres',
    description: 'El gigante de hielo que gira de lado. Urano tiene una inclinación axial extrema única, lo que provoca estaciones dramáticas que duran más de 20 años cada una.',
    facts: [
      'Gira de lado con una inclinación axial de 98°',
      'La atmósfera planetaria más fría a -224°C',
      'Tiene 13 anillos conocidos y 27 lunas',
    ],
    atmosphereColor: '#7de8e8',
    atmosphereOpacity: 0.2,
    glowColor: '#22d3ee',
  },
  {
    id: 'neptune',
    name: 'Neptuno',
    radius: 1.65,
    orbitRadius: 57,
    orbitSpeed: 0.0054,
    rotationSpeed: 0.032,
    color: '#3f54ba',
    emissive: '#0f1a5a',
    roughness: 0.4,
    metalness: 0.1,
    tilt: 0.494,
    moons: 16,
    mainMoons: [
      { id: 'triton', name: 'Tritón', radius: 0.22, orbitRadius: 2.5, orbitSpeed: -0.9, color: '#e5e5e5', description: 'Gira en dirección opuesta a su planeta y tiene volcanes de nitrógeno.' }
    ],
    realDiameter: '49.244 km',
    realDistance: '4.5B km',
    orbitalPeriod: '165 años terrestres',
    description: 'El planeta más ventoso de nuestro sistema solar, con tormentas que alcanzan los 2.100 km/h. Neptuno completa una órbita alrededor del Sol cada 165 años terrestres.',
    facts: [
      'Los vientos pueden alcanzar velocidades de 2.100 km/h, los más rápidos del sistema solar',
      'Tarda 165 años terrestres en completar una órbita',
      'Tiene una gran tormenta llamada la Gran Mancha Oscura',
    ],
    atmosphereColor: '#3f54ba',
    atmosphereOpacity: 0.2,
    glowColor: '#6366f1',
  },
]

export const SUN_DATA = {
  id: 'sun',
  name: 'El Sol',
  radius: 3.5,
  color: '#FDB813',
  emissive: '#FF6000',
  realDiameter: '1.392.700 km',
  description: 'Nuestra estrella: una esfera masiva de plasma mantenida por la gravedad. Contiene el 99,86% de toda la masa del sistema solar.',
  facts: [
    'Temperatura superficial: 5.500°C; Núcleo: 15.000.000°C',
    'Cada segundo, 4 millones de toneladas de masa se convierten en energía',
    'La luz tarda 8 minutos en llegar a la Tierra',
  ],
  orbitalPeriod: '—',
  realDistance: '0',
  glowColor: '#FDB813',
}
