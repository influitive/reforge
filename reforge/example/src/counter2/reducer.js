import * as actionTypes from './action-types';

export default (state = 0, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return state + 1;
    case actionTypes.DEC:
      return state - 1;
    default:
      return state;
  }
};
