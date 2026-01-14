'use client';

import React from 'react';
import Image from 'next/image';
import { BUILDINGS, BuildingType } from '../lib/gameData';
import { useGame } from '../context/GameContext';

interface ConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConstruct: (buildingId: string) => void;
}

export default function ConstructionModal({ isOpen, onClose, onConstruct }: ConstructionModalProps) {
  const { gameState } = useGame();

  if (!isOpen) return null;

  // Filter buildings dynamically
  const availableBuildings = BUILDINGS.filter((building) => {
    // Allow multiple Warehouses and Granaries
    if (building.id === 'warehouse' || building.id === 'granary') {
      return true;
    }

    // Check if this building type is already constructed in any slot
    const isBuilt = gameState.slots.some(slot => slot.typeId === building.id);
    return !isBuilt;
  });

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
      <div className="w-full max-w-4xl h-[80vh] rounded-lg shadow-2xl border-4 border-[#8B4513] flex flex-col overflow-hidden bg-[#F5EED5]">
        {/* Header */}
        <div className="bg-[#8B4513] text-[#F5EED5] p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold uppercase tracking-wider">Construct New Building</h2>
          <button
            onClick={onClose}
            className="hover:bg-[#A0522D] p-1 rounded transition-colors text-2xl font-bold leading-none"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableBuildings.map((building) => (
            <div
              key={building.id}
              className="bg-[#EFE6C9] border border-[#D2B48C] rounded p-4 flex gap-4 hover:shadow-lg transition-all hover:border-[#8B4513] group"
            >
              <div className="relative w-24 h-24 shrink-0 bg-[#D4C4A8] rounded border border-[#C0B096] p-2 flex items-center justify-center">
                <Image
                  src={building.image}
                  alt={building.name}
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              <div className="flex flex-col flex-1">
                <h3 className="font-bold text-[#4A3728] text-lg group-hover:text-[#8B4513]">{building.name}</h3>
                <p className="text-sm text-[#6B5A4A] leading-tight mb-3 line-clamp-2">{building.description}</p>

                {/* Costs */}
                <div className="mt-auto">
                  <div className="flex gap-3 text-xs font-semibold text-[#4A3728] mb-3">
                    <span className="flex items-center gap-1"><Image src="/assets/wood.png" width={14} height={14} alt="Wood" /> {building.cost.wood}</span>
                    <span className="flex items-center gap-1"><Image src="/assets/brick.png" width={14} height={14} alt="Clay" /> {building.cost.clay}</span>
                    <span className="flex items-center gap-1"><Image src="/assets/iron.png" width={14} height={14} alt="Iron" /> {building.cost.iron}</span>
                    <span className="flex items-center gap-1"><Image src="/assets/crop.png" width={14} height={14} alt="Crop" /> {building.cost.crop}</span>
                  </div>

                  <button
                    onClick={() => onConstruct(building.id)}
                    className="w-full bg-[#8FBC8F] hover:bg-[#76A876] text-white font-bold py-1 px-3 rounded text-sm shadow border-b-4 border-[#5F8C5F] active:border-0 active:translate-y-1 transition-all"
                  >
                    Construct Building
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
