import { all, delay, fork, takeLatest, put } from 'redux-saga/effects';
import { AddRecommendSuccessAction, AddRecommendFailureAction, ADD_RECOMMEND_REQUEST, DELETE_RECORD_REQUEST, UPDATE_RECORD_REQUEST, ADD_RECORD_REQUEST ,  AddRecordSuccessAction, AddRecordFailureAction, UpdateRecordFailureAction, UpdateRecordSuccessAction, DeleteRecordSuccessAction, DeleteRecordFailureAction } from '../reducers/user';

function* addRecord(action) {
    try{
        yield put(AddRecordSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(AddRecordFailureAction({e}));
    }
}

function* watchAddRecord() {
    yield takeLatest(ADD_RECORD_REQUEST, addRecord)
}

function* addRecommend(action) {
    try{
        yield put(AddRecommendSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(AddRecommendFailureAction({e}));
    }
}

function* watchAddRecommend() {
    yield takeLatest(ADD_RECOMMEND_REQUEST, addRecommend)
}

function* updateRecord(action) {
    try{
        console.log(action.data)
        yield put(UpdateRecordSuccessAction(action.data));
    }catch(e){
        console.error(e);
        yield put(UpdateRecordFailureAction({e}));
    }
}

function* watchUpdateRecord() {
    yield takeLatest(UPDATE_RECORD_REQUEST, updateRecord)
}

function* deleteRecord(action) {
    try{
        yield put(DeleteRecordSuccessAction(action.data));
    }catch{
        console.error(e);
        yield put(DeleteRecordFailureAction({e}));
    }
}

function* watchDeleteRecord() {
    yield takeLatest(DELETE_RECORD_REQUEST, deleteRecord)
}

export default function* userSaga() {
    yield all([
        fork(watchAddRecord),
        fork(watchAddRecommend),
        fork(watchUpdateRecord),
        fork(watchDeleteRecord)
    ])
}