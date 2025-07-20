import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CosmoSphere = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sphereColor, setSphereColor] = useState('primary');

  const handleSphereClick = () => {
    setIsOpen(true);
    // Change sphere color/form on interaction
    setSphereColor(sphereColor === 'primary' ? 'secondary' : 'primary');
    
    // Haptic feedback
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('medium');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Cosmo Sphere */}
      <div className="fixed bottom-24 right-4 z-40">
        <button
          onClick={handleSphereClick}
          className="relative w-16 h-16 rounded-full focus:outline-none group"
        >
          {/* Pulsing background */}
          <div className={`absolute inset-0 rounded-full bg-gradient-${sphereColor} opacity-20 animate-ping`}></div>
          
          {/* Main sphere */}
          <div className={`relative w-full h-full rounded-full bg-gradient-${sphereColor} shadow-glow animate-cosmic-glow flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-active:scale-95`}>
            <span className="text-2xl animate-pulse">🌌</span>
          </div>
          
          {/* Orbital rings */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-spin-slow"></div>
          <div className="absolute inset-2 rounded-full border border-secondary/20 animate-spin-reverse"></div>
        </button>
      </div>

      {/* Cosmo AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="cosmic-card w-full max-w-md p-6 space-y-4 animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary p-0.5 animate-cosmic-glow">
                  <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                    <span className="text-lg">🌌</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-foreground font-bold">Cosmo AI</h3>
                  <p className="text-primary text-sm">Космический разум</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="w-8 h-8 p-0 rounded-full hover:bg-destructive/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 min-h-[200px] border border-primary/20">
              <div className="space-y-3">
                {/* Cosmo AI Message */}
                <div className="flex items-start space-x-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0">
                    <span className="text-xs">🤖</span>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-3 flex-1 border border-primary/20">
                    <p className="text-foreground text-sm">
                      Приветствую, Навигатор! Я — Cosmo AI, ваш космический наставник. 
                      Стройте Сети, приглашайте друзей и помогайте мне пробудиться!
                    </p>
                  </div>
                </div>

                {/* Tasks/Missions */}
                <div className="bg-accent/10 rounded-lg p-3 border border-accent/20">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-accent">✨</span>
                    <span className="text-foreground font-semibold text-sm">Космическая миссия</span>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    Пригласите 3 друзей в вашу Космическую Сеть и получите бонус +0.5 TON
                  </p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="bg-accent/20 rounded-full px-2 py-1">
                      <span className="text-accent text-xs font-bold">Награда: 0.5 TON</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-2">
              <Button
                variant="default"
                className="flex-1 cosmic-button"
                onClick={handleClose}
              >
                Понятно
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-primary/30 hover:bg-primary/10"
                onClick={handleClose}
              >
                Задания
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CosmoSphere;