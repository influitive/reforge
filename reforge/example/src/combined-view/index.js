import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import Counter1 from 'src/counter';
import Counter2 from 'src/counter2';


const Combined = ({ count }) => (
  <div>Total: {count}</div>
);

const totalSelector = createSelector(
  Counter1.selectors.count,
  Counter2.selectors.count,
  ({ count: count1 }, { count: count2 }) => ({ count: count1 + count2 })
);

export default connect(
  totalSelector
)(Combined);

