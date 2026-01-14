'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useGame } from '../context/GameContext';
import { BUILDINGS } from '../lib/gameData';
import ConstructionModal from './ConstructionModal';

export default function VillageMap() {
  const { gameState, constructBuilding } = useGame();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [now, setNow] = useState(Date.now());

  // Update 'now' every second to drive countdown timers
  React.useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSlotClick = (slotId: number) => {
    const slot = gameState.slots.find(s => s.id === slotId);
    if (slot) {
      if (slot.typeId) {
        alert(`Slot ${slotId} contains a Level ${slot.level} ${BUILDINGS.find(b => b.id === slot.typeId)?.name}`);
      } else {
        setSelectedSlot(slotId);
        setIsModalOpen(true);
      }
    }
  };

  const handleConstruct = (buildingId: string) => {
    if (selectedSlot !== null) {
      constructBuilding(selectedSlot, buildingId);
      setIsModalOpen(false);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="relative w-full max-w-4xl aspect-square mx-auto mt-8 select-none rounded-xl overflow-hidden shadow-2xl">
      {/* Background Image */}
      <Image
        src="/assets/village.png"
        alt="Village Map"
        fill
        className="object-cover"
        quality={100}
      // priority
      />

      {/* SVG Overlay for Coordinates and Interaction */}
      {/* Sort slots by 'top' position to ensure correct z-index layering (Painter's Algorithm) */}
      {[...gameState.slots]
        .sort((a, b) => parseFloat(a.position.top) - parseFloat(b.position.top))
        .map((slot) => {
          const building = slot.typeId ? BUILDINGS.find(b => b.id === slot.typeId) : null;

          const isConstructing = slot.constructionEndTime && slot.constructionEndTime > now;
          const remainingSeconds = isConstructing ? Math.ceil((slot.constructionEndTime! - now) / 1000) : 0;

          // Image to show: Construction placeholder if building, otherwise actual building
          // NOTE: User requested specific construction images for each building
          const displayImage = isConstructing ? (building?.constructionImage || '/assets/barrack_construction.png') : (building?.image);

          // Border color: Yellow/Brown if constructing, Green if finished
          const borderColor = isConstructing ? 'border-[#d97706]' : 'border-[#4ade80]'; // amber-600 vs green-400

          return (
            // Wrapper for positioning - does not clip children
            <div
              key={slot.id}
              style={{
                top: slot.position.top,
                left: slot.position.left,
                zIndex: Math.floor(parseFloat(slot.position.top)), // Explicit Z-index based on row
              }}
              className="absolute w-[10.5%] aspect-[1.6/1] -translate-x-1/2 -translate-y-1/2 z-10"
            >
              {/* INTERACTION LAYER: Ground Button (Peer) */}
              {/* Rendered first in DOM to act as 'peer', but Z-index handles layering */}
              <button
                onClick={() => handleSlotClick(slot.id)}
                className={`absolute inset-0 w-full h-full transition-all duration-200 z-10 peer outline-none focus:outline-none 
                  ${!building ? 'hover:scale-110 cursor-pointer' : 'cursor-pointer'}
                `}
              >
                {/* Empty Slot Graphic - True Isometric Ellipse */}
                {!building && (
                  <div
                    className="w-full h-full bg-[#a9ab48]/20 hover:bg-[#a9ab48]/40 shadow-[inset_0_0_0_2px_rgba(74,222,128,0.3),inset_0_0_10px_rgba(74,222,128,0.2)] hover:shadow-[inset_0_0_0_3px_rgba(74,222,128,0.5),inset_0_0_20px_rgba(74,222,128,0.4)] flex items-center justify-center transition-all duration-300 backdrop-blur-[1px]"
                    style={{ borderRadius: '50%' }}
                  />
                )}
                {/* For occupied buildings, button is transparent but provides the circular click footprint */}
              </button>

              {/* VISUAL LAYER: Building Image */}
              {/* Reacts to peer (button) hover state */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-visible z-20">
                {displayImage && (
                  <div className="relative w-full h-full drop-shadow-2xl transition-all duration-300 peer-hover:drop-shadow-[0_0_15px_rgba(74,222,128,1)] peer-hover:scale-[2.05] peer-hover:-translate-y-[35%]">
                    <Image
                      src={displayImage}
                      alt={building?.name || 'Construction'}
                      fill
                      className="object-contain drop-shadow-md scale-[2.0] -translate-y-1/3"
                      priority
                    />
                    {/* Level Indicator: Centered on building */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full w-6 h-6 bg-white text-[#4A3728] text-xs font-bold rounded-full flex items-center justify-center border-2 ${borderColor} shadow-md z-30 transition-colors`}>
                      {slot.level}
                    </div>
                  </div>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900/90 text-white font-medium text-xs px-2 py-1 rounded-lg opacity-0 peer-hover:opacity-100 whitespace-nowrap pointer-events-none z-50 shadow-xl border border-white/10 transition-opacity">
                {building ? (isConstructing ? `Constructing (${remainingSeconds}s)` : building.name) : 'Construct'}
              </div>
            </div>
          );
        })}

      <ConstructionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConstruct={handleConstruct}
      />
    </div>
  );
}
