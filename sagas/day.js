import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import {
    ADD_WEIGHT_REQUEST,
    AddWeightSuccess,
    AddWeightFailure
} from '../reducers/day';

function* addWeight(action) {
    try{
        console.log(action.weight)
        yield put(AddWeightSuccess(action.date, action.weight));
    }catch(error){
        console.error(error);
        yield put(AddWeightFailure(error));
    }
}

function* watchAddWeight() {
    yield takeLatest(ADD_WEIGHT_REQUEST, addWeight);
}

export default function* daySaga() {
    yield all([
        fork(watchAddWeight)
    ]);
};