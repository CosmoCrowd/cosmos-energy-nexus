
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';
import EnergyNavigationHeader from './EnergyNavigationHeader';
import EnergyParticleBackground from './EnergyParticleBackground';
import EnergyRewardDisplay from './EnergyRewardDisplay';
import EnergyParticle from './EnergyParticle';
import EnergyPassiveIncomeDisplay from './EnergyPassiveIncomeDisplay';
import EnergyPurchaseModal from './EnergyPurchaseModal';

const EnergyVisualization = () => {
  const { userLevel } = useWallet();
  const [currentEnergyIndex, setCurrentEnergyIndex] = useState(userLevel - 1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  const currentEnergy = energyLevels[currentEnergyIndex] || energyLevels[0];

  const nextEnergy = () => {
    setCurrentEnergyIndex((prev) => (prev + 1) % energyLevels.length);
  };

  const prevEnergy = () => {
    setCurrentEnergyIndex((prev) => (prev - 1 + energyLevels.length) % energyLevels.length);
  };

  const handlePurchaseLevel = () => {
    if (currentEnergyIndex + 1 > userLevel) {
      setShowPurchaseModal(true);
    }
  };

  const isLevelActive = currentEnergyIndex + 1 <= userLevel;

  return (
    <div className="px-4 py-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
      <EnergyNavigationHeader
        currentEnergyName={currentEnergy.name}
        onPrevious={prevEnergy}
        onNext={nextEnergy}
      />

      {/* Futuristic Energy Matrix */}
      <div className="relative">
        {/* Outer Glow Container */}
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-1 shadow-2xl shadow-purple-500/30">
          <div className="bg-cosmic-dark/95 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            
            <EnergyParticleBackground />

            {/* Upper Level - 2 Premium Particles */}
            <div className="mb-12 relative z-10">
              <div className="grid grid-cols-2 gap-12 max-w-sm mx-auto">
                {[1, 2].map((particle) => (
                  <div key={`upper-${particle}`} className="text-center group">
                    <EnergyRewardDisplay
                      reward={currentEnergyIndex + 1}
                      isActive={isLevelActive}
                      size="large"
                    />
                    
                    <EnergyParticle
                      emoji={currentEnergy.emoji}
                      isActive={isLevelActive}
                      size="large"
                      onClick={handlePurchaseLevel}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Level - 4 Energy Particles */}
            <div className="relative z-10">
              <div className="grid grid-cols-4 gap-6 max-w-lg mx-auto">
                {[1, 2, 3, 4].map((particle) => (
                  <div key={`lower-${particle}`} className="text-center group">
                    <EnergyRewardDisplay
                      reward={currentEnergyIndex + 1}
                      isActive={isLevelActive}
                      size="small"
                    />
                    
                    <EnergyParticle
                      emoji={currentEnergy.emoji}
                      isActive={isLevelActive}
                      size="small"
                      onClick={handlePurchaseLevel}
                    />
                  </div>
                ))}
              </div>
            </div>

            <EnergyPassiveIncomeDisplay
              passiveIncome={(currentEnergyIndex + 1) * 0.5}
            />
          </div>
        </div>
      </div>

      <EnergyPurchaseModal
        isOpen={showPurchaseModal}
        currentEnergyIndex={currentEnergyIndex}
        userLevel={userLevel}
        onClose={() => setShowPurchaseModal(false)}
      />
    </div>
  );
};

export default EnergyVisualization;
