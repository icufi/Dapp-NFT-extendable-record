import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ReactGA from 'react-ga';

import MainNavigation from './components/navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import Main from './pages/Main';
import Footer from './components/navigation/Footer';
import ModeMaker from './pages/ModeMaker';

import theme from './Styles';

const App = () => {
  const {
    checkWalletIsConnected,
    provider,
    detect,
    currentAccount,
    BTTokenCheck,
    chainId,
  } = useAuth();

  detect();

  useEffect(() => {
    ReactGA.initialize('UA-222183592-2');
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  let routes;

  if (provider.selectedAddress) {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Main />
        </Route>
        <Route path='/mode' exact>
          <ModeMaker />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/mode' exact>
          <ModeMaker />
        </Route>
        <Route path='/' exact>
          <Main />
        </Route>
        <Redirect to='/' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        checkWalletIsConnected,
        provider,
        detect,
        currentAccount,
        BTTokenCheck,
        chainId,
      }}
    >
      <ThemeProvider theme={theme}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
          <Footer />
        </Router>
      </ThemeProvider>
    </AuthContext.Provider>
  );
};

export default App;
