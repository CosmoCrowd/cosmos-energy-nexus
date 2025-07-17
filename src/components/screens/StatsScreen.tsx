
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, Users, Clock, Award, Calendar, Eye, EyeOff } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

const StatsScreen = () => {
  const { tonBalance, cosmoBalance, userLevel } = useWallet();
  const [activeTab, setActiveTab] = useState<'overview' | 'earnings' | 'network'>('overview');
  const [showPrivateData, setShowPrivateData] = useState(true);

  // Mock statistics data
  const overviewStats = {
    totalEarnings: 87.5,
    todayEarnings: 2.3,
    weekEarnings: 15.6,
    monthEarnings: 62.4,
    totalReferrals: 12,
    activeReferrals: 8,
    matrixCycles: 3,
    daysActive: 25
  };

  const earningsHistory = [
    { date: '2024-01-15', amount: 2.3, type: 'cycle_completion' },
    { date: '2024-01-14', amount: 1.8, type: 'referral_bonus' },
    { date: '2024-01-13', amount: 4.2, type: 'cycle_completion' },
    { date: '2024-01-12', amount: 0.5, type: 'daily_bonus' },
    { date: '2024-01-11', amount: 3.1, type: 'referral_bonus' },
    { date: '2024-01-10', amount: 5.4, type: 'cycle_completion' },
    { date: '2024-01-09', amount: 0.8, type: 'task_reward' }
  ];

  const networkStats = [
    { level: 1, count: 4, earnings: 12.5 },
    { level: 2, count: 8, earnings: 18.3 },
    { level: 3, count: 6, earnings: 22.1 },
    { level: 4, count: 3, earnings: 15.8 },
    { level: 5, count: 1, earnings: 8.2 }
  ];

  const getEarningTypeLabel = (type: string) => {
    switch (type) {
      case 'cycle_completion': return 'Завершение цикла';
      case 'referral_bonus': return 'Реферальный бонус';
      case 'daily_bonus': return 'Ежедневный бонус';
      case 'task_reward': return 'Награда за задание';
      default: return 'Доход';
    }
  };

  const getEarningTypeIcon = (type: string) => {
    switch (type) {
      case 'cycle_completion': return '🔄';
      case 'referral_bonus': return '👥';
      case 'daily_bonus': return '📅';
      case 'task_reward': return '⭐';
      default: return '💰';
    }
  };

  const formatPrivateData = (value: number | string) => {
    return showPrivateData ? value : '***';
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-purple-400 rounded-full animate-matrix-rain opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="bg-gradient-to-br from-cosmic-dark/90 via-purple-900/20 to-blue-900/20 rounded-3xl p-5 border border-purple-400/30 backdrop-blur-xl animate-fade-in-up">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center animate-energy-pulse">
                <BarChart3 className="text-black" size={28} />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">Статистика</h2>
                <p className="text-gray-300 text-sm">Анализ вашей космической активности</p>
              </div>
            </div>
            <Button
              onClick={() => setShowPrivateData(!showPrivateData)}
              variant="ghost"
              size="sm"
              className="text-purple-400 hover:bg-purple-400/20 p-2"
            >
              {showPrivateData ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-green-900/20 to-emerald-900/20 rounded-3xl p-4 border border-green-400/30 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-green-400 font-bold text-lg font-mono">{formatPrivateData(overviewStats.totalEarnings)} TON</div>
              <div className="text-gray-400 text-xs">Общий доход</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-blue-900/20 to-cyan-900/20 rounded-3xl p-4 border border-cyan-400/30 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-2xl mb-2">📈</div>
              <div className="text-cyan-400 font-bold text-lg font-mono">{formatPrivateData(overviewStats.todayEarnings)} TON</div>
              <div className="text-gray-400 text-xs">Сегодня</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-cosmic-gray/30 rounded-2xl p-1 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <Button
            onClick={() => setActiveTab('overview')}
            className={`flex-1 rounded-xl py-3 text-sm transition-all ${
              activeTab === 'overview'
                ? 'bg-purple-500 text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Обзор
          </Button>
          <Button
            onClick={() => setActiveTab('earnings')}
            className={`flex-1 rounded-xl py-3 text-sm transition-all ${
              activeTab === 'earnings'
                ? 'bg-purple-500 text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Доходы
          </Button>
          <Button
            onClick={() => setActiveTab('network')}
            className={`flex-1 rounded-xl py-3 text-sm transition-all ${
              activeTab === 'network'
                ? 'bg-purple-500 text-white font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Сеть
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-4 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            {/* Earnings Overview */}
            <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <TrendingUp size={20} />
                <span>Доходы по периодам</span>
              </h3>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="text-yellow-400 font-bold text-lg font-mono">{formatPrivateData(overviewStats.weekEarnings)}</div>
                  <div className="text-gray-400 text-xs">За неделю</div>
                </div>
                <div className="text-center p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="text-purple-400 font-bold text-lg font-mono">{formatPrivateData(overviewStats.monthEarnings)}</div>
                  <div className="text-gray-400 text-xs">За месяц</div>
                </div>
                <div className="text-center p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="text-futuristic-primary font-bold text-lg">{overviewStats.matrixCycles}</div>
                  <div className="text-gray-400 text-xs">Циклов</div>
                </div>
              </div>
            </div>

            {/* Activity Stats */}
            <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl">
              <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
                <Clock size={20} />
                <span>Активность</span>
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Users className="text-futuristic-secondary" size={16} />
                    <span className="text-gray-300 text-sm">Рефералы</span>
                  </div>
                  <span className="text-futuristic-secondary font-bold">{overviewStats.totalReferrals}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Award className="text-green-400" size={16} />
                    <span className="text-gray-300 text-sm">Активные</span>
                  </div>
                  <span className="text-green-400 font-bold">{overviewStats.activeReferrals}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <Calendar className="text-yellow-400" size={16} />
                    <span className="text-gray-300 text-sm">Дней активен</span>
                  </div>
                  <span className="text-yellow-400 font-bold">{overviewStats.daysActive}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-cosmic-gray/30 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🚀</span>
                    <span className="text-gray-300 text-sm">Уровень</span>
                  </div>
                  <span className="text-futuristic-primary font-bold">{userLevel}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'earnings' && (
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
              <TrendingUp size={20} />
              <span>История доходов</span>
            </h3>
            
            <div className="space-y-3">
              {earningsHistory.map((earning, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-cosmic-gray/30 rounded-xl border border-futuristic-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-600/30 flex items-center justify-center border border-green-400/50">
                      <span className="text-sm">{getEarningTypeIcon(earning.type)}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium text-sm">{getEarningTypeLabel(earning.type)}</div>
                      <div className="text-gray-400 text-xs">{earning.date}</div>
                    </div>
                  </div>
                  <div className="text-green-400 font-mono font-bold">
                    +{formatPrivateData(earning.amount)} TON
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30">
              <div className="text-center">
                <div className="text-green-400 font-bold">📊 Средний доход: {formatPrivateData((overviewStats.totalEarnings / overviewStats.daysActive).toFixed(2))} TON/день</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'network' && (
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
              <Users size={20} />
              <span>Структура сети</span>
            </h3>
            
            <div className="space-y-3">
              {networkStats.map((level, index) => (
                <div key={index} className="p-4 bg-cosmic-gray/30 rounded-xl border border-futuristic-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-futuristic-primary font-bold">Уровень {level.level}</span>
                      <span className="text-gray-400 text-sm">({level.count} человек)</span>
                    </div>
                    <span className="text-green-400 font-mono font-bold">
                      {formatPrivateData(level.earnings)} TON
                    </span>
                  </div>
                  
                  <div className="w-full bg-cosmic-gray/50 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-futuristic-primary to-futuristic-accent h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(level.count / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="p-4 bg-gradient-to-r from-futuristic-primary/10 to-futuristic-accent/10 rounded-xl border border-futuristic-primary/30 text-center">
                <div className="text-futuristic-primary font-bold text-lg">{networkStats.reduce((sum, level) => sum + level.count, 0)}</div>
                <div className="text-gray-400 text-xs">Всего участников</div>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-400/30 text-center">
                <div className="text-green-400 font-bold text-lg font-mono">
                  {formatPrivateData(networkStats.reduce((sum, level) => sum + level.earnings, 0).toFixed(1))}
                </div>
                <div className="text-gray-400 text-xs">TON с сети</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsScreen;
