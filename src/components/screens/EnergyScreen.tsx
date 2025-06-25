
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Copy, Zap } from 'lucide-react';
import { toast } from 'sonner';

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

const EnergyScreen = () => {
  const { tonBalance, cosmoBalance, userLevel, totalUsers } = useWallet();
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);

  const referralLink = 'https://t.me/cosmo_bot?start=ref_u127843';

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована!');
  };

  const calculateTotalPrice = (targetLevel: number) => {
    return energyLevels
      .slice(userLevel, targetLevel)
      .reduce((sum, level) => sum + level.price, 0);
  };

  const handleLevelPurchase = (level: number) => {
    setSelectedLevel(level);
    setShowPurchaseModal(true);
  };

  const confirmPurchase = () => {
    const totalPrice = calculateTotalPrice(selectedLevel);
    if (tonBalance >= totalPrice) {
      toast.success(`Куплены уровни до ${selectedLevel}!`);
      setShowPurchaseModal(false);
    } else {
      toast.error('Недостаточно TON');
    }
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-3">
      {/* Animated Header */}
      <div className="cosmic-card p-4 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-neon-gradient rounded-full flex items-center justify-center animate-neon-pulse">
              <span className="text-lg">👤</span>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse flex items-center justify-center">
                <span className="text-xs text-black font-bold">{userLevel}</span>
              </div>
            </div>
            <div>
              <div className="text-white font-semibold">Уровень {userLevel}</div>
              <div className="text-gray-400 text-sm">Участник Ордена</div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="text-center">
              <div className="text-white font-bold text-lg">{tonBalance}</div>
              <div className="text-blue-400 text-sm">TON</div>
            </div>
            <div className="text-center">
              <div className="text-neon-green font-bold text-lg animate-pulse">{cosmoBalance}</div>
              <div className="text-neon-green text-sm">COSMO</div>
            </div>
          </div>
        </div>
        
        <div className="bg-neon-green/10 rounded-xl p-3 text-center border border-neon-green/30 animate-neon-pulse">
          <span className="text-neon-green font-semibold">
            ⚡ {totalUsers.toLocaleString()} участников активны
          </span>
        </div>
      </div>

      {/* Animated Referral Section */}
      <div className="cosmic-card p-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        <div className="flex items-center space-x-2 mb-3">
          <Zap className="h-5 w-5 text-neon-green animate-pulse" />
          <h3 className="text-white font-semibold">Пригласить друзей</h3>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-cosmic-gray/50 border border-neon-green/30 rounded-xl px-3 py-2 text-sm text-white backdrop-blur-sm"
          />
          <Button
            onClick={copyReferralLink}
            className="cosmic-button px-3 py-2 text-black font-semibold hover:scale-105 transition-transform"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Animated Energy Matrix */}
      <div className="cosmic-card p-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
          <h3 className="text-white font-semibold">Матрица Энергий</h3>
          <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        {/* Energy Levels Grid */}
        <div className="grid grid-cols-2 gap-3">
          {energyLevels.map((level, index) => (
            <Button
              key={level.id}
              onClick={() => handleLevelPurchase(level.id)}
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

      {/* Animated Matrix Visualization */}
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

      {/* Enhanced Purchase Modal */}
      {showPurchaseModal && (
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
                onClick={() => setShowPurchaseModal(false)}
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
      )}
    </div>
  );
};

export default EnergyScreen;
