import React from 'react';
import { useProfile } from '@/hooks/useProfile';
import { Button } from '@/components/ui/button';
import { RefreshCw, Star, Zap } from 'lucide-react';

const NetworkHeader = () => {
  const { profile, loading } = useProfile();

  const getAvatarGradient = (level: number) => {
    const gradients = [
      'from-cyan-400 via-blue-500 to-purple-600',     // Level 1
      'from-purple-500 via-pink-500 to-red-500',     // Level 2
      'from-orange-400 via-yellow-500 to-green-500', // Level 3
      'from-green-400 via-teal-500 to-cyan-500',     // Level 4
      'from-indigo-500 via-purple-600 to-pink-600',  // Level 5+
    ];
    return gradients[Math.min(level - 1, gradients.length - 1)] || gradients[0];
  };

  const getUserInitials = () => {
    if (profile?.full_name) {
      return profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return profile?.username?.slice(0, 2).toUpperCase() || 'CS';
  };

  if (loading) {
    return (
      <div className="glass-card p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-cosmic-muted rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-cosmic-muted rounded w-32"></div>
            <div className="h-3 bg-cosmic-muted rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 animate-screen-enter">
      {/* Cosmic Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-cosmic-primary/5 via-transparent to-cosmic-accent/5 rounded-[inherit]"></div>
      
      <div className="relative z-10">
        {/* User Profile Section */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            {/* Enhanced Avatar */}
            <div className="relative group">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${getAvatarGradient(profile?.network_level || 1)} p-0.5 animate-cosmic-glow`}>
                <div className="w-full h-full bg-cosmic-dark rounded-full flex items-center justify-center">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${getAvatarGradient(profile?.network_level || 1)} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {getUserInitials()}
                  </div>
                </div>
              </div>
              {/* Level Badge */}
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center border-2 border-cosmic-dark">
                <span className="text-xs font-bold text-cosmic-dark">{profile?.network_level || 1}</span>
              </div>
            </div>

            {/* User Info */}
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-white">
                {profile?.full_name || profile?.username || 'Космический Пионер'}
              </h2>
              <div className="flex items-center space-x-2">
                <Star size={14} className="text-cosmic-accent" />
                <span className="text-cosmic-accent text-sm font-medium">
                  Уровень {profile?.network_level || 1}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Zap size={14} className="text-cosmic-primary" />
                  <span className="text-cosmic-primary font-mono">
                    {profile?.total_earned.toFixed(4) || '0.0000'} TON
                  </span>
                </div>
                <div className="text-cosmic-secondary">
                  Энергия: {profile?.energy_points.toFixed(0) || '0'}
                </div>
              </div>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="text-right space-y-2">
            <div className="bg-gradient-secondary px-4 py-2 rounded-lg">
              <div className="text-xs text-cosmic-secondary-glow font-medium">НАВИГАТОРЫ</div>
              <div className="text-lg font-bold text-white animate-counter-up">127,843</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="cosmic-button-accent p-2"
            >
              <RefreshCw size={16} />
            </Button>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="glass-card p-4 bg-gradient-to-r from-cosmic-primary/10 to-cosmic-accent/10 border border-cosmic-primary/30">
          <div className="flex items-center space-x-3">
            <div className="text-2xl animate-cosmic-pulse">🌌</div>
            <div>
              <h3 className="text-cosmic-primary font-bold text-sm">COSMO SPHERE активирована</h3>
              <p className="text-muted-foreground text-xs">
                Строй космические сети • Зарабатывай TON • Покоряй вселенную
              </p>
            </div>
          </div>
        </div>

        {/* Referral Code */}
        {profile?.referral_code && (
          <div className="mt-4 flex items-center justify-between p-3 bg-cosmic-card rounded-lg border border-cosmic-border">
            <div>
              <div className="text-xs text-muted-foreground">Реферальный код</div>
              <div className="font-mono text-cosmic-primary font-bold">{profile.referral_code}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigator.clipboard.writeText(profile.referral_code)}
            >
              Копировать
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkHeader;