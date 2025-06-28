
interface EnergyRewardDisplayProps {
  reward: number;
  isActive: boolean;
  size?: 'small' | 'large';
}

const EnergyRewardDisplay = ({ reward, isActive, size = 'large' }: EnergyRewardDisplayProps) => {
  const sizeClasses = size === 'large' ? 'px-4 py-2 text-sm' : 'px-3 py-1 text-xs';
  
  return (
    <div className={`mb-4 ${sizeClasses} rounded-2xl font-bold border-2 backdrop-blur-sm transition-all duration-300 ${
      isActive
        ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border-green-500/60 shadow-lg shadow-green-500/20 animate-energy-pulse'
        : 'bg-gradient-to-r from-gray-800/50 to-gray-700/50 text-gray-400 border-gray-600/50'
    }`}>
      <div className="flex items-center justify-center space-x-2">
        {isActive ? (
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        ) : (
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
        )}
        <span>+{reward} TON</span>
      </div>
    </div>
  );
};

export default EnergyRewardDisplay;
