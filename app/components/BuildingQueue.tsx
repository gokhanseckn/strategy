'use client';

import React, { useEffect, useState } from 'react';
import { useGame } from '../context/GameContext';
import { BUILDINGS } from '../lib/gameData';
import Image from 'next/image';

export default function BuildingQueue() {
    const { gameState } = useGame();
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const interval = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(interval);
    }, []);

    const activeConstruction = gameState.slots
        .filter(slot => slot.constructionEndTime && slot.constructionEndTime > now)
        .map(slot => {
            const building = BUILDINGS.find(b => b.id === slot.typeId);
            const remainingSeconds = Math.ceil((slot.constructionEndTime! - now) / 1000);
            return { ...slot, buildingName: building?.name || 'Building', remainingSeconds };
        })
        .sort((a, b) => a.constructionEndTime! - b.constructionEndTime!);

    if (activeConstruction.length === 0) return null;

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 bg-[#EFE6C9] border-2 border-[#8B4513] rounded-lg p-4 shadow-lg">
            <h3 className="text-[#8B4513] font-bold uppercase text-sm mb-3 tracking-wider border-b border-[#D2B48C] pb-2">
                Construction Queue
            </h3>
            <div className="space-y-2">
                {activeConstruction.map((slot) => (
                    <div key={slot.id} className="flex items-center justify-between bg-[#F5EED5] p-2 rounded border border-[#D2B48C]">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 relative">
                                {/* Small icon if available, or just generic hammer */}
                                <Image
                                    src={BUILDINGS.find(b => b.name === slot.buildingName)?.constructionImage || "/assets/barrack_construction.png"}
                                    alt="Constructing"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[#4A3728] font-bold text-sm">{slot.buildingName}</span>
                                <span className="text-[#6B5A4A] text-xs">Level {slot.level}</span>
                            </div>
                        </div>
                        <div className="font-mono text-[#8B4513] font-bold text-sm">
                            00:00:{slot.remainingSeconds.toString().padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
