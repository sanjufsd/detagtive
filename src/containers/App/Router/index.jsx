import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainWrapper from '../MainWrapper';
import LogIn from '../../Account/LogIn/index';
import WrappedRoutes from './WrappedRoutes';

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route path="/log_in" component={LogIn} />
        <Route  path="/profiles" component={WrappedRoutes} />
        <Route  path="/" component={LogIn} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
