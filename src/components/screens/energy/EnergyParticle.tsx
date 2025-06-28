
interface EnergyParticleProps {
  emoji: string;
  isActive: boolean;
  size?: 'small' | 'large';
  onClick: () => void;
}

const EnergyParticle = ({ emoji, isActive, size = 'large', onClick }: EnergyParticleProps) => {
  const sizeClasses = size === 'large' 
    ? 'w-20 h-20 text-3xl border-4 inset-2 border-2' 
    : 'w-16 h-16 text-xl border-3 inset-3 border';

  return (
    <div 
      className={`relative ${sizeClasses.split(' ')[0]} ${sizeClasses.split(' ')[1]} rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 cursor-pointer ${
        isActive
          ? size === 'large'
            ? 'bg-gradient-to-br from-futuristic-primary/40 to-futuristic-accent/40 border-futuristic-primary animate-energy-pulse shadow-2xl shadow-futuristic-primary/50'
            : 'bg-gradient-to-br from-futuristic-secondary/40 to-futuristic-primary/40 border-futuristic-secondary animate-energy-pulse shadow-xl shadow-futuristic-secondary/40'
          : 'bg-gradient-to-br from-gray-800/60 to-gray-700/60 border-gray-600 text-gray-500 hover:border-futuristic-primary/50'
      } ${sizeClasses.split(' ')[2]} ${sizeClasses.split(' ')[3]}`}
      onClick={onClick}
    >
      {/* Inner Glow Ring */}
      <div className={`absolute ${sizeClasses.split(' ')[4]} ${sizeClasses.split(' ')[5]} rounded-full ${sizeClasses.split(' ')[6]} transition-all duration-300 ${
        isActive 
          ? size === 'large'
            ? 'border-futuristic-secondary/60 animate-spin'
            : 'border-futuristic-accent/50 animate-spin'
          : 'border-gray-600/30'
      }`}></div>
      
      {/* Particle Content */}
      <div className="relative z-10">
        {isActive ? (
          <div className="animate-energy-pulse">
            {emoji}
          </div>
        ) : (
          <div className={size === 'large' ? 'text-2xl' : 'text-lg'}>🔐</div>
        )}
      </div>
      
      {/* Outer Energy Ring */}
      {isActive && (
        <div className="absolute -inset-2 rounded-full border border-futuristic-primary/30 animate-ping"></div>
      )}
    </div>
  );
};

export default EnergyParticle;
