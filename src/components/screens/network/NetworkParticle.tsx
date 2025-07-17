
import { useState } from 'react';

interface NetworkParticleProps {
  emoji: string;
  isActive: boolean;
  size: 'large' | 'small';
  onClick: () => void;
  participant?: {
    id: number;
    name: string;
    avatar: string;
  };
  isNavigator?: boolean;
}

const NetworkParticle = ({ emoji, isActive, size, onClick, participant, isNavigator }: NetworkParticleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = size === 'large' ? 'w-16 h-16 text-2xl' : 'w-12 h-12 text-lg';
  
  const baseClasses = `
    ${sizeClasses}
    rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 transform relative
    ${isActive 
      ? 'bg-gradient-to-br from-futuristic-primary/40 to-futuristic-accent/40 border-2 border-futuristic-primary shadow-lg shadow-futuristic-primary/50 animate-energy-pulse hover:scale-110' 
      : 'bg-cosmic-gray/50 border-2 border-gray-600 hover:border-futuristic-primary/50 hover:bg-cosmic-gray/70 hover:scale-105'
    }
    ${isNavigator ? 'ring-4 ring-yellow-400/50 animate-futuristic-glow' : ''}
  `;

  return (
    <div className="relative">
      <div
        className={baseClasses}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Particle effect for active particles */}
        {isActive && (
          <>
            <div className="absolute -inset-4 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-futuristic-primary rounded-full animate-matrix-rain opacity-60"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDuration: `${1.5 + Math.random() * 2}s`,
                    animationDelay: `${Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Main emoji */}
        <span className={`${isActive ? 'animate-pulse' : ''} relative z-10`}>
          {emoji}
        </span>
        
        {/* Glow effect */}
        {isActive && (
          <div className="absolute inset-0 bg-futuristic-primary/20 rounded-full animate-ping"></div>
        )}
      </div>
      
      {/* Hover tooltip */}
      {isHovered && participant && (
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-cosmic-dark border border-futuristic-primary/50 rounded-lg px-2 py-1 text-xs text-white whitespace-nowrap z-50">
          {participant.name}
        </div>
      )}
      
      {/* Connection lines for active particles */}
      {isActive && !isNavigator && (
        <div className="absolute top-1/2 left-1/2 w-px h-8 bg-gradient-to-b from-futuristic-primary/50 to-transparent -translate-x-1/2 -translate-y-full"></div>
      )}
    </div>
  );
};

export default NetworkParticle;
