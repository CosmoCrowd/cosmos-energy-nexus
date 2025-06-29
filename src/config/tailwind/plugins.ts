
export const customPlugins = [
  // Enhanced bottom navigation icons - увеличены в 2+ раза
  function({ addUtilities }: { addUtilities: (utilities: Record<string, any>) => void }) {
    addUtilities({
      '.bottom-nav-icons': {
        '& svg': {
          'width': '2.5rem',
          'height': '2.5rem',
          '@media (min-width: 640px)': {
            'width': '3rem',
            'height': '3rem',
          },
          '@media (min-width: 768px)': {
            'width': '3.5rem',
            'height': '3.5rem',
          }
        }
      }
    })
  }
];
