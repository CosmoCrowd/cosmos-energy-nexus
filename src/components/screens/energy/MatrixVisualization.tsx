
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';

const MatrixVisualization = () => {
  const { userLevel } = useWallet();

  return (
    <div className="cosmic-card p-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
      <div className="text-center mb-4">
        <h3 className="text-white font-semibold mb-2">Текущая Матрица</h3>
        <div className="text-neon-green text-sm">Уровень {userLevel}</div>
      </div>

      <div className="space-y-4">
        {/* Upline Animation */}
        <div className="flex justify-center space-x-3">
          {[1, 2].map((i) => (
            <div
              key={`up-${i}`}
              className="w-10 h-10 rounded-full border-2 border-neon-blue bg-neon-blue/20 flex items-center justify-center animate-pulse backdrop-blur-sm"
              style={{animationDelay: `${i * 0.2}s`}}
            >
              <span className="text-sm">👤</span>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="text-neon-blue font-semibold text-sm animate-pulse">
            ↑ +{energyLevels[userLevel - 1]?.price || 0} TON наверх
          </div>
        </div>

        {/* Center - You */}
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-full border-2 border-neon-green bg-neon-green/30 flex items-center justify-center animate-neon-pulse">
            <span className="text-base">👑</span>
          </div>
        </div>

        {/* Downline Animation */}
        <div className="grid grid-cols-2 gap-3 max-w-32 mx-auto">
          {[1, 2].map((i) => (
            <div
              key={`down-${i}`}
              className="w-10 h-10 rounded-full border-2 border-neon-green bg-neon-green/20 flex items-center justify-center animate-bounce backdrop-blur-sm"
              style={{animationDelay: `${i * 0.3}s`}}
            >
              <span className="text-sm">
                {Math.random() > 0.5 ? '👤' : '⭕'}
              </span>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="text-neon-green font-semibold text-sm animate-pulse">
            ↓ +{(energyLevels[userLevel - 1]?.price || 0) * 2} TON вам
          </div>
        </div>
      </div>

      <div className="mt-4 text-center bg-cosmic-gray/30 rounded-lg p-2">
        <span className="text-gray-400 text-sm">Циклов завершено: </span>
        <span className="text-neon-green font-bold animate-pulse">
          {Math.floor(Math.random() * 5) + 1}
        </span>
      </div>
    </div>
  );
};

export default MatrixVisualization;
