
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import NetworkScreen from './screens/NetworkScreen';
import WalletScreen from './screens/WalletScreen';
import TeamScreen from './screens/TeamScreen';
import TasksScreen from './screens/TasksScreen';
import StatsScreen from './screens/StatsScreen';
import { FuturisticEnergy, FuturisticWallet, FuturisticTeam, FuturisticTasks, FuturisticStats } from '@/components/ui/futuristic-icons';

type Screen = 'network' | 'wallet' | 'team' | 'tasks' | 'stats';

const MainApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('network');
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
        
        // Enable haptic feedback
        tg.HapticFeedback?.impactOccurred('medium');
        
        console.log('Telegram WebApp настроен');
      }
      
      setIsLoaded(true);
      console.log('MainApp загружен');
    };

    setTimeout(initTelegram, 500);
  }, []);

  const screens = {
    network: <NetworkScreen />,
    wallet: <WalletScreen />,
    team: <TeamScreen />,
    tasks: <TasksScreen />,
    stats: <StatsScreen />,
  };

  const navigationItems = [
    { id: 'network', label: 'Сеть', icon: FuturisticEnergy },
    { id: 'wallet', label: 'Кошелёк', icon: FuturisticWallet },
    { id: 'team', label: 'Команда', icon: FuturisticTeam },
    { id: 'tasks', label: 'Задания', icon: FuturisticTasks },
    { id: 'stats', label: 'Статистика', icon: FuturisticStats },
  ];

  const handleScreenChange = (screen: Screen) => {
    // Add haptic feedback for screen changes
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
    setCurrentScreen(screen);
  };

  if (!isLoaded) {
    return (
      <div className="telegram-container mobile-safe-area">
        <div className="min-h-screen flex items-center justify-center bg-cosmic-gradient relative overflow-hidden">
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
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
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-futuristic-gradient rounded-full animate-futuristic-glow"></div>
              <div className="absolute inset-4 bg-cosmic-dark rounded-full flex items-center justify-center border-4 border-futuristic-primary/50">
                <span className="text-4xl animate-pulse">🌌</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-white font-bold text-3xl animate-hologram-flicker">COSMO SPHERE</div>
              <div className="text-futuristic-primary font-semibold text-lg animate-energy-pulse">Пробуждение космического разума...</div>
              <div className="text-gray-400 text-sm">Строй сети • Зарабатывай TON • Покоряй космос</div>
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
        {/* Enhanced animated background */}
        <div className="absolute inset-0">
          {[...Array(60)].map((_, i) => (
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
          
          {/* Additional cosmic effects */}
          {[...Array(5)].map((_, i) => (
            <div
              key={`cosmic-${i}`}
              className="absolute w-2 h-2 bg-futuristic-accent rounded-full animate-ping opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${4 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-20 overflow-y-auto relative z-10">
          {screens[currentScreen]}
        </div>

        {/* Enhanced Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-cosmic-dark/90 border-t border-futuristic-primary/40 px-2 py-3 z-50">
          <div className="absolute inset-0 bg-gradient-to-t from-futuristic-primary/5 to-transparent"></div>
          <div className="flex justify-around items-center max-w-lg mx-auto relative z-10">
            {navigationItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  onClick={() => handleScreenChange(item.id as Screen)}
                  className={`flex flex-col items-center py-3 px-3 rounded-2xl text-sm transition-all duration-500 min-w-0 flex-1 transform hover:scale-110 bottom-nav-icons ${
                    currentScreen === item.id
                      ? 'bg-futuristic-primary/20 text-futuristics-primary border border-futuristic-primary/50 shadow-lg shadow-futuristic-primary/30 animate-futuristic-glow'
                      : 'text-gray-400 hover:text-futuristic-primary hover:bg-futuristic-primary/10'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`mb-2 transform transition-all duration-300 ${
                    currentScreen === item.id ? 'animate-energy-pulse scale-110 text-futuristic-primary' : ''
                  }`}>
                    <IconComponent size={28} />
                  </div>
                  <span className={`text-xs leading-tight truncate font-semibold ${
                    currentScreen === item.id ? 'text-futuristic-primary' : ''
                  }`}>
                    {item.label}
                  </span>
                  {currentScreen === item.id && (
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-gradient-to-r from-transparent via-futuristic-primary to-transparent"></div>
                  )}
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
