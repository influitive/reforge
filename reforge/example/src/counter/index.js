import { connect } from 'react-redux';
import Counter from './components/counter';

import reducer from './reducer';
import sagas from './sagas';
import * as selectors from './selectors';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as constants from './constants';

export const container = connect(
  selectors.count,
  actions
)(Counter);

export default { sagas, constants, reducer, actions, actionTypes, selectors };

