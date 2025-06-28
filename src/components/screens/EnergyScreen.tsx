import { useState } from 'react';
import EnergyHeader from './energy/EnergyHeader';
import ReferralSection from './energy/ReferralSection';
import LevelIndicators from './energy/LevelIndicators';
import EnergyVisualization from './energy/EnergyVisualization';
import DailyIncomeSection from './energy/DailyIncomeSection';
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
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4">
      <EnergyHeader />
      <ReferralSection />
      <LevelIndicators />
      <EnergyVisualization />
      <DailyIncomeSection />
      
      {/* Keep the original matrix for purchasing levels */}
      <div className="opacity-0 pointer-events-none absolute">
        <EnergyMatrix onLevelPurchase={handleLevelPurchase} />
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
