import { useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useNetworkLevels } from '@/hooks/useNetworkLevels';
import NetworkHeader from './network/NetworkHeader';
import ReferralSection from './network/ReferralSection';
import LevelIndicators from './network/LevelIndicators';
import SymmetricMatrix from './network/SymmetricMatrix';
import CosmicVisualization from './network/CosmicVisualization';
import NetworkPurchaseModal from './network/NetworkPurchaseModal';

const NetworkScreen = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  
  const { profile, loading: profileLoading } = useProfile();
  const { levels, loading: levelsLoading } = useNetworkLevels();

  const handleLevelPurchase = (level: number) => {
    setSelectedLevelIndex(level);
    setShowPurchaseModal(true);
  };

  const handleModalClose = () => {
    setShowPurchaseModal(false);
  };

  if (profileLoading || levelsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-3 pt-2 pb-20">
        <div className="glass-card p-8 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-cosmic-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Загрузка космических данных...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4 relative animate-screen-enter">
      {/* Enhanced Background Particles */}
      <div className="fixed inset-0 pointer-events-none cosmic-background">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="cosmic-particle absolute animate-[particle-float_4s_ease-in-out_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
        {[...Array(15)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className="cosmic-orb absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
        {[...Array(25)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="cosmic-star absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        <NetworkHeader />
        <SymmetricMatrix onLevelPurchase={handleLevelPurchase} />
        <ReferralSection />
        <CosmicVisualization />
      </div>
      
      <NetworkPurchaseModal
        isOpen={showPurchaseModal}
        currentLevelIndex={selectedLevelIndex}
        userLevel={profile?.network_level || 1}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NetworkScreen;
