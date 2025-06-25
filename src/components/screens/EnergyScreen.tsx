
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Copy, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

const energyLevels = [
  { id: 1, name: 'Энергия Начала', price: 1 },
  { id: 2, name: 'Энергия Пульса', price: 2 },
  { id: 3, name: 'Энергия Волны', price: 4 },
  { id: 4, name: 'Энергия Потока', price: 8 },
  { id: 5, name: 'Энергия Взрыва', price: 16 },
  { id: 6, name: 'Энергия Сферы', price: 32 },
  { id: 7, name: 'Энергия Кристалла', price: 64 },
  { id: 8, name: 'Энергия Плазмы', price: 128 },
  { id: 9, name: 'Энергия Ядра', price: 256 },
  { id: 10, name: 'Энергия Космоса', price: 512 },
];

const EnergyScreen = () => {
  const { tonBalance, cosmoBalance, userLevel, totalUsers } = useWallet();
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(0);

  const referralLink = 'https://t.me/cosmo_bot?start=ref123456';

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Реферальная ссылка скопирована!');
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
      toast.success(`Успешно приобретены уровни до ${selectedLevel}!`);
      setShowPurchaseModal(false);
    } else {
      toast.error('Недостаточно TON. Пополните кошелёк.');
    }
  };

  const generateParticles = (level: number) => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      isActive: i < (level <= userLevel ? 6 : Math.floor(Math.random() * 3)),
      isUpper: i < 2,
      reward: energyLevels[level - 1]?.price || 0,
    }));
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      {/* Profile Section */}
      <div className="cosmic-card rounded-xl p-4 mb-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-neon-gradient rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">👤</span>
            </div>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-1">
                <span className="text-blue-400">💎</span>
                <span className="text-white font-semibold">{tonBalance}</span>
                <span className="text-xs text-gray-400">TON</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-neon-green">🌟</span>
                <span className="text-white font-semibold">{cosmoBalance}</span>
                <span className="text-xs text-gray-400">COSMO</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-neon-green neon-text text-lg font-bold animate-neon-pulse">
            {totalUsers.toLocaleString()} участников в системе
          </p>
        </div>
      </div>

      {/* Referral Section */}
      <div className="cosmic-card rounded-xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-2">Реферальная ссылка</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-cosmic-gray border border-neon-green/30 rounded-lg px-3 py-2 text-sm text-white"
          />
          <Button
            onClick={copyReferralLink}
            className="cosmic-button px-4 py-2 text-black font-semibold"
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Energy Levels */}
      <div className="cosmic-card rounded-xl p-4 mb-6">
        <h3 className="text-white font-semibold mb-4">Энергии Космо</h3>
        <div className="grid grid-cols-2 gap-3">
          {energyLevels.map((level) => (
            <Button
              key={level.id}
              onClick={() => handleLevelPurchase(level.id)}
              disabled={level.id <= userLevel}
              className={`p-3 rounded-lg border transition-all duration-200 ${
                level.id <= userLevel
                  ? 'bg-neon-green/20 border-neon-green text-white'
                  : 'bg-cosmic-gray border-gray-600 text-gray-300 hover:border-neon-blue hover:bg-cosmic-light'
              }`}
            >
              <div className="text-center">
                <div className="text-sm font-medium">{level.name}</div>
                <div className="text-lg font-bold">{level.price} TON</div>
                {level.id <= userLevel && (
                  <div className="text-xs text-neon-green">✓ Активно</div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </div>

      {/* Level Navigation */}
      <div className="cosmic-card rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            onClick={() => setCurrentLevel(Math.max(1, currentLevel - 1))}
            disabled={currentLevel === 1}
            className="text-neon-green hover:bg-neon-green/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-center">
            <h3 className="text-white font-semibold">
              {energyLevels[currentLevel - 1]?.name}
            </h3>
            <span className="text-neon-green text-sm">Уровень {currentLevel}</span>
          </div>
          <Button
            variant="ghost"
            onClick={() => setCurrentLevel(Math.min(10, currentLevel + 1))}
            disabled={currentLevel === 10}
            className="text-neon-green hover:bg-neon-green/20"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Energy Particles */}
        <div className="space-y-4">
          <div className="text-center text-sm text-gray-400 mb-2">
            Частицы Энергии
          </div>
          
          {/* Upper particles (for upline) */}
          <div className="flex justify-center space-x-2 mb-4">
            {generateParticles(currentLevel)
              .filter(p => p.isUpper)
              .map((particle) => (
                <div
                  key={`upper-${particle.id}`}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    particle.isActive
                      ? 'bg-neon-green/20 border-neon-green text-neon-green animate-neon-pulse'
                      : 'bg-gray-800 border-gray-600 text-gray-500'
                  }`}
                >
                  {particle.isActive ? '👤' : '⭕'}
                </div>
              ))}
          </div>
          
          <div className="text-center text-neon-blue text-sm">
            +{energyLevels[currentLevel - 1]?.price || 0} TON для вышестоящего
          </div>

          {/* Lower particles (for user) */}
          <div className="grid grid-cols-4 gap-2">
            {generateParticles(currentLevel)
              .filter(p => !p.isUpper)
              .map((particle) => (
                <div
                  key={`lower-${particle.id}`}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    particle.isActive
                      ? 'bg-neon-green/20 border-neon-green text-neon-green animate-neon-pulse'
                      : 'bg-gray-800 border-gray-600 text-gray-500'
                  }`}
                >
                  {particle.isActive ? '👤' : '⭕'}
                </div>
              ))}
          </div>
          
          <div className="text-center text-neon-green text-sm">
            +{(energyLevels[currentLevel - 1]?.price || 0) * 2} TON для вас
          </div>
        </div>

        {/* Matrix Cycles */}
        <div className="mt-4 text-center">
          <span className="text-gray-400 text-sm">Циклы матрицы: </span>
          <span className="text-neon-green font-bold">3</span>
        </div>
      </div>

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="cosmic-card rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-white font-bold text-lg mb-4">Подтверждение покупки</h3>
            <p className="text-gray-300 mb-4">
              Купить уровни с {userLevel + 1} по {selectedLevel}?
            </p>
            <div className="bg-cosmic-gray rounded-lg p-3 mb-4">
              <p className="text-neon-green font-bold text-xl">
                {calculateTotalPrice(selectedLevel)} TON
              </p>
            </div>
            {tonBalance < calculateTotalPrice(selectedLevel) && (
              <p className="text-red-400 text-sm mb-4">
                Недостаточно средств. Пополните TON
              </p>
            )}
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowPurchaseModal(false)}
                variant="ghost"
                className="flex-1"
              >
                Отмена
              </Button>
              <Button
                onClick={confirmPurchase}
                className="flex-1 cosmic-button text-black font-semibold"
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
