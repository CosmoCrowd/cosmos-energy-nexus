
import { useWallet } from '@/context/WalletContext';
import { energyLevels } from './EnergyMatrix';

const MatrixVisualization = () => {
  const { userLevel } = useWallet();

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/10 to-futuristic-accent/10 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
      <div className="absolute inset-0 bg-hologram-gradient animate-hologram-flicker"></div>
      
      <div className="relative p-6 z-10">
        <div className="text-center mb-6">
          <h3 className="text-white font-bold text-lg mb-3 animate-hologram-flicker">Текущая Матрица</h3>
          <div className="text-futuristic-primary text-sm font-bold animate-energy-pulse">Уровень {userLevel}</div>
        </div>

        <div className="space-y-6">
          {/* Upline Animation */}
          <div className="flex justify-center space-x-4">
            {[1, 2].map((i) => (
              <div
                key={`up-${i}`}
                className="w-12 h-12 rounded-full border-2 border-futuristic-secondary bg-gradient-to-br from-futuristic-secondary/30 to-futuristic-accent/30 flex items-center justify-center animate-energy-pulse backdrop-blur-sm shadow-lg shadow-futuristic-secondary/30"
                style={{animationDelay: `${i * 0.3}s`}}
              >
                <span className="text-lg">👤</span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-futuristic-secondary font-bold text-sm animate-energy-pulse">
              ↑ +{energyLevels[userLevel - 1]?.price || 0} TON наверх
            </div>
          </div>

          {/* Center - You */}
          <div className="flex justify-center">
            <div className="w-16 h-16 rounded-full border-3 border-futuristic-primary bg-gradient-to-br from-futuristic-primary/40 to-futuristic-accent/40 flex items-center justify-center animate-futuristic-glow shadow-xl shadow-futuristic-primary/50">
              <span className="text-2xl animate-energy-pulse">👑</span>
            </div>
          </div>

          {/* Downline Animation */}
          <div className="grid grid-cols-2 gap-4 max-w-40 mx-auto">
            {[1, 2].map((i) => (
              <div
                key={`down-${i}`}
                className="w-12 h-12 rounded-full border-2 border-futuristic-primary bg-gradient-to-br from-futuristic-primary/30 to-futuristic-secondary/30 flex items-center justify-center animate-energy-pulse backdrop-blur-sm shadow-lg shadow-futuristic-primary/30"
                style={{animationDelay: `${i * 0.4}s`}}
              >
                <span className="text-lg">
                  {Math.random() > 0.5 ? '👤' : '⭕'}
                </span>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <div className="text-futuristic-primary font-bold text-sm animate-energy-pulse">
              ↓ +{(energyLevels[userLevel - 1]?.price || 0) * 2} TON вам
            </div>
          </div>
        </div>

        <div className="mt-6 text-center bg-futuristic-primary/20 rounded-2xl p-4 border border-futuristic-primary/40 animate-futuristic-glow">
          <span className="text-futuristic-primary/80 text-sm font-mono">Циклов завершено: </span>
          <span className="text-futuristic-primary font-bold text-lg animate-energy-pulse font-mono">
            {Math.floor(Math.random() * 5) + 1}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MatrixVisualization;
