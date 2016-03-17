import { connect } from 'react-redux';
import {{ properCase name }} from './components/{{ dashCase name }}';

import reducer from './reducer';
import sagas from './sagas';
import * as selectors from './selectors';
import * as actions from './actions';
import * as actionTypes from './action-types';
import * as constants from './constants';

const container = connect(
  null, // <- use selectors here!! (if you need!)
  actions
)({{ properCase name }});

export default { sagas, container, constants, reducer, actions, actionTypes, selectors };

