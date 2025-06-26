
import { useWallet } from '@/context/WalletContext';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EnergyHeader = () => {
  const { tonBalance, tonPrice, userLevel, walletAddress, refreshBalance } = useWallet();

  const formatAddress = (address: string | null) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <div className="cosmic-card p-4 animate-fade-in-up">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="relative w-12 h-12 bg-neon-gradient rounded-full flex items-center justify-center animate-neon-pulse">
            <span className="text-lg">👤</span>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-green rounded-full animate-pulse flex items-center justify-center">
              <span className="text-xs text-black font-bold">{userLevel}</span>
            </div>
          </div>
          <div>
            <div className="text-white font-semibold">Уровень {userLevel}</div>
            <div className="text-gray-400 text-xs">{formatAddress(walletAddress)}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={refreshBalance}
            variant="ghost"
            size="sm"
            className="p-2"
          >
            <RefreshCw className="h-4 w-4 text-gray-400" />
          </Button>
          <div className="text-center">
            <div className="flex items-center space-x-1">
              <div className="text-white font-bold text-lg">{tonBalance.toFixed(2)}</div>
              <div className="text-blue-400 text-sm">TON</div>
            </div>
            <div className="text-gray-400 text-xs">
              ${(tonBalance * tonPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-neon-green/10 rounded-xl p-3 text-center border border-neon-green/30">
        <div className="text-neon-green font-semibold text-sm">
          💎 TON: ${tonPrice.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default EnergyHeader;
