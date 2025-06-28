
export const keyframes = {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' }
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' }
  },
  'neon-pulse': {
    '0%, 100%': { 
      boxShadow: '0 0 5px theme(colors.neon.green), 0 0 10px theme(colors.neon.green), 0 0 15px theme(colors.neon.green)' 
    },
    '50%': { 
      boxShadow: '0 0 10px theme(colors.neon.green), 0 0 20px theme(colors.neon.green), 0 0 30px theme(colors.neon.green)' 
    }
  },
  'particle-float': {
    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)', opacity: '0.7' },
    '50%': { transform: 'translateY(-10px) rotate(180deg)', opacity: '1' }
  },
  'cosmic-rotate': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  },
  'fade-in-up': {
    '0%': { opacity: '0', transform: 'translateY(20px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' }
  },
  'futuristic-glow': {
    '0%, 100%': { 
      boxShadow: '0 0 10px theme(colors.futuristic.primary), 0 0 20px theme(colors.futuristic.primary), 0 0 30px theme(colors.futuristic.primary)',
      borderColor: 'theme(colors.futuristic.primary)'
    },
    '33%': { 
      boxShadow: '0 0 15px theme(colors.futuristic.secondary), 0 0 25px theme(colors.futuristic.secondary), 0 0 35px theme(colors.futuristic.secondary)',
      borderColor: 'theme(colors.futuristic.secondary)'
    },
    '66%': { 
      boxShadow: '0 0 12px theme(colors.futuristic.accent), 0 0 22px theme(colors.futuristic.accent), 0 0 32px theme(colors.futuristic.accent)',
      borderColor: 'theme(colors.futuristic.accent)'
    }
  },
  'hologram-flicker': {
    '0%, 100%': { opacity: '1' },
    '25%': { opacity: '0.8' },
    '50%': { opacity: '0.9' },
    '75%': { opacity: '0.85' }
  },
  'matrix-rain': {
    '0%': { transform: 'translateY(-100%)', opacity: '0' },
    '10%': { opacity: '1' },
    '90%': { opacity: '1' },
    '100%': { transform: 'translateY(100vh)', opacity: '0' }
  },
  'energy-pulse': {
    '0%, 100%': { 
      transform: 'scale(1)',
      filter: 'brightness(1) saturate(1)'
    },
    '50%': { 
      transform: 'scale(1.05)',
      filter: 'brightness(1.2) saturate(1.5)'
    }
  },
  'float': {
    '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
    '33%': { transform: 'translateY(-10px) translateX(5px)' },
    '66%': { transform: 'translateY(-5px) translateX(-5px)' }
  }
};

export const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'neon-pulse': 'neon-pulse 2s ease-in-out infinite',
  'particle-float': 'particle-float 3s ease-in-out infinite',
  'cosmic-rotate': 'cosmic-rotate 20s linear infinite',
  'fade-in-up': 'fade-in-up 0.5s ease-out',
  'futuristic-glow': 'futuristic-glow 3s ease-in-out infinite',
  'hologram-flicker': 'hologram-flicker 2s ease-in-out infinite',
  'matrix-rain': 'matrix-rain 4s linear infinite',
  'energy-pulse': 'energy-pulse 2s ease-in-out infinite',
  'float': 'float 3s ease-in-out infinite'
};
