import { all, call } from 'redux-saga/effects';
import youtube from './youtube';
export default function* rootSaga() {
    yield all([
        call(youtube),
    ])
}