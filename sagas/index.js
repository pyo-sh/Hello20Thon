import { all, call } from 'redux-saga/effects';
import youtube from './youtube';
import user from './user';

export default function* rootSaga() {
    yield all([
        call(youtube),
        call(user)
    ])
}