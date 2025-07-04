
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Users } from 'lucide-react';
import ActivityMatrix from './energy/ActivityMatrix';

const TeamScreen = () => {
  const [expandedNodes, setExpandedNodes] = useState<number[]>([1]);

  const teamStructure = {
    upline: { id: 0, name: 'Наставник', level: 5, avatar: '👑' },
    user: { id: 1, name: 'Вы', level: 3, avatar: '👤', directReferrals: 8, matrixCount: 24 },
    referrals: [
      { id: 2, name: 'Алексей К.', level: 2, avatar: '🚀', active: true, earned: '12.5 TON' },
      { id: 3, name: 'Мария С.', level: 4, avatar: '⭐', active: true, earned: '28.3 TON' },
      { id: 4, name: 'Дмитрий В.', level: 1, avatar: '🌟', active: false, earned: '3.2 TON' },
      { id: 5, name: 'Елена Р.', level: 3, avatar: '💎', active: true, earned: '15.7 TON' },
    ]
  };

  const toggleNode = (nodeId: number) => {
    setExpandedNodes(prev => 
      prev.includes(nodeId) 
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  return (
    <div className="min-h-screen px-4 pt-4 pb-24">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white mb-2">Команда</h1>
        <p className="text-gray-400 text-sm">
          Ваша реферальная структура и матрица
        </p>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="cosmic-card p-4 text-center">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-neon-green">{teamStructure.user.directReferrals}</div>
          <div className="text-sm text-gray-400">Прямых рефералов</div>
        </div>
        <div className="cosmic-card p-4 text-center">
          <div className="text-3xl mb-2">🔮</div>
          <div className="text-2xl font-bold text-neon-blue">{teamStructure.user.matrixCount}</div>
          <div className="text-sm text-gray-400">В матрице</div>
        </div>
      </div>

      {/* Team Structure */}
      <div className="cosmic-card p-4 mb-6">
        <h3 className="text-white font-semibold mb-4 flex items-center text-base">
          <Users className="h-5 w-5 mr-2 text-neon-green" />
          Структура команды
        </h3>

        {/* Upline */}
        <div className="mb-4">
          <div className="flex items-center p-3 bg-neon-blue/10 border border-neon-blue/30 rounded-lg">
            <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-xl">{teamStructure.upline.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-base">{teamStructure.upline.name}</div>
              <div className="text-neon-blue text-sm">Уровень {teamStructure.upline.level}</div>
            </div>
          </div>
        </div>

        {/* Current User */}
        <div className="mb-4">
          <Button
            onClick={() => toggleNode(teamStructure.user.id)}
            className="w-full flex items-center justify-between p-3 bg-neon-green/10 border border-neon-green/30 rounded-lg hover:bg-neon-green/20 text-base"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center mr-3">
                <span className="text-xl">{teamStructure.user.avatar}</span>
              </div>
              <div className="text-left">
                <div className="text-white font-medium">{teamStructure.user.name}</div>
                <div className="text-neon-green text-sm">Уровень {teamStructure.user.level}</div>
              </div>
            </div>
            {expandedNodes.includes(teamStructure.user.id) ? 
              <ChevronDown className="h-5 w-5 text-neon-green" /> : 
              <ChevronRight className="h-5 w-5 text-neon-green" />
            }
          </Button>

          {/* Referrals */}
          {expandedNodes.includes(teamStructure.user.id) && (
            <div className="ml-6 mt-3 space-y-3">
              {teamStructure.referrals.map((referral) => (
                <div key={referral.id} className="flex items-center justify-between p-3 bg-cosmic-gray rounded-lg border border-gray-600">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-cosmic-light rounded-full flex items-center justify-center mr-3">
                      <span className="text-base">{referral.avatar}</span>
                    </div>
                    <div>
                      <div className="text-white text-base font-medium">{referral.name}</div>
                      <div className="text-gray-400 text-sm">Уровень {referral.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-base font-semibold ${referral.active ? 'text-neon-green' : 'text-gray-400'}`}>
                      {referral.earned}
                    </div>
                    <div className={`text-sm ${referral.active ? 'text-green-400' : 'text-gray-500'}`}>
                      {referral.active ? '🟢 Активен' : '🔴 Неактивен'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Improved Activity Matrix */}
      <ActivityMatrix />
    </div>
  );
};

export default TeamScreen;
