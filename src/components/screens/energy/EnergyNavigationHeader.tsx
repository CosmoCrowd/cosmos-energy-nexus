
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EnergyNavigationHeaderProps {
  currentEnergyName: string;
  onPrevious: () => void;
  onNext: () => void;
}

const EnergyNavigationHeader = ({ currentEnergyName, onPrevious, onNext }: EnergyNavigationHeaderProps) => {
  return (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <Button
        onClick={onPrevious}
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-futuristic-primary/20 rounded-full"
      >
        <ChevronLeft size={24} className="text-futuristic-primary" />
      </Button>
      
      <div className="text-center">
        <div className="text-2xl font-bold text-white mb-1 animate-hologram-flicker">
          {currentEnergyName}
        </div>
        <div className="w-20 h-1 bg-gradient-to-r from-futuristic-primary to-futuristic-accent rounded-full animate-energy-pulse mx-auto"></div>
      </div>
      
      <Button
        onClick={onNext}
        variant="ghost"
        size="sm"
        className="p-2 hover:bg-futuristic-primary/20 rounded-full"
      >
        <ChevronRight size={24} className="text-futuristic-primary" />
      </Button>
    </div>
  );
};

export default EnergyNavigationHeader;
