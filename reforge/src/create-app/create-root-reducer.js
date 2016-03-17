// Combine all domains reducers under their name constant as key
// adds router reducer

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

export default (domains) => {
  const domainReducers = domains.reduce((object, domain) => {
    object[domain.constants.NAME] = domain.reducer;
    return object;
  }, {});

  return combineReducers({
    ...domainReducers,
    routing: routerReducer
  });
};
