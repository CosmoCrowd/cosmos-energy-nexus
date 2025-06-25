
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Plus, Send, ArrowUpDown, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

const WalletScreen = () => {
  const { tonBalance, cosmoBalance } = useWallet();

  const transactions = [
    { id: 1, type: 'Реинвест', amount: '-0.5 TON', date: '25.06.2024', status: 'completed' },
    { id: 2, type: 'Заработано', amount: '+0.75 TON', date: '24.06.2024', status: 'completed' },
    { id: 3, type: 'Пополнение', amount: '+2.0 TON', date: '23.06.2024', status: 'completed' },
    { id: 4, type: 'Бонус', amount: '+25 COSMO', date: '23.06.2024', status: 'completed' },
    { id: 5, type: 'Реферал', amount: '+50 COSMO', date: '22.06.2024', status: 'completed' },
  ];

  const nfts = [
    { id: 1, name: 'Cosmo Crystal #1247', image: '🔮', rarity: 'Rare', price: '0.8 TON' },
    { id: 2, name: 'Energy Particle #892', image: '⚡', rarity: 'Common', price: '0.3 TON' },
  ];

  const handleAction = (action: string) => {
    toast.info(`${action} - скоро будет доступно`);
  };

  return (
    <div className="px-4 pt-4 pb-6 space-y-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-white mb-1">Кошелёк</h1>
        <p className="text-gray-400 text-xs">
          Управление активами и NFT коллекцией
        </p>
      </div>

      {/* Balance */}
      <div className="cosmic-card p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl mb-1">💎</div>
            <div className="text-xl font-bold text-white">{tonBalance}</div>
            <div className="text-xs text-gray-400">TON</div>
          </div>
          <div className="text-center">
            <div className="text-2xl mb-1">🌟</div>
            <div className="text-xl font-bold text-neon-green">{cosmoBalance}</div>
            <div className="text-xs text-gray-400">COSMO</div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => handleAction('Пополнение')}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-xs"
          >
            <Plus className="h-4 w-4 mb-1" />
            Пополнить
          </Button>
          <Button
            onClick={() => handleAction('Отправка')}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-xs"
          >
            <Send className="h-4 w-4 mb-1" />
            Отправить
          </Button>
          <Button
            onClick={() => handleAction('Обмен')}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-xs"
          >
            <ArrowUpDown className="h-4 w-4 mb-1" />
            Обмен
          </Button>
        </div>
      </div>

      {/* NFT Collection */}
      <div className="cosmic-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-sm">NFT Коллекция</h3>
          <Button variant="ghost" className="text-neon-green text-xs p-1">
            <ExternalLink className="h-3 w-3 mr-1" />
            Купить
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {nfts.map((nft) => (
            <div key={nft.id} className="bg-cosmic-gray rounded-lg p-3 border border-neon-green/20">
              <div className="text-center">
                <div className="text-2xl mb-1">{nft.image}</div>
                <div className="text-xs font-medium text-white leading-tight mb-1">{nft.name}</div>
                <div className="text-xs text-neon-green mb-1">{nft.rarity}</div>
                <div className="text-xs text-gray-400">{nft.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transactions */}
      <div className="cosmic-card p-4">
        <h3 className="text-white font-semibold mb-3 text-sm">История операций</h3>
        <div className="space-y-2">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-2 bg-cosmic-gray rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                  tx.type === 'Заработано' || tx.type === 'Пополнение' || tx.type === 'Бонус' || tx.type === 'Реферал' 
                    ? 'bg-green-500/20 text-green-400' 
                    : 'bg-blue-500/20 text-blue-400'
                }`}>
                  {tx.type === 'Заработано' || tx.type === 'Пополнение' || tx.type === 'Бонус' || tx.type === 'Реферал' ? '↗' : '↙'}
                </div>
                <div>
                  <div className="text-white font-medium text-xs">{tx.type}</div>
                  <div className="text-gray-400 text-xs">{tx.date}</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`font-semibold text-xs ${
                  tx.amount.startsWith('+') ? 'text-green-400' : 'text-blue-400'
                }`}>
                  {tx.amount}
                </div>
                <div className="text-xs text-green-400">✓</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;
