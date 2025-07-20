
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

const ReferralSection = () => {
  const { profile } = useProfile();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const copyReferralLink = async () => {
    const referralLink = `https://t.me/CosmoSphereBot?start=${profile?.referral_code || 'DEFAULT'}`;
    
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast({ title: "Реферальная ссылка скопирована!" });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast({ title: "Ошибка копирования", description: "Попробуйте еще раз" });
    }
  };

  const shareReferralLink = () => {
    const referralLink = `https://t.me/CosmoSphereBot?start=${profile?.referral_code || 'DEFAULT'}`;
    const text = "🌌 Присоединяйся к Cosmo Sphere! Строй космические сети и зарабатывай TON!";
    
    if (window.Telegram?.WebApp) {
      // Use regular window.open for Telegram share
      window.open(`https://t.me/share/url?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(text)}`, '_blank');
    } else {
      // Fallback to copying
      copyReferralLink();
    }
  };

  return (
    <div className="cosmic-card p-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <h3 className="text-center text-foreground font-bold text-lg mb-3">Пригласить Навигаторов</h3>
      
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-4 border border-primary/20 mb-4">
        <div className="flex items-center space-x-3 mb-3">
          <span className="text-2xl">🚀</span>
          <div>
            <div className="text-primary font-semibold">Ваш реферальный код</div>
            <div className="text-muted-foreground text-sm">{profile?.referral_code || 'Загрузка...'}</div>
          </div>
        </div>
        
        <div className="text-xs text-muted-foreground mb-3">
          За каждого приглашенного Навигатора получайте бонусы и стройте свою космическую империю!
        </div>
      </div>

      <div className="flex space-x-2">
        <Button
          onClick={copyReferralLink}
          variant="outline"
          className="flex-1 border-primary/30 hover:bg-primary/10"
          disabled={copied}
        >
          <Copy className="w-4 h-4 mr-2" />
          {copied ? 'Скопировано!' : 'Копировать ссылку'}
        </Button>
        
        <Button
          onClick={shareReferralLink}
          className="flex-1 cosmic-button"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Поделиться
        </Button>
      </div>
    </div>
  );
};

export default ReferralSection;
