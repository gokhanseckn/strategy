'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Resource, RESOURCES, BuildingSlot, INITIAL_SLOTS, BuildingType, BUILDINGS } from '../lib/gameData';

interface GameState {
  resources: { [key: string]: Resource };
  slots: BuildingSlot[];
}

interface GameContextType {
  gameState: GameState;
  constructBuilding: (slotId: number, buildingTypeId: string) => void;
  upgradeBuilding: (slotId: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [gameState, setGameState] = useState<GameState>({
    resources: RESOURCES,
    slots: INITIAL_SLOTS,
  });

  // Resource production loop & Construction Check
  useEffect(() => {
    const interval = setInterval(() => {
      setGameState((prev) => {
        const now = Date.now();
        const newResources = { ...prev.resources };

        // 1. Process Resources
        Object.keys(newResources).forEach((key) => {
          const amountToAdd = (newResources[key].production / 3600) * 10;
          newResources[key] = {
            ...newResources[key],
            amount: newResources[key].amount + amountToAdd,
          };
        });

        // 2. Process Construction
        const newSlots = prev.slots.map(slot => {
          // If under construction and time has passed
          if (slot.constructionEndTime && slot.constructionEndTime <= now) {
            // Construction finished! Clear the timer.
            const { constructionEndTime, ...rest } = slot;
            return {
              ...rest,
              // Ideally we'd increase level here if it was an upgrade, 
              // but for fresh construction we just keep the typeId set in constructBuilding
            };
          }
          return slot;
        });

        return { ...prev, resources: newResources, slots: newSlots };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const constructBuilding = (slotId: number, buildingTypeId: string) => {
    const building = BUILDINGS.find(b => b.id === buildingTypeId);
    if (!building) return;

    // TODO: Check costs here

    setGameState(prev => {
      const newSlots = prev.slots.map(slot => {
        if (slot.id === slotId) {
          return {
            ...slot,
            typeId: buildingTypeId,
            level: 1,
            constructionEndTime: Date.now() + 10000 // 10 seconds from now
          };
        }
        return slot;
      });
      return { ...prev, slots: newSlots };
    });
  };

  const upgradeBuilding = (slotId: number) => {
    // Placeholder
  };

  return (
    <GameContext.Provider value={{ gameState, constructBuilding, upgradeBuilding }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}