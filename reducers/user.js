import produce from "immer";

/* user record저장방식 
  key : { 
    key: "",
    name: "",
    trainings:[{ area: "", posture: "", count: number (갯수), done: true/false }],
  } */
export const initialState = {
  id: 0,                        // 혹시 필요할까 추가함
  userRecord: {},               // 유저가 기록한 루틴들
  recordAdded: false,           // 기록이 더해졌는지
  isRecordAdding: false,        // 기록을 추가하는 중
  addRecordErrorReason: '',     // 기록 추가 실패 요인
  recordDeleted: false,         // 기록이 삭제됐는지
  isRecordDeleting: false,      // 기록을 삭제하는중
  deleteRecordErrorReason: '',  // 기록 삭제 실패 요인
  recordUpdated: false,         // 기록이 업데이트 됐는지
  isRecordUpdating: false,      // 기록을 업데이트 하는중
  updateRecordErrorReason: '',  // 기록 업데이트 실패 요인
  nowPointingDate: "",          // 현재 유저가 가르키고있는 날짜
};

// Types
export const ADD_RECORD_REQUEST = 'ADD_RECORD_REQUEST';
export const ADD_RECORD_SUCCESS = 'ADD_RECORD_SUCCESS';
export const ADD_RECORD_FAILURE = 'ADD_RECORD_FAILRUE';

export const DELETE_RECORD_REQUEST = 'DELETE_RECORD_REQUEST';
export const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_FAILURE = 'DELETE_RECORD_FAILRUE';

export const UPDATE_RECORD_REQUEST = 'UPDATE_RECORD_REQUEST';
export const UPDATE_RECORD_SUCCESS = 'UPDATE_RECORD_SUCCESS';
export const UPDATE_RECORD_FAILURE = 'UPDATE_RECORD_FAILRUE';

export const SET_NOWPOINTINGDATE = 'SET_NOWPOINTINGDATE';

// Actions
// 더하는 Actions
/* data 받는 방식
  객체 {
    key: "",
    name: "",
    trainings:[{ area: "", posture: "", count: number (갯수), done: true/false }],
  } */
export const AddRecordRequestAction = (object) => { 
  return({
    type: ADD_RECORD_REQUEST,
    data: object,
  });
};
export const AddRecordSuccessAction = (object) => { 
  return({
    type: ADD_RECORD_SUCCESS,
    data: object,
  });
};
export const AddRecordFailureAction = (error) => { 
  return({
    type: ADD_RECORD_FAILURE,
    error: error,
  });
};
// 삭제하는 Actions
export const DeleteRecordRequestAction = (key) => { 
  return({
    type: DELETE_RECORD_REQUEST,
    key: key,
  });
};
export const DeleteRecordSuccessAction = (key) => { 
  return({
    type: DELETE_RECORD_SUCCESS,
    key: key,
  });
};
export const DeleteRecordFailureAction = (error) => { 
  return({
    type: DELETE_RECORD_FAILURE,
    error: error,
  });
};
// 업데이트하는 Actions
export const UpdateRecordRequestAction = (object) => { 
  return({
    type: UPDATE_RECORD_REQUEST,
    data: object,
  });
};
export const UpdateRecordSuccessAction = (object) => { 
  return({
    type: UPDATE_RECORD_SUCCESS,
    data: object,
  });
};
export const UpdateRecordFailureAction = (error) => { 
  return({
    type: UPDATE_RECORD_FAILURE,
    error: error,
  });
};
export const setNowPointingDate = (value) => {
  return({
    type: SET_NOWPOINTINGDATE,
    data: value,
  });
}


const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // 기록 추가하는 부분
      case ADD_RECORD_REQUEST: {
        draft.recordAdded = false;
        draft.isRecordAdding = true;
        draft.addRecordErrorReason = '';
        break;
      }
      case ADD_RECORD_SUCCESS: {
        draft.recordAdded = true;
        draft.isRecordAdding = false;
        draft.userRecord[action.data.key] = action.data;
        break;
      }
      case ADD_RECORD_FAILURE: {
        draft.isRecordAdding = false;
        draft.addRecordErrorReason = action.error;
        break;
      }
      // 기록 삭제하는 부분
      case DELETE_RECORD_REQUEST: {
        draft.recordDeleted = false;
        draft.isRecordDeleting = true;
        draft.deleteRecordErrorReason = '';
        break;
      }
      case DELETE_RECORD_SUCCESS: {
        draft.recordDeleted = true;
        draft.isRecordDeleting = false;
        delete draft.userRecord[action.key];
        break;
      }
      case DELETE_RECORD_FAILURE: {
        draft.isRecordDeleting = false;
        draft.deleteRecordErrorReason = action.error;
        break;
      }
      // 기록 업데이트하는 부분
      case UPDATE_RECORD_REQUEST: {
        draft.recordUpdated = false;
        draft.isRecordUpdating = true;
        draft.deleteRecordErrorReason = '';
        break;
      }
      case UPDATE_RECORD_SUCCESS: {
        draft.recordUpdated = true;
        draft.isRecordUpdating = false;
        draft.userRecord[action.data.key] = action.data;
        break;
      }
      case UPDATE_RECORD_FAILURE: {
        draft.isRecordUpdating = false;
        draft.updateRecordErrorReason = action.error;
        break;
      }
      // 현재 유저가 가리키고있는 시간
      case SET_NOWPOINTINGDATE: {
        draft.nowPointingDate = action.data;
        break;
      }
      default:{
        break;
      }
    }
  });
};

export default reducer;
