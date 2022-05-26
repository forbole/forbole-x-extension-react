import React from 'react';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import { useRecoilState } from 'recoil';
import { ApolloProvider } from '@apollo/client';
import AppRoutes from './routes/routes';
import lightTheme from './config/theme/lightTheme';
import darkTheme from './config/theme/darkTheme';
import { themeState } from './recoil/general';
import client from './services/graphql/client';

const App = () => {
  const [theme] = useRecoilState(themeState);

  const themeMapping: any = React.useMemo(
    () => ({
      light: lightTheme,
      dark: darkTheme,
    }),
    []
  );

  return (
    <ThemeProvider theme={theme ? themeMapping[theme] : lightTheme}>
      <ApolloProvider client={client}>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
