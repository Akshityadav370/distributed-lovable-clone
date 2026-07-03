const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');

module.exports = {
  darkMode: ['class'],
  content: [
    join(__dirname, 'src/**/*.{ts,tsx,html}'),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        ink: 'rgb(var(--ink) / <alpha-value>)',
        canvas: 'rgb(var(--canvas) / <alpha-value>)',
        page: 'rgb(var(--page) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        'border-subtle': 'rgb(var(--border-subtle) / <alpha-value>)',
        'muted-fg': 'rgb(var(--muted-fg) / <alpha-value>)',
        'faint-fg': 'rgb(var(--faint-fg) / <alpha-value>)',
        'chat-bubble': 'rgb(var(--chat-bubble) / <alpha-value>)',
        'action-card': 'rgb(var(--action-card) / <alpha-value>)',
        'code-surface': 'rgb(var(--code-surface) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-border': 'rgb(var(--accent-border) / <alpha-value>)',
        'accent-active': 'rgb(var(--accent-active) / <alpha-value>)',
        success: 'rgb(var(--success) / <alpha-value>)',
        avatar: 'rgb(var(--avatar) / <alpha-value>)',
        'disabled-fill': 'rgb(var(--disabled-fill) / <alpha-value>)',
        card: 'rgb(var(--canvas) / <alpha-value>)',
      },
      borderRadius: {
        card: '16px',
        canvas: '24px',
      },
    },
  },
  plugins: [],
};
