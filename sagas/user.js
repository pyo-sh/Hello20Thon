import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import { DELETE_EXERCISE_REQUEST, DELETE_EXERCISE_SUCCESS, DELETE_EXERCISE_FAILURE, DELETE_RECORD_FAILURE, DELETE_RECORD_SUCCESS, DELETE_RECORD_REQUEST, UPDATE_RECORD_FAILURE, UPDATE_RECORD_SUCCESS, UPDATE_RECORD_REQUEST, ADD_RECORD_FAILURE, ADD_RECORD_SUCCESS, ADD_RECORD_REQUEST , ADD_EXERCISE_FAILURE, ADD_EXERCISE_SUCCESS, ADD_EXERCISE_REQUEST } from '../reducers/user';

function* addExercise(action) {
    try{
        yield delay(1300);
        yield put({
            type: ADD_EXERCISE_SUCCESS,
            data: action.data,
        });
    }catch{
        console.error(e);
        yield put({
            type: ADD_EXERCISE_FAILURE,
            data: e
        });
    }
}

function* watchAddExercise() {
    yield takeLatest(ADD_EXERCISE_REQUEST, addExercise)
}

function* addRecord(action) {
    try{
        yield delay(1300);
        yield put({
            type: ADD_RECORD_SUCCESS,
            data : action.data
        });
    }catch{
        console.error(e);
        yield put({
            type: ADD_RECORD_FAILURE
        });
    }
}

function* watchAddRecord() {
    yield takeLatest(ADD_RECORD_REQUEST, addRecord)
}

function* updateRecord(action) {
    try{
        yield delay(1300);
        yield put({
            type: UPDATE_RECORD_SUCCESS,
            data : action.data
        });
    }catch{
        console.error(e);
        yield put({
            type: UPDATE_RECORD_FAILURE
        });
    }
}

function* watchUpdateRecord() {
    yield takeLatest(UPDATE_RECORD_REQUEST, updateRecord)
}

function* deleteRecord(action) {
    try{
        yield delay(1300);
        yield put({
            type: DELETE_RECORD_SUCCESS,
            data : action.data
        });
    }catch{
        console.error(e);
        yield put({
            type: DELETE_RECORD_FAILURE
        });
    }
}

function* watchDeleteRecord() {
    yield takeLatest(DELETE_RECORD_REQUEST, deleteRecord)
}

function* deleteExercise(action) {
    try{
        console.log(action.data)
        yield delay(1300);
        yield put({
            type: DELETE_EXERCISE_SUCCESS,
            data: action.data,
        });
    }catch{
        console.error(e);
        yield put({
            type: DELETE_EXERCISE_FAILURE,
            data: e
        });
    }
}

function* watchDeleteExercise() {
    yield takeLatest(DELETE_EXERCISE_REQUEST, deleteExercise)
}

export default function* userSaga() {
    yield all([
        fork(watchAddExercise),
        fork(watchDeleteExercise)
    ])
}