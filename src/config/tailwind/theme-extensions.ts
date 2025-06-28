
import { colors } from './colors';
import { keyframes, animation } from './animations';

export const themeExtensions = {
  colors,
  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)'
  },
  keyframes,
  animation,
  backgroundImage: {
    'cosmic-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
    'neon-gradient': 'linear-gradient(90deg, #00ff88 0%, #00aaff 50%, #aa00ff 100%)',
    'futuristic-gradient': 'linear-gradient(135deg, #00ffff 0%, #8000ff 50%, #ff0080 100%)',
    'hologram-gradient': 'linear-gradient(45deg, rgba(0,255,255,0.1) 0%, rgba(128,0,255,0.1) 50%, rgba(255,0,128,0.1) 100%)'
  }
};
