const { themes } = require('./tailwind/theme')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './src/hooks/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/sections/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/modules/**/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class', // or 'media' or 'class'
  important: true,
  theme: {
    extend: {
      colors: { ...themes },
      fontFamily: {
        sans: `"DM Sans", ${defaultTheme.fontFamily.sans.join(',')}`,
        mono: `"IBM Plex Mono", ${defaultTheme.fontFamily.mono.join(',')}`
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        18: '4.5rem',
        22: '5.5rem',
        26: '6.5rem',
        30: '7.5rem',
        50: '12.5rem',
        90: '22.5rem'
      },
      extendedSpacing: {
        // Fractional values
        '1/2': '50%',
        '1/3': '33.333333%',
        '2/3': '66.666667%',
        '1/4': '25%',
        '2/4': '50%',
        '3/4': '75%',
        '9/10': '90%',

        // Bigger values
        100: '25rem',
        120: '30rem',
        128: '32rem',
        140: '35rem',
        160: '40rem',
        180: '45rem',
        192: '48rem',
        200: '50rem',
        240: '60rem',
        256: '64rem',
        280: '70rem',
        320: '80rem',
        360: '90rem',
        400: '100rem',
        480: '120rem'
      },
      height: (theme) => ({
        ...theme('extendedSpacing')
      }),
      minHeight: (theme) => ({
        ...theme('spacing'),
        ...theme('extendedSpacing'),
        screen: '100vh'
      }),
      maxHeight: (theme) => ({
        ...theme('extendedSpacing'),
        none: 'none',
        screen: '100vh'
      }),
      width: (theme) => ({
        ...theme('extendedSpacing')
      }),
      minWidth: (theme) => ({
        ...theme('spacing'),
        ...theme('extendedSpacing'),
        screen: '100vw'
      }),
      maxWidth: (theme) => ({
        ...theme('spacing'),
        ...theme('extendedSpacing'),
        screen: '100vw'
      })
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require('./tailwind/plugins/icons'),
    require('./tailwind/plugins/buttons'),
    require('./tailwind/plugins/paragraphs'),
    require('./tailwind/plugins/titles'),
    require('./tailwind/plugins/progressBar')
  ]
}
