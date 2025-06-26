
import { Button } from '@/components/ui/button';
import { CosmicCopy } from '@/components/ui/cosmic-icons';
import { toast } from 'sonner';

const ReferralSection = () => {
  const referralLink = 'https://t.me/cosmo_bot?start=ref_u127843';

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована!');
  };

  return (
    <div className="cosmic-card p-4 animate-slide-in-right" style={{animationDelay: '0.2s'}}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-8 h-8 bg-neon-gradient rounded-lg flex items-center justify-center animate-cosmic-pulse">
          <span className="text-lg">🔗</span>
        </div>
        <h3 className="text-white font-semibold">Пригласить друзей</h3>
        <div className="flex-1 h-px bg-neon-gradient animate-width-expand"></div>
      </div>
      
      <div className="bg-cosmic-gray/30 rounded-xl p-3 mb-3">
        <p className="text-neon-green text-sm font-semibold animate-pulse">
          💰 За каждого друга: +10% от его покупок
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 bg-cosmic-gray/50 border border-neon-green/30 rounded-xl px-4 py-3 text-sm text-white backdrop-blur-sm focus:border-neon-green/60 transition-colors"
        />
        <Button
          onClick={copyReferralLink}
          className="cosmic-button px-4 py-3 text-black font-semibold hover:scale-110 transition-all duration-300 animate-button-hover"
        >
          <CosmicCopy size={16} />
        </Button>
      </div>
    </div>
  );
};

export default ReferralSection;
