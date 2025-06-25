
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';

const energyLevels = [
  { id: 1, name: 'Энергия Начала', price: 0.5, emoji: '⚡' },
  { id: 2, name: 'Энергия Пульса', price: 1, emoji: '🔥' },
  { id: 3, name: 'Энергия Волны', price: 2, emoji: '🌊' },
  { id: 4, name: 'Энергия Потока', price: 4, emoji: '💫' },
  { id: 5, name: 'Энергия Взрыва', price: 8, emoji: '💥' },
  { id: 6, name: 'Энергия Сферы', price: 16, emoji: '🔮' },
  { id: 7, name: 'Энергия Кристалла', price: 32, emoji: '💎' },
  { id: 8, name: 'Энергия Плазмы', price: 64, emoji: '⚡' },
  { id: 9, name: 'Энергия Ядра', price: 128, emoji: '☢️' },
  { id: 10, name: 'Энергия Космоса', price: 256, emoji: '🌌' },
];

interface EnergyMatrixProps {
  onLevelPurchase: (level: number) => void;
}

const EnergyMatrix = ({ onLevelPurchase }: EnergyMatrixProps) => {
  const { userLevel } = useWallet();

  return (
    <div className="cosmic-card p-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
        <h3 className="text-white font-semibold">Матрица Энергий</h3>
        <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {energyLevels.map((level, index) => (
          <Button
            key={level.id}
            onClick={() => onLevelPurchase(level.id)}
            disabled={level.id <= userLevel}
            className={`p-4 rounded-xl border transition-all duration-300 transform hover:scale-105 animate-fade-in-up ${
              level.id <= userLevel
                ? 'bg-neon-green/20 border-neon-green text-white shadow-lg shadow-neon-green/20'
                : 'bg-cosmic-gray/50 border-gray-600 text-gray-300 hover:border-neon-blue hover:bg-cosmic-light/30 hover:shadow-lg hover:shadow-neon-blue/20'
            }`}
            style={{animationDelay: `${0.3 + index * 0.05}s`}}
          >
            <div className="text-center space-y-2">
              <div className={`text-2xl ${level.id <= userLevel ? 'animate-bounce' : ''}`}>
                {level.emoji}
              </div>
              <div className="font-medium text-xs leading-tight">{level.name}</div>
              <div className="font-bold text-sm">{level.price} TON</div>
              {level.id <= userLevel && (
                <div className="text-xs text-neon-green animate-pulse">✓ Активно</div>
              )}
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
};

export { energyLevels };
export default EnergyMatrix;
