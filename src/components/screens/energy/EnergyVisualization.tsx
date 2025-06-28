
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';

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
      {/* Energy Title with Navigation */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <Button
          onClick={prevEnergy}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-futuristic-primary/20 rounded-full"
        >
          <ChevronLeft size={24} className="text-futuristic-primary" />
        </Button>
        
        <div className="text-center">
          <div className="text-2xl font-bold text-white mb-1 animate-hologram-flicker">
            {currentEnergy.name}
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-futuristic-primary to-futuristic-accent rounded-full animate-energy-pulse mx-auto"></div>
        </div>
        
        <Button
          onClick={nextEnergy}
          variant="ghost"
          size="sm"
          className="p-2 hover:bg-futuristic-primary/20 rounded-full"
        >
          <ChevronRight size={24} className="text-futuristic-primary" />
        </Button>
      </div>

      {/* Futuristic Energy Matrix */}
      <div className="relative">
        {/* Outer Glow Container */}
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-1 shadow-2xl shadow-purple-500/30">
          <div className="bg-cosmic-dark/95 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            
            {/* Animated Background Particles */}
            <div className="absolute inset-0">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-futuristic-primary rounded-full animate-matrix-rain opacity-20"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${2 + Math.random() * 3}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>

            {/* Upper Level - 2 Premium Particles */}
            <div className="mb-12 relative z-10">
              <div className="grid grid-cols-2 gap-12 max-w-sm mx-auto">
                {[1, 2].map((particle) => (
                  <div key={`upper-${particle}`} className="text-center group">
                    {/* Futuristic Reward Display */}
                    <div className={`mb-4 px-4 py-2 rounded-2xl text-sm font-bold border-2 backdrop-blur-sm transition-all duration-300 ${
                      isLevelActive
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/60 shadow-lg shadow-green-500/20 animate-energy-pulse'
                        : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-400 border-gray-600/50'
                    }`}>
                      <div className="flex items-center justify-center space-x-2">
                        {isLevelActive ? (
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        ) : (
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        )}
                        <span>+{currentEnergyIndex + 1} TON</span>
                      </div>
                    </div>
                    
                    {/* Premium Energy Particle */}
                    <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-3xl border-4 transition-all duration-500 group-hover:scale-110 cursor-pointer ${
                      isLevelActive
                        ? 'bg-gradient-to-br from-futuristic-primary/40 to-futuristic-accent/40 border-futuristic-primary animate-energy-pulse shadow-2xl shadow-futuristic-primary/50'
                        : 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 border-gray-600 text-gray-500 hover:border-futuristic-primary/50'
                    }`}
                    onClick={handlePurchaseLevel}
                    >
                      {/* Inner Glow Ring */}
                      <div className={`absolute inset-2 rounded-full border-2 transition-all duration-300 ${
                        isLevelActive 
                          ? 'border-futuristic-secondary/60 animate-spin' 
                          : 'border-gray-600/30'
                      }`}></div>
                      
                      {/* Particle Content */}
                      <div className="relative z-10">
                        {isLevelActive ? (
                          <div className="animate-energy-pulse">
                            {currentEnergy.emoji}
                          </div>
                        ) : (
                          <div className="text-2xl">🔐</div>
                        )}
                      </div>
                      
                      {/* Outer Energy Ring */}
                      {isLevelActive && (
                        <div className="absolute -inset-2 rounded-full border border-futuristic-primary/30 animate-ping"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Level - 4 Energy Particles */}
            <div className="relative z-10">
              <div className="grid grid-cols-4 gap-6 max-w-lg mx-auto">
                {[1, 2, 3, 4].map((particle) => (
                  <div key={`lower-${particle}`} className="text-center group">
                    {/* Compact Reward Display */}
                    <div className={`mb-3 px-3 py-1 rounded-xl text-xs font-bold border backdrop-blur-sm transition-all duration-300 ${
                      isLevelActive
                        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/60 shadow-md shadow-green-500/20'
                        : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-400 border-gray-600/50'
                    }`}>
                      <div className="flex items-center justify-center space-x-1">
                        {isLevelActive ? (
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        ) : (
                          <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                        )}
                        <span>+{currentEnergyIndex + 1}</span>
                      </div>
                    </div>
                    
                    {/* Standard Energy Particle */}
                    <div className={`relative w-16 h-16 rounded-full flex items-center justify-center text-xl border-3 transition-all duration-500 group-hover:scale-110 cursor-pointer ${
                      isLevelActive
                        ? 'bg-gradient-to-br from-futuristic-secondary/40 to-futuristic-primary/40 border-futuristic-secondary animate-energy-pulse shadow-xl shadow-futuristic-secondary/40'
                        : 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 border-gray-600 text-gray-500 hover:border-futuristic-secondary/50'
                    }`}
                    onClick={handlePurchaseLevel}
                    >
                      {/* Inner Particle Core */}
                      <div className={`absolute inset-3 rounded-full border transition-all duration-300 ${
                        isLevelActive 
                          ? 'border-futuristic-accent/50 animate-spin' 
                          : 'border-gray-600/30'
                      }`}></div>
                      
                      {/* Particle Icon */}
                      <div className="relative z-10">
                        {isLevelActive ? (
                          <div className="animate-energy-pulse">
                            {currentEnergy.emoji}
                          </div>
                        ) : (
                          <div className="text-lg">🔐</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sleeping Person with Passive Income */}
            <div className="mt-12 text-center relative z-10">
              <div className="relative inline-block">
                {/* Futuristic Sleep Pod */}
                <div className="relative bg-gradient-to-br from-futuristic-primary/20 to-futuristic-secondary/20 rounded-3xl p-6 border-2 border-futuristic-primary/40 backdrop-blur-sm">
                  
                  {/* Energy Aura */}
                  <div className="absolute -inset-2 bg-gradient-to-r from-futuristic-primary/10 via-futuristic-accent/10 to-futuristic-secondary/10 rounded-3xl animate-energy-pulse"></div>
                  
                  {/* Sleep Icon with Enhancement */}
                  <div className="relative text-6xl mb-4">
                    <div className="animate-bounce">😴</div>
                    {/* Floating Z's */}
                    <div className="absolute -top-2 -right-2 text-2xl text-futuristic-primary animate-float">💤</div>
                  </div>
                  
                  {/* Passive Income Display */}
                  <div className="bg-gradient-to-r from-futuristic-primary/30 to-futuristic-accent/30 rounded-2xl p-4 border border-futuristic-primary/50 backdrop-blur-sm">
                    <div className="flex items-center justify-center space-x-3 mb-2">
                      <div className="w-4 h-4 bg-futuristic-primary rounded-full animate-pulse"></div>
                      <span className="text-white font-bold text-lg">Пассивный доход</span>
                      {/* Blinking Button */}
                      <div className="w-4 h-4 bg-futuristic-accent rounded-full animate-ping"></div>
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

      {/* Purchase Modal Integration */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowPurchaseModal(false)}>
          <div className="cosmic-card p-6 max-w-sm w-full border-2 border-neon-green/50 animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-3 animate-neon-pulse">
                <span className="text-black font-bold text-2xl">{currentEnergy.emoji}</span>
              </div>
              <h3 className="text-white font-bold text-lg">Покупка {currentEnergy.name}</h3>
            </div>
            
            <p className="text-gray-300 text-center mb-4">
              Купить уровни с {userLevel + 1} по {currentEnergyIndex + 1}?
            </p>
            
            <div className="bg-cosmic-gray/50 rounded-xl p-4 mb-4 text-center border border-neon-green/30">
              <p className="text-neon-green font-bold text-2xl animate-pulse">
                {energyLevels.slice(userLevel, currentEnergyIndex + 1).reduce((sum, level) => sum + level.price, 0)} TON
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Общая стоимость
              </p>
            </div>
            
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowPurchaseModal(false)}
                variant="ghost"
                className="flex-1 border border-gray-600 hover:bg-gray-800"
              >
                Отмена
              </Button>
              <Button
                onClick={() => {
                  // Here we'll integrate with Telegram wallet
                  console.log('Initiating Telegram wallet purchase...');
                  setShowPurchaseModal(false);
                }}
                className="flex-1 cosmic-button text-black font-semibold hover:scale-105 transition-transform"
              >
                Купить ⚡
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyVisualization;
