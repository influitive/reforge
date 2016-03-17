import { takeLatest } from 'redux-saga';
import { isCancelError } from 'redux-saga';
import * as actionTypes from './action-types';
import { call, fork } from 'redux-saga/effects';

export const wait = (time) => new Promise(resolve => setTimeout(()=>resolve(), time));

export function* _waitAndAlert(action) {
  try {
    yield call(wait, action.type === actionTypes.ADD ? 5000 : 2000);
    console.log('COUNTER1 SAGA FIRED');
  } catch (e) {
    if (!isCancelError(e)) {
      throw e;
    }
  }
}

function* watchIncrement() {
  yield* takeLatest(actionTypes.ADD, _waitAndAlert);
}

function* watchDecrement() {
  yield* takeLatest(actionTypes.DEC, _waitAndAlert);
}

export default function* root() {
  yield [
    fork(watchIncrement),
    fork(watchDecrement)
  ];
}
