
import { useState } from 'react';
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
  const { tonBalance, userLevel, sendPayment } = useWallet();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const calculateTotalPrice = (targetLevel: number) => {
    return energyLevels
      .slice(userLevel, targetLevel)
      .reduce((sum, level) => sum + level.price, 0);
  };

  const confirmPurchase = async () => {
    const totalPrice = calculateTotalPrice(selectedLevel);
    
    if (tonBalance < totalPrice) {
      toast.error('Недостаточно TON');
      return;
    }

    setIsPurchasing(true);
    
    try {
      const success = await sendPayment(totalPrice);
      
      if (success) {
        toast.success(`Уровни до ${selectedLevel} успешно куплены!`);
        onClose();
      } else {
        toast.error('Ошибка при покупке');
      }
    } catch (error) {
      console.error('Ошибка покупки:', error);
      toast.error('Произошла ошибка при покупке');
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!isOpen) return null;

  const totalPrice = calculateTotalPrice(selectedLevel);
  const canPurchase = tonBalance >= totalPrice;

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
            {totalPrice} TON
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Ваш баланс: {tonBalance.toFixed(2)} TON
          </p>
        </div>
        
        {!canPurchase && (
          <p className="text-red-400 text-sm mb-4 text-center animate-pulse">
            ❌ Недостаточно средств
          </p>
        )}
        
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="ghost"
            className="flex-1 border border-gray-600 hover:bg-gray-800"
            disabled={isPurchasing}
          >
            Отмена
          </Button>
          <Button
            onClick={confirmPurchase}
            className="flex-1 cosmic-button text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50"
            disabled={!canPurchase || isPurchasing}
          >
            {isPurchasing ? 'Покупка...' : 'Купить ⚡'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseModal;
