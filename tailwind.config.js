const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'media',
  theme: {
    colors: {
      orange: colors.orange,
      yellow: colors.amber, // Agregar este color
      gray: colors.gray,
      slate: colors.slate,
      white: colors.white,
      red: colors.red, // Agrega esta línea para el rojo
      brightRed: '#EA1313',  // Este es un rojo brillante e intenso.
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px'
      },
      // fontFamily: {
      //   'sans': ['ui-sans-serif', 'system-ui'],
      //   'serif': ['ui-serif', 'Georgia'],
      //   'mono': ['ui-monospace', 'SFMono-Regular'],
      //   'montserrat': ['Montserrat'],
      //  },
      extend: {
        backgroundImage: theme => ({
         'hero': "url('/src/assets/comida.jpg')",
         'action': "url('/src/assets/action.png')",
        })
      },
  },
  variants: {
    extend: {
      translate: ['hover'],
      display: ['group-hover'],
      transform: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionProperty: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionTimingFunction: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      transitionDuration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    },
  },
  plugins: [],
}
