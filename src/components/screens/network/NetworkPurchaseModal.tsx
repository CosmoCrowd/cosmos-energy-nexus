
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Zap } from 'lucide-react';
import { toast } from 'sonner';
import { cosmicLevels } from './NetworkMatrix';
import { telegramWalletService } from '@/services/telegramWalletService';

interface NetworkPurchaseModalProps {
  isOpen: boolean;
  currentLevelIndex: number;
  userLevel: number;
  onClose: () => void;
}

const NetworkPurchaseModal = ({ isOpen, currentLevelIndex, userLevel, onClose }: NetworkPurchaseModalProps) => {
  const { tonBalance, walletAddress } = useWallet();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const calculateTotalPrice = (targetLevel: number) => {
    return cosmicLevels
      .slice(userLevel, targetLevel)
      .reduce((sum, level) => sum + level.price, 0);
  };

  const confirmPurchase = async () => {
    const totalPrice = calculateTotalPrice(currentLevelIndex + 1);
    
    if (!walletAddress) {
      toast.error('Кошелек не подключен');
      return;
    }

    setIsPurchasing(true);
    
    try {
      const telegramEnv = telegramWalletService.checkTelegramEnvironment();
      console.log('Telegram Environment:', telegramEnv);

      if (!telegramEnv.isWebApp) {
        toast.error('Приложение должно быть запущено в Telegram');
        setIsPurchasing(false);
        return;
      }

      telegramWalletService.showNotification(
        `Инициализация покупки уровней до ${currentLevelIndex + 1} за ${totalPrice} TON`,
        'info'
      );

      const success = await telegramWalletService.requestPayment({
        amount: totalPrice,
        recipient: 'UQBDN8ARRy-7qUYEmx9v6IxaMmcfHrbTrh6ZiFVQnzmsqyBi',
        comment: `Покупка космической сети COSMO - уровни до ${currentLevelIndex + 1}`
      });

      if (success) {
        telegramWalletService.showNotification(
          `Уровни до ${currentLevelIndex + 1} успешно куплены!`,
          'success'
        );
        
        toast.success(`Уровни до ${currentLevelIndex + 1} успешно куплены!`);
        onClose();
      } else {
        toast.error('Ошибка при покупке');
        telegramWalletService.showNotification(
          'Произошла ошибка при обработке платежа',
          'error'
        );
      }
    } catch (error) {
      console.error('Ошибка покупки:', error);
      toast.error('Произошла ошибка при покупке');
      telegramWalletService.showNotification(
        'Произошла ошибка при покупке',
        'error'
      );
    } finally {
      setIsPurchasing(false);
    }
  };

  if (!isOpen) return null;

  const totalPrice = calculateTotalPrice(currentLevelIndex + 1);
  const selectedLevel = cosmicLevels[currentLevelIndex];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="cosmic-card p-6 max-w-sm w-full border-2 border-neon-green/50 animate-scale-in relative overflow-hidden">
        
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-futuristic-primary rounded-full animate-matrix-rain opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto mb-3 animate-neon-pulse relative">
              <span className="text-black text-2xl">{selectedLevel.emoji}</span>
              <div className="absolute -inset-2 rounded-full border-2 border-futuristic-primary/50 animate-ping"></div>
            </div>
            <h3 className="text-white font-bold text-lg animate-hologram-flicker">
              Активация Космической Сети
            </h3>
            <p className="text-futuristic-primary text-sm mt-1">
              {selectedLevel.name}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-gray-300 text-center mb-2">
              Купить уровни с {userLevel + 1} по {currentLevelIndex + 1}?
            </p>
            
            <div className="flex justify-center space-x-2 mb-4">
              {cosmicLevels.slice(userLevel, currentLevelIndex + 1).map((level) => (
                <div key={level.id} className="text-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-futuristic-primary/30 to-futuristic-accent/30 rounded-full flex items-center justify-center text-xs border border-futuristic-primary/50">
                    {level.id}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{level.price} TON</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-cosmic-gray/50 rounded-xl p-4 mb-4 text-center border border-neon-green/30 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-futuristic-primary/20 to-futuristic-accent/20 rounded-xl animate-energy-pulse"></div>
            <div className="relative">
              <p className="text-neon-green font-bold text-2xl animate-pulse">
                {totalPrice} TON
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Общая стоимость
              </p>
              <div className="text-xs text-futuristic-primary mt-2">
                🚀 Активация через Telegram Wallet
              </div>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={onClose}
              variant="ghost"
              className="flex-1 border border-gray-600 hover:bg-gray-800 transition-all duration-300"
              disabled={isPurchasing}
            >
              Отмена
            </Button>
            <Button
              onClick={confirmPurchase}
              className="flex-1 cosmic-button text-black font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
              disabled={isPurchasing}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-futuristic-primary to-futuristic-accent animate-energy-pulse"></div>
              <span className="relative z-10">
                {isPurchasing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Покупка...</span>
                  </div>
                ) : (
                  'Активировать 🚀'
                )}
              </span>
            </Button>
          </div>

          <div className="mt-4 text-center">
            <div className="text-xs text-gray-400">
              🌌 Cosmo Sphere - Строим будущее вместе
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkPurchaseModal;
