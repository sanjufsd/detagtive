import React from 'react';
import { Route } from 'react-router-dom';
import Layout from '../../../Layout/index';
import Profile from '../../../Account/AllProfile/index';

export default () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/profiles" component={Profile} />
     </div>
   </div>
);
