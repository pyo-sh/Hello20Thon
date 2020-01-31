import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import {
    ADD_ROUTINE_REQUEST,
    AddRoutineSuccess,
    AddRoutineFailure,
    DELETE_ROUTINE_REQUEST,
    DeleteRoutineSuccess,
    DeleteRoutineFailure,
    ADD_WEIGHT_REQUEST,
    AddWeightSuccess,
    AddWeightFailure
} from '../reducers/day';

function* addRoutine(action) {
    try{
        console.dir(action.data);
        yield put(AddRoutineSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(AddRoutineFailure(error));
    }
}

function* watchAddRoutine() {
    yield takeLatest(ADD_ROUTINE_REQUEST, addRoutine);
}

function* deleteRoutine(action) {
    try{
        yield put(DeleteRoutineSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(DeleteRoutineFailure(error));
    }
}

function* watchDeleteRoutine() {
    yield takeLatest(DELETE_ROUTINE_REQUEST, deleteRoutine);
}

function* addWeight(action) {
    try{
        yield put(AddWeightSuccess(action.data));
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
        fork(watchAddRoutine),
        fork(watchDeleteRoutine),
        fork(watchAddWeight)
    ]);
};