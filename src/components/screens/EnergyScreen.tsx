
import { useState } from 'react';
import EnergyHeader from './energy/EnergyHeader';
import ReferralSection from './energy/ReferralSection';
import EnergyMatrix from './energy/EnergyMatrix';
import MatrixVisualization from './energy/MatrixVisualization';
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
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-3">
      <EnergyHeader />
      <ReferralSection />
      <EnergyMatrix onLevelPurchase={handleLevelPurchase} />
      <MatrixVisualization />
      
      <PurchaseModal
        isOpen={showPurchaseModal}
        selectedLevel={selectedLevel}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default EnergyScreen;
