import { useState } from 'react';
import NetworkHeader from './network/NetworkHeader';
import ReferralSection from './network/ReferralSection';
import LevelIndicators from './network/LevelIndicators';
import CosmicVisualization from './network/CosmicVisualization';
import NetworkMatrix from './network/NetworkMatrix';
import NetworkPurchaseModal from './network/NetworkPurchaseModal';

const NetworkScreen = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const handleLevelPurchase = (level: number) => {
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
            className="absolute w-px h-px bg-futuristic-primary rounded-full animate-matrix-rain opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <NetworkHeader />
        <ReferralSection />
        <LevelIndicators onLevelPurchase={handleLevelPurchase} />
        <CosmicVisualization />
        
        {/* Keep the original matrix for purchasing levels */}
        <div className="opacity-0 pointer-events-none absolute">
          <NetworkMatrix onLevelPurchase={handleLevelPurchase} />
        </div>
      </div>
      
      <NetworkPurchaseModal
        isOpen={showPurchaseModal}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NetworkScreen;
