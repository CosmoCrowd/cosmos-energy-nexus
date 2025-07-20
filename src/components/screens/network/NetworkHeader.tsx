
import { useWallet } from '@/context/WalletContext';
import { FuturisticRefresh } from '@/components/ui/futuristic-icons';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const NetworkHeader = () => {
  const { tonBalance, cosmoBalance, userLevel, walletAddress, refreshBalance } = useWallet();
  const [totalUsers, setTotalUsers] = useState(127843);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      setUserName(user.first_name || user.username || 'User');
    } else {
      setUserName('Навигатор'); // Fallback name
    }
  }, []);

  // User ranks based on TON earned
  const getUserRank = () => {
    const ranks = [
      { name: 'Первопроходец', minTon: 0 },
      { name: 'Звёздный Новичок', minTon: 10 },
      { name: 'Путник Космоса', minTon: 20 },
      { name: 'Звёздный Странник', minTon: 40 },
      { name: 'Космический Мастер', minTon: 80 },
      { name: 'Светоч Разума', minTon: 160 },
      { name: 'Космический Визионер', minTon: 320 },
      { name: 'Архитектор Сетей', minTon: 640 },
      { name: 'Звёздный Лидер', minTon: 1280 },
      { name: 'Владыка Космоса', minTon: 2560 },
    ];
    
    // Find the highest rank based on balance
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (tonBalance >= ranks[i].minTon) {
        return ranks[i].name;
      }
    }
    return ranks[0].name;
  };

  return (
    <div className="cosmic-card p-6 space-y-4 animate-fade-in-up">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Left - User Profile */}
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14">
            <div className="w-full h-full rounded-full bg-gradient-primary p-0.5 animate-cosmic-glow">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center border-2 border-primary/30">
                <span className="text-2xl">🧑‍🚀</span>
              </div>
            </div>
          </div>
          <div>
            <div className="text-foreground font-bold text-lg">{userName}</div>
            <div className="text-primary text-sm font-semibold animate-pulse">{getUserRank()}</div>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-primary font-mono text-sm font-bold">{tonBalance.toFixed(2)} TON</span>
              <span className="text-accent font-mono text-sm font-bold">{cosmoBalance} COSMO</span>
            </div>
          </div>
        </div>

        {/* Right - Users Counter and Refresh */}
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-secondary px-4 py-2 rounded-xl border border-secondary/30">
            <div className="flex items-center space-x-2">
              <span className="text-secondary-foreground text-xs font-bold">НАВИГАТОРЫ</span>
              <span className="text-secondary-foreground text-lg font-mono animate-pulse">{totalUsers.toLocaleString()}</span>
            </div>
          </div>
          <Button
            onClick={refreshBalance}
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 rounded-full border-primary/50 hover:bg-primary/10 transition-all duration-300 hover:scale-110"
          >
            <FuturisticRefresh size={16} className="text-primary" />
          </Button>
        </div>
      </div>

      {/* Cosmo Sphere Legend */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-4 border border-primary/30">
        <div className="flex items-center space-x-3">
          <span className="text-3xl animate-pulse">🌌</span>
          <div>
            <div className="text-primary font-bold text-lg">Cosmo Sphere пробуждается...</div>
            <div className="text-muted-foreground text-sm">Стройте Космические Сети, станьте частью будущего</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHeader;
