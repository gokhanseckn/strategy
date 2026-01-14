
export type ResourceType = 'wood' | 'clay' | 'iron' | 'crop';

export interface Resource {
  type: ResourceType;
  amount: number;
  production: number; // per hour
  icon: string;
}

export interface BuildingType {
  id: string;
  name: string;
  description: string;
  image: string;
  cost: { [key in ResourceType]: number };
  buildTime: number; // seconds
}

export interface BuildingSlot {
  id: number;
  typeId: string | null; // null if empty
  level: number;
  position: { top: string; left: string }; // CSS position for icon centering (fallback/overlay)
  points?: string; // SVG polygon points "x,y x,y ..."
  constructionEndTime?: number; // Timestamp when construction finishes
}

export const RESOURCES: Record<ResourceType, Resource> = {
  wood: { type: 'wood', amount: 750, production: 60, icon: '/assets/wood.png' },
  clay: { type: 'clay', amount: 750, production: 60, icon: '/assets/brick.png' },
  iron: { type: 'iron', amount: 750, production: 60, icon: '/assets/iron.png' },
  crop: { type: 'crop', amount: 750, production: 60, icon: '/assets/crop.png' },
};

export const BUILDINGS: BuildingType[] = [
  {
    id: 'main_building',
    name: 'Main Building',
    description: 'The home of the village architects. The higher the level, the faster other buildings are constructed.',
    image: '/assets/town_hall.png',
    cost: { wood: 70, clay: 40, iron: 60, crop: 20 },
    buildTime: 10,
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    description: 'The resources wood, clay and iron are stored in your warehouse.',
    image: '/assets/warehouse.png',
    cost: { wood: 130, clay: 160, iron: 90, crop: 40 },
    buildTime: 15,
  },
  {
    id: 'granary',
    name: 'Granary',
    description: 'The crop produced by your farms is stored in the granary.',
    image: '/assets/granary.png',
    cost: { wood: 80, clay: 100, iron: 70, crop: 20 },
    buildTime: 15,
  },
  {
    id: 'barracks',
    name: 'Barracks',
    description: 'All foot soldiers are trained in the barracks.',
    image: '/assets/barracks.png',
    cost: { wood: 210, clay: 140, iron: 260, crop: 120 },
    buildTime: 30,
  },
  {
    id: 'stable',
    name: 'Stable',
    description: 'Cavalry units are trained in the stable.',
    image: '/assets/stable.png',
    cost: { wood: 260, clay: 140, iron: 220, crop: 100 },
    buildTime: 35,
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'At the marketplace you can trade resources with other players.',
    image: '/assets/marketplace.png',
    cost: { wood: 80, clay: 70, iron: 120, crop: 70 },
    buildTime: 20,
  },
  {
    id: 'academy',
    name: 'Academy',
    description: 'New unit types can be researched in the academy.',
    image: '/assets/academy.png',
    cost: { wood: 220, clay: 160, iron: 90, crop: 40 },
    buildTime: 40,
  },
  {
    id: 'smithy',
    name: 'Smithy',
    description: 'The weapons and armor of your warriors are improved in the smithy.',
    image: '/assets/blacksmith.png',
    cost: { wood: 170, clay: 200, iron: 380, crop: 130 },
    buildTime: 40,
  },
  {
    id: 'cranny',
    name: 'Cranny',
    description: 'The cranny hides some of your resources from attackers.',
    image: '/assets/warehouse.png',
    cost: { wood: 40, clay: 50, iron: 30, crop: 10 },
    buildTime: 10,
  },
  {
    id: 'farm',
    name: 'Flour Mill', // Renaming Farm to Flour Mill as it sits inside
    description: 'Flour mills increase crop production.',
    image: '/assets/farm.png',
    cost: { wood: 500, clay: 440, iron: 380, crop: 1200 },
    buildTime: 60,
  },
  {
    id: 'treasury',
    name: 'Treasury', // Using Gold Mine asset
    description: 'The riches of your empire are kept here.',
    image: '/assets/gold_mine.png',
    cost: { wood: 2880, clay: 2740, iron: 2580, crop: 990 },
    buildTime: 120,
  },
];

// Define 18 slots mapped to the "village-bg.png" isometric layout.
// Coordinates adjusted to sit precisely on dirt patches (Shifted down relative to previous values).
export const INITIAL_SLOTS: BuildingSlot[] = [
  // --- Row 1: Top (2 squares) ---
  { id: 1, typeId: null, level: 0, position: { top: '18%', left: '52%' } },
  { id: 2, typeId: null, level: 0, position: { top: '23%', left: '42%' } },

  // --- Row 2: Upper (3 squares) ---
  { id: 3, typeId: null, level: 0, position: { top: '34%', left: '24%' } },
  { id: 4, typeId: null, level: 0, position: { top: '34%', left: '45%' } },
  { id: 5, typeId: null, level: 0, position: { top: '34%', left: '60%' } },

  // --- Row 3: Upper-Middle (4 squares) - Main Building is here ---
  { id: 6, typeId: null, level: 0, position: { top: '43%', left: '23%' } },
  { id: 7, typeId: 'main_building', level: 1, position: { top: '40%', left: '38%' } }, // Main Building (Visual tweak for height)
  { id: 8, typeId: null, level: 0, position: { top: '43%', left: '53%' } },
  { id: 9, typeId: null, level: 0, position: { top: '40%', left: '76%' } }, // Across river (Higher)

  // --- Row 4: Middle (4 squares) ---
  { id: 10, typeId: null, level: 0, position: { top: '53%', left: '15%' } },
  { id: 11, typeId: null, level: 0, position: { top: '53%', left: '31%' } },
  { id: 12, typeId: null, level: 0, position: { top: '53%', left: '46%' } },
  { id: 13, typeId: null, level: 0, position: { top: '54%', left: '68%' } }, // Near river

  // --- Row 5: Lower-Middle (3 squares) ---
  { id: 14, typeId: null, level: 0, position: { top: '62%', left: '24%' } },
  { id: 15, typeId: null, level: 0, position: { top: '62%', left: '39%' } },
  { id: 16, typeId: null, level: 0, position: { top: '60%', left: '60%' } }, // Near waterfall (Higher)

  // --- Row 6: Bottom (2 squares) ---
  { id: 17, typeId: null, level: 0, position: { top: '72%', left: '31%' } },
  { id: 18, typeId: null, level: 0, position: { top: '74%', left: '47%' } },
];
