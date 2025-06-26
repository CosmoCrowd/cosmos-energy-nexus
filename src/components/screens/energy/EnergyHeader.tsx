
import { useWallet } from '@/context/WalletContext';
import { FuturisticRefresh } from '@/components/ui/futuristic-icons';
import { Button } from '@/components/ui/button';

const EnergyHeader = () => {
  const { tonBalance, tonPrice, userLevel, walletAddress, refreshBalance } = useWallet();

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/10 to-futuristic-secondary/10 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up">
      {/* Hologram Background Effect */}
      <div className="absolute inset-0 bg-hologram-gradient animate-hologram-flicker"></div>
      
      <div className="relative p-6 z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-5">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 bg-futuristic-gradient rounded-full animate-futuristic-glow"></div>
              <div className="absolute inset-1 bg-cosmic-dark rounded-full flex items-center justify-center border border-futuristic-primary/50">
                <span className="text-2xl animate-energy-pulse">👑</span>
              </div>
              <div className="absolute -top-1 -right-1 w-7 h-7 bg-futuristic-primary rounded-full animate-energy-pulse flex items-center justify-center border-2 border-cosmic-dark shadow-lg shadow-futuristic-primary/50">
                <span className="text-xs text-black font-bold">{userLevel}</span>
              </div>
            </div>
            <div>
              <div className="text-white font-bold text-xl animate-hologram-flicker">Уровень {userLevel}</div>
              <div className="text-futuristic-primary/80 text-sm animate-energy-pulse font-mono">{formatAddress(walletAddress)}</div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={refreshBalance}
              variant="ghost"
              size="sm"
              className="p-3 hover:bg-futuristic-primary/20 transition-all duration-300 hover:scale-110 rounded-xl border border-futuristic-primary/30 hover:border-futuristic-primary/60 animate-futuristic-glow"
            >
              <FuturisticRefresh size={18} className="text-futuristic-primary" />
            </Button>
            <div className="text-center">
              <div className="flex items-center space-x-2">
                <div className="text-white font-bold text-2xl animate-hologram-flicker font-mono">{tonBalance.toFixed(3)}</div>
                <div className="text-futuristic-primary text-sm font-bold animate-energy-pulse">TON</div>
              </div>
              <div className="text-futuristic-secondary/80 text-sm animate-hologram-flicker font-mono">
                ${(tonBalance * tonPrice).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-futuristic-primary/20 rounded-2xl p-4 text-center border border-futuristic-primary/40 animate-futuristic-glow backdrop-blur-sm">
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl animate-energy-pulse">⚡</span>
            <div className="text-futuristic-primary font-bold text-lg animate-hologram-flicker font-mono">
              TON: ${tonPrice.toFixed(2)}
            </div>
            <span className="text-2xl animate-energy-pulse" style={{animationDelay: '0.5s'}}>📊</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnergyHeader;
