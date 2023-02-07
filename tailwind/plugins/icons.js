const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ matchUtilities, theme }) {
  matchUtilities(
    {
      icon: (value) => ({
        width: value,
        height: value,
        minWidth: value,
        minHeight: value,
        maxWidth: value,
        maxHeight: value
      })
    },
    { values: theme('spacing') }
  )
})
