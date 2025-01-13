/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        neutral: {
          10: '#FDFDFD',
          20: '#F8F8F8',
          30: '#E6E6E6',
          40: '#D5D5D5',
          50: '#B1B1B1',
          60: '#909090',
          70: '#6C6C6C',
          80: '#464646',
          90: '#222222',
          100: '#000000',
        },
        brand: {
          yellow: '#FFFC62',
        },
        success: {
          10: '#E8FCF1',
          20: '#A5E1BF',
          40: '#419E6A',
          60: '#00632B',
          80: '#00401C',
          100: '#002611',
        },
        info: {
          10: '#D3E1FE',
          20: '#7EA5F8',
          40: '#4D82F3',
          60: '#2563EB',
          80: '#0037B3',
          100: '#002987',
        },
        warning: {
          10: '#FFF5D5',
          20: '#FFDE81',
          40: '#EFB008',
          60: '#976400',
          80: '#724B00',
          100: '#4D2900',
        },
        error: {
          10: '#FFEBEB',
          20: '#FC9595',
          40: '#D83232',
          60: '#B01212',
          80: '#8C0000',
          100: '#660000',
        },
      },
      backgroundImage: {
        'message-gradient': 'linear-gradient(to bottom, #FDFDFD 46.75%, #FFFED9 100%)',
      },
      boxShadow: {
        dropdown: '0px 4px 24px 0px rgba(33, 33, 33, 0.60)',
      },
      screens: {
        'h-sm': { raw: '(max-height: 600px)' },
      },
    },
  },
  plugins: [
    function ({ addBase, theme }) {
      const colors = theme('colors')
      const cssVariables = Object.keys(colors).reduce((acc, key) => {
        const value = colors[key]
        if (typeof value === 'string') {
          acc[`--color-${key}`] = value
        } else {
          Object.keys(value).forEach((subKey) => {
            acc[`--color-${key}-${subKey}`] = value[subKey]
          })
        }
        return acc
      }, {})

      addBase({
        ':root': cssVariables,
      })
    },
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
