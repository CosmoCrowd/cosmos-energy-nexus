
import { useState } from 'react';
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

            {/* Futuristic Auto-Income Display */}
            <div className="mt-12 text-center relative z-10">
              <div className="relative inline-block">
                <div className="relative bg-gradient-to-br from-futuristic-primary/20 to-futuristic-secondary/20 rounded-3xl p-6 border-2 border-futuristic-primary/40 backdrop-blur-sm">
                  
                  {/* Energy Aura */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-futuristic-primary/10 via-futuristic-accent/10 to-futuristic-secondary/10 rounded-3xl animate-energy-pulse"></div>
                  
                  {/* Futuristic Auto-Income Icon */}
                  <div className="relative text-6xl mb-4">
                    <div className="relative">
                      {/* Main quantum generator */}
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-futuristic-primary to-futuristic-accent rounded-full flex items-center justify-center animate-spin">
                        <div className="w-8 h-8 bg-gradient-to-br from-futuristic-accent to-futuristic-secondary rounded-full animate-pulse"></div>
                      </div>
                      
                      {/* Floating money particles around the generator */}
                      <div className="absolute -top-2 -right-2 text-2xl animate-bounce">💰</div>
                      <div className="absolute -bottom-2 -left-2 text-xl animate-bounce" style={{animationDelay: '0.3s'}}>💎</div>
                      <div className="absolute top-2 -left-4 text-lg animate-bounce" style={{animationDelay: '0.6s'}}>⚡</div>
                      <div className="absolute -top-4 left-2 text-lg animate-bounce" style={{animationDelay: '0.9s'}}>🌟</div>
                      
                      {/* Energy streams */}
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-futuristic-primary to-transparent animate-pulse"></div>
                        <div className="w-1 h-20 bg-gradient-to-b from-transparent via-futuristic-accent to-transparent animate-pulse absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Auto Income Display */}
                  <div className="bg-gradient-to-r from-futuristic-primary/30 to-futuristic-accent/30 rounded-2xl p-4 border border-futuristic-primary/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <div className="w-4 h-4 bg-futuristic-primary rounded-full animate-ping"></div>
                      <span className="text-white font-bold text-lg">Квантовый генератор</span>
                      <div className="w-4 h-4 bg-futuristic-accent rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-futuristic-primary font-bold text-2xl animate-energy-pulse">
                      +{(currentEnergyIndex + 1) * 0.5} TON/час
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
