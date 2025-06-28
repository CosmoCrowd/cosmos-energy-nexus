
import { useWallet } from '@/context/WalletContext';
import { FuturisticRefresh } from '@/components/ui/futuristic-icons';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const EnergyHeader = () => {
  const { tonBalance, cosmoBalance, userLevel, walletAddress, refreshBalance } = useWallet();
  const [totalUsers, setTotalUsers] = useState(127843); // Mock data for now
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Get user name from Telegram
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const user = window.Telegram.WebApp.initDataUnsafe.user;
      setUserName(user.first_name || user.username || 'User');
    } else {
      setUserName('Samantha'); // Fallback name
    }
  }, []);

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
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 p-0.5">
                <div className="w-full h-full bg-cosmic-dark rounded-full flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center">
                    <span className="text-sm">👤</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-sm">{userName}</div>
              <div className="flex items-center space-x-3 text-xs">
                <span className="text-futuristic-primary font-mono">{tonBalance.toFixed(2)} TON</span>
                <span className="text-pink-400 font-mono">{cosmoBalance} COSMO</span>
              </div>
            </div>
          </div>

          {/* Right - Users Indicator */}
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-1 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-white text-xs font-bold">USERS</span>
                <span className="text-white text-sm font-mono">{totalUsers.toLocaleString()}</span>
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
      </div>
    </div>
  );
};

export default EnergyHeader;
