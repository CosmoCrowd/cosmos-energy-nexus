
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';
import { energyLevels } from './EnergyMatrix';

interface PurchaseModalProps {
  isOpen: boolean;
  selectedLevel: number;
  onClose: () => void;
}

const PurchaseModal = ({ isOpen, selectedLevel, onClose }: PurchaseModalProps) => {
  const { tonBalance, userLevel } = useWallet();

  const calculateTotalPrice = (targetLevel: number) => {
    return energyLevels
      .slice(userLevel, targetLevel)
      .reduce((sum, level) => sum + level.price, 0);
  };

  const confirmPurchase = () => {
    const totalPrice = calculateTotalPrice(selectedLevel);
    if (tonBalance >= totalPrice) {
      toast.success(`Куплены уровни до ${selectedLevel}!`);
      onClose();
    } else {
      toast.error('Недостаточно TON');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="cosmic-card p-6 max-w-sm w-full border-2 border-neon-green/50 animate-scale-in">
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-3 animate-neon-pulse">
            <Zap className="h-8 w-8 text-black" />
          </div>
          <h3 className="text-white font-bold text-lg">Покупка Энергии</h3>
        </div>
        
        <p className="text-gray-300 text-center mb-4">
          Купить уровни с {userLevel + 1} по {selectedLevel}?
        </p>
        
        <div className="bg-cosmic-gray/50 rounded-xl p-4 mb-4 text-center border border-neon-green/30">
          <p className="text-neon-green font-bold text-2xl animate-pulse">
            {calculateTotalPrice(selectedLevel)} TON
          </p>
        </div>
        
        {tonBalance < calculateTotalPrice(selectedLevel) && (
          <p className="text-red-400 text-sm mb-4 text-center animate-pulse">
            ❌ Недостаточно средств
          </p>
        )}
        
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="ghost"
            className="flex-1 border border-gray-600 hover:bg-gray-800"
          >
            Отмена
          </Button>
          <Button
            onClick={confirmPurchase}
            className="flex-1 cosmic-button text-black font-semibold hover:scale-105 transition-transform"
            disabled={tonBalance < calculateTotalPrice(selectedLevel)}
          >
            Купить ⚡
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
