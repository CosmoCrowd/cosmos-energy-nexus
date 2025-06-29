
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Plus, Send, ArrowDown, ExternalLink, LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { telegramWalletService } from '@/services/telegramWalletService';

const WalletScreen = () => {
  const { tonBalance, tonPrice, walletAddress, disconnectWallet } = useWallet();

  const handleTopUp = async () => {
    try {
      const telegramEnv = telegramWalletService.checkTelegramEnvironment();
      
      if (!telegramEnv.isWebApp) {
        toast.error('Приложение должно быть запущено в Telegram');
        return;
      }

      telegramWalletService.showNotification(
        'Перенаправление в Telegram Wallet для пополнения',
        'info'
      );

      // Открываем Telegram Wallet для пополнения
      const success = await telegramWalletService.requestPayment({
        amount: 0, // Пользователь сам выберет сумму в кошельке
        recipient: walletAddress || '',
        comment: 'Пополнение кошелька COSMO'
      });

      if (success) {
        toast.success('Пополнение инициировано');
      }
    } catch (error) {
      console.error('Ошибка пополнения:', error);
      toast.error('Ошибка при инициации пополнения');
    }
  };

  const handleSend = () => {
    // TODO: Открыть модальное окно для выбора получателя из участников матрицы
    toast.info('Функция отправки TON участникам матрицы будет добавлена');
  };

  const handleWithdraw = () => {
    toast.info('Функция снятия средств будет добавлена в следующем обновлении');
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
            onClick={handleTopUp}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-sm hover:scale-105 transition-transform"
          >
            <Plus className="h-4 w-4 mb-1" />
            Пополнить
          </Button>
          <Button
            onClick={handleSend}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-sm hover:scale-105 transition-transform"
          >
            <Send className="h-4 w-4 mb-1" />
            Отправить
          </Button>
          <Button
            onClick={handleWithdraw}
            className="cosmic-button text-black font-semibold flex flex-col items-center py-3 text-sm hover:scale-105 transition-transform"
          >
            <ArrowDown className="h-4 w-4 mb-1" />
            Снять
          </Button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="cosmic-card p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white font-semibold text-base">История транзакций</h3>
        </div>
        <div className="space-y-3">
          {/* Mock transaction data - will be replaced with real data */}
          <div className="flex justify-between items-center p-3 bg-cosmic-gray rounded-lg border border-gray-600">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center mr-3">
                <Plus className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">Пополнение</div>
                <div className="text-gray-400 text-xs">28.12.2024 14:32</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-green-400 font-semibold">+5.0 TON</div>
              <div className="text-xs text-gray-400">$12.50</div>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-cosmic-gray rounded-lg border border-gray-600">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
                <Send className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <div className="text-white text-sm font-medium">Покупка энергии</div>
                <div className="text-gray-400 text-xs">27.12.2024 18:45</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-red-400 font-semibold">-2.5 TON</div>
              <div className="text-xs text-gray-400">$6.25</div>
            </div>
          </div>
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
