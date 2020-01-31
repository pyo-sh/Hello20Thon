import produce from "immer";

/* user record저장방식 
  key : { 
    key: "",
    name: "",
    trainings:[{ area: "", posture: "", count: number (갯수), done: true/false }],
  } */
export const initialState = {
  id: 1,                        // 혹시 필요할까 추가함
  name : "",
  _area: "",     //운동 부위 
  _posture: "",  //운동 자세 
  _count: 0,     //운동 개수, 시간
  userRecord: {
    key: {
      key: "",
      name: "", //루틴 이름
      trainings: [
        {
          id: 1, 
          area: "aerobic-exercise",     //운동 부위 
          posture: "bicycle",  //운동 자세 
          count: 30,     //운동 개수, 시간
          done: false
        }
      ]
    }
  },               // 유저가 기록한 루틴들
  exerciseAdded: false,           // 운동이 더해졌는지
  isExerciseAdding: false,        // 운동을 추가하는 중
  addExerciseErrorReason: '',     // 운동 추가 실패 요인
  exerciseDeleted: false,           // 운동이 삭제됐는지
  isExerciseDeleting: false,        // 운동을 삭제하는 중
  deleteExerciseErrorReason: '',     // 운동 삭제 실패 요인
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
export const SET_USERNAME = 'SET_USERNAME';

export const ADD_RECORD_REQUEST = 'ADD_RECORD_REQUEST';
export const ADD_RECORD_SUCCESS = 'ADD_RECORD_SUCCESS';
export const ADD_RECORD_FAILURE = 'ADD_RECORD_FAILRUE';

export const ADD_EXERCISE_REQUEST = 'ADD_EXERCISE_REQUEST';
export const ADD_EXERCISE_SUCCESS = 'ADD_EXERCISE_SUCCESS';
export const ADD_EXERCISE_FAILURE = 'ADD_EXERCISE_FAILRUE';

export const DELETE_RECORD_REQUEST = 'DELETE_RECORD_REQUEST';
export const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_FAILURE = 'DELETE_RECORD_FAILRUE';

export const DELETE_EXERCISE_REQUEST = 'DELETE_EXERCISE_REQUEST';
export const DELETE_EXERCISE_SUCCESS = 'DELETE_EXERCISE_SUCCESS';
export const DELETE_EXERCISE_FAILURE = 'DELETE_EXERCISE_FAILRUE';

export const UPDATE_RECORD_REQUEST = 'UPDATE_RECORD_REQUEST';
export const UPDATE_RECORD_SUCCESS = 'UPDATE_RECORD_SUCCESS';
export const UPDATE_RECORD_FAILURE = 'UPDATE_RECORD_FAILRUE';

export const GET_AREA_VALUE = 'GET_AREA_VALUE';
export const GET_POSTURE_VALUE = 'GET_POSTURE_VALUE';
export const GET_COUNT_VALUE = 'GET_COUNT_VALUE';
export const SET_NOWPOINTINGDATE = 'SET_NOWPOINTINGDATE';

// Actions
// 더하는 Actions
/* data 받는 방식
  객체 {
    key: "",
    name: "",
    trainings:[{ area: "", posture: "", count: number (갯수), done: true/false }],
  } */

export const SetUserNameAction = (name) => {
  return ({
    type : SET_USERNAME,
    data : name
  })
}

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

// export const AddExerciseSuccessAction = (action) => { 
//   return({
//     type: ADD_EXERCISE_SUCCESS,
//     data: action,
//   });
// };
// export const AddExerciseFailureAction = (error) => { 
//   return({
//     type: ADD_EXERCISE_FAILURE,
//     error: error,
//   });
// };
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

export const GetAreaValueAction = (areaValue) => {
  return({
    type: GET_AREA_VALUE,
    data: areaValue
  });
};
export const GetPostureValueAction = (postureValue) => {
  return({
    type: GET_POSTURE_VALUE,
    data: postureValue
  });
};
export const GetCountValueAction = (countValue) => {
  return({
    type: GET_COUNT_VALUE,
    data: countValue
  });
};
// export const GetPostureSuccessAction = (postureValue) => {
//   return({
//     type: GET_POSTURE_SUCCESS,
//     data: postureValue
//   });
// };
// export const GetPostureFailureAction = (e) => {
//   return({
//     type: GET_POSTURE_FAILURE,
//     data: e
//   });
// };

const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      // 기록 추가하는 부분
      case SET_USERNAME : {
        draft.name = action.data;
        break;
      }
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
      //운동 추가하는 부분
      case ADD_EXERCISE_REQUEST: {
        draft.exerciseAdded = false;
        draft.isExerciseAdding = true;
        draft.addExerciseErrorReason = '';
        break;
      }
      case ADD_EXERCISE_SUCCESS: {
        draft.exerciseAdded = true;
        draft.isExerciseAdding = false;
        draft.userRecord.key.trainings.push({id: draft.id + 1, area: action.data._area, posture: action.data._posture, count: action.data._count, done: false})
        draft.id += 1;
        break;
      }
      case ADD_EXERCISE_FAILURE: {
        draft.isExerciseAdding = false;
        draft.addExerciseErrorReason = action.error;
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
      //운동 삭제하는 부분
      case DELETE_EXERCISE_REQUEST: {
        draft.exerciseDeleted = false;
        draft.isExerciseDeleting = true;
        draft.deleteExerciseErrorReason = '';
        break;
      }
      case DELETE_EXERCISE_SUCCESS: {
        draft.exerciseDeleted = true;
        draft.isExerciseDeleting = false;
        const index = draft.userRecord.key.trainings.findIndex(v=> v.id === action.data);
        draft.userRecord.key.trainings.splice(index,1);
        draft.id -= 1;
        break;
      }
      case DELETE_EXERCISE_FAILURE: {
        draft.isExerciseDeleting = false;
        draft.DeleteExerciseErrorReason = action.error;
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
      case GET_AREA_VALUE: {
        draft._area = action.data;
        break;
      }
      case GET_POSTURE_VALUE: {
        draft._posture = action.data;
        break;
      }
      case GET_COUNT_VALUE: {
        draft._count = action.data;
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
