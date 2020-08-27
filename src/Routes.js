import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';

const Routes = () => {
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    import('./libs/fonts');
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default Routes;
