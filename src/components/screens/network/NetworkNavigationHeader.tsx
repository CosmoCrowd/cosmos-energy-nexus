
interface NetworkNavigationHeaderProps {
  currentLevel: string;
  onPrevious: () => void;
  onNext: () => void;
  canGoPrevious: boolean;
  canGoNext: boolean;
}

const NetworkNavigationHeader = ({ 
  currentLevel, 
  onPrevious, 
  onNext, 
  canGoPrevious, 
  canGoNext 
}: NetworkNavigationHeaderProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-cosmic-gray/20 rounded-2xl border border-futuristic-primary/30 backdrop-blur-sm">
      <button
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          canGoPrevious
            ? 'bg-futuristic-primary/20 border border-futuristic-primary/50 text-futuristic-primary hover:bg-futuristic-primary/30'
            : 'bg-cosmic-gray/30 border border-gray-600 text-gray-500 cursor-not-allowed'
        }`}
      >
        ←
      </button>
      
      <div className="text-center">
        <h3 className="text-white font-bold text-lg">{currentLevel}</h3>
        <div className="text-futuristic-primary text-xs">Космическая Сеть</div>
      </div>
      
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
          canGoNext
            ? 'bg-futuristic-primary/20 border border-futuristic-primary/50 text-futuristic-primary hover:bg-futuristic-primary/30'
            : 'bg-cosmic-gray/30 border border-gray-600 text-gray-500 cursor-not-allowed'
        }`}
      >
        →
      </button>
    </div>
  );
};

export default NetworkNavigationHeader;
