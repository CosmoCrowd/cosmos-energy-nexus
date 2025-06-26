
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { toast } from 'sonner';

const energyLevels = [
  { id: 1, name: 'Энергия Начала', price: 0.5, emoji: '⚡', color: 'from-cyan-500 to-blue-500' },
  { id: 2, name: 'Энергия Пульса', price: 1, emoji: '🔥', color: 'from-blue-500 to-purple-500' },
  { id: 3, name: 'Энергия Волны', price: 2, emoji: '🌊', color: 'from-purple-500 to-pink-500' },
  { id: 4, name: 'Энергия Потока', price: 4, emoji: '💫', color: 'from-pink-500 to-red-500' },
  { id: 5, name: 'Энергия Взрыва', price: 8, emoji: '💥', color: 'from-red-500 to-orange-500' },
  { id: 6, name: 'Энергия Сферы', price: 16, emoji: '🔮', color: 'from-orange-500 to-yellow-500' },
  { id: 7, name: 'Энергия Кристалла', price: 32, emoji: '💎', color: 'from-yellow-500 to-green-500' },
  { id: 8, name: 'Энергия Плазмы', price: 64, emoji: '⚡', color: 'from-green-500 to-cyan-500' },
  { id: 9, name: 'Энергия Ядра', price: 128, emoji: '☢️', color: 'from-cyan-500 to-purple-500' },
  { id: 10, name: 'Энергия Космоса', price: 256, emoji: '🌌', color: 'from-purple-500 to-pink-500' },
];

interface EnergyMatrixProps {
  onLevelPurchase: (level: number) => void;
}

const EnergyMatrix = ({ onLevelPurchase }: EnergyMatrixProps) => {
  const { userLevel, tonBalance, sendPayment } = useWallet();
  const [purchasingLevel, setPurchasingLevel] = useState<number | null>(null);

  const handlePurchase = async (level: number) => {
    const levelData = energyLevels[level - 1];
    
    if (tonBalance < levelData.price) {
      toast.error('Недостаточно TON для покупки');
      return;
    }

    if (level <= userLevel) {
      toast.info('Этот уровень уже активирован');
      return;
    }

    setPurchasingLevel(level);
    
    try {
      const success = await sendPayment(levelData.price);
      
      if (success) {
        toast.success(`Уровень ${level} активирован!`);
        onLevelPurchase(level);
      } else {
        toast.error('Ошибка при покупке уровня');
      }
    } catch (error) {
      console.error('Ошибка покупки:', error);
      toast.error('Произошла ошибка при покупке');
    } finally {
      setPurchasingLevel(null);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cosmic-dark/90 via-futuristic-accent/10 to-futuristic-primary/10 border border-futuristic-accent/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
      <div className="absolute inset-0 bg-hologram-gradient animate-hologram-flicker"></div>
      
      <div className="relative p-5 z-10">
        <div className="flex items-center space-x-3 mb-5">
          <div className="w-3 h-3 bg-futuristic-primary rounded-full animate-energy-pulse"></div>
          <h3 className="text-white font-bold text-lg animate-hologram-flicker">Матрица Энергий</h3>
          <div className="w-3 h-3 bg-futuristic-accent rounded-full animate-energy-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {energyLevels.map((level, index) => (
            <Button
              key={level.id}
              onClick={() => handlePurchase(level.id)}
              disabled={level.id <= userLevel || purchasingLevel === level.id || tonBalance < level.price}
              className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-500 transform hover:scale-105 animate-fade-in-up ${
                level.id <= userLevel
                  ? 'bg-gradient-to-br from-futuristic-primary/30 to-futuristic-secondary/30 border-futuristic-primary text-white shadow-xl shadow-futuristic-primary/40 animate-futuristic-glow'
                  : tonBalance >= level.price
                  ? 'bg-gradient-to-br from-cosmic-gray/50 to-cosmic-light/30 border-futuristic-primary/50 text-gray-300 hover:border-futuristic-primary hover:bg-gradient-to-br hover:from-futuristic-primary/20 hover:to-futuristic-secondary/20 hover:shadow-xl hover:shadow-futuristic-primary/30'
                  : 'bg-gradient-to-br from-cosmic-gray/30 to-cosmic-darker/30 border-gray-700 text-gray-500 opacity-50'
              }`}
              style={{animationDelay: `${0.3 + index * 0.05}s`}}
            >
              <div className="absolute inset-0 bg-hologram-gradient animate-hologram-flicker opacity-20"></div>
              
              <div className="relative text-center space-y-3 z-10">
                <div className={`text-3xl ${level.id <= userLevel ? 'animate-energy-pulse' : ''}`}>
                  {purchasingLevel === level.id ? '⏳' : level.emoji}
                </div>
                <div className="font-bold text-sm leading-tight">{level.name}</div>
                <div className="font-bold text-lg font-mono">{level.price} TON</div>
                {level.id <= userLevel && (
                  <div className="text-xs text-futuristic-primary animate-energy-pulse font-bold">✓ АКТИВНО</div>
                )}
                {purchasingLevel === level.id && (
                  <div className="text-xs text-futuristic-accent animate-energy-pulse font-bold">ПОКУПКА...</div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export { energyLevels };
export default EnergyMatrix;
