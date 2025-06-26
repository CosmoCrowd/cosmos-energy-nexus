
import React from 'react';

// Уникальные космические иконки с анимациями
export const CosmicEnergy = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`cosmic-energy-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" />
        <stop offset="50%" stopColor="#00aaff" />
        <stop offset="100%" stopColor="#aa00ff" />
      </linearGradient>
    </defs>
    <path 
      d="M12 2L8 10h3v10l5-8h-3V2z" 
      fill="url(#energyGrad)"
      className="animate-pulse"
    />
    <circle cx="12" cy="12" r="10" stroke="url(#energyGrad)" strokeWidth="1" fill="none" opacity="0.3" className="animate-spin-slow" />
  </svg>
);

export const CosmicWallet = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`cosmic-wallet-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="walletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" />
        <stop offset="100%" stopColor="#00aaff" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="20" height="12" rx="3" fill="url(#walletGrad)" opacity="0.8" />
    <rect x="18" y="9" width="3" height="6" rx="1" fill="#ffffff" className="animate-pulse" />
    <circle cx="8" cy="12" r="1" fill="#ffffff" className="animate-bounce" />
    <circle cx="12" cy="12" r="1" fill="#ffffff" className="animate-bounce" style={{animationDelay: '0.2s'}} />
  </svg>
);

export const CosmicTeam = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`cosmic-team-icon ${className}`}
    fill="none"
  >
    <defs>
      <radialGradient id="teamGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#aa00ff" />
        <stop offset="100%" stopColor="#00ff88" />
      </radialGradient>
    </defs>
    <circle cx="9" cy="8" r="3" fill="url(#teamGrad)" className="animate-pulse" />
    <circle cx="15" cy="8" r="3" fill="url(#teamGrad)" className="animate-pulse" style={{animationDelay: '0.3s'}} />
    <path d="M3 18v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="url(#teamGrad)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.6s'}} />
    <path d="M13 18v-1a6 6 0 0 1 6-6h2" stroke="url(#teamGrad)" strokeWidth="2" className="animate-pulse" style={{animationDelay: '0.9s'}} />
  </svg>
);

export const CosmicTasks = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`cosmic-tasks-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="taskGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0088" />
        <stop offset="50%" stopColor="#00aaff" />
        <stop offset="100%" stopColor="#00ff88" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="2" stroke="url(#taskGrad)" strokeWidth="2" fill="none" />
    <path d="M8 12l2 2 4-4" stroke="url(#taskGrad)" strokeWidth="2" className="animate-pulse" />
    <circle cx="6" cy="6" r="1" fill="url(#taskGrad)" className="animate-ping" />
    <circle cx="18" cy="6" r="1" fill="url(#taskGrad)" className="animate-ping" style={{animationDelay: '0.5s'}} />
  </svg>
);

export const CosmicStats = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`cosmic-stats-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="statsGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#00ff88" />
        <stop offset="50%" stopColor="#00aaff" />
        <stop offset="100%" stopColor="#aa00ff" />
      </linearGradient>
    </defs>
    <rect x="3" y="14" width="4" height="7" fill="url(#statsGrad)" className="animate-pulse" />
    <rect x="10" y="10" width="4" height="11" fill="url(#statsGrad)" className="animate-pulse" style={{animationDelay: '0.2s'}} />
    <rect x="17" y="6" width="4" height="15" fill="url(#statsGrad)" className="animate-pulse" style={{animationDelay: '0.4s'}} />
    <circle cx="5" cy="12" r="1" fill="#ffffff" className="animate-bounce" />
    <circle cx="12" cy="8" r="1" fill="#ffffff" className="animate-bounce" style={{animationDelay: '0.2s'}} />
    <circle cx="19" cy="4" r="1" fill="#ffffff" className="animate-bounce" style={{animationDelay: '0.4s'}} />
  </svg>
);

export const CosmicCopy = ({ className = "", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`cosmic-copy-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="copyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ff88" />
        <stop offset="100%" stopColor="#00aaff" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="8" height="10" rx="1" stroke="url(#copyGrad)" strokeWidth="1.5" fill="none" />
    <rect x="6" y="6" width="8" height="8" rx="1" fill="url(#copyGrad)" opacity="0.7" className="animate-pulse" />
  </svg>
);

export const CosmicRefresh = ({ className = "", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`cosmic-refresh-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="refreshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#aa00ff" />
        <stop offset="100%" stopColor="#00ff88" />
      </linearGradient>
    </defs>
    <path 
      d="M1 4v6h6M15 12V6H9M1.5 10a6.5 6.5 0 0 1 13 0M14.5 6a6.5 6.5 0 0 1-13 0" 
      stroke="url(#refreshGrad)" 
      strokeWidth="1.5" 
      className="animate-spin"
    />
  </svg>
);
