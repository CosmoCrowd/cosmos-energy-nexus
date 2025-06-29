
import { useState } from 'react';
import { Info } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';
import EnergyNavigationHeader from './EnergyNavigationHeader';
import EnergyParticleBackground from './EnergyParticleBackground';
import EnergyRewardDisplay from './EnergyRewardDisplay';
import EnergyParticle from './EnergyParticle';
import EnergyPurchaseModal from './EnergyPurchaseModal';

const EnergyVisualization = () => {
  const { userLevel } = useWallet();
  const [currentEnergyIndex, setCurrentEnergyIndex] = useState(userLevel - 1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

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

            {/* Daily Passive Income Display */}
            <div className="mt-12 text-center relative z-10">
              <div className="relative inline-block">
                <div className="relative bg-gradient-to-br from-futuristic-primary/20 to-futuristic-secondary/20 rounded-3xl p-6 border-2 border-futuristic-primary/40 backdrop-blur-sm">
                  
                  {/* Energy Aura */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-futuristic-primary/10 via-futuristic-accent/10 to-futuristic-secondary/10 rounded-3xl animate-energy-pulse"></div>
                  
                  {/* Daily Passive Income Text with Info Button */}
                  <div className="flex items-center justify-center space-x-3">
                    <div className="text-white font-bold text-lg">
                      Ежедневный пассивный доход +7,9 TON/день
                    </div>
                    
                    <div className="relative">
                      <button
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                        className="w-6 h-6 bg-futuristic-primary/20 rounded-full flex items-center justify-center border border-futuristic-primary/50 hover:bg-futuristic-primary/30 transition-colors"
                      >
                        <Info size={14} className="text-futuristic-primary" />
                      </button>
                      
                      {showTooltip && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 p-3 bg-cosmic-dark border border-futuristic-primary/50 rounded-lg text-sm text-white max-w-xs z-20 shadow-lg">
                          Сумма подкачивается ежедневно в 00:01 UTC из админ панели CosmoFund и зависит от суммарной прибыли всех проектов
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
