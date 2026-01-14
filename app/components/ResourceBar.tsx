'use client';

import React from 'react';
import Image from 'next/image';
import { useGame } from '../context/GameContext';

export default function ResourceBar() {
  const { gameState } = useGame();

  return (
    <div className="bg-[#EFE6C9] border-b-2 border-[#D2B48C] p-2 flex justify-center gap-8 shadow-sm">
      {Object.values(gameState.resources).map((res) => (
        <div key={res.type} className="flex items-center gap-2 px-3 py-1 bg-white/50 rounded border border-[#D2B48C]/30 min-w-[120px]">
          <Image src={res.icon} alt={res.type} width={24} height={24} className="object-contain" />
          <div className="flex flex-col">
            <span className="font-bold text-sm text-[#4A3728]">{Math.floor(res.amount)}</span>
            <span className="text-[10px] text-green-700 font-semibold">+{res.production}/h</span>
          </div>
        </div>
      ))}
    </div>
  );
}
