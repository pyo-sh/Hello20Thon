import { all, fork, takeLatest, put } from 'redux-saga/effects';
import {
    ADD_ROUTINE_REQUEST,
    AddRoutineSuccess,
    AddRoutineFailure,
    DELETE_ROUTINE_REQUEST,
    DeleteRoutineSuccess,
    DeleteRoutineFailure,
    TOGGLE_TRAINING_REQUEST,
    ToggleTrainingSuccess,
    ToggleTrainingFailure,
    UPDATE_ROUTINENAME_REQUEST,
    UpdateRoutineNameSuccess,
    UpdateRoutineNameFailure,
    UPDATE_TRAININGCOUNT_REQUEST,
    UpdateTrainingCountSuccess,
    UpdateTrainingCountFailure,
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

function* toggleTraining(action) {
    try{
        yield put(ToggleTrainingSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(ToggleTrainingFailure(error));
    }
}

function* watchToggleTraining() {
    yield takeLatest(TOGGLE_TRAINING_REQUEST, toggleTraining);
}

function* updateRoutineName(action) {
    try{
        yield put(UpdateRoutineNameSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(UpdateRoutineNameFailure(error));
    }
}

function* watchUpdateRoutineName() {
    yield takeLatest(UPDATE_ROUTINENAME_REQUEST, updateRoutineName);
}

function* updateTrainingCount(action) {
    try{
        yield put(UpdateTrainingCountSuccess(action.data));
    }catch(error){
        console.error(error);
        yield put(UpdateTrainingCountFailure(error));
    }
}

function* watchUpdateTrainingCount() {
    yield takeLatest(UPDATE_TRAININGCOUNT_REQUEST, updateTrainingCount);
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
        fork(watchAddRoutine),
        fork(watchDeleteRoutine),
        fork(watchToggleTraining),
        fork(watchUpdateRoutineName),
        fork(watchUpdateTrainingCount),
        fork(watchAddWeight),
        fork(watchAddMemo),
        fork(watchDeleteMemo),
        fork(watchUpdateMemo),
    ]);
};