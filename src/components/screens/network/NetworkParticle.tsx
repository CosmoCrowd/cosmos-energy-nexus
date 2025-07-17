
import { useState } from 'react';

interface NetworkParticleProps {
  emoji: string;
  isActive: boolean;
  size: 'small' | 'large';
  onClick: () => void;
  participant?: {
    id: number;
    name: string;
    avatar: string;
    position: string;
  };
  isNavigator?: boolean;
}

const NetworkParticle = ({ 
  emoji, 
  isActive, 
  size, 
  onClick, 
  participant,
  isNavigator = false 
}: NetworkParticleProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    small: 'w-12 h-12 text-2xl',
    large: 'w-16 h-16 text-3xl'
  };

  const getParticleStyle = () => {
    if (isNavigator) {
      return 'bg-gradient-to-br from-yellow-400 to-orange-500 border-yellow-400 shadow-yellow-400/50 animate-futuristic-glow';
    }
    
    if (participant) {
      return 'bg-gradient-to-br from-futuristic-primary to-futuristic-secondary border-futuristic-primary shadow-futuristic-primary/50';
    }
    
    if (isActive) {
      return 'bg-gradient-to-br from-futuristic-primary/30 to-futuristic-secondary/30 border-futuristic-primary/50 hover:border-futuristic-primary hover:shadow-futuristic-primary/30';
    }
    
    return 'bg-cosmic-gray/30 border-gray-600 opacity-50';
  };

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          ${sizeClasses[size]} 
          rounded-full border-2 flex items-center justify-center
          transition-all duration-300 transform hover:scale-110 cursor-pointer
          ${getParticleStyle()}
        `}
        disabled={!isActive && !participant}
      >
        {/* Particle glow effect */}
        {(isActive || participant || isNavigator) && (
          <div className="absolute -inset-1 rounded-full border border-futuristic-primary/30 animate-ping opacity-75"></div>
        )}
        
        {/* Emoji/Avatar */}
        <span className={`${isNavigator ? 'animate-energy-pulse' : ''}`}>
          {emoji}
        </span>
        
        {/* Empty slot indicator */}
        {!participant && !isNavigator && (
          <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-600 opacity-50"></div>
        )}
      </button>
      
      {/* Hover tooltip */}
      {isHovered && participant && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cosmic-dark border border-futuristic-primary/50 rounded-lg px-3 py-1 text-xs text-white z-20 shadow-lg">
          {participant.name}
        </div>
      )}
      
      {isHovered && !participant && !isNavigator && isActive && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-cosmic-dark border border-futuristic-primary/50 rounded-lg px-3 py-1 text-xs text-white z-20 shadow-lg">
          Свободное место
        </div>
      )}
    </div>
  );
};

export default NetworkParticle;
