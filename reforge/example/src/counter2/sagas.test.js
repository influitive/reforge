import test from 'tape-catch';

import { add, dec } from './actions';
import { _waitAndAlert, wait } from './sagas';

import { call } from 'redux-saga/effects';

test('watchIncrementAndAlert saga test', (t) => {
  const generator = _waitAndAlert(dec());

  t.plan(1);
  t.deepEqual(
    generator.next().value,
    call(wait, 2000),
    'decrement action should wait 2 seconds'
  );
});

test('watchIncrementAndAlert saga test', (t) => {
  const generator = _waitAndAlert(add());

  t.plan(1);
  t.deepEqual(
    generator.next().value,
    call(wait, 5000),
    'increment action should wait 5 seconds'
  );
});
