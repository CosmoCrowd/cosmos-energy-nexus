
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
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cosmic-dark/90 via-purple-900/20 to-pink-900/20 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-hologram-gradient animate-hologram-flicker opacity-30"></div>
      
      <div className="relative z-10">
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          {/* Left - User Profile */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 p-0.5 animate-futuristic-glow">
                <div className="w-full h-full bg-cosmic-dark rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <span className="text-sm">🧑‍🚀</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-sm">{userName}</div>
              <div className="text-yellow-400 text-xs animate-pulse">{getUserRank()}</div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-futuristic-primary font-mono">{tonBalance.toFixed(2)} TON</span>
                <span className="text-pink-400 font-mono">{cosmoBalance} COSMO</span>
              </div>
            </div>
          </div>

          {/* Right - Users Counter and Refresh */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-white text-xs font-bold">НАВИГАТОРЫ</span>
                <span className="text-white text-sm font-mono animate-pulse">{totalUsers.toLocaleString()}</span>
              </div>
            </div>
            <Button
              onClick={refreshBalance}
              variant="ghost"
              size="sm"
              className="p-2 hover:bg-futuristic-primary/20 transition-all duration-300 hover:scale-110 rounded-xl border border-futuristic-primary/30"
            >
              <FuturisticRefresh size={16} className="text-futuristic-primary" />
            </Button>
          </div>
        </div>

        {/* Cosmo Sphere Legend */}
        <div className="bg-gradient-to-r from-futuristic-primary/10 to-futuristic-accent/10 rounded-xl p-3 border border-futuristic-primary/30">
          <div className="flex items-center space-x-2">
            <span className="text-2xl animate-pulse">🌌</span>
            <div>
              <div className="text-futuristic-primary font-bold text-sm">Cosmo Sphere пробуждается...</div>
              <div className="text-gray-300 text-xs">Стройте Космические Сети, станьте частью будущего</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkHeader;
