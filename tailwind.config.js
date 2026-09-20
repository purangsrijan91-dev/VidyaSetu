/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: {
        edu: {
          base: '#060B18',
          card: '#0F172A',
          cardElevated: '#1E293B',
          border: '#334155',
          amber: '#F59E0B',
          amberLight: '#FDE68A',
          green: '#10B981',
          greenLight: '#A7F3D0',
          blue: '#38BDF8',
          blueDark: '#0369A1',
          red: '#EF4444',
          purple: '#A855F7',
          textPrimary: '#F8FAFC',
          textMuted: '#94A3B8'
        }
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
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
        'teacher-sm': ['1.05rem', { lineHeight: '1.65rem' }],
        'teacher-base': ['1.25rem', { lineHeight: '1.9rem' }],
        'teacher-title': ['1.75rem', { lineHeight: '2.25rem' }]
      },
      minHeight: { 'touch': '64px', 'touch-sm': '56px' },
      minWidth: { 'touch': '64px' }
    }
  },
  plugins: [],
};
