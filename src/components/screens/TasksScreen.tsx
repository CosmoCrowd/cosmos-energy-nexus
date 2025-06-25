
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: number;
  title: string;
  description: string;
  reward: number;
  type: 'telegram' | 'social' | 'referral';
  icon: string;
  completed: boolean;
  link?: string;
}

const TasksScreen = () => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: 'Подпишись на канал Cosmo',
      description: 'Подпишитесь на наш официальный канал в Telegram',
      reward: 25,
      type: 'telegram',
      icon: '📢',
      completed: false,
      link: 'https://t.me/cosmo_channel'
    },
    {
      id: 2,
      title: 'Вступи в группу обсуждений',
      description: 'Присоединяйтесь к нашему сообществу',
      reward: 25,
      type: 'telegram',
      icon: '💬',
      completed: false,
      link: 'https://t.me/cosmo_chat'
    },
    {
      id: 3,
      title: 'Пригласи 3 друзей',
      description: 'Пригласите троих друзей по реферальной ссылке',
      reward: 100,
      type: 'referral',
      icon: '👥',
      completed: false
    },
    {
      id: 4,
      title: 'Купи первую энергию',
      description: 'Приобретите "Энергию Начала" для активации',
      reward: 50,
      type: 'referral',
      icon: '⚡',
      completed: true
    },
    {
      id: 5,
      title: 'Поделись в соцсетях',
      description: 'Поделитесь информацией о Cosmo в любой соцсети',
      reward: 25,
      type: 'social',
      icon: '📱',
      completed: false
    }
  ]);

  const [completedToday] = useState(2);
  const [totalEarned] = useState(75);

  const handleTaskComplete = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task || task.completed) return;

    if (task.link) {
      window.open(task.link, '_blank');
    }

    // Simulate task completion after a delay
    setTimeout(() => {
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, completed: true } : t
      ));
      toast.success(`Задание выполнено! +${task.reward} COSMO`);
    }, 2000);
  };

  const getTaskTypeColor = (type: Task['type']) => {
    switch (type) {
      case 'telegram': return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
      case 'social': return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
      case 'referral': return 'text-neon-green border-neon-green/30 bg-neon-green/10';
      default: return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const completableTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="min-h-screen p-4 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Задания</h1>
        <p className="text-gray-400 text-sm">
          Выполняйте задания и получайте COSMO токены
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="cosmic-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-xl font-bold text-neon-green">{completedToday}</div>
          <div className="text-sm text-gray-400">Выполнено сегодня</div>
        </div>
        <div className="cosmic-card rounded-xl p-4 text-center">
          <div className="text-2xl mb-2">🌟</div>
          <div className="text-xl font-bold text-neon-blue">{totalEarned}</div>
          <div className="text-sm text-gray-400">COSMO заработано</div>
        </div>
      </div>

      {/* Available Tasks */}
      {completableTasks.length > 0 && (
        <div className="mb-6">
          <h3 className="text-white font-semibold mb-4">Доступные задания</h3>
          <div className="space-y-3">
            {completableTasks.map((task) => (
              <div key={task.id} className="cosmic-card rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-lg border flex items-center justify-center ${getTaskTypeColor(task.type)}`}>
                    <span className="text-xl">{task.icon}</span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{task.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-neon-green font-bold">+{task.reward}</span>
                        <span className="text-gray-400 text-sm">COSMO</span>
                      </div>
                      <Button
                        onClick={() => handleTaskComplete(task.id)}
                        className="cosmic-button text-black font-semibold px-4 py-2"
                      >
                        {task.link ? (
                          <>
                            Перейти <ExternalLink className="h-4 w-4 ml-1" />
                          </>
                        ) : (
                          'Выполнить'
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h3 className="text-white font-semibold mb-4">Выполненные задания</h3>
          <div className="space-y-3">
            {completedTasks.map((task) => (
              <div key={task.id} className="cosmic-card rounded-xl p-4 opacity-75">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg border border-green-400/30 bg-green-400/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{task.title}</h4>
                    <p className="text-gray-400 text-sm mb-3">{task.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-green-400 font-bold">+{task.reward}</span>
                      <span className="text-gray-400 text-sm">COSMO</span>
                      <span className="text-green-400 text-sm">✓ Выполнено</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Daily Reset Timer */}
      <div className="cosmic-card rounded-xl p-4 mt-6">
        <div className="flex items-center justify-center space-x-2 text-gray-400">
          <Clock className="h-4 w-4" />
          <span className="text-sm">Новые задания через: 18:42:15</span>
        </div>
      </div>
    </div>
  );
};

export default TasksScreen;
