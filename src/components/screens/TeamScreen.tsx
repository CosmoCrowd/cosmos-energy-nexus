
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Users, Crown, Star, Trophy, Gift, Copy, Share } from 'lucide-react';
import { toast } from 'sonner';

const TeamScreen = () => {
  const [activeTab, setActiveTab] = useState<'team' | 'leaders'>('team');

  // Mock team data
  const teamMembers = [
    { id: 1, name: 'Алексей К.', level: 5, earnings: 24.5, avatar: '👨‍🚀', joinDate: '2024-01-10', status: 'active' },
    { id: 2, name: 'Мария С.', level: 3, earnings: 12.3, avatar: '👩‍🚀', joinDate: '2024-01-12', status: 'active' },
    { id: 3, name: 'Иван П.', level: 7, earnings: 45.2, avatar: '🧑‍🚀', joinDate: '2024-01-08', status: 'active' },
    { id: 4, name: 'Елена В.', level: 2, earnings: 8.1, avatar: '👩‍🔬', joinDate: '2024-01-15', status: 'inactive' },
    { id: 5, name: 'Дмитрий А.', level: 4, earnings: 18.7, avatar: '👨‍💼', joinDate: '2024-01-11', status: 'active' },
  ];

  const leaderboard = [
    { id: 1, name: 'CosmoMaster2024', level: 10, earnings: 156.8, avatar: '👑', rank: 1 },
    { id: 2, name: 'StarNavigator', level: 9, earnings: 134.2, avatar: '⭐', rank: 2 },
    { id: 3, name: 'SpaceExplorer', level: 9, earnings: 128.9, avatar: '🚀', rank: 3 },
    { id: 4, name: 'CosmicTrader', level: 8, earnings: 98.4, avatar: '💫', rank: 4 },
    { id: 5, name: 'UniverseBuilder', level: 8, earnings: 87.1, avatar: '🌌', rank: 5 },
  ];

  const referralStats = {
    totalReferrals: teamMembers.length,
    activeReferrals: teamMembers.filter(m => m.status === 'active').length,
    totalEarnings: teamMembers.reduce((sum, m) => sum + m.earnings, 0),
    referralBonus: 15.6
  };

  const [referralLink] = useState('https://t.me/CosmoSphereBot?start=ref_12345');

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Реферальная ссылка скопирована!');
  };

  const shareReferralLink = () => {
    if (window.Telegram?.WebApp) {
      const shareText = `🌌 Присоединяйся к моей космической команде в Cosmo Sphere! Строй сети, зарабатывай TON!\n\n${referralLink}`;
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`, '_blank');
    } else {
      copyReferralLink();
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="text-yellow-400" size={20} />;
      case 2: return <Trophy className="text-gray-300" size={20} />;
      case 3: return <Trophy className="text-orange-400" size={20} />;
      default: return <Star className="text-futuristic-primary" size={16} />;
    }
  };

  return (
    <div className="min-h-screen px-3 pt-2 pb-20 space-y-4 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-futuristic-secondary rounded-full animate-matrix-rain opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${3 + Math.random() * 4}s`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Team Header */}
        <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-secondary/10 to-purple-900/20 rounded-3xl p-5 border border-futuristic-secondary/30 backdrop-blur-xl animate-fade-in-up">
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-futuristic-secondary to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 animate-energy-pulse">
              <Users className="text-black" size={28} />
            </div>
            <h2 className="text-white font-bold text-xl mb-2">Космическая Команда</h2>
            <p className="text-gray-300 text-sm">Создай сеть Навигаторов и получай пассивный доход</p>
          </div>
        </div>

        {/* Referral Stats */}
        <div className="grid grid-cols-2 gap-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-green-900/20 to-emerald-900/20 rounded-3xl p-4 border border-green-400/30 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-2xl mb-2">👥</div>
              <div className="text-green-400 font-bold text-lg">{referralStats.totalReferrals}</div>
              <div className="text-gray-400 text-xs">Всего рефералов</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-blue-900/20 to-cyan-900/20 rounded-3xl p-4 border border-cyan-400/30 backdrop-blur-xl">
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-cyan-400 font-bold text-lg font-mono">{referralStats.referralBonus} TON</div>
              <div className="text-gray-400 text-xs">Бонус с команды</div>
            </div>
          </div>
        </div>

        {/* Referral Link */}
        <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-4 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center space-x-3 mb-3">
            <Gift className="text-futuristic-primary" size={20} />
            <div>
              <h3 className="text-white font-bold text-sm">Пригласи друзей</h3>
              <p className="text-gray-300 text-xs">Получай 10% с их доходов навсегда</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <div className="flex-1 bg-cosmic-gray/50 rounded-xl px-3 py-2 border border-futuristic-primary/30">
              <div className="text-futuristic-primary text-xs font-mono truncate">
                {referralLink}
              </div>
            </div>
            
            <Button
              onClick={copyReferralLink}
              size="sm"
              className="bg-futuristic-primary/20 hover:bg-futuristic-primary/30 border border-futuristic-primary/50 text-futuristic-primary px-3"
            >
              <Copy size={16} />
            </Button>
            
            <Button
              onClick={shareReferralLink}
              size="sm"
              className="bg-futuristic-accent/20 hover:bg-futuristic-accent/30 border border-futuristic-accent/50 text-futuristic-accent px-3"
            >
              <Share size={16} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-cosmic-gray/30 rounded-2xl p-1 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <Button
            onClick={() => setActiveTab('team')}
            className={`flex-1 rounded-xl py-3 transition-all ${
              activeTab === 'team'
                ? 'bg-futuristic-secondary text-black font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Моя команда
          </Button>
          <Button
            onClick={() => setActiveTab('leaders')}
            className={`flex-1 rounded-xl py-3 transition-all ${
              activeTab === 'leaders'
                ? 'bg-futuristic-secondary text-black font-bold'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Лидеры
          </Button>
        </div>

        {/* Content */}
        {activeTab === 'team' ? (
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
              <Users size={20} />
              <span>Участники команды</span>
            </h3>
            
            {teamMembers.length > 0 ? (
              <div className="space-y-3">
                {teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 bg-cosmic-gray/30 rounded-xl border border-futuristic-primary/20">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-futuristic-secondary/30 to-purple-600/30 flex items-center justify-center border border-futuristic-secondary/50">
                        <span className="text-lg">{member.avatar}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-gray-400 text-xs">Уровень {member.level} • {member.joinDate}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-futuristic-secondary font-mono font-bold">{member.earnings} TON</div>
                      <div className={`text-xs ${member.status === 'active' ? 'text-green-400' : 'text-gray-500'}`}>
                        {member.status === 'active' ? 'Активен' : 'Неактивен'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">👥</div>
                <div className="text-gray-400 text-sm">Пока никого нет в команде</div>
                <div className="text-gray-500 text-xs mt-2">Пригласи друзей и начни зарабатывать!</div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/5 to-futuristic-accent/5 rounded-3xl p-5 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-white font-bold mb-4 flex items-center space-x-2">
              <Trophy size={20} />
              <span>Топ Навигаторы</span>
            </h3>
            
            <div className="space-y-3">
              {leaderboard.map((leader) => (
                <div key={leader.id} className="flex items-center justify-between p-4 bg-cosmic-gray/30 rounded-xl border border-futuristic-primary/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center">
                      {getRankIcon(leader.rank)}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400/30 to-orange-600/30 flex items-center justify-center border border-yellow-400/50">
                      <span className="text-lg">{leader.avatar}</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{leader.name}</div>
                      <div className="text-gray-400 text-xs">Уровень {leader.level}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400 font-mono font-bold">{leader.earnings} TON</div>
                    <div className="text-gray-400 text-xs">#{leader.rank} место</div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 p-4 bg-gradient-to-r from-futuristic-primary/10 to-futuristic-accent/10 rounded-xl border border-futuristic-primary/30">
              <div className="text-center">
                <div className="text-futuristic-primary font-bold text-sm">🏆 Стань лидером!</div>
                <div className="text-gray-300 text-xs mt-1">Развивай команду и поднимайся в рейтинге</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamScreen;
