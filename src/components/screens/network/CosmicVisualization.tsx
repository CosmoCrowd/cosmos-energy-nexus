
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';
import { cosmicLevels } from './NetworkMatrix';
import NetworkNavigationHeader from './NetworkNavigationHeader';
import NetworkParticleBackground from './NetworkParticleBackground';
import NetworkParticle from './NetworkParticle';
import NetworkPurchaseModal from './NetworkPurchaseModal';

const CosmicVisualization = () => {
  const { userLevel } = useWallet();
  const [currentLevelIndex, setCurrentLevelIndex] = useState(userLevel - 1);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Mock data for matrix participants
  const [matrixParticipants] = useState([
    { id: 1, name: 'Alexey', avatar: '👨‍🚀', position: 'level1_1' },
    { id: 2, name: 'Maria', avatar: '👩‍🚀', position: 'level1_2' },
    { id: 3, name: 'Ivan', avatar: '🧑‍🚀', position: 'level2_1' },
    { id: 4, name: 'Elena', avatar: '👩‍🔬', position: 'level2_2' },
    // Позиции level2_3 и level2_4 остаются пустыми
  ]);
  
  const [currentCycle, setCurrentCycle] = useState(1);
  const [completedCycles, setCompletedCycles] = useState(0);

  const currentLevel = cosmicLevels[currentLevelIndex] || cosmicLevels[0];

  const nextLevel = () => {
    setCurrentLevelIndex((prev) => (prev + 1) % cosmicLevels.length);
  };

  const prevLevel = () => {
    setCurrentLevelIndex((prev) => (prev - 1 + cosmicLevels.length) % cosmicLevels.length);
  };

  const handlePurchaseLevel = () => {
    if (currentLevelIndex + 1 > userLevel) {
      setShowPurchaseModal(true);
    }
  };

  const isLevelActive = currentLevelIndex + 1 <= userLevel;

  // Render matrix cell
  const renderMatrixCell = (position: string, size: 'large' | 'small') => {
    const participant = matrixParticipants.find(p => p.position === position);
    
    return (
      <div key={position} className="text-center group">
        <NetworkParticle
          emoji={participant ? participant.avatar : '👥'}
          isActive={isLevelActive}
          size={size}
          onClick={handlePurchaseLevel}
          participant={participant}
        />
        {participant && (
          <div className="text-xs text-futuristic-primary mt-1 font-bold">
            {participant.name}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="px-4 py-6 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
      {/* Level Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevLevel}
          className="w-10 h-10 rounded-full bg-futuristic-primary/20 border border-futuristic-primary/50 flex items-center justify-center hover:bg-futuristic-primary/30 transition-colors"
        >
          <ChevronLeft className="text-futuristic-primary" size={20} />
        </button>
        
        <div className="text-center">
          <h3 className="text-white font-bold text-lg">{currentLevel.name}</h3>
          <p className="text-futuristic-primary text-sm">{currentLevel.price} TON</p>
        </div>
        
        <button
          onClick={nextLevel}
          className="w-10 h-10 rounded-full bg-futuristic-primary/20 border border-futuristic-primary/50 flex items-center justify-center hover:bg-futuristic-primary/30 transition-colors"
        >
          <ChevronRight className="text-futuristic-primary" size={20} />
        </button>
      </div>

      {/* Cosmic Network Matrix 2x4 */}
      <div className="relative">
        <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 rounded-3xl p-1 shadow-2xl shadow-purple-500/30">
          <div className="bg-cosmic-dark/95 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden">
            
            <NetworkParticleBackground />

            {/* Navigator (Player) in center top */}
            <div className="mb-8 text-center relative z-10">
              <div className="inline-block">
                <NetworkParticle
                  emoji="🧑‍🚀"
                  isActive={true}
                  size="large"
                  onClick={() => {}}
                  isNavigator={true}
                />
                <div className="text-futuristic-primary font-bold text-sm mt-2">
                  Навигатор (Вы)
                </div>
              </div>
            </div>

            {/* Level 1 - 2 positions */}
            <div className="mb-8 relative z-10">
              <div className="text-center mb-4">
                <span className="text-futuristic-primary text-sm font-bold">Уровень 1</span>
              </div>
              <div className="grid grid-cols-2 gap-8 max-w-sm mx-auto">
                {renderMatrixCell('level1_1', 'large')}
                {renderMatrixCell('level1_2', 'large')}
              </div>
            </div>

            {/* Level 2 - 4 positions */}
            <div className="relative z-10">
              <div className="text-center mb-4">
                <span className="text-futuristic-primary text-sm font-bold">Уровень 2</span>
              </div>
              <div className="grid grid-cols-4 gap-4 max-w-lg mx-auto">
                {renderMatrixCell('level2_1', 'small')}
                {renderMatrixCell('level2_2', 'small')}
                {renderMatrixCell('level2_3', 'small')}
                {renderMatrixCell('level2_4', 'small')}
              </div>
            </div>

            {/* Cycle Information */}
            <div className="mt-8 text-center relative z-10">
              <div className="bg-gradient-to-br from-futuristic-primary/20 to-futuristic-secondary/20 rounded-3xl p-4 border-2 border-futuristic-primary/40 backdrop-blur-sm">
                <div className="flex items-center justify-center space-x-4 mb-3">
                  <div className="text-white font-bold">
                    Цикл: {currentCycle}
                  </div>
                  <div className="text-futuristic-accent">
                    Завершено: {completedCycles}
                  </div>
                </div>
                
                <div className="text-futuristic-primary text-sm">
                  Заполнено: {matrixParticipants.length}/6 позиций
                </div>
                
                {matrixParticipants.length === 6 && (
                  <div className="mt-2 text-green-400 font-bold animate-pulse">
                    🎉 Цикл завершён! +4 TON
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <NetworkPurchaseModal
        isOpen={showPurchaseModal}
        currentLevelIndex={currentLevelIndex}
        userLevel={userLevel}
        onClose={() => setShowPurchaseModal(false)}
      />
    </div>
  );
};

export default CosmicVisualization;
