
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';

const ActivityMatrix = () => {
  const { userLevel } = useWallet();
  const currentEnergy = energyLevels[userLevel - 1] || energyLevels[0];

  // Симуляция заполненности частиц для каждого уровня
  const getParticlesFilled = (level: number) => {
    if (level <= userLevel) {
      return Math.floor(Math.random() * 6) + 2; // От 2 до 7 заполненных частиц
    }
    return 0;
  };

  const totalParticles = 6; // Общее количество частиц на уровень

  return (
    <div className="px-4 py-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
      <div className="cosmic-card p-4">
        <h3 className="text-white font-semibold mb-4 text-center text-base">
          Матрица активности
        </h3>
        <div className="text-center text-gray-400 text-sm mb-4">
          Заполненность частиц энергии по уровням
        </div>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((level) => {
            const filledParticles = getParticlesFilled(level);
            const isActive = level <= userLevel;
            const fillPercentage = isActive ? (filledParticles / totalParticles) * 100 : 0;

            return (
              <div key={level} className="flex items-center space-x-4">
                {/* Level Number */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                  isActive 
                    ? 'bg-gradient-to-br from-futuristic-primary to-futuristic-secondary text-black'
                    : 'bg-gray-700 text-gray-400'
                }`}>
                  {level}
                </div>

                {/* Progress Bar */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white text-sm font-medium">
                      Уровень {level} {isActive ? '⚡' : '🔒'}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {isActive ? `${filledParticles}/${totalParticles}` : '0/6'}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        isActive 
                          ? 'bg-gradient-to-r from-futuristic-primary to-futuristic-accent'
                          : 'bg-gray-600'
                      }`}
                      style={{ width: `${fillPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Particles Visualization */}
                <div className="flex space-x-1">
                  {Array.from({ length: totalParticles }, (_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        isActive && i < filledParticles
                          ? 'bg-futuristic-primary animate-energy-pulse'
                          : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>

                {/* Income Info */}
                <div className="text-right min-w-16">
                  <div className={`text-sm font-bold ${
                    isActive ? 'text-futuristic-primary' : 'text-gray-500'
                  }`}>
                    {isActive ? `+${energyLevels[level - 1]?.price || 0}` : '+0'}
                  </div>
                  <div className="text-xs text-gray-400">TON</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-futuristic-primary/10 rounded-lg p-3 border border-futuristic-primary/30">
          <div className="text-center">
            <div className="text-futuristic-primary font-bold text-sm mb-1">
              Активный уровень: {userLevel}
            </div>
            <div className="text-gray-300 text-xs">
              Общий доход: +{energyLevels.slice(0, userLevel).reduce((sum, level) => sum + level.price, 0)} TON
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityMatrix;
