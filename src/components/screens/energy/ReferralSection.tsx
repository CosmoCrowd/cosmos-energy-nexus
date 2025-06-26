
import { Button } from '@/components/ui/button';
import { FuturisticCopy } from '@/components/ui/futuristic-icons';
import { toast } from 'sonner';

const ReferralSection = () => {
  const referralLink = 'https://t.me/cosmo_bot?start=ref_u127843';

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Ссылка скопирована!');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-cosmic-dark/90 via-futuristic-secondary/10 to-futuristic-accent/10 border border-futuristic-secondary/30 backdrop-blur-xl animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      {/* Hologram Effect */}
      <div className="absolute inset-0 bg-hologram-gradient animate-hologram-flicker"></div>
      
      <div className="relative p-5 z-10">
        <div className="flex items-center space-x-4 mb-5">
          <div className="w-10 h-10 bg-futuristic-gradient rounded-2xl flex items-center justify-center animate-energy-pulse border border-futuristic-secondary/50">
            <span className="text-xl">🔗</span>
          </div>
          <h3 className="text-white font-bold text-lg animate-hologram-flicker">Пригласить друзей</h3>
          <div className="flex-1 h-px bg-futuristic-gradient animate-energy-pulse"></div>
        </div>
        
        <div className="bg-futuristic-secondary/20 rounded-2xl p-4 mb-4 border border-futuristic-secondary/40 animate-futuristic-glow">
          <p className="text-futuristic-primary text-sm font-bold animate-energy-pulse text-center">
            💰 За каждого друга: +10% от его покупок
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 bg-cosmic-dark/70 border border-futuristic-primary/40 rounded-2xl px-5 py-4 text-sm text-white backdrop-blur-sm focus:border-futuristic-primary/80 transition-all duration-300 font-mono animate-hologram-flicker"
          />
          <Button
            onClick={copyReferralLink}
            className="bg-futuristic-gradient hover:scale-110 transition-all duration-300 px-5 py-4 text-black font-bold rounded-2xl border border-futuristic-primary/50 animate-futuristic-glow shadow-lg shadow-futuristic-primary/30"
          >
            <FuturisticCopy size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReferralSection;
