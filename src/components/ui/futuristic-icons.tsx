
import React from 'react';

// Футуристичные иконки с продвинутыми анимациями
export const FuturisticEnergy = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`futuristic-energy-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="energyGradFuture" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="33%" stopColor="#0080ff" />
        <stop offset="66%" stopColor="#8000ff" />
        <stop offset="100%" stopColor="#ff0080" />
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge> 
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path 
      d="M12 2L7 12h4v8l5-10h-4V2z" 
      fill="url(#energyGradFuture)"
      filter="url(#glow)"
      className="animate-pulse"
    />
    <circle cx="12" cy="12" r="11" stroke="url(#energyGradFuture)" strokeWidth="0.5" fill="none" opacity="0.6" className="animate-spin" />
    <circle cx="12" cy="12" r="8" stroke="url(#energyGradFuture)" strokeWidth="0.3" fill="none" opacity="0.4" className="animate-spin" style={{animationDirection: 'reverse'}} />
  </svg>
);

export const FuturisticWallet = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`futuristic-wallet-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="walletGradFuture" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="50%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#8000ff" />
      </linearGradient>
    </defs>
    <rect x="2" y="6" width="20" height="12" rx="4" fill="url(#walletGradFuture)" opacity="0.8" />
    <rect x="18" y="9" width="4" height="6" rx="2" fill="#ffffff" className="animate-pulse" />
    <path d="M6 10h8M6 14h6" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" className="animate-pulse" />
    <circle cx="12" cy="2" r="1" fill="url(#walletGradFuture)" className="animate-bounce" />
    <circle cx="12" cy="22" r="1" fill="url(#walletGradFuture)" className="animate-bounce" style={{animationDelay: '0.5s'}} />
  </svg>
);

export const FuturisticTeam = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`futuristic-team-icon ${className}`}
    fill="none"
  >
    <defs>
      <radialGradient id="teamGradFuture" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#ff0080" />
        <stop offset="50%" stopColor="#8000ff" />
        <stop offset="100%" stopColor="#00ffff" />
      </radialGradient>
    </defs>
    <circle cx="9" cy="8" r="3" fill="url(#teamGradFuture)" className="animate-pulse" />
    <circle cx="15" cy="8" r="3" fill="url(#teamGradFuture)" className="animate-pulse" style={{animationDelay: '0.2s'}} />
    <path d="M3 18v-1a6 6 0 0 1 6-6h2a6 6 0 0 1 6 6v1" stroke="url(#teamGradFuture)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '0.4s'}} />
    <path d="M13 18v-1a6 6 0 0 1 6-6h2" stroke="url(#teamGradFuture)" strokeWidth="2" fill="none" className="animate-pulse" style={{animationDelay: '0.6s'}} />
    <polygon points="12,2 13,5 16,5 13.5,7.5 14.5,10.5 12,8.5 9.5,10.5 10.5,7.5 8,5 11,5" fill="url(#teamGradFuture)" opacity="0.7" className="animate-spin" />
  </svg>
);

export const FuturisticTasks = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`futuristic-tasks-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="taskGradFuture" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#ff0080" />
        <stop offset="33%" stopColor="#8000ff" />
        <stop offset="66%" stopColor="#0080ff" />
        <stop offset="100%" stopColor="#00ffff" />
      </linearGradient>
    </defs>
    <rect x="3" y="3" width="18" height="18" rx="3" stroke="url(#taskGradFuture)" strokeWidth="2" fill="none" />
    <path d="M8 12l2 2 4-4" stroke="url(#taskGradFuture)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" />
    <rect x="6" y="6" width="2" height="2" rx="1" fill="url(#taskGradFuture)" className="animate-ping" />
    <rect x="16" y="6" width="2" height="2" rx="1" fill="url(#taskGradFuture)" className="animate-ping" style={{animationDelay: '0.3s'}} />
    <rect x="6" y="16" width="2" height="2" rx="1" fill="url(#taskGradFuture)" className="animate-ping" style={{animationDelay: '0.6s'}} />
    <rect x="16" y="16" width="2" height="2" rx="1" fill="url(#taskGradFuture)" className="animate-ping" style={{animationDelay: '0.9s'}} />
  </svg>
);

export const FuturisticStats = ({ className = "", size = 24 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    className={`futuristic-stats-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="statsGradFuture" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="33%" stopColor="#0080ff" />
        <stop offset="66%" stopColor="#8000ff" />
        <stop offset="100%" stopColor="#ff0080" />
      </linearGradient>
    </defs>
    <rect x="3" y="14" width="4" height="7" rx="1" fill="url(#statsGradFuture)" className="animate-pulse" />
    <rect x="10" y="10" width="4" height="11" rx="1" fill="url(#statsGradFuture)" className="animate-pulse" style={{animationDelay: '0.2s'}} />
    <rect x="17" y="6" width="4" height="15" rx="1" fill="url(#statsGradFuture)" className="animate-pulse" style={{animationDelay: '0.4s'}} />
    <circle cx="5" cy="12" r="1.5" fill="#ffffff" className="animate-bounce" />
    <circle cx="12" cy="8" r="1.5" fill="#ffffff" className="animate-bounce" style={{animationDelay: '0.2s'}} />
    <circle cx="19" cy="4" r="1.5" fill="#ffffff" className="animate-bounce" style={{animationDelay: '0.4s'}} />
    <path d="M5 12L12 8L19 4" stroke="#ffffff" strokeWidth="1" opacity="0.5" className="animate-pulse" />
  </svg>
);

export const FuturisticCopy = ({ className = "", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`futuristic-copy-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="copyGradFuture" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#00ffff" />
        <stop offset="100%" stopColor="#8000ff" />
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="8" height="10" rx="1.5" stroke="url(#copyGradFuture)" strokeWidth="1.5" fill="none" />
    <rect x="6" y="6" width="8" height="8" rx="1.5" fill="url(#copyGradFuture)" opacity="0.8" className="animate-pulse" />
    <circle cx="4" cy="4" r="0.5" fill="url(#copyGradFuture)" className="animate-ping" />
  </svg>
);

export const FuturisticRefresh = ({ className = "", size = 16 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 16 16" 
    className={`futuristic-refresh-icon ${className}`}
    fill="none"
  >
    <defs>
      <linearGradient id="refreshGradFuture" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff0080" />
        <stop offset="50%" stopColor="#8000ff" />
        <stop offset="100%" stopColor="#00ffff" />
      </linearGradient>
    </defs>
    <path 
      d="M1 4v6h6M15 12V6H9M1.5 10a6.5 6.5 0 0 1 13 0M14.5 6a6.5 6.5 0 0 1-13 0" 
      stroke="url(#refreshGradFuture)" 
      strokeWidth="1.5" 
      className="animate-spin"
    />
    <circle cx="8" cy="8" r="1" fill="url(#refreshGradFuture)" className="animate-pulse" />
  </svg>
);
