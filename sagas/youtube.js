import { all, fork, throttle, put } from 'redux-saga/effects';
import {ADD_YOUTUBE_VIDEO_REQUEST, ADD_YOUTUBE_VIDEO_SUCCESS} from '../reducers/youtube';
function* addVideo(action) {
    try{
        yield put({
            type : ADD_YOUTUBE_VIDEO_SUCCESS,
            data : action.data,
        })
    }catch(e){
        console.error(e);
        yield put({
            type: ADD_YOUTUBE_VIDEO_FAILURE,
            error
        })
    }
}
function* watchAddVideo(){
    yield throttle(1500, ADD_YOUTUBE_VIDEO_REQUEST, addVideo);
}

export default function* userSaga() {
    yield all([ 
        fork(watchAddVideo),
    ]); 
}