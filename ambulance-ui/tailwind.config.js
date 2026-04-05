/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-success': '0 0 20px rgba(34, 197, 94, 0.4)',
        'glow-error': '0 0 20px rgba(239, 68, 68, 0.4)',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan-line': 'scan 4s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(59, 130, 246, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { opacity: '0.5' },
          '100%': { transform: 'translateY(400%)', opacity: '0' },
        }
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        dark: {
          "primary": "#3b82f6",
          "secondary": "#a855f7",
          "accent": "#06b6d4",
          "neutral": "#020617",
          "base-100": "#020617",
          "base-200": "#0f172a",
          "base-300": "#1e293b",
          "info": "#3b82f6",
          "success": "#22c55e",
          "warning": "#f59e0b",
          "error": "#ef4444",
          "--rounded-box": "1rem",
          "--rounded-btn": "0.5rem",
          "--rounded-badge": "2rem",
          "--animation-btn": "0.3s",
          "--animation-input": "0.2s",
          "--btn-text-case": "uppercase",
          "--navbar-padding": "1rem",
        },
      },
    ],
  },
}
