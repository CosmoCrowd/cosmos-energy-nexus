
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EnergyScreen from './screens/EnergyScreen';
import WalletScreen from './screens/WalletScreen';
import TeamScreen from './screens/TeamScreen';
import TasksScreen from './screens/TasksScreen';
import StatsScreen from './screens/StatsScreen';

type Screen = 'energy' | 'wallet' | 'team' | 'tasks' | 'stats';

const MainApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('energy');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Telegram Mini App initialization
    const initTelegram = () => {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#0a0a0f');
        tg.setBackgroundColor('#0a0a0f');
        console.log('Telegram WebApp initialized');
      }
      setIsLoaded(true);
    };

    // Small delay to ensure Telegram WebApp is loaded
    setTimeout(initTelegram, 100);
  }, []);

  const screens = {
    energy: <EnergyScreen />,
    wallet: <WalletScreen />,
    team: <TeamScreen />,
    tasks: <TasksScreen />,
    stats: <StatsScreen />,
  };

  const navigationItems = [
    { id: 'energy', label: 'Энергия', icon: '⚡' },
    { id: 'wallet', label: 'Кошелёк', icon: '💎' },
    { id: 'team', label: 'Команда', icon: '👥' },
    { id: 'tasks', label: 'Задания', icon: '📋' },
    { id: 'stats', label: 'Статистика', icon: '📊' },
  ];

  if (!isLoaded) {
    return (
      <div className="telegram-container mobile-safe-area">
        <div className="min-h-screen flex items-center justify-center bg-cosmic-gradient">
          <div className="text-center space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-neon-gradient rounded-full flex items-center justify-center mx-auto animate-neon-pulse">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="text-white font-semibold">Загрузка Космо...</div>
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

  return (
    <div className="telegram-container mobile-safe-area">
      <div className="min-h-screen flex flex-col bg-cosmic-gradient">
        {/* Main Content */}
        <div className="flex-1 pb-20 overflow-y-auto animate-fade-in">
          {screens[currentScreen]}
        </div>

        {/* Enhanced Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 cosmic-card border-t border-neon-green/30 px-2 py-2 backdrop-blur-xl z-50">
          <div className="flex justify-around items-center max-w-lg mx-auto">
            {navigationItems.map((item, index) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setCurrentScreen(item.id as Screen)}
                className={`flex flex-col items-center py-2 px-2 rounded-xl text-sm transition-all duration-300 min-w-0 flex-1 transform hover:scale-105 ${
                  currentScreen === item.id
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/40 shadow-lg shadow-neon-green/20 animate-neon-pulse'
                    : 'text-gray-400 hover:text-white hover:bg-cosmic-light/40'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className={`text-xl mb-1 leading-none ${
                  currentScreen === item.id ? 'animate-bounce' : ''
                }`}>
                  {item.icon}
                </span>
                <span className="text-xs leading-tight truncate font-medium">
                  {item.label}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
