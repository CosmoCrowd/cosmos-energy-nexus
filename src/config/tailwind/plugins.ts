
export const customPlugins = [
  // Enhanced bottom navigation icons - увеличены в 2+ раза
  function({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
    addUtilities({
      '.bottom-nav-icons': {
        '& svg': {
          'width': '3.5rem',
          'height': '3.5rem',
          '@media (min-width: 640px)': {
            'width': '4rem',
            'height': '4rem',
          },
          '@media (min-width: 768px)': {
            'width': '4.5rem',
            'height': '4.5rem',
          }
        }
      }
    })
  }
];
