import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import {
    ADD_WEIGHT_REQUEST,
    AddWeightSuccess,
    AddWeightFailure,
    ADD_MEMO_REQUEST,
    AddMemoSuccess,
    AddMemoFailure,
    DeleteMemoSuccess,
    DELETE_MEMO_REQUEST,
    DeleteMemoFailure,
    UPDATE_MEMO_REQUEST,
    UpdateMemoFailure,
    UpdateMemoSuccess
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

function* addMemo(action) {
    try{
        yield put(AddMemoSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(AddMemoFailure(error));
    }
}

function* watchAddMemo() {
    yield takeLatest(ADD_MEMO_REQUEST, addMemo);
}

function* deleteMemo(action) {
    try{
        yield put(DeleteMemoSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(DeleteMemoFailure(error));
    }
}

function* watchDeleteMemo() {
    yield takeLatest(DELETE_MEMO_REQUEST, deleteMemo);
}

function* updateMemo(action) {
    try{
        yield put(UpdateMemoSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(UpdateMemoFailure(error));
    }
}

function* watchUpdateMemo() {
    yield takeLatest(UPDATE_MEMO_REQUEST, updateMemo);
}


export default function* daySaga() {
    yield all([
        fork(watchAddWeight),
        fork(watchAddMemo),
        fork(watchDeleteMemo),
        fork(watchUpdateMemo),
    ]);
};