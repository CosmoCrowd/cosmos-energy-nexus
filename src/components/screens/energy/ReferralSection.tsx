
import { Button } from '@/components/ui/button';
import { Copy, Zap } from 'lucide-react';
import { toast } from 'sonner';

const ReferralSection = () => {
  const referralLink = 'https://t.me/cosmo_bot?start=ref_u127843';

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована!');
  };

  return (
    <div className="cosmic-card p-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <div className="flex items-center space-x-2 mb-3">
        <Zap className="h-5 w-5 text-neon-green animate-pulse" />
        <h3 className="text-white font-semibold">Пригласить друзей</h3>
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 bg-cosmic-gray/50 border border-neon-green/30 rounded-xl px-3 py-2 text-sm text-white backdrop-blur-sm"
        />
        <Button
          onClick={copyReferralLink}
          className="cosmic-button px-3 py-2 text-black font-semibold hover:scale-105 transition-transform"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ReferralSection;
