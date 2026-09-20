/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        edu: {
          base: '#0B0F19',
          surface: '#111827',
          card: '#161F30',
          cardElevated: '#1E293B',
          border: '#243048',
          borderLight: '#334155',
          amber: '#F59E0B',
          amberLight: '#FDE68A',
          amberDark: '#B45309',
          green: '#10B981',
          greenLight: '#A7F3D0',
          greenDark: '#047857',
          blue: '#38BDF8',
          blueDark: '#0284C7',
          red: '#EF4444',
          purple: '#A855F7',
          textPrimary: '#F8FAFC',
          textSecondary: '#CBD5E1',
          textMuted: '#94A3B8'
        }
      },
      boxShadow: {
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.25)',
        'glow-green': '0 0 25px -5px rgba(16, 185, 129, 0.25)',
        'glow-blue': '0 0 25px -5px rgba(56, 189, 248, 0.25)',
        'card-clean': '0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.2)'
      },
      animation: {
        'marquee': 'marquee 28s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'soundwave': 'soundwave 1.2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s infinite'
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        soundwave: {
          '0%': { height: '8px' },
          '50%': { height: '36px' },
          '100%': { height: '14px' }
        },
        shimmer: {
          '0%': { opacity: '0.6' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.6' }
        }
      },
      fontSize: {
        'teacher-xs': ['0.875rem', { lineHeight: '1.25rem' }],
        'teacher-sm': ['1rem', { lineHeight: '1.5rem' }],
        'teacher-base': ['1.125rem', { lineHeight: '1.75rem' }],
        'teacher-title': ['1.5rem', { lineHeight: '2rem' }],
        'teacher-hero': ['2rem', { lineHeight: '2.5rem' }]
      },
      minHeight: { 'touch': '64px', 'touch-sm': '56px' },
      minWidth: { 'touch': '64px' }
    }
  },
  plugins: [],
};
