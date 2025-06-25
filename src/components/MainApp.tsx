
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import EnergyScreen from './screens/EnergyScreen';
import WalletScreen from './screens/WalletScreen';
import TeamScreen from './screens/TeamScreen';
import TasksScreen from './screens/TasksScreen';
import StatsScreen from './screens/StatsScreen';

type Screen = 'energy' | 'wallet' | 'team' | 'tasks' | 'stats';

const MainApp = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('energy');

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

  return (
    <div className="telegram-container mobile-safe-area">
      <div className="min-h-screen flex flex-col bg-cosmic-gradient">
        {/* Main Content */}
        <div className="flex-1 pb-20 overflow-y-auto">
          {screens[currentScreen]}
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 cosmic-card border-t border-neon-green/20 px-2 py-2 backdrop-blur-lg">
          <div className="flex justify-around items-center max-w-lg mx-auto">
            {navigationItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                onClick={() => setCurrentScreen(item.id as Screen)}
                className={`flex flex-col items-center py-2 px-2 rounded-lg text-sm transition-all duration-200 min-w-0 flex-1 ${
                  currentScreen === item.id
                    ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                    : 'text-gray-400 hover:text-white hover:bg-cosmic-light/30'
                }`}
              >
                <span className="text-xl mb-1 leading-none">{item.icon}</span>
                <span className="text-xs leading-tight truncate">{item.label}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp;
