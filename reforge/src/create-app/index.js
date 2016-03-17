// Combine sags, rootReducer and middleware to create the final store

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createRootReducer from './create-root-reducer';

const combineSagas = modules => Object.keys(modules).map(moduleKey => modules[moduleKey].sagas || {});

export default function({ routes, domains, element }) {
  const rootReducer = createRootReducer(domains);
  const sagas = combineSagas(domains);

  const createStoreWithMiddleware = compose(
    applyMiddleware(
      thunk,
      createSagaMiddleware(...sagas),
      routerMiddleware(browserHistory),
    ),
    (process.env.NODE_ENV && window.devToolsExtension) ? window.devToolsExtension() : f => f
  )(createStore);

  const store = createStoreWithMiddleware(rootReducer);
  const history = syncHistoryWithStore(browserHistory, store);

  const App = () => (
    <Provider store={store}>
      <Router history={history}>
        {routes}
      </Router>
    </Provider>
  );

  return {
    render() {
      ReactDOM.render(<App />, element || document.getElementById('app'));
    }
  };
}
