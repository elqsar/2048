import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Gameboard from './pages/Gameboard';

const Routes = () => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    import('./libs/fonts');
  }, []);

  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/game">
        <Gameboard />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
};

export default Routes;
