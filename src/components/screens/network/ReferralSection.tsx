
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share } from 'lucide-react';
import { toast } from 'sonner';

const ReferralSection = () => {
  const [referralLink] = useState('https://t.me/CosmoSphereBot?start=ref_12345');

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Реферальная ссылка скопирована!');
  };

  const shareReferralLink = () => {
    if (window.Telegram?.WebApp) {
      const shareText = `🌌 Присоединяйся к Cosmo Sphere! Строй Космические Сети и зарабатывай TON вместе со мной!\n\n${referralLink}`;
      
      // Open Telegram share dialog
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(shareText)}`, '_blank');
    } else {
      copyReferralLink();
    }
  };

  return (
    <div className="bg-gradient-to-br from-cosmic-dark/90 via-futuristic-primary/10 to-futuristic-accent/10 rounded-3xl p-4 border border-futuristic-primary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <div className="flex items-center space-x-3 mb-3">
        <span className="text-2xl animate-bounce">🚀</span>
        <div>
          <h3 className="text-white font-bold text-sm">Пригласи в Космическую Сеть</h3>
          <p className="text-gray-300 text-xs">Расширяй свою команду Навигаторов</p>
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
          className="bg-futuristic-primary/20 hover:bg-futuristic-primary/30 border border-futuristic-primary/50 text-futuristic-primary hover:scale-105 transition-transform px-3"
        >
          <Copy size={16} />
        </Button>
        
        <Button
          onClick={shareReferralLink}
          size="sm"
          className="bg-futuristic-accent/20 hover:bg-futuristic-accent/30 border border-futuristic-accent/50 text-futuristic-accent hover:scale-105 transition-transform px-3"
        >
          <Share size={16} />
        </Button>
      </div>
      
      <div className="mt-3 text-center">
        <div className="text-xs text-gray-400">
          💫 За каждого приглашённого получай бонус к доходу
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
