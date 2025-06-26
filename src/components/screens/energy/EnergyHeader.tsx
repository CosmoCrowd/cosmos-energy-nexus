
import { useWallet } from '@/context/WalletContext';
import { CosmicRefresh } from '@/components/ui/cosmic-icons';
import { Button } from '@/components/ui/button';

const EnergyHeader = () => {
  const { tonBalance, tonPrice, userLevel, walletAddress, refreshBalance } = useWallet();

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="cosmic-card p-5 animate-slide-in-down">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-4">
          <div className="relative w-14 h-14">
            <div className="absolute inset-0 bg-neon-gradient rounded-full animate-cosmic-spin-slow"></div>
            <div className="absolute inset-1 bg-cosmic-dark rounded-full flex items-center justify-center">
              <span className="text-xl animate-bounce">👑</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-neon-green rounded-full animate-cosmic-pulse flex items-center justify-center border-2 border-cosmic-dark">
              <span className="text-xs text-black font-bold">{userLevel}</span>
            </div>
          </div>
          <div>
            <div className="text-white font-bold text-lg animate-text-shimmer">Уровень {userLevel}</div>
            <div className="text-gray-400 text-sm animate-pulse">{formatAddress(walletAddress)}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            onClick={refreshBalance}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-neon-green/20 transition-all duration-300 hover:scale-110"
          >
            <CosmicRefresh size={16} className="text-gray-400 hover:text-neon-green" />
          </Button>
          <div className="text-center">
            <div className="flex items-center space-x-2">
              <div className="text-white font-bold text-xl animate-counter-up">{tonBalance.toFixed(3)}</div>
              <div className="text-blue-400 text-sm font-semibold animate-pulse">TON</div>
            </div>
            <div className="text-gray-400 text-xs animate-fade-in">
              ${(tonBalance * tonPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-neon-green/10 rounded-xl p-4 text-center border border-neon-green/30 animate-border-glow">
        <div className="flex items-center justify-center space-x-2">
          <span className="animate-bounce">💎</span>
          <div className="text-neon-green font-bold animate-text-glow">
            TON: ${tonPrice.toFixed(2)}
          </div>
          <span className="animate-bounce" style={{animationDelay: '0.5s'}}>📈</span>
        </div>
      </div>
    </div>
  );
};

export default EnergyHeader;
