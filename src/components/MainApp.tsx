
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EnergyScreen from './screens/EnergyScreen';
import WalletScreen from './screens/WalletScreen';
import TeamScreen from './screens/TeamScreen';
import TasksScreen from './screens/TasksScreen';
import StatsScreen from './screens/StatsScreen';
import { CosmicEnergy, CosmicWallet, CosmicTeam, CosmicTasks, CosmicStats } from '@/components/ui/cosmic-icons';

type Screen = 'energy' | 'wallet' | 'team' | 'tasks' | 'stats';

const MainApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('energy');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const initTelegram = () => {
      console.log('Инициализация MainApp');
      
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp;
        tg.ready();
        tg.expand();
        tg.setHeaderColor('#0a0a0f');
        tg.setBackgroundColor('#0a0a0f');
        console.log('Telegram WebApp настроен');
      }
      
      setIsLoaded(true);
      console.log('MainApp загружен');
    };

    // Небольшая задержка для плавности
    setTimeout(initTelegram, 500);
  }, []);

  const screens = {
    energy: <EnergyScreen />,
    wallet: <WalletScreen />,
    team: <TeamScreen />,
    tasks: <TasksScreen />,
    stats: <StatsScreen />,
  };

  const navigationItems = [
    { id: 'energy', label: 'Энергия', icon: CosmicEnergy },
    { id: 'wallet', label: 'Кошелёк', icon: CosmicWallet },
    { id: 'team', label: 'Команда', icon: CosmicTeam },
    { id: 'tasks', label: 'Задания', icon: CosmicTasks },
    { id: 'stats', label: 'Статистика', icon: CosmicStats },
  ];

  if (!isLoaded) {
    return (
      <div className="telegram-container mobile-safe-area">
        <div className="min-h-screen flex items-center justify-center bg-cosmic-gradient relative overflow-hidden">
          {/* Космические частицы */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute cosmic-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div className="text-center space-y-6 animate-cosmic-entrance z-10">
            <div className="relative w-20 h-20 mx-auto">
              <div className="absolute inset-0 bg-neon-gradient rounded-full animate-cosmic-spin"></div>
              <div className="absolute inset-2 bg-cosmic-dark rounded-full flex items-center justify-center">
                <CosmicEnergy size={32} className="text-neon-green animate-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-white font-bold text-xl animate-pulse">COSMO MATRIX</div>
              <div className="text-neon-green font-semibold animate-bounce">Запуск системы...</div>
            </div>
            <div className="flex space-x-2 justify-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-neon-green rounded-full animate-cosmic-wave"
                  style={{ animationDelay: `${i * 0.15}s` }}
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
      <div className="min-h-screen flex flex-col bg-cosmic-gradient relative overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0 cosmic-background">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute cosmic-star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 overflow-y-auto animate-screen-enter relative z-10">
          {screens[currentScreen]}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 cosmic-card border-t border-neon-green/30 px-2 py-2 backdrop-blur-xl z-50">
          <div className="flex justify-around items-center max-w-lg mx-auto">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`flex flex-col items-center py-2 px-2 rounded-xl text-sm transition-all duration-500 min-w-0 flex-1 transform hover:scale-110 ${
                    currentScreen === item.id
                      ? 'bg-neon-green/20 text-neon-green border border-neon-green/40 shadow-lg shadow-neon-green/20 animate-cosmic-glow'
                      : 'text-gray-400 hover:text-white hover:bg-cosmic-light/40'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`mb-1 transform transition-transform duration-300 ${
                    currentScreen === item.id ? 'animate-cosmic-bounce scale-110' : ''
                  }`}>
                    <IconComponent size={20} />
                  </div>
                  <span className="text-xs leading-tight truncate font-medium">
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
