import { useState, useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { useNetworkLevels } from '@/hooks/useNetworkLevels';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Copy, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import NetworkPurchaseModal from './network/NetworkPurchaseModal';

const NetworkScreen = () => {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  const [currentMatrixLevel, setCurrentMatrixLevel] = useState(0);
  const [currentCycle, setCurrentCycle] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const [userName, setUserName] = useState('');
  
  const { profile, loading: profileLoading } = useProfile();
  const { levels, loading: levelsLoading } = useNetworkLevels();
  const { toast } = useToast();

  // Cosmic levels according to TZ
  const cosmicLevels = [
    { level: 1, name: 'Первопроходец', price: 1, dailyIncome: 0.012, minEarned: 0 },
    { level: 2, name: 'Звёздный Новичок', price: 2, dailyIncome: 0.024, minEarned: 10 },
    { level: 3, name: 'Путник Космоса', price: 4, dailyIncome: 0.048, minEarned: 20 },
    { level: 4, name: 'Звёздный Странник', price: 8, dailyIncome: 0.096, minEarned: 40 },
    { level: 5, name: 'Космический Мастер', price: 16, dailyIncome: 0.192, minEarned: 80 },
    { level: 6, name: 'Светоч Разума', price: 32, dailyIncome: 0.384, minEarned: 160 },
    { level: 7, name: 'Космический Визионер', price: 64, dailyIncome: 0.768, minEarned: 320 },
    { level: 8, name: 'Архитектор Сетей', price: 128, dailyIncome: 1.536, minEarned: 640 },
    { level: 9, name: 'Звёздный Лидер', price: 256, dailyIncome: 3.072, minEarned: 1280 },
    { level: 10, name: 'Владыка Космоса', price: 512, dailyIncome: 6.144, minEarned: 2560 },
  ];

  // Mock matrix participants
  const [matrixParticipants] = useState([
    { id: 1, name: 'Alexey', avatar: '👨‍🚀', position: 'level1_1' },
    { id: 2, name: 'Maria', avatar: '👩‍🚀', position: 'level1_2' },
    { id: 3, name: 'Ivan', avatar: '🧑‍🚀', position: 'level2_1' },
    { id: 4, name: 'Elena', avatar: '👩‍🔬', position: 'level2_2' },
  ]);

  useEffect(() => {
    // Get user info from Telegram
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      setUserName(user.first_name || user.username || 'Навигатор');
    } else {
      setUserName('Навигатор');
    }

    // Fetch total users count
    const fetchUsersCount = async () => {
      try {
        const { count } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        setTotalUsers(count || 127843); // Fallback number
      } catch (error) {
        setTotalUsers(127843); // Fallback number
      }
    };

    fetchUsersCount();
  }, []);

  const handleLevelPurchase = (levelIndex: number) => {
    setSelectedLevelIndex(levelIndex);
    setShowPurchaseModal(true);
  };

  const handleModalClose = () => {
    setShowPurchaseModal(false);
  };

  const copyReferralLink = () => {
    const referralLink = `https://t.me/CosmoSphereBot?start=${profile?.referral_code || 'DEFAULT'}`;
    navigator.clipboard.writeText(referralLink);
    toast({ title: "Реферальная ссылка скопирована!" });
  };

  const getCurrentRank = () => {
    const totalEarned = profile?.total_earned || 0;
    for (let i = cosmicLevels.length - 1; i >= 0; i--) {
      if (totalEarned >= cosmicLevels[i].minEarned) {
        return cosmicLevels[i].name;
      }
    }
    return cosmicLevels[0].name;
  };

  const nextLevel = () => {
    setCurrentMatrixLevel((prev) => (prev + 1) % cosmicLevels.length);
  };

  const prevLevel = () => {
    setCurrentMatrixLevel((prev) => (prev - 1 + cosmicLevels.length) % cosmicLevels.length);
  };

  // Render matrix cell
  const renderMatrixCell = (position: string, size: 'large' | 'small' = 'large') => {
    const participant = matrixParticipants.find(p => p.position === position);
    const isLarge = size === 'large';
    
    return (
      <div key={position} className="text-center group animate-fade-in-up">
        <div className={`relative ${isLarge ? 'w-16 h-16' : 'w-12 h-12'} mx-auto mb-2`}>
          <div className={`w-full h-full rounded-full ${
            participant 
              ? 'bg-gradient-to-br from-primary to-secondary border-2 border-primary/50' 
              : 'bg-gradient-to-br from-muted to-muted-foreground/20 border-2 border-dashed border-muted-foreground/50'
          } flex items-center justify-center transition-all duration-300 hover:scale-110 animate-cosmic-glow`}>
            <span className={`${isLarge ? 'text-2xl' : 'text-lg'}`}>
              {participant ? participant.avatar : '👤'}
            </span>
          </div>
          {participant && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
          )}
        </div>
        {participant && (
          <div className="text-xs text-primary font-bold">
            {participant.name}
          </div>
        )}
      </div>
    );
  };

  if (profileLoading || levelsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="cosmic-card p-8 text-center">
          <div className="relative w-16 h-16 mx-auto mb-4">
            <div className="absolute inset-0 bg-gradient-primary rounded-full animate-spin"></div>
            <div className="absolute inset-2 bg-background rounded-full flex items-center justify-center">
              <span className="text-2xl animate-pulse">🌌</span>
            </div>
          </div>
          <p className="text-muted-foreground">Cosmo Sphere пробуждается...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 pt-4 pb-24 space-y-6 relative animate-fade-in">
      {/* Cosmic Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-cosmic-pulse opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-6">
        {/* Header Section */}
        <div className="cosmic-card p-6 space-y-4">
          {/* User Profile Row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* NFT Avatar as per TZ */}
              <div className="relative w-14 h-14">
                <div className="w-full h-full rounded-full bg-gradient-primary p-0.5 animate-cosmic-glow">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-2 border-primary/30">
                    <span className="text-2xl">🧑‍🚀</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="text-foreground font-bold text-lg">{userName}</div>
                <div className="text-primary text-sm font-semibold animate-pulse">{getCurrentRank()}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyReferralLink}
                  className="p-0 h-auto text-xs text-muted-foreground hover:text-primary"
                >
                  Реферальная ссылка <Copy className="w-3 h-3 ml-1" />
                </Button>
              </div>
            </div>
            
            {/* Total Users Counter */}
            <div className="text-right">
              <div className="bg-gradient-secondary px-3 py-2 rounded-lg border border-secondary/30">
                <div className="flex items-center space-x-2">
                  <Users className="w-4 h-4 text-secondary-foreground" />
                  <span className="text-secondary-foreground text-sm font-bold">
                    {totalUsers.toLocaleString()}
                  </span>
                </div>
                <div className="text-xs text-secondary-foreground/70">Навигаторы</div>
              </div>
            </div>
          </div>

          {/* Cosmo Sphere Legend */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/30">
            <div className="flex items-center space-x-3">
              <span className="text-3xl animate-pulse">🌌</span>
              <div>
                <div className="text-primary font-bold">Cosmo Sphere пробуждается...</div>
                <div className="text-muted-foreground text-sm">Стройте Космические Сети, станьте частью будущего</div>
              </div>
            </div>
          </div>
        </div>

        {/* Levels Section */}
        <div className="cosmic-card p-6">
          <h3 className="text-foreground font-bold text-lg mb-4 text-center">Космические Уровни</h3>
          <div className="grid grid-cols-5 gap-3 mb-6">
            {cosmicLevels.map((level, index) => {
              const isActive = (profile?.network_level || 0) >= level.level;
              const canPurchase = !isActive;
              
              return (
                <div
                  key={level.level}
                  className={`relative p-3 rounded-xl border-2 text-center transition-all duration-300 cursor-pointer hover:scale-105 ${
                    isActive
                      ? 'bg-gradient-primary border-primary text-primary-foreground shadow-glow'
                      : 'bg-muted border-muted-foreground/30 text-muted-foreground hover:border-primary/50'
                  }`}
                  onClick={() => canPurchase && handleLevelPurchase(index)}
                >
                  <div className="text-lg mb-1">
                    {isActive ? '🚀' : '🔒'}
                  </div>
                  <div className="text-xs font-bold">{level.level}</div>
                  <div className="text-xs">{level.price} TON</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Matrix Visualization */}
        <div className="cosmic-card p-6">
          {/* Level Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={prevLevel}
              className="w-10 h-10 p-0 rounded-full border-primary/50 hover:bg-primary/10"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="text-center">
              <h3 className="text-foreground font-bold text-lg">{cosmicLevels[currentMatrixLevel].name}</h3>
              <p className="text-primary text-sm">{cosmicLevels[currentMatrixLevel].price} TON</p>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={nextLevel}
              className="w-10 h-10 p-0 rounded-full border-primary/50 hover:bg-primary/10"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Matrix 2x4 Visualization */}
          <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-primary/20">
            {/* Navigator (Player) */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary p-1 animate-cosmic-glow">
                <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-2 border-primary/50">
                  <span className="text-3xl">🧑‍🚀</span>
                </div>
              </div>
              <div className="text-primary font-bold mt-2">Навигатор (Вы)</div>
            </div>

            {/* Level 1 - 2 positions */}
            <div className="mb-8">
              <div className="text-center mb-4">
                <span className="text-primary text-sm font-bold">Уровень 1</span>
              </div>
              <div className="grid grid-cols-2 gap-8 max-w-xs mx-auto">
                {renderMatrixCell('level1_1')}
                {renderMatrixCell('level1_2')}
              </div>
            </div>

            {/* Level 2 - 4 positions */}
            <div className="mb-6">
              <div className="text-center mb-4">
                <span className="text-primary text-sm font-bold">Уровень 2</span>
              </div>
              <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
                {renderMatrixCell('level2_1', 'small')}
                {renderMatrixCell('level2_2', 'small')}
                {renderMatrixCell('level2_3', 'small')}
                {renderMatrixCell('level2_4', 'small')}
              </div>
            </div>

            {/* Cycle Information */}
            <div className="bg-gradient-accent/10 rounded-xl p-4 border border-accent/30 text-center">
              <div className="flex items-center justify-center space-x-6 mb-2">
                <div className="text-foreground font-bold">Цикл: {currentCycle}</div>
                <div className="text-accent">Заполнено: {matrixParticipants.length}/6</div>
              </div>
              <div className="text-sm text-muted-foreground">
                При заполнении 6 позиций: +4 TON (1 TON - новый цикл, 2 TON - следующий уровень, 1 TON - прибыль)
              </div>
              {matrixParticipants.length === 6 && (
                <div className="mt-2 text-success font-bold animate-pulse">
                  🎉 Цикл завершён! +4 TON
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <NetworkPurchaseModal
        isOpen={showPurchaseModal}
        currentLevelIndex={selectedLevelIndex}
        userLevel={profile?.network_level || 1}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default NetworkScreen;
