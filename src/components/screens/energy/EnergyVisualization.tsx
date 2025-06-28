
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';

const EnergyVisualization = () => {
  const { userLevel } = useWallet();
  const [currentEnergyIndex, setCurrentEnergyIndex] = useState(userLevel - 1);

  const currentEnergy = energyLevels[currentEnergyIndex] || energyLevels[0];

  const nextEnergy = () => {
    setCurrentEnergyIndex((prev) => (prev + 1) % energyLevels.length);
  };

  const prevEnergy = () => {
    setCurrentEnergyIndex((prev) => (prev - 1 + energyLevels.length) % energyLevels.length);
  };

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

      {/* Gradient Table with Particles */}
      <div className="relative">
        {/* Table Structure */}
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-1">
          <div className="bg-cosmic-dark/80 rounded-3xl p-6 backdrop-blur-sm">
            {/* Upper Level - 2 particles */}
            <div className="mb-8">
              <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto">
                {[1, 2].map((particle) => (
                  <div key={`upper-${particle}`} className="text-center">
                    {/* Reward Indicator */}
                    <div className={`mb-2 px-3 py-1 rounded-full text-xs font-bold ${
                      currentEnergyIndex + 1 <= userLevel
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-gray-700/50 text-gray-500 border border-gray-600/50'
                    }`}>
                      {currentEnergyIndex + 1 <= userLevel ? '✓' : '○'} +{currentEnergy.price * 0.5} TON
                    </div>
                    
                    {/* Particle */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl border-2 ${
                      currentEnergyIndex + 1 <= userLevel
                        ? 'bg-gradient-to-br from-futuristic-primary/30 to-futuristic-accent/30 border-futuristic-primary animate-energy-pulse shadow-lg shadow-futuristic-primary/30'
                        : 'bg-gray-700/50 border-gray-600 text-gray-500'
                    }`}>
                      {currentEnergyIndex + 1 <= userLevel ? currentEnergy.emoji : '🔒'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Lower Level - 4 particles */}
            <div>
              <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
                {[1, 2, 3, 4].map((particle) => (
                  <div key={`lower-${particle}`} className="text-center">
                    {/* Reward Indicator */}
                    <div className={`mb-2 px-2 py-1 rounded-full text-xs font-bold ${
                      currentEnergyIndex + 1 <= userLevel
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : 'bg-gray-700/50 text-gray-500 border border-gray-600/50'
                    }`}>
                      {currentEnergyIndex + 1 <= userLevel ? '✓' : '○'} +{currentEnergy.price * 0.25}
                    </div>
                    
                    {/* Particle */}
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg border-2 ${
                      currentEnergyIndex + 1 <= userLevel
                        ? 'bg-gradient-to-br from-futuristic-secondary/30 to-futuristic-primary/30 border-futuristic-secondary animate-energy-pulse shadow-lg shadow-futuristic-secondary/30'
                        : 'bg-gray-700/50 border-gray-600 text-gray-500'
                    }`}>
                      {currentEnergyIndex + 1 <= userLevel ? currentEnergy.emoji : '🔒'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyVisualization;
