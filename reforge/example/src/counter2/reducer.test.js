import test from 'tape-catch';
import deepFreeze from 'deep-freeze';

import * as actions from './actions';
import reducer from './reducer';

test('should return initial state of 0', t => {
  t.plan(1);
  t.equal(reducer(undefined, 'FAKE_ACTION'), 0);
});

test('add action should increment the count', t => {
  let state;
  const action = deepFreeze(actions.add());

  t.plan(2);
  state = reducer(1, action);
  t.equal(state, 2, 'state should increase from 1 to 2');

  state = reducer(state, action);
  t.equal(state, 3, 'state should increase from 2 to 3');
});

test('dec action should decrement the count', t => {
  let state;
  const action = deepFreeze(actions.dec());

  t.plan(2);
  state = reducer(1, action);
  t.equal(state, 0, 'state should decrease from 1 to 0');

  state = reducer(state, action);
  t.equal(state, -1, 'state should decrease from 0 to -1');
});
