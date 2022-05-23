import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { useRecoilState } from 'recoil'
import AppRoutes from './routes/routes'
import lightTheme from './config/theme/lightTheme'
import darkTheme from './config/theme/darkTheme'
import { themeState } from './recoil/general'

const App = () => {
  const [theme] = useRecoilState(themeState)

  const themeMapping: any = React.useMemo(
    () => ({
      light: lightTheme,
      dark: darkTheme,
    }),
    []
  )

  return (
    <ThemeProvider theme={theme ? themeMapping[theme] : lightTheme}>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </ThemeProvider>
  )
}

export default App
