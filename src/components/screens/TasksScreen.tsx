
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, Star, Gift, ExternalLink, Award } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  type: 'social' | 'invite' | 'game' | 'daily';
  status: 'available' | 'completed' | 'claimed';
  icon: string;
  url?: string;
  progress?: number;
  maxProgress?: number;
}

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Подпишись на Telegram канал',
      description: 'Следи за новостями проекта',
      reward: 0.5,
      type: 'social',
      status: 'available',
      icon: '📢',
      url: 'https://t.me/cosmosphere_official'
    },
    {
      id: 2,
      title: 'Присоединись к чату',
      description: 'Общайся с сообществом',
      reward: 0.3,
      type: 'social',
      status: 'available',
      icon: '💬',
      url: 'https://t.me/cosmosphere_chat'
    },
    {
      id: 3,
      title: 'Подпишись на Twitter',
      description: 'Не пропускай важные обновления',
      reward: 0.4,
      type: 'social',
      status: 'completed',
      icon: '🐦',
      url: 'https://twitter.com/cosmosphere'
    },
    {
      id: 4,
      title: 'Пригласи 5 друзей',
      description: 'Расширь космическую сеть',
      reward: 2.5,
      type: 'invite',
      status: 'available',
      icon: '👥',
      progress: 2,
      maxProgress: 5
    },
    {
      id: 5,
      title: 'Активируй уровень 3',
      description: 'Достигни 3 уровня в матрице',
      reward: 1.0,
      type: 'game',
      status: 'available',
      icon: '🚀'
    },
    {
      id: 6,
      title: 'Ежедневный вход',
      description: 'Заходи каждый день',
      reward: 0.1,
      type: 'daily',
      status: 'claimed',
      icon: '📅'
    },
    {
      id: 7,
      title: 'Поделись в Stories',
      description: 'Расскажи друзьям о проекте',
      reward: 0.8,
      type: 'social',
      status: 'available',
      icon: '📱'
    },
    {
      id: 8,
      title: 'Пригласи 10 друзей',
      description: 'Стань космическим лидером',
      reward: 5.0,
      type: 'invite',
      status: 'available',
      icon: '🌟',
      progress: 2,
      maxProgress: 10
    }
  ]);

  const [activeTab, setActiveTab] = useState<'all' | 'social' | 'invite' | 'game' | 'daily'>('all');

  const handleTaskAction = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    if (task.status === 'available') {
      if (task.url) {
        window.open(task.url, '_blank');
        // Simulate task completion check
        setTimeout(() => {
          setTasks(prev => prev.map(t => 
            t.id === taskId ? { ...t, status: 'completed' } : t
          ));
          toast.success('Задание выполнено! Можете забрать награду');
        }, 3000);
      } else {
        // For non-URL tasks, mark as completed immediately
        setTasks(prev => prev.map(t => 
          t.id === taskId ? { ...t, status: 'completed' } : t
        ));
        toast.success('Задание выполнено!');
      }
    } else if (task.status === 'completed') {
      // Claim reward
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, status: 'claimed' } : t
      ));
      toast.success(`Получено ${task.reward} TON!`);
    }
  };

  const getFilteredTasks = () => {
    if (activeTab === 'all') return tasks;
    return tasks.filter(task => task.type === activeTab);
  };

  const getTaskStats = () => {
    const completed = tasks.filter(t => t.status === 'claimed').length;
    const totalRewards = tasks.filter(t => t.status === 'claimed').reduce((sum, t) => sum + t.reward, 0);
    return { completed, total: tasks.length, totalRewards };
  };

  const stats = getTaskStats();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="text-green-400" size={20} />;
      case 'claimed': return <Award className="text-yellow-400" size={20} />;
      default: return <Clock className="text-gray-400" size={20} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Забрать';
      case 'claimed': return 'Выполнено';
      default: return 'Выполнить';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'social': return 'Соцсети';
      case 'invite': return 'Рефералы';
      case 'game': return 'Игра';
      case 'daily': return 'Ежедневные';
      default: return 'Все';
    }
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-yellow-400 rounded-full animate-matrix-rain opacity-20"
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
        <div className="bg-gradient-to-br from-cosmic-dark/90 via-yellow-900/20 to-orange-900/20 rounded-3xl p-5 border border-yellow-400/30 backdrop-blur-xl animate-fade-in-up">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-energy-pulse">
              <Star className="text-black" size={28} />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Космические Задания</h2>
            <p className="text-gray-300 text-sm">Выполняй задания и получай награды</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-green-900/20 to-emerald-900/20 rounded-2xl p-3 border border-green-400/30 backdrop-blur-xl text-center">
            <div className="text-green-400 font-bold text-lg">{stats.completed}</div>
            <div className="text-gray-400 text-xs">Выполнено</div>
          </div>
          
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-blue-900/20 to-cyan-900/20 rounded-2xl p-3 border border-cyan-400/30 backdrop-blur-xl text-center">
            <div className="text-cyan-400 font-bold text-lg">{stats.total}</div>
            <div className="text-gray-400 text-xs">Всего</div>
          </div>
          
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-yellow-900/20 to-orange-900/20 rounded-2xl p-3 border border-yellow-400/30 backdrop-blur-xl text-center">
            <div className="text-yellow-400 font-bold text-lg font-mono">{stats.totalRewards.toFixed(1)}</div>
            <div className="text-gray-400 text-xs">TON</div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-cosmic-gray/30 rounded-2xl p-1 animate-fade-in-up overflow-x-auto" style={{animationDelay: '0.2s'}}>
          <div className="flex space-x-1 min-w-max">
            {(['all', 'social', 'invite', 'game', 'daily'] as const).map((tab) => (
              <Button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-xl text-sm transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? 'bg-yellow-400 text-black font-bold'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {getTypeLabel(tab)}
              </Button>
            ))}
          </div>
        </div>

        {/* Tasks List */}
        <div className="space-y-3 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          {getFilteredTasks().map((task) => (
            <div 
              key={task.id} 
              className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-4 border border-futuristic-primary/30 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-600/30 flex items-center justify-center border border-yellow-400/50">
                    <span className="text-lg">{task.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="text-white font-medium text-sm">{task.title}</div>
                    <div className="text-gray-400 text-xs mt-1">{task.description}</div>
                    
                    {task.progress !== undefined && task.maxProgress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-400">Прогресс</span>
                          <span className="text-futuristic-primary">{task.progress}/{task.maxProgress}</span>
                        </div>
                        <div className="w-full bg-cosmic-gray/50 rounded-full h-1.5">
                          <div 
                            className="bg-gradient-to-r from-futuristic-primary to-futuristic-accent h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${(task.progress / task.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-2 mt-2">
                      <Gift className="text-yellow-400" size={14} />
                      <span className="text-yellow-400 font-mono font-bold text-sm">{task.reward} TON</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(task.status)}
                  <Button
                    onClick={() => handleTaskAction(task.id)}
                    disabled={task.status === 'claimed'}
                    className={`px-4 py-2 text-sm rounded-xl transition-all ${
                      task.status === 'claimed'
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                        : task.status === 'completed'
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:scale-105'
                        : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold hover:scale-105'
                    }`}
                  >
                    {task.url && task.status === 'available' && (
                      <ExternalLink size={14} className="mr-1" />
                    )}
                    {getStatusText(task.status)}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Bonus */}
        <div className="bg-gradient-to-br from-cosmic-dark/90 via-purple-900/20 to-pink-900/20 rounded-3xl p-5 border border-purple-400/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <div className="text-center">
            <div className="text-3xl mb-2">🎁</div>
            <h3 className="text-white font-bold mb-2">Ежедневный бонус</h3>
            <p className="text-gray-300 text-sm mb-4">Заходи каждый день и получай увеличивающиеся награды</p>
            
            <div className="grid grid-cols-7 gap-2 mb-4">
              {[0.1, 0.2, 0.3, 0.5, 0.8, 1.0, 2.0].map((reward, index) => (
                <div key={index} className={`p-2 rounded-lg text-xs font-bold ${
                  index === 0 ? 'bg-cosmic-primary text-black' : 'bg-cosmic-gray/50 text-gray-400'
                }`}>
                  День {index + 1}
                  <div className="text-xs font-mono">{reward} TON</div>
                </div>
              ))}
            </div>
            
            <Button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold hover:scale-105 transition-transform">
              Забрать бонус за День 1
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksScreen;
