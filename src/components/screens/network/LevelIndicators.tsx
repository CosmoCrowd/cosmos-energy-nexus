
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
    <div className="flex justify-center items-center space-x-3 px-4 py-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((level) => (
        <div
          key={level}
          className={`relative w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-all duration-300 ${
            level <= userLevel
              ? 'bg-gradient-to-br from-futuristic-primary to-futuristic-secondary text-black shadow-lg shadow-futuristic-primary/50 animate-energy-pulse'
              : 'bg-gray-700 text-gray-400 border border-gray-600 cursor-pointer hover:border-futuristic-primary/50 hover:bg-gray-600 hover:scale-110'
          }`}
          onClick={() => handleLockClick(level)}
        >
          {level <= userLevel ? (
            <span className="animate-energy-pulse">🚀</span>
          ) : (
            <span className="hover:scale-110 transition-transform">🔒</span>
          )}
          <div className="absolute -bottom-6 text-xs text-white font-mono">{level}</div>
        </div>
      ))}
    </div>
  );
};

export default LevelIndicators;
