
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NetworkNavigationHeaderProps {
  currentLevelName: string;
  onPrevious: () => void;
  onNext: () => void;
}

const NetworkNavigationHeader = ({ 
  currentLevelName, 
  onPrevious, 
  onNext 
}: NetworkNavigationHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6 px-4">
      <button
        onClick={onPrevious}
        className="w-12 h-12 rounded-full bg-futuristic-primary/20 border border-futuristic-primary/50 flex items-center justify-center hover:bg-futuristic-primary/30 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="text-futuristic-primary" size={24} />
      </button>
      
      <div className="text-center">
        <h3 className="text-white font-bold text-xl animate-hologram-flicker">
          {currentLevelName}
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-futuristic-primary to-transparent mx-auto mt-2"></div>
      </div>
      
      <button
        onClick={onNext}
        className="w-12 h-12 rounded-full bg-futuristic-primary/20 border border-futuristic-primary/50 flex items-center justify-center hover:bg-futuristic-primary/30 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="text-futuristic-primary" size={24} />
      </button>
    </div>
  );
};

export default NetworkNavigationHeader;
