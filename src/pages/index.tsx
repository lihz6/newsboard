import React from 'react';
import {
  BrowserRouter as Router,
  // Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
// import { createHashHistory } from 'history';

import { Layout } from 'antd';
import { ContextState, Userflag } from '_base/Context';
import Init from './Init';
import Sign from './Sign';
import Head from './Head';
import Demo from './Demo';

export default function renderRouter({ userflag }: ContextState) {
  switch (userflag) {
    case Userflag.LOADING:
      return <Init />;
    case Userflag.UNKNOWN:
      return <Sign />;
    default:
      return (
        // <Router history={createHashHistory()}>
        <Router basename={ROUTER_BASENAME}>
          <Layout>
            <Route component={Head} />
            <Switch>
              <Route path={Demo.path} component={Demo} />
              <Redirect to={Demo.pathOf({ page: 12 })} />
            </Switch>
          </Layout>
        </Router>
      );
  }
}
