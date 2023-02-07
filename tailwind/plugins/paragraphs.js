const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents, theme }) {
  addComponents({
    '.paragraph-1': {
      fontSize: '18px',
      lineHeight: '32px'
    },
    '.paragraph-2': {
      fontSize: '16px',
      lineHeight: '28px'
    },
    '.paragraph-3': {
      fontSize: '16px',
      lineHeight: '28px',
      fontWeght: '600'
    },
    '.paragraph-4': {
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: '0.2px'
    },
    '.paragraph-5': {
      fontSize: '12px',
      lineHeight: '20px',
      letterSpacing: '0.1px'
    },
    '.paragraph-6': {
      fontSize: '12px',
      fontWeght: '600',
      lineHeight: '20px',
      letterSpacing: '0.1px'
    }
  })
})
