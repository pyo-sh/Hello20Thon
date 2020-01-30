import produce from 'immer';

export const initialState = {
    videos : [],
    selectVideo : {},
    youtubeError : '',
    nextPageToken : '',
    lastSearch : '운동',
}

export const YOUTUBE_VIDEO_REQUEST = "YOUTUBE_VIDEO_REQUEST";
export const YOUTUBE_SELECT_VIDEO = "YOUTUBE_SELECT_VIDEO";
export const ADD_YOUTUBE_VIDEO_REQUEST = "ADD_YOUTUBE_VIDEO_REQUEST";
export const ADD_YOUTUBE_VIDEO_SUCCESS = "ADD_YOUTUBE_VIDEO_SUCCESS";
// export const YOUTUBE_VIDEO_SUCCESS = "YOUTUBE_VIDEO_SUCCESS";
// export const YOUTUBE_VIDEO_FAILURE = "YOUTUBE_VIDEO_FAILURE";


const reducer = (state = initialState, action) => {
    return produce(state, draft => {
        switch(action.type) {
            case YOUTUBE_VIDEO_REQUEST : { // 검색 했을 때
                draft.videos = action.data.results;
                draft.selectVideo = action.data.results[0];
                draft.lastSearch = action.data.search;
                draft.nextPageToken = action.data.pageInfo.nextPageToken;
                break;
            }
            case ADD_YOUTUBE_VIDEO_REQUEST : { // 스크롤 내려서 추가할 때.
                break;
            }
            case ADD_YOUTUBE_VIDEO_SUCCESS : { // 스크롤 내려서 추가할 때.
                action.data.results.forEach(result => {
                    draft.videos.push(result);
                })
                draft.nextPageToken = action.data.pageInfo.nextPageToken;
                break;
            }
            case YOUTUBE_SELECT_VIDEO : { // 리스트 목록 클릭 했을 때
                draft.selectVideo = action.data;
                break;
            }
            default :
                break;
        }
    })
}
export default reducer;