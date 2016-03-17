'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var routes = _ref.routes;
  var domains = _ref.domains;
  var element = _ref.element;

  var rootReducer = (0, _createRootReducer2.default)(domains);
  var sagas = combineSagas(domains);

  var createStoreWithMiddleware = (0, _redux.compose)((0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxSaga2.default.apply(undefined, _toConsumableArray(sagas)), (0, _reactRouterRedux.routerMiddleware)(_reactRouter.browserHistory)), process.env.NODE_ENV && window.devToolsExtension ? window.devToolsExtension() : function (f) {
    return f;
  })(_redux.createStore);

  var store = createStoreWithMiddleware(rootReducer);
  var history = (0, _reactRouterRedux.syncHistoryWithStore)(_reactRouter.browserHistory, store);

  var App = function App() {
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouter.Router,
        { history: history },
        routes
      )
    );
  };

  return {
    render: function render() {
      _reactDom2.default.render(_react2.default.createElement(App, null), element || document.getElementById('app'));
    }
  };
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactRouter = require('react-router');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reduxSaga = require('redux-saga');

var _reduxSaga2 = _interopRequireDefault(_reduxSaga);

var _reactRouterRedux = require('react-router-redux');

var _createRootReducer = require('./create-root-reducer');

var _createRootReducer2 = _interopRequireDefault(_createRootReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // Combine sags, rootReducer and middleware to create the final store

var combineSagas = function combineSagas(modules) {
  return Object.keys(modules).map(function (moduleKey) {
    return modules[moduleKey].sagas || {};
  });
};