import React from 'react';
import Routes from './Routes';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider, theme } from '@chakra-ui/core';
import { ApolloProvider } from '@apollo/client';

import client from './libs/apollo';
import { UserContextProvider } from './libs/authentication';

const history = createBrowserHistory();

const App = () => {
  return (
    <BrowserRouter history={history}>
      <ThemeProvider theme={theme}>
        <ApolloProvider client={client}>
          <UserContextProvider>
            <Routes />
          </UserContextProvider>
        </ApolloProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
