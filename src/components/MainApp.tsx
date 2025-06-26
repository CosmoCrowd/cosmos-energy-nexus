
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import EnergyScreen from './screens/EnergyScreen';
import WalletScreen from './screens/WalletScreen';
import TeamScreen from './screens/TeamScreen';
import TasksScreen from './screens/TasksScreen';
import StatsScreen from './screens/StatsScreen';
import { FuturisticEnergy, FuturisticWallet, FuturisticTeam, FuturisticTasks, FuturisticStats } from '@/components/ui/futuristic-icons';

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
    { id: 'energy', label: 'Энергия', icon: FuturisticEnergy },
    { id: 'wallet', label: 'Кошелёк', icon: FuturisticWallet },
    { id: 'team', label: 'Команда', icon: FuturisticTeam },
    { id: 'tasks', label: 'Задания', icon: FuturisticTasks },
    { id: 'stats', label: 'Статистика', icon: FuturisticStats },
  ];

  if (!isLoaded) {
    return (
      <div className="telegram-container mobile-safe-area">
        <div className="min-h-screen flex items-center justify-center bg-cosmic-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(30)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-futuristic-primary rounded-full animate-matrix-rain"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDuration: `${2 + Math.random() * 3}s`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
          
          <div className="text-center space-y-6 animate-fade-in-up z-10">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-futuristic-gradient rounded-full animate-futuristic-glow"></div>
              <div className="absolute inset-3 bg-cosmic-dark rounded-full flex items-center justify-center">
                <FuturisticEnergy size={32} className="animate-energy-pulse" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-white font-bold text-2xl animate-hologram-flicker">COSMO MATRIX</div>
              <div className="text-futuristic-primary font-semibold animate-energy-pulse">Активация системы...</div>
            </div>
            <div className="flex space-x-2 justify-center">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-futuristic-primary rounded-full animate-energy-pulse"
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
      <div className="min-h-screen flex flex-col bg-cosmic-gradient relative overflow-hidden">
        {/* Анимированный фон */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-px bg-futuristic-primary rounded-full animate-matrix-rain opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 4}s`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 overflow-y-auto relative z-10">
          {screens[currentScreen]}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-cosmic-dark/80 border-t border-futuristic-primary/30 px-2 py-3 z-50 animate-futuristic-glow">
          <div className="flex justify-around items-center max-w-lg mx-auto">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => setCurrentScreen(item.id as Screen)}
                  className={`flex flex-col items-center py-3 px-3 rounded-2xl text-sm transition-all duration-500 min-w-0 flex-1 transform hover:scale-110 ${
                    currentScreen === item.id
                      ? 'bg-futuristic-primary/20 text-futuristic-primary border border-futuristic-primary/50 shadow-lg shadow-futuristic-primary/30 animate-futuristic-glow'
                      : 'text-gray-400 hover:text-futuristic-primary hover:bg-futuristic-primary/10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`mb-2 transform transition-transform duration-300 ${
                    currentScreen === item.id ? 'animate-energy-pulse scale-110' : ''
                  }`}>
                    <IconComponent size={22} />
                  </div>
                  <span className="text-xs leading-tight truncate font-semibold">
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
