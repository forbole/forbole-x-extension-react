import '../src/assets/locales/i18n';
import { ThemeProvider } from '@mui/material'
import darkTheme from '../src/config/theme/darkTheme'

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}


export const decorators = [
  (Story)=> (
    <ThemeProvider theme={darkTheme}>
      <div
      style={{
        width: '600px',
        height: '800px'
      }}>
        <Story/>

      </div>
    </ThemeProvider>
  )
]
