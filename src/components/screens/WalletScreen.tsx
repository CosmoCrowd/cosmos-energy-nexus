
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Plus, Send, ArrowUpDown, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const WalletScreen = () => {
  const { tonBalance, cosmoBalance, isConnected } = useWallet();

  const transactions = [
    { id: 1, type: 'Заработано', amount: '+2.5 TON', date: '2024-01-15', status: 'completed' },
    { id: 2, type: 'Реинвест', amount: '-1.0 TON', date: '2024-01-14', status: 'completed' },
    { id: 3, type: 'Вывод', amount: '-5.0 TON', date: '2024-01-13', status: 'pending' },
    { id: 4, type: 'Заработано', amount: '+150 COSMO', date: '2024-01-12', status: 'completed' },
  ];

  const nfts = [
    { id: 1, name: 'Cosmo Crystal #123', image: '🔮', rarity: 'Epic' },
    { id: 2, name: 'Energy Particle #456', image: '⚡', rarity: 'Rare' },
  ];

  const handleTopUp = () => {
    toast.success('Перенаправление на пополнение TON');
  };

  const handleSend = () => {
    toast.info('Функция отправки TON');
  };

  const handleTransfer = () => {
    toast.info('Функция перевода TON');
  };

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Мой кошелёк</h1>
        <p className="text-gray-400 text-sm">
          Вывод, пополнение, трансфер доступны только для TON
        </p>
      </div>

      {/* Balance Section */}
      <div className="cosmic-card rounded-xl p-6 mb-6 animate-fade-in-up">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-2xl font-bold text-white">{tonBalance}</div>
            <div className="text-sm text-gray-400">TON</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-2xl font-bold text-neon-green">{cosmoBalance}</div>
            <div className="text-sm text-gray-400">COSMO</div>
          </div>
        </div>

        {/* Wallet Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button
            onClick={handleTopUp}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-4"
          >
            <Plus className="h-5 w-5 mb-1" />
            <span className="text-xs">Пополнить</span>
          </Button>
          <Button
            onClick={handleSend}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-4"
          >
            <Send className="h-5 w-5 mb-1" />
            <span className="text-xs">Отправить</span>
          </Button>
          <Button
            onClick={handleTransfer}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-4"
          >
            <ArrowUpDown className="h-5 w-5 mb-1" />
            <span className="text-xs">Перевести</span>
          </Button>
        </div>
      </div>

      {/* NFT Collection */}
      <div className="cosmic-card rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold">NFT Коллекция</h3>
          <Button variant="ghost" className="text-neon-green text-sm">
            <ExternalLink className="h-4 w-4 mr-1" />
            Добавить
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-cosmic-gray rounded-lg p-3 border border-neon-green/20">
              <div className="text-center">
                <div className="text-3xl mb-2">{nft.image}</div>
                <div className="text-sm font-medium text-white">{nft.name}</div>
                <div className="text-xs text-neon-green">{nft.rarity}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="cosmic-card rounded-xl p-4">
        <h3 className="text-white font-semibold mb-4">История транзакций</h3>
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-cosmic-gray rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  tx.type === 'Заработано' ? 'bg-green-500/20 text-green-400' :
                  tx.type === 'Реинвест' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  {tx.type === 'Заработано' ? '↗️' : 
                   tx.type === 'Реинвест' ? '🔄' : '↙️'}
                </div>
                <div>
                  <div className="text-white font-medium text-sm">{tx.type}</div>
                  <div className="text-gray-400 text-xs">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold ${
                  tx.amount.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {tx.amount}
                </div>
                <div className={`text-xs ${
                  tx.status === 'completed' ? 'text-green-400' : 'text-yellow-400'
                }`}>
                  {tx.status === 'completed' ? '✓ Завершено' : '⏳ В обработке'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;
