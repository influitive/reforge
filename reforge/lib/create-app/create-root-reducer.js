'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; // Combine all domains reducers under their name constant as key
// adds router reducer

var _redux = require('redux');

var _reactRouterRedux = require('react-router-redux');

exports.default = function (domains) {
  var domainReducers = domains.reduce(function (object, domain) {
    object[domain.constants.NAME] = domain.reducer;
    return object;
  }, {});

  return (0, _redux.combineReducers)(_extends({}, domainReducers, {
    routing: _reactRouterRedux.routerReducer
  }));
};