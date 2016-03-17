import React from 'react';
import { Route, IndexRoute } from 'react-router';

// Outside of this library, use 'refore' obviously
import { createApp } from '../../lib/reforge';

import Counter1Domain, { container as Counter1 } from './counter';
import Counter2Domain, { container as Counter2 } from './counter2';

import NavBar from './common/components/nav-bar';
import Combined from './combined-view';

const paths = [
  { text: 'Counter1', path: '/counter1' },
  { text: 'Counter2', path: '/counter2' }
];

const App = ({ children, location }) => (
  <div>
    <NavBar pathname={location.pathname}
      paths={paths}/>
    {children}
    <Combined />
  </div>
);

const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Counter1}/>
    <Route path="counter1" component={Counter1}/>
    <Route path="counter2" component={Counter2}/>
  </Route>
);
const domains = [Counter1Domain, Counter2Domain];

export default createApp({ routes, domains }).render();
