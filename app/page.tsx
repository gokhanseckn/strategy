'use client';

import ResourceBar from './components/ResourceBar';
import VillageMap from './components/VillageMap';
import BuildingQueue from './components/BuildingQueue';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <ResourceBar />

      <div className="flex-1 flex flex-col items-center p-8">
        <h1 className="text-4xl font-extrabold text-[#4A3728] mb-2 drop-shadow-sm uppercase tracking-widest font-serif">Village Overview</h1>
        <p className="text-[#6B5A4A] mb-6 italic">Manage your empire, construct buildings, and gather resources.</p>

        <VillageMap />

        <BuildingQueue />

        <div className="mt-8 text-xs text-[#8B7355] text-center max-w-lg">
          <p>Tip: Click on any empty green circle to construct a new building. Resources generate automatically over time.</p>
        </div>
      </div>
    </main>
  );
}