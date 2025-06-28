import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				neon: {
					green: '#00ff88',
					blue: '#00aaff',
					purple: '#aa00ff',
					pink: '#ff0088',
					cyan: '#00ffff'
				},
				cosmic: {
					dark: '#0a0a0f',
					darker: '#050508',
					gray: '#1a1a2e',
					light: '#16213e'
				},
				futuristic: {
					primary: '#00ffff',
					secondary: '#8000ff',
					accent: '#ff0080',
					glow: 'rgba(0, 255, 255, 0.5)'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
			},
			animation: {
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
			},
			backgroundImage: {
				'cosmic-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
				'neon-gradient': 'linear-gradient(90deg, #00ff88 0%, #00aaff 50%, #aa00ff 100%)',
				'futuristic-gradient': 'linear-gradient(135deg, #00ffff 0%, #8000ff 50%, #ff0080 100%)',
				'hologram-gradient': 'linear-gradient(45deg, rgba(0,255,255,0.1) 0%, rgba(128,0,255,0.1) 50%, rgba(255,0,128,0.1) 100%)'
			}
		}
	},
	plugins: [
		require("tailwindcss-animate"),
		// Enhanced bottom navigation icons
		function({ addUtilities }) {
			addUtilities({
				'.bottom-nav-icons': {
					'& svg': {
						'width': '2rem',
						'height': '2rem',
						'@media (min-width: 640px)': {
							'width': '2.5rem',
							'height': '2.5rem',
						}
					}
				}
			})
		}
	],
} satisfies Config;
