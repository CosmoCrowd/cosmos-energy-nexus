
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Wallet, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const WelcomeScreen = () => {
  const { connectWallet } = useWallet();
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const success = await connectWallet();
      if (success) {
        toast.success('Кошелек успешно подключен!');
      } else {
        toast.error('Ошибка подключения кошелька');
      }
    } catch (error) {
      console.error('Ошибка подключения:', error);
      toast.error('Не удалось подключить кошелек');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="telegram-container mobile-safe-area">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-neon-green rounded-full energy-particle opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>

        <div className="cosmic-card p-6 w-full max-w-sm z-10 animate-fade-in-up">
          {/* Logo/Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold neon-text mb-2 animate-neon-pulse">
              COSMO ОРДЕН
            </h1>
            <div className="w-16 h-0.5 bg-neon-gradient mx-auto rounded-full"></div>
          </div>

          {/* Real Legend */}
          <div className="text-center mb-6 space-y-3 text-gray-300 text-sm leading-relaxed">
            <h2 className="text-lg font-semibold text-neon-blue mb-3">
              Матрица Энергий
            </h2>
            <p className="text-xs">
              Присоединитесь к децентрализованной матрице энергий и получайте пассивный доход в <span className="text-neon-green font-semibold">TON</span>.
            </p>
            <p className="text-xs">
              Покупайте уровни энергий, привлекайте участников и зарабатывайте на каждом цикле матрицы.
            </p>
            <p className="text-xs font-semibold text-neon-green">
              Все платежи обрабатываются автоматически через блокчейн TON
            </p>
          </div>

          {/* Security Notice */}
          <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-blue-300">
                <p className="font-medium mb-1">Безопасность:</p>
                <p>Ваш кошелек подключается напрямую через Telegram. Мы не храним ваши приватные ключи.</p>
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <div className="text-center">
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="cosmic-button text-black font-bold py-3 px-6 rounded-xl w-full text-base hover:scale-[1.02] transition-all duration-200 disabled:opacity-50"
            >
              <Wallet className="mr-2 h-5 w-5" />
              {isConnecting ? 'Подключение...' : 'Подключить TON кошелек'}
            </Button>
            <p className="text-xs text-gray-400 mt-2">
              Кошелек Telegram
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
