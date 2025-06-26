
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Plus, Send, ArrowUpDown, ExternalLink, LogOut } from 'lucide-react';
import { toast } from 'sonner';

const WalletScreen = () => {
  const { tonBalance, tonPrice, walletAddress, disconnectWallet } = useWallet();

  const handleAction = (action: string) => {
    toast.info(`${action} - функция будет добавлена в следующем обновлении`);
  };

  const handleDisconnect = async () => {
    try {
      await disconnectWallet();
      toast.success('Кошелек отключен');
    } catch (error) {
      toast.error('Ошибка отключения кошелька');
    }
  };

  const formatAddress = (address: string | null) => {
    if (!address) return 'Не подключен';
    return `${address.slice(0, 6)}...${address.slice(-6)}`;
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-24 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-white mb-1">Кошелёк</h1>
          <p className="text-gray-400 text-sm">
            {formatAddress(walletAddress)}
          </p>
        </div>
        <Button
          onClick={handleDisconnect}
          variant="ghost"
          size="sm"
          className="text-red-400 hover:text-red-300"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Balance */}
      <div className="cosmic-card p-4">
        <div className="text-center mb-4">
          <div className="text-3xl mb-2">💎</div>
          <div className="text-3xl font-bold text-white mb-1">{tonBalance.toFixed(4)}</div>
          <div className="text-sm text-gray-400 mb-2">TON</div>
          <div className="text-lg text-neon-green font-semibold">
            ${(tonBalance * tonPrice).toFixed(2)} USD
          </div>
          <div className="text-xs text-gray-400">
            1 TON = ${tonPrice.toFixed(2)}
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => handleAction('Пополнение')}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-sm"
          >
            <Plus className="h-4 w-4 mb-1" />
            Пополнить
          </Button>
          <Button
            onClick={() => handleAction('Отправка')}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-sm"
          >
            <Send className="h-4 w-4 mb-1" />
            Отправить
          </Button>
          <Button
            onClick={() => handleAction('Обмен')}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-sm"
          >
            <ArrowUpDown className="h-4 w-4 mb-1" />
            Обмен
          </Button>
        </div>
      </div>

      {/* Project Info */}
      <div className="cosmic-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-base">Информация о проекте</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Главный кошелек:</span>
            <span className="text-neon-green text-sm font-mono">
              {`UQBDN8...qyBi`}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Сеть:</span>
            <span className="text-white">TON Mainnet</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Комиссия сети:</span>
            <span className="text-white">~0.01 TON</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="cosmic-card p-4">
        <h3 className="text-white font-semibold mb-3 text-base">🔒 Безопасность</h3>
        <div className="text-sm text-gray-300 space-y-2">
          <p>• Все транзакции проходят через блокчейн TON</p>
          <p>• Ваши приватные ключи не покидают ваш кошелек</p>
          <p>• Смарт-контракты проверены и безопасны</p>
        </div>
      </div>
    </div>
  );
};

export default WalletScreen;
