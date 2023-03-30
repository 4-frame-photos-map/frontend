/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        Pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        display: '2.25rem',
        headline1: '1.75rem',
        headline2: '1.5rem',
        title1: '1.25rem',
        title2: '1.063rem',
        body1: '1rem',
        body2: '0.938rem',
        label1: '1rem',
        label2: '0.875rem',
        caption1: '0.75rem',
        caption2: '0.688rem',
      },
      colors: {
        white: '#FFFFFF',
        black: '#000000',
        text: {
          strong: '#000000',
          normal: '#171717',
          alternative: '#8A8A8A',
          assitive: '#C4C4C4',
          disable: '#DCDCDC',
        },
        bg: {
          primary: '#F2F2F7',
          secondary: '#FFFFFF',
          tertiary: '#F2F2F7',
        },
        line: {
          normal: '#E1E2E4',
          alternative: '#F4F4F5',
          disable: '#CCCCCC',
        },
        fill: {
          normal: '#F4F4F5',
          strong: '#DDDEE3',
          alternative: '#ECECF1',
          disable: '#CCCCCC',
        },
        interaction: {
          hover: 'rgba(0, 0, 0, 0.05)',
          pressed: 'rgba(51, 51, 51, 0.1)',
        },
        status: {
          error: '#FC5A2F',
        },
        brand: {
          purple: '#9D7FF2',
          yellow: '#FCF12F',
          green: '#29DC1E',
          pink: '#EA6FDE',
        },
        primary: {
          normal: '#333333',
          pressed: '#242424',
          disable: 'rgba(51, 51, 51, 0.4)',
        },
      },
      boxShadow: {
        category:
          '2px 4px 12px rgba(0, 0, 0, 0.1), 0px 0px 4px rgba(0, 0, 0, 0.1)',
        tracker: '0px 4px 4px rgba(0, 0, 0, 0.16)',
      },
    },
  },
  plugins: [],
};
