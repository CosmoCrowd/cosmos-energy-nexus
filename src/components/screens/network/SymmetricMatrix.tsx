import React, { useState } from 'react';
import { useNetworkLevels } from '@/hooks/useNetworkLevels';
import { useProfile } from '@/hooks/useProfile';
import { useTelegramWallet } from '@/hooks/useTelegramWallet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Crown, Zap, Users, Star, Lock, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SymmetricMatrixProps {
  onLevelPurchase: (level: number) => void;
}

const SymmetricMatrix = ({ onLevelPurchase }: SymmetricMatrixProps) => {
  const { levels, loading: levelsLoading } = useNetworkLevels();
  const { profile } = useProfile();
  const { wallet, sendTransaction } = useTelegramWallet();
  const { toast } = useToast();
  const [purchasing, setPurchasing] = useState<number | null>(null);

  const userLevel = profile?.network_level || 1;
  const userBalance = parseFloat(wallet.balance || '0');

  const getLevelIcon = (level: number) => {
    const icons = ['🌟', '⭐', '🚀', '🌌', '🛸', '💫', '✨'];
    return icons[level - 1] || '🔮';
  };

  const getLevelGradient = (level: number, isActive: boolean, canPurchase: boolean) => {
    if (isActive) {
      return 'from-cosmic-primary via-cosmic-primary-glow to-cosmic-accent bg-gradient-to-br animate-cosmic-glow';
    }
    if (canPurchase) {
      return 'from-cosmic-secondary/30 via-cosmic-muted to-cosmic-card bg-gradient-to-br hover:from-cosmic-primary/20 hover:to-cosmic-accent/20';
    }
    return 'from-cosmic-muted/20 via-cosmic-card to-cosmic-muted/10 bg-gradient-to-br opacity-50';
  };

  const handlePurchase = async (levelData: any) => {
    if (!wallet.connected) {
      toast({
        title: "Подключите кошелек",
        description: "Для покупки уровня необходимо подключить TON кошелек",
        variant: "destructive",
      });
      return;
    }

    if (userBalance < levelData.price_ton) {
      toast({
        title: "Недостаточно средств",
        description: `Нужно ${levelData.price_ton} TON, у вас ${userBalance.toFixed(4)} TON`,
        variant: "destructive",
      });
      return;
    }

    setPurchasing(levelData.level_number);
    
    try {
      // Mock transaction for demo
      await sendTransaction('UQDemo...', levelData.price_ton.toString());
      
      toast({
        title: "Уровень активирован!",
        description: `${levelData.level_name} успешно приобретен`,
      });
      
      onLevelPurchase(levelData.level_number);
    } catch (error) {
      toast({
        title: "Ошибка покупки",
        description: "Не удалось приобрести уровень",
        variant: "destructive",
      });
    } finally {
      setPurchasing(null);
    }
  };

  if (levelsLoading) {
    return (
      <div className="glass-card p-8 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-cosmic-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Загрузка космических уровней...</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-screen-enter">
      <div className="relative">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Космическая Матрица
          </h2>
          <p className="text-muted-foreground">
            Симметричная сеть бесконечных возможностей
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Прогресс</span>
            <span className="text-sm font-medium text-cosmic-primary">
              {userLevel}/{levels.length}
            </span>
          </div>
          <Progress 
            value={(userLevel / levels.length) * 100} 
            className="h-2 bg-cosmic-muted"
          />
        </div>

        {/* Symmetric Grid */}
        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
          {levels.map((level, index) => {
            const isActive = level.level_number <= userLevel;
            const canPurchase = level.level_number === userLevel + 1 && userBalance >= level.price_ton;
            const isLocked = level.level_number > userLevel + 1;
            const isPurchasing = purchasing === level.level_number;

            return (
              <div
                key={level.id}
                className={`
                  relative group cursor-pointer transform transition-all duration-500
                  ${index % 3 === 1 ? 'scale-110' : ''} // Center column slightly larger
                  hover:scale-110 hover:z-10
                `}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`
                  p-6 rounded-2xl border-2 transition-all duration-300
                  ${getLevelGradient(level.level_number, isActive, canPurchase)}
                  ${isActive ? 'border-cosmic-primary shadow-cosmic-primary' : 
                    canPurchase ? 'border-cosmic-secondary hover:border-cosmic-primary' : 
                    'border-cosmic-border'}
                `}>
                  {/* Level Number Badge */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center text-sm font-bold border-2 border-cosmic-dark">
                    {level.level_number}
                  </div>

                  {/* Status Icon */}
                  <div className="absolute -top-2 -left-2">
                    {isActive ? (
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                    ) : isLocked ? (
                      <div className="w-6 h-6 bg-cosmic-muted rounded-full flex items-center justify-center">
                        <Lock size={14} className="text-muted-foreground" />
                      </div>
                    ) : null}
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <div className={`text-4xl ${isActive ? 'animate-cosmic-bounce' : ''}`}>
                      {isPurchasing ? '⏳' : getLevelIcon(level.level_number)}
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-muted-foreground'}`}>
                        {level.level_name}
                      </h3>
                      
                      <div className="flex items-center justify-center space-x-1">
                        <Zap size={12} className="text-cosmic-accent" />
                        <span className={`text-xs font-mono ${isActive ? 'text-cosmic-accent' : 'text-muted-foreground'}`}>
                          {level.daily_income} TON/день
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                      <Badge 
                        variant={isActive ? "default" : "secondary"}
                        className={`${isActive ? 'bg-gradient-primary' : ''}`}
                      >
                        {level.price_ton} TON
                      </Badge>

                      {/* Purchase Button */}
                      {!isActive && canPurchase && (
                        <Button
                          size="sm"
                          onClick={() => handlePurchase(level)}
                          disabled={isPurchasing}
                          className="w-full cosmic-button text-xs"
                        >
                          {isPurchasing ? 'Покупка...' : 'Активировать'}
                        </Button>
                      )}

                      {isActive && (
                        <div className="text-xs text-cosmic-primary font-bold animate-cosmic-pulse">
                          ✓ АКТИВНО
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cosmic-primary/10 to-cosmic-accent/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Connection Lines for Symmetry */}
                {index < levels.length - 1 && index % 3 !== 2 && (
                  <div className="absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-cosmic-primary/50 to-transparent transform -translate-y-1/2 z-0"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* Stats Footer */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-cosmic-primary">{profile?.active_referrals || 0}</div>
            <div className="text-xs text-muted-foreground">Активные рефералы</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-cosmic-accent">{profile?.total_earned.toFixed(4) || '0.0000'}</div>
            <div className="text-xs text-muted-foreground">TON заработано</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-cosmic-secondary">{userLevel}</div>
            <div className="text-xs text-muted-foreground">Текущий уровень</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SymmetricMatrix;