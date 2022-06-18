import '../src/assets/locales/i18n'
import { ThemeProvider } from '@mui/material'
import darkTheme from '../src/config/theme/darkTheme'
import { RecoilRoot } from 'recoil'
import { HashRouter } from 'react-router-dom'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <HashRouter>
      <RecoilRoot>
        <ThemeProvider theme={darkTheme}>
          <div
            style={{
              width: '600px',
              height: '800px',
            }}>
            <Story />

          </div>
        </ThemeProvider>
      </RecoilRoot>
    </HashRouter>
  ),
]
