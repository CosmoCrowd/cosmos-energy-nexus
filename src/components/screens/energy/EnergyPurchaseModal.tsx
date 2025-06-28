
import { Button } from '@/components/ui/button';
import { energyLevels } from './EnergyMatrix';

interface EnergyPurchaseModalProps {
  isOpen: boolean;
  currentEnergyIndex: number;
  userLevel: number;
  onClose: () => void;
}

const EnergyPurchaseModal = ({ isOpen, currentEnergyIndex, userLevel, onClose }: EnergyPurchaseModalProps) => {
  if (!isOpen) return null;

  const currentEnergy = energyLevels[currentEnergyIndex] || energyLevels[0];

  const handlePurchase = () => {
    // Here we'll integrate with Telegram wallet
    console.log('Initiating Telegram wallet purchase...');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
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
            onClick={onClose}
            variant="ghost"
            className="flex-1 border border-gray-600 hover:bg-gray-800"
          >
            Отмена
          </Button>
          <Button
            onClick={handlePurchase}
            className="flex-1 cosmic-button text-black font-semibold hover:scale-105 transition-transform"
          >
            Купить ⚡
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnergyPurchaseModal;
