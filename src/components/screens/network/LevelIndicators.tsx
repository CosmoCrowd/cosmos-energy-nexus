
import { useWallet } from '@/context/WalletContext';

interface LevelIndicatorsProps {
  onLevelPurchase: (level: number) => void;
}

const LevelIndicators = ({ onLevelPurchase }: LevelIndicatorsProps) => {
  const { userLevel } = useWallet();

  const handleLockClick = (level: number) => {
    if (level > userLevel) {
      onLevelPurchase(level);
    }
  };

  return (
    <div className="cosmic-card p-4">
      <h3 className="text-center text-foreground font-bold text-lg mb-4">Космические Уровни</h3>
      <div className="flex justify-center items-center space-x-2 overflow-x-auto pb-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => {
          const isActive = level <= userLevel;
          const levelPrices = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512];
          
          return (
            <div
              key={level}
              className={`relative flex-shrink-0 w-12 h-16 rounded-xl flex flex-col items-center justify-center text-sm font-bold transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-primary text-primary-foreground shadow-glow animate-cosmic-pulse border-2 border-primary/50'
                  : 'bg-muted/50 text-muted-foreground border-2 border-muted-foreground/30 hover:border-primary/50 hover:bg-muted hover:scale-105'
              }`}
              onClick={() => handleLockClick(level)}
            >
              <div className="text-lg mb-1">
                {isActive ? '🚀' : '🔒'}
              </div>
              <div className="text-xs font-bold">{level}</div>
              <div className="text-xs opacity-80">{levelPrices[level - 1]} TON</div>
              
              {/* Level progress indicator */}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LevelIndicators;
