import { useState } from 'react';
import EnergyHeader from './energy/EnergyHeader';
import ReferralSection from './energy/ReferralSection';
import LevelIndicators from './energy/LevelIndicators';
import EnergyVisualization from './energy/EnergyVisualization';
import EnergyMatrix from './energy/EnergyMatrix';
import PurchaseModal from './energy/PurchaseModal';

const EnergyScreen = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);

  const handleLevelPurchase = (level: number) => {
    setSelectedLevel(level);
    setShowPurchaseModal(true);
  };

  const handleModalClose = () => {
    setShowPurchaseModal(false);
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4 relative">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-cosmic-primary rounded-full animate-matrix-rain opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <EnergyHeader />
        <ReferralSection />
        <LevelIndicators onLevelPurchase={handleLevelPurchase} />
        <EnergyVisualization />
        
        {/* Keep the original matrix for purchasing levels */}
        <div className="opacity-0 pointer-events-none absolute">
          <EnergyMatrix onLevelPurchase={handleLevelPurchase} />
        </div>
      </div>
      
      <PurchaseModal
        isOpen={showPurchaseModal}
        selectedLevel={selectedLevel}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default EnergyScreen;
