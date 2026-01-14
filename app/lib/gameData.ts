
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
  constructionImage?: string;
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
    image: '/assets/main_building.png',
    constructionImage: '/assets/barracks_construction.png',
    cost: { wood: 70, clay: 40, iron: 60, crop: 20 },
    buildTime: 10,
  },
  {
    id: 'warehouse',
    name: 'Warehouse',
    description: 'The resources wood, clay and iron are stored in your warehouse.',
    image: '/assets/warehouse.png',
    constructionImage: '/assets/warehouse_construction.png',
    cost: { wood: 130, clay: 160, iron: 90, crop: 40 },
    buildTime: 15,
  },
  {
    id: 'granary',
    name: 'Granary',
    description: 'The crop produced by your farms is stored in the granary.',
    image: '/assets/granary.png',
    constructionImage: '/assets/granary_construction.png',
    cost: { wood: 80, clay: 100, iron: 70, crop: 20 },
    buildTime: 15,
  },
  {
    id: 'barracks',
    name: 'Barracks',
    description: 'All foot soldiers are trained in the barracks.',
    image: '/assets/barracks.png',
    constructionImage: '/assets/barracks_construction.png',
    cost: { wood: 210, clay: 140, iron: 260, crop: 120 },
    buildTime: 30,
  },
  {
    id: 'marketplace',
    name: 'Marketplace',
    description: 'At the marketplace you can trade resources with other players.',
    image: '/assets/marketplace.png',
    constructionImage: '/assets/marketplace_construction.png',
    cost: { wood: 80, clay: 70, iron: 120, crop: 70 },
    buildTime: 20,
  },
  {
    id: 'smithy',
    name: 'Smithy',
    description: 'The weapons and armor of your warriors are improved in the smithy.',
    image: '/assets/blacksmith.png',
    constructionImage: '/assets/blacksmith_construction.png',
    cost: { wood: 170, clay: 200, iron: 380, crop: 130 },
    buildTime: 40,
  },
];

// Define 18 slots mapped to the "village.png" isometric layout.
// Coordinates adjusted to sit precisely on dirt patches (Shifted down relative to previous values).
export const INITIAL_SLOTS: BuildingSlot[] = [
  { id: 1, typeId: null, level: 0, position: { top: '18%', left: '52%' } },
  { id: 2, typeId: null, level: 0, position: { top: '23%', left: '42%' } },
  { id: 3, typeId: null, level: 0, position: { top: '36%', left: '22%' } },
  { id: 4, typeId: null, level: 0, position: { top: '41%', left: '40%' } },
  { id: 5, typeId: null, level: 0, position: { top: '45%', left: '73%' } },
  { id: 6, typeId: null, level: 0, position: { top: '47%', left: '30%' } },
  { id: 7, typeId: 'main_building', level: 1, position: { top: '33%', left: '54%' } },
  { id: 8, typeId: null, level: 0, position: { top: '49%', left: '51%' } },
  { id: 9, typeId: null, level: 0, position: { top: '40%', left: '88%' } },
  { id: 10, typeId: null, level: 0, position: { top: '53%', left: '15%' } },
  { id: 11, typeId: null, level: 0, position: { top: '54%', left: '42%' } },
  { id: 12, typeId: null, level: 0, position: { top: '59%', left: '51%' } },
  { id: 13, typeId: null, level: 0, position: { top: '54%', left: '60%' } },
  { id: 14, typeId: null, level: 0, position: { top: '60%', left: '28%' } },
  { id: 15, typeId: null, level: 0, position: { top: '65%', left: '65%' } },
  { id: 16, typeId: null, level: 0, position: { top: '53%', left: '87%' } },
  { id: 17, typeId: null, level: 0, position: { top: '66%', left: '38%' } },
  { id: 18, typeId: null, level: 0, position: { top: '71%', left: '51%' } },
  { id: 19, typeId: null, level: 0, position: { top: '24%', left: '64%' } },
];
