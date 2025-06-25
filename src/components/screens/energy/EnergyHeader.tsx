
import { useWallet } from '@/context/WalletContext';

const EnergyHeader = () => {
  const { tonBalance, cosmoBalance, userLevel, totalUsers } = useWallet();

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
            <div className="text-gray-400 text-sm">Участник Ордена</div>
          </div>
        </div>
        <div className="flex space-x-4">
          <div className="text-center">
            <div className="text-white font-bold text-lg">{tonBalance}</div>
            <div className="text-blue-400 text-sm">TON</div>
          </div>
          <div className="text-center">
            <div className="text-neon-green font-bold text-lg animate-pulse">{cosmoBalance}</div>
            <div className="text-neon-green text-sm">COSMO</div>
          </div>
        </div>
      </div>
      
      <div className="bg-neon-green/10 rounded-xl p-3 text-center border border-neon-green/30 animate-neon-pulse">
        <span className="text-neon-green font-semibold">
          ⚡ {totalUsers.toLocaleString()} участников активны
        </span>
      </div>
    </div>
  );
};

export default EnergyHeader;
