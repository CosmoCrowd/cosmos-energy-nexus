
import { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import WelcomeScreen from '@/components/WelcomeScreen';
import MainApp from '@/components/MainApp';

const Index = () => {
  const { isConnected, isLoading } = useWallet();

  // Показываем загрузку пока определяется состояние кошелька
  if (isLoading) {
    return (
      <div className="telegram-container mobile-safe-area">
        <div className="min-h-screen flex items-center justify-center bg-cosmic-gradient">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto animate-neon-pulse">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-white font-semibold">Инициализация...</div>
            <div className="flex space-x-1 justify-center">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-neon-green rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return <WelcomeScreen />;
  }

  return <MainApp />;
};

export default Index;
