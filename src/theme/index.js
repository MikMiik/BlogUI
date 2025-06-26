import { extendTheme } from '@mui/material/styles'

const theme = extendTheme({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        boxSizing: 'border-box',
      },
      body: {
        fontFamily: '"Roboto", sans-serif',
        margin: 0,
        padding: 0,
        color: '#333',
        lineHeight: 1.6,
      },
      '*, *::before, *::after': {
        boxSizing: 'inherit',
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {},
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: () => ({
          textTransform: 'none',
        }),
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          textDecoration: 'none',
          color: 'inherit',
        },
      },
    },
  },
})

export default theme
