
import { Button } from '@/components/ui/button';
import { useWallet } from '@/context/WalletContext';
import { Wallet } from 'lucide-react';

const WelcomeScreen = () => {
  const { connectWallet } = useWallet();

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

          {/* Compact Legend */}
          <div className="text-center mb-6 space-y-3 text-gray-300 text-sm leading-relaxed">
            <h2 className="text-lg font-semibold text-neon-blue mb-3">
              Легенда Космо Орден
            </h2>
            <p className="text-xs">
              Тайное общество, объединившее лучших для контроля над <span className="text-neon-green font-semibold">'Космо Ядром'</span> — кристаллом бесконечной энергии.
            </p>
            <p className="text-xs">
              Создали <span className="text-neon-blue font-semibold">'Космо Лаб'</span> для генерации ИИ-агентов и <span className="text-neon-purple font-semibold">'Космо Токенайзер'</span> для токенизации активов.
            </p>
            <p className="text-xs font-semibold text-neon-green">
              "Тот, кто соберёт все <span className="text-neon-green">'Энергии Космо'</span>, станет Хранителем Нового Мира!"
            </p>
            <p className="text-sm font-semibold text-white">
              Присоединяйся к Ордену и стань частью будущего!
            </p>
          </div>

          {/* Connect Button */}
          <div className="text-center">
            <Button
              onClick={connectWallet}
              className="cosmic-button text-black font-bold py-3 px-6 rounded-xl w-full text-base hover:scale-[1.02] transition-all duration-200"
            >
              <Wallet className="mr-2 h-5 w-5" />
              Подключить кошелёк
            </Button>
            <p className="text-xs text-gray-400 mt-2">
              Встроенный кошелёк Telegram
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
