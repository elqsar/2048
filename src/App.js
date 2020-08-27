import React from 'react';
import Routes from './Routes';
import { Router } from 'react-router';
import { createBrowserHistory } from 'history';
import { ThemeProvider, theme } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';

import client from './libs/apollo';

const history = createBrowserHistory();

const App = () => {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
