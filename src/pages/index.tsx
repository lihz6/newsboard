import React from 'react';
import {
  // BrowserRouter as Router,
  Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { createHashHistory } from 'history';

import { Layout } from 'antd';
import { ContextState, AppStatus } from '_base/Context';
import Init from './Init';
import Sign from './Sign';
import Head from './Head';
import List from './List';
import Edit from './Edit';

export default function renderRouter({ appStatus }: ContextState) {
  switch (appStatus) {
    case AppStatus.LOADING:
      return <Init />;
    case AppStatus.UNKNOWN:
      return <Sign />;
    default:
      return (
        // <Router basename={ROUTER_BASENAME}>
        <Router history={createHashHistory()}>
          <Layout
            style={{
              height: '100vh',
            }}>
            <Route component={Head} />
            <Layout className="-glob-content">
              <Switch>
                <Route path={List.path} component={List} />
                <Route path={Edit.path} component={Edit} />
                <Redirect to={List.pathOf({ page: 1 })} />
              </Switch>
            </Layout>
          </Layout>
        </Router>
      );
  }
}
