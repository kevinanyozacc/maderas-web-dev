const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ addComponents, theme }) {
  const colors = theme('colors')

  const exclude = new Set([
    'white',
    'black',
    'inherit',
    'current',
    'transparent'
  ])
  const colorsKeys = Object.keys(colors).filter((key) => !exclude.has(key))

  const circlesBars = {}

  for (const key of colorsKeys) {
    circlesBars[`.circle-progress-${key}`] = {
      stroke: colors[key]['600'],
      transition: 'stroke 250ms ease-out',
      '&:hover': { stroke: colors[key]['500'] }
    }
  }

  addComponents({
    '.circle-progress': {
      margin: '1em',
      width: '114px',
      height: '114px',
      '& circle:first-child': {
        fill: 'none',
        strokeWidth: '10px',
        stroke: colors.slate[200]
      },
      '& circle:last-child': {
        fill: 'none',
        strokeWidth: '10px',
        strokeLinecap: 'round',
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)'
      }
    },
    '.dark .circle-progress': {
      margin: '1em',
      width: '114px',
      height: '114px',
      '& circle:first-child': {
        fill: 'none',
        strokeWidth: '10px',
        stroke: colors.slate[900]
      },
      '& circle:last-child': {
        fill: 'none',
        strokeWidth: '10px',
        strokeLinecap: 'round',
        transformOrigin: '50% 50%',
        transform: 'rotate(-90deg)'
      }
    },
    ...circlesBars
  })
})
