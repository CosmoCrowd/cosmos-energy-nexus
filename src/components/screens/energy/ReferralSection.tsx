
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
    <div className="flex justify-center px-4 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
      <Button
        onClick={copyReferralLink}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold px-8 py-3 rounded-2xl border-2 border-red-400 shadow-lg shadow-red-500/50 animate-energy-pulse transform hover:scale-105 transition-all duration-300"
      >
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold">REFERRAL LINK</span>
          <FuturisticCopy size={20} />
        </div>
      </Button>
    </div>
  );
};

export default ReferralSection;
