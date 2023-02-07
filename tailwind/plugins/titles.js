const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.title-1': {
      fontSize: '80px',
      fontWeight: '800',
      lineHeight: '96px',
      letterSpacing: '-1.3px'
    },
    '.title-2': {
      fontSize: '72px',
      lineHeight: '80px',
      fontWeight: '800',
      letterSpacing: '-1.3px'
    },
    '.title-3': {
      fontSize: '64px',
      lineHeight: '64px',
      fontWeight: '700',
      letterSpacing: '0px'
    },
    '.title-4': {
      fontSize: '44px',
      lineHeight: '52px',
      fontWeight: '600',
      letterSpacing: '0px'
    },
    '.title-5': {
      fontSize: '40px',
      lineHeight: '48px',
      fontWeight: '600',
      letterSpacing: '-0.4px'
    },
    '.title-6': {
      fontSize: '36px',
      lineHeight: '48px',
      fontWeight: '600',
      letterSpacing: '-0.4px'
    },
    '.title-7': {
      fontSize: '32px',
      lineHeight: '44px',
      fontWeight: '600',
      letterSpacing: '-0.4px'
    },
    '.title-8': {
      fontSize: '28px',
      lineHeight: '44px',
      fontWeight: '600',
      letterSpacing: '-0.4px'
    }

  })
})
