
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Copy, Plus, Minus } from 'lucide-react';
import { toast } from 'sonner';

const energyLevels = [
  { id: 1, name: 'Энергия Начала', price: 0.5 },
  { id: 2, name: 'Энергия Пульса', price: 1 },
  { id: 3, name: 'Энергия Волны', price: 2 },
  { id: 4, name: 'Энергия Потока', price: 4 },
  { id: 5, name: 'Энергия Взрыва', price: 8 },
  { id: 6, name: 'Энергия Сферы', price: 16 },
  { id: 7, name: 'Энергия Кристалла', price: 32 },
  { id: 8, name: 'Энергия Плазмы', price: 64 },
  { id: 9, name: 'Энергия Ядра', price: 128 },
  { id: 10, name: 'Энергия Космоса', price: 256 },
];

const EnergyScreen = () => {
  const { tonBalance, cosmoBalance, userLevel, totalUsers } = useWallet();
  const [currentLevel, setCurrentLevel] = useState(1);
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

  const nextLevel = () => {
    if (currentLevel < 10) setCurrentLevel(currentLevel + 1);
  };

  const prevLevel = () => {
    if (currentLevel > 1) setCurrentLevel(currentLevel - 1);
  };

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Header */}
      <div className="cosmic-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-neon-gradient rounded-full flex items-center justify-center">
              <span className="text-black font-bold">👤</span>
            </div>
            <div>
              <div className="text-white font-semibold text-sm">Уровень {userLevel}</div>
              <div className="text-gray-400 text-xs">Участник Ордена</div>
            </div>
          </div>
          <div className="flex space-x-3">
            <div className="text-center">
              <div className="text-white font-bold text-sm">{tonBalance}</div>
              <div className="text-blue-400 text-xs">TON</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-sm">{cosmoBalance}</div>
              <div className="text-neon-green text-xs">COSMO</div>
            </div>
          </div>
        </div>
        
        <div className="bg-neon-green/10 rounded-lg p-2 text-center">
          <span className="text-neon-green text-sm font-semibold">
            {totalUsers.toLocaleString()} участников активны
          </span>
        </div>
      </div>

      {/* Referral */}
      <div className="cosmic-card p-4">
        <h3 className="text-white font-semibold text-sm mb-2">Пригласить друзей</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-cosmic-gray border border-neon-green/30 rounded-lg px-3 py-2 text-xs text-white"
          />
          <Button
            onClick={copyReferralLink}
            className="cosmic-button px-3 py-2 text-black font-semibold text-xs"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Energy Levels Grid */}
      <div className="cosmic-card p-4">
        <h3 className="text-white font-semibold mb-3 text-sm">Энергии Космо</h3>
        <div className="grid grid-cols-2 gap-2">
          {energyLevels.map((level) => (
            <Button
              key={level.id}
              onClick={() => handleLevelPurchase(level.id)}
              disabled={level.id <= userLevel}
              className={`p-3 rounded-lg border transition-all duration-200 text-xs ${
                level.id <= userLevel
                  ? 'bg-neon-green/20 border-neon-green text-white'
                  : 'bg-cosmic-gray border-gray-600 text-gray-300 hover:border-neon-blue hover:bg-cosmic-light'
              }`}
            >
              <div className="text-center">
                <div className="font-medium leading-tight mb-1">{level.name}</div>
                <div className="font-bold text-sm">{level.price} TON</div>
                {level.id <= userLevel && (
                  <div className="text-xs text-neon-green">✓ Активно</div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Level Detail */}
      <div className="cosmic-card p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={prevLevel}
            disabled={currentLevel === 1}
            className="text-neon-green hover:bg-neon-green/20 p-2"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <div className="text-center">
            <h3 className="text-white font-semibold text-sm">
              {energyLevels[currentLevel - 1]?.name}
            </h3>
            <span className="text-neon-green text-xs">Уровень {currentLevel}</span>
          </div>
          <Button
            variant="ghost"
            onClick={nextLevel}
            disabled={currentLevel === 10}
            className="text-neon-green hover:bg-neon-green/20 p-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Matrix Visualization */}
        <div className="space-y-3">
          <div className="text-center text-xs text-gray-400 mb-2">
            Матрица доходов
          </div>
          
          {/* Upline spots */}
          <div className="flex justify-center space-x-2 mb-2">
            {[1, 2].map((i) => (
              <div
                key={`up-${i}`}
                className="w-8 h-8 rounded-full border-2 border-neon-blue bg-neon-blue/20 flex items-center justify-center text-xs"
              >
                👤
              </div>
            ))}
          </div>
          
          <div className="text-center text-neon-blue text-xs mb-2">
            +{energyLevels[currentLevel - 1]?.price || 0} TON наверх
          </div>

          {/* Downline spots */}
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={`down-${i}`}
                className="w-8 h-8 rounded-full border-2 border-neon-green bg-neon-green/20 flex items-center justify-center text-xs mx-auto"
              >
                {Math.random() > 0.6 ? '👤' : '⭕'}
              </div>
            ))}
          </div>
          
          <div className="text-center text-neon-green text-xs">
            +{(energyLevels[currentLevel - 1]?.price || 0) * 2} TON вам
          </div>
        </div>

        <div className="mt-3 text-center">
          <span className="text-gray-400 text-xs">Циклов: </span>
          <span className="text-neon-green font-bold text-xs">
            {Math.floor(Math.random() * 5) + 1}
          </span>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="cosmic-card p-5 max-w-xs w-full">
            <h3 className="text-white font-bold text-base mb-3">Покупка энергии</h3>
            <p className="text-gray-300 text-sm mb-3">
              Купить уровни с {userLevel + 1} по {selectedLevel}?
            </p>
            <div className="bg-cosmic-gray rounded-lg p-3 mb-4 text-center">
              <p className="text-neon-green font-bold text-lg">
                {calculateTotalPrice(selectedLevel)} TON
              </p>
            </div>
            {tonBalance < calculateTotalPrice(selectedLevel) && (
              <p className="text-red-400 text-xs mb-3">
                Недостаточно средств
              </p>
            )}
            <div className="flex space-x-2">
              <Button
                onClick={() => setShowPurchaseModal(false)}
                variant="ghost"
                className="flex-1 text-sm"
              >
                Отмена
              </Button>
              <Button
                onClick={confirmPurchase}
                className="flex-1 cosmic-button text-black font-semibold text-sm"
                disabled={tonBalance < calculateTotalPrice(selectedLevel)}
              >
                Купить
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnergyScreen;
