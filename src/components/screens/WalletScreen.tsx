
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Copy, ExternalLink, ArrowUpRight, ArrowDownLeft, Wallet, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

const WalletScreen = () => {
  const { tonBalance, cosmoBalance, walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet();
  const [activeTab, setActiveTab] = useState<'balance' | 'transactions'>('balance');

  // Mock transaction data
  const transactions = [
    { id: 1, type: 'deposit', amount: 5.0, date: '2024-01-15', status: 'completed', hash: 'abc123...' },
    { id: 2, type: 'withdrawal', amount: -2.5, date: '2024-01-14', status: 'completed', hash: 'def456...' },
    { id: 3, type: 'reward', amount: 1.25, date: '2024-01-13', status: 'completed', hash: 'ghi789...' },
    { id: 4, type: 'purchase', amount: -8.0, date: '2024-01-12', status: 'pending', hash: 'jkl012...' },
  ];

  const copyAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      toast.success('Адрес кошелька скопирован!');
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'deposit': return <ArrowDownLeft className="text-green-400" size={20} />;
      case 'withdrawal': return <ArrowUpRight className="text-red-400" size={20} />;
      case 'reward': return <span className="text-yellow-400">💰</span>;
      case 'purchase': return <CreditCard className="text-blue-400" size={20} />;
      default: return <Wallet className="text-gray-400" size={20} />;
    }
  };

  const getTransactionLabel = (type: string) => {
    switch (type) {
      case 'deposit': return 'Пополнение';
      case 'withdrawal': return 'Вывод';
      case 'reward': return 'Награда';
      case 'purchase': return 'Покупка';
      default: return 'Транзакция';
    }
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-futuristic-accent rounded-full animate-matrix-rain opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Wallet Header */}
        <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/10 to-futuristic-accent/10 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-futuristic-primary to-futuristic-secondary rounded-full flex items-center justify-center mx-auto mb-3 animate-energy-pulse">
              <Wallet className="text-black" size={28} />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Космический Кошелёк</h2>
            {isConnected ? (
              <div className="space-y-2">
                <div className="bg-cosmic-gray/50 rounded-xl p-3 border border-futuristic-primary/30">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">{formatAddress(walletAddress!)}</span>
                    <Button
                      onClick={copyAddress}
                      size="sm"
                      variant="ghost"
                      className="text-futuristic-primary hover:bg-futuristic-primary/20 p-1"
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="ghost"
                  className="text-red-400 hover:bg-red-400/20 text-sm"
                >
                  Отключить кошелёк
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                className="bg-gradient-to-r from-futuristic-primary to-futuristic-accent text-black font-bold hover:scale-105 transition-transform"
              >
                Подключить Кошелёк
              </Button>
            )}
          </div>
        </div>

        {isConnected && (
          <>
            {/* Balance Cards */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="bg-gradient-to-br from-cosmic-dark/90 via-blue-900/20 to-cyan-900/20 rounded-3xl p-4 border border-cyan-400/30 backdrop-blur-xl">
                <div className="text-center">
                  <div className="text-2xl mb-2">💎</div>
                  <div className="text-cyan-400 font-bold text-lg font-mono">{tonBalance.toFixed(2)} TON</div>
                  <div className="text-gray-400 text-xs">Основной баланс</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-cosmic-dark/90 via-pink-900/20 to-purple-900/20 rounded-3xl p-4 border border-pink-400/30 backdrop-blur-xl">
                <div className="text-center">
                  <div className="text-2xl mb-2">🌌</div>
                  <div className="text-pink-400 font-bold text-lg font-mono">{cosmoBalance} COSMO</div>
                  <div className="text-gray-400 text-xs">Игровые токены</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Button className="bg-green-600/20 border border-green-400/50 text-green-400 hover:bg-green-600/30 rounded-2xl py-4 flex items-center space-x-2">
                <ArrowDownLeft size={20} />
                <span>Пополнить</span>
              </Button>
              <Button className="bg-red-600/20 border border-red-400/50 text-red-400 hover:bg-red-600/30 rounded-2xl py-4 flex items-center space-x-2">
                <ArrowUpRight size={20} />
                <span>Вывести</span>
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex bg-cosmic-gray/30 rounded-2xl p-1 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <Button
                onClick={() => setActiveTab('balance')}
                className={`flex-1 rounded-xl py-3 transition-all ${
                  activeTab === 'balance'
                    ? 'bg-futuristic-primary text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Баланс
              </Button>
              <Button
                onClick={() => setActiveTab('transactions')}
                className={`flex-1 rounded-xl py-3 transition-all ${
                  activeTab === 'transactions'
                    ? 'bg-futuristic-primary text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                История
              </Button>
            </div>

            {/* Content */}
            {activeTab === 'balance' ? (
              <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <h3 className="text-white font-bold mb-4">Детали баланса</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-cosmic-gray/30 rounded-xl">
                    <span className="text-gray-300">Доступно для вывода</span>
                    <span className="text-futuristic-primary font-mono">{(tonBalance * 0.8).toFixed(2)} TON</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cosmic-gray/30 rounded-xl">
                    <span className="text-gray-300">В игре</span>
                    <span className="text-futuristic-accent font-mono">{(tonBalance * 0.2).toFixed(2)} TON</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cosmic-gray/30 rounded-xl">
                    <span className="text-gray-300">Реферальные</span>
                    <span className="text-pink-400 font-mono">{cosmoBalance} COSMO</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <h3 className="text-white font-bold mb-4">История транзакций</h3>
                <div className="space-y-3">
                  {transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-3 bg-cosmic-gray/30 rounded-xl">
                      <div className="flex items-center space-x-3">
                        {getTransactionIcon(tx.type)}
                        <div>
                          <div className="text-white font-medium">{getTransactionLabel(tx.type)}</div>
                          <div className="text-gray-400 text-xs">{tx.date}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-mono font-bold ${tx.amount > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount} TON
                        </div>
                        <div className={`text-xs ${tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                          {tx.status === 'completed' ? 'Завершено' : 'В обработке'}
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full text-futuristic-primary hover:bg-futuristic-primary/20 flex items-center space-x-2"
                  >
                    <ExternalLink size={16} />
                    <span>Посмотреть в TON Explorer</span>
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default WalletScreen;
