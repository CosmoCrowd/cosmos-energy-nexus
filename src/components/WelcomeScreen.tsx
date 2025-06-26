
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { CosmicWallet } from '@/components/ui/cosmic-icons';
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
        {/* Космический фон */}
        <div className="absolute inset-0 cosmic-welcome-bg">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute cosmic-orb"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${4 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="cosmic-card p-8 w-full max-w-sm z-10 animate-welcome-entrance">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-neon-gradient rounded-full animate-cosmic-pulse"></div>
              <div className="absolute inset-3 bg-cosmic-dark rounded-full flex items-center justify-center">
                <span className="text-3xl animate-bounce">🌌</span>
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-neon-green rounded-full animate-ping"></div>
            </div>
            <h1 className="text-3xl font-bold neon-text mb-3 animate-text-glow">
              COSMO ОРДЕН
            </h1>
            <div className="w-20 h-1 bg-neon-gradient mx-auto rounded-full animate-width-pulse"></div>
          </div>

          {/* Description */}
          <div className="text-center mb-8 space-y-4 text-gray-300 text-sm leading-relaxed">
            <h2 className="text-xl font-semibold text-neon-blue mb-4 animate-pulse">
              ⚡ Матрица Энергий ⚡
            </h2>
            <div className="space-y-3">
              <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                Присоединитесь к децентрализованной матрице энергий и получайте пассивный доход в <span className="text-neon-green font-bold">TON</span>
              </p>
              <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                🚀 Покупайте уровни энергий
              </p>
              <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                👥 Привлекайте участников
              </p>
              <p className="text-sm animate-fade-in-up" style={{animationDelay: '0.8s'}}>
                💰 Зарабатывайте на каждом цикле
              </p>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-xl animate-fade-in-up" style={{animationDelay: '1s'}}>
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 animate-pulse">
                🔒
              </div>
              <div className="text-xs text-blue-300">
                <p className="font-semibold mb-2">Безопасность гарантирована:</p>
                <p>• Блокчейн TON защищает все транзакции</p>
                <p>• Ваши ключи остаются только у вас</p>
                <p>• Открытый код смарт-контрактов</p>
              </div>
            </div>
          </div>

          {/* Connect Button */}
          <div className="text-center animate-fade-in-up" style={{animationDelay: '1.2s'}}>
            <Button
              onClick={handleConnect}
              disabled={isConnecting}
              className="cosmic-button text-black font-bold py-4 px-8 rounded-2xl w-full text-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 animate-button-glow"
            >
              <CosmicWallet className="mr-3" size={24} />
              {isConnecting ? (
                <span className="flex items-center">
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2"></div>
                  Подключение...
                </span>
              ) : (
                'Подключить TON кошелек'
              )}
            </Button>
            <p className="text-xs text-gray-400 mt-3 animate-pulse">
              Используйте встроенный кошелек Telegram
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
