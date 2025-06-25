
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trophy, TrendingUp, Users, Coins } from 'lucide-react';

const StatsScreen = () => {
  const [activeTab, setActiveTab] = useState<'top' | 'team' | 'earnings'>('top');

  const topUsers = [
    { rank: 1, name: 'CosmoKing', level: 10, earned: '1,247.5 TON', avatar: '👑' },
    { rank: 2, name: 'StarMaster', level: 9, earned: '892.3 TON', avatar: '⭐' },
    { rank: 3, name: 'EnergyLord', level: 8, earned: '654.7 TON', avatar: '⚡' },
    { rank: 4, name: 'CosmicHero', level: 7, earned: '543.2 TON', avatar: '🚀' },
    { rank: 5, name: 'QuantumWave', level: 6, earned: '432.8 TON', avatar: '🌊' },
  ];

  const myTeam = [
    { name: 'Прямая линия', count: 8, active: 6, earned: '45.2 TON' },
    { name: 'Матрица уровень 1', count: 16, active: 12, earned: '28.7 TON' },
    { name: 'Матрица уровень 2', count: 32, active: 18, earned: '19.3 TON' },
  ];

  const earningsData = [
    { source: 'Реферальные', amount: '32.5 TON', percentage: 45 },
    { source: 'Матрица', amount: '28.7 TON', percentage: 40 },
    { source: 'Бонусы', amount: '10.8 TON', percentage: 15 },
  ];

  const myRank = 47;
  const totalEarned = '72.0 TON';
  const cosmoEarned = '1,850 COSMO';

  return (
    <div className="min-h-screen px-4 pt-4 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Статистика</h1>
        <p className="text-gray-400 text-sm">
          Ваши достижения и рейтинги
        </p>
      </div>

      {/* My Stats */}
      <div className="cosmic-card p-4 mb-6">
        <h3 className="text-white font-semibold mb-4 text-base">Мои достижения</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-3xl mb-2">🏆</div>
            <div className="text-xl font-bold text-neon-green">#{myRank}</div>
            <div className="text-sm text-gray-400">Место в рейтинге</div>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">💎</div>
            <div className="text-xl font-bold text-neon-blue">{totalEarned}</div>
            <div className="text-sm text-gray-400">Всего заработано</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-cosmic-gray rounded-lg p-1">
        {[
          { id: 'top', label: 'Топ-100', icon: Trophy },
          { id: 'team', label: 'Команда', icon: Users },
          { id: 'earnings', label: 'Доходы', icon: Coins },
        ].map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md transition-all text-sm ${
              activeTab === tab.id
                ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                : 'text-gray-400 hover:text-white hover:bg-cosmic-light/50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'top' && (
        <div className="cosmic-card p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center text-base">
            <Trophy className="h-5 w-5 mr-2 text-neon-green" />
            Топ-100 участников
          </h3>
          <div className="space-y-3">
            {topUsers.map((user) => (
              <div key={user.rank} className="flex items-center justify-between p-3 bg-cosmic-gray rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-base font-bold ${
                    user.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                    user.rank === 2 ? 'bg-gray-400/20 text-gray-300' :
                    user.rank === 3 ? 'bg-orange-500/20 text-orange-400' :
                    'bg-cosmic-light text-gray-400'
                  }`}>
                    {user.rank <= 3 ? user.avatar : user.rank}
                  </div>
                  <div>
                    <div className="text-white font-medium text-base">{user.name}</div>
                    <div className="text-gray-400 text-sm">Уровень {user.level}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-neon-green font-semibold text-base">{user.earned}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="space-y-4">
          {myTeam.map((team, index) => (
            <div key={index} className="cosmic-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium text-base">{team.name}</h4>
                <span className="text-neon-green font-bold text-base">{team.earned}</span>
              </div>
              <div className="flex items-center justify-between text-base mb-3">
                <div className="flex space-x-4">
                  <span className="text-gray-400">
                    Всего: <span className="text-white">{team.count}</span>
                  </span>
                  <span className="text-gray-400">
                    Активных: <span className="text-neon-green">{team.active}</span>
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  {Math.round((team.active / team.count) * 100)}% активность
                </div>
              </div>
              <div className="bg-cosmic-gray rounded-full h-2">
                <div 
                  className="bg-neon-green rounded-full h-2 transition-all duration-300"
                  style={{ width: `${(team.active / team.count) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'earnings' && (
        <div className="cosmic-card p-4">
          <h3 className="text-white font-semibold mb-4 flex items-center text-base">
            <TrendingUp className="h-5 w-5 mr-2 text-neon-green" />
            Структура доходов
          </h3>
          
          <div className="mb-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-neon-green">{totalEarned}</div>
                <div className="text-sm text-gray-400">TON заработано</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-neon-blue">{cosmoEarned}</div>
                <div className="text-sm text-gray-400">COSMO заработано</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {earningsData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-white text-base">{item.source}</span>
                  <span className="text-neon-green font-semibold text-base">{item.amount}</span>
                </div>
                <div className="bg-cosmic-gray rounded-full h-2">
                  <div 
                    className="bg-neon-green rounded-full h-2 transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <div className="text-right text-sm text-gray-400">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatsScreen;
