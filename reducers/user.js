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
    0: {
      key: 0,
      routineName: "더미입니다", //루틴 이름
      trainings: [
        {
          id: 1, 
          area: "aerobic-exercise",     //운동 부위 
          posture: "bicycle",  //운동 자세 
          count: 30,     //운동 개수, 시간
          done: false
        }
      ]
    },
  },               // 유저가 기록한 루틴들
  recommendRoutine: {
    0:{
      key: 0,
      routineName: "초보자 가슴 루틴",
      //area 추가하3
      trainings: [
        {
          id: 1,
          posture: "푸쉬업",
          count: 15,
          done: false
        },
        {
          id: 2,
          posture: "와이드 푸쉬업",
          count: 15,
          done: false
        },
        {
          id: 3,
          posture: "내로우 푸쉬업",
          count: 10,
          done: false
        },
        {
          id: 4,
          posture: "디클라인 푸쉬업",
          count: 8,
          done: false
        },
        {
          id: 5,
          posture: "인클라인 푸쉬업",
          count: 12,
          done: false
        },
        {
          id: 6,
          posture: "딥스",
          count: 5,
          done: false
        }
      ]
    },
    1:{
      key: 1,
      routineName: "초보자 하체루틴",
      trainings: [
        {
          id: 1,
          posture: "스쿼트",
          count: 15,
          done: false
        },
        {
          id: 2,
          posture: "와이드 스쿼트",
          count: 15,
          done: false
        },
        {
          id: 3,
          posture: "런지",
          count: 10,
          done: false
        },
        {
          id: 4,
          posture: "사이드 런지",
          count: 12,
          done: false
        },
        {
          id: 5,
          posture: "백 런지",
          count: 10,
          done: false
        },
        {
          id: 6,
          posture: "버피테스트",
          count: 10,
          done: false
        },
      ]
    },
    2:{
      key: 2,
      routineName: "복근 박살 루틴",
      trainings: [
        {
          id: 1,
          posture: "크런치",
          count: 12,
          done: false
        },
        {
          id: 2,
          posture: "리버스 크런치",
          count: 12,
          done: false
        },
        {
          id: 3,
          posture: "레그 레이즈",
          count: 12,
          done: false
        },
        {
          id: 4,
          posture: "플러터 킥",
          count: 20,
          done: false
        },
        {
          id: 5,
          posture: "사이드 레그 레이즈",
          count: 15,
          done: false
        },
        {
          id: 6,
          posture: "바이시클 크런치",
          count: 15,
          done: false
        },
      ]
    },
    3:{
      key: 3,
      routineName: "초보자 전신 루틴",
      trainings: [
        {
          id: 1,
          posture: "점핑잭",
          count: 50,
          done: false
        },
        {
          id: 2,
          posture: "푸쉬업",
          count: 15,
          done: false
        },
        {
          id: 3,
          posture: "스쿼트",
          count: 20,
          done: false
        },
        {
          id: 4,
          posture: "마운틴 클라이머",
          count: 20,
          done: false
        },
        {
          id: 5,
          posture: "바이시클 크런치",
          count: 15,
          done: false
        },
        {
          id: 6,
          posture: "버피 테스트",
          count: 15,
          done: false
        },
      ]
    },
  },
  recommendAdded: false,           // 추가 루틴이 더해졌는지
  isRecommendAdding: false,        // 추가 루틴을 추가하는 중
  addRecommendErrorReason: '',     // 추가 루틴 추가 실패 요인
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
};

// Types
export const SET_USERNAME = 'SET_USERNAME';

export const ADD_RECORD_REQUEST = 'ADD_RECORD_REQUEST';
export const ADD_RECORD_SUCCESS = 'ADD_RECORD_SUCCESS';
export const ADD_RECORD_FAILURE = 'ADD_RECORD_FAILRUE';

export const ADD_RECOMMEND_REQUEST = 'ADD_RECOMMEND_REQUEST';
export const ADD_RECOMMEND_SUCCESS = 'ADD_RECOMMEND_SUCCESS';
export const ADD_RECOMMEND_FAILURE = 'ADD_RECOMMEND_FAILRUE';

export const DELETE_RECORD_REQUEST = 'DELETE_RECORD_REQUEST';
export const DELETE_RECORD_SUCCESS = 'DELETE_RECORD_SUCCESS';
export const DELETE_RECORD_FAILURE = 'DELETE_RECORD_FAILRUE';

// export const DELETE_EXERCISE_REQUEST = 'DELETE_EXERCISE_REQUEST';
// export const DELETE_EXERCISE_SUCCESS = 'DELETE_EXERCISE_SUCCESS';
// export const DELETE_EXERCISE_FAILURE = 'DELETE_EXERCISE_FAILRUE';

export const UPDATE_RECORD_REQUEST = 'UPDATE_RECORD_REQUEST';
export const UPDATE_RECORD_SUCCESS = 'UPDATE_RECORD_SUCCESS';
export const UPDATE_RECORD_FAILURE = 'UPDATE_RECORD_FAILRUE';

export const GET_AREA_VALUE = 'GET_AREA_VALUE';
export const GET_POSTURE_VALUE = 'GET_POSTURE_VALUE';
export const GET_COUNT_VALUE = 'GET_COUNT_VALUE';

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

//추천 루틴 내 루틴에 추가하는 Action
export const AddRecommendRequestAction = (object) => { 
  return({
    type: ADD_RECOMMEND_REQUEST,
    data: object,
  });
};
export const AddRecommendSuccessAction = (object) => { 
  return({
    type: ADD_RECOMMEND_SUCCESS,  //id 바꿔줘라.
    data: object,
  });
};
export const AddRecommendFailureAction = (error) => { 
  return({
    type: ADD_RECOMMEND_FAILURE,
    error: error,
  });
};

// 삭제하는 Actions
export const DeleteRecordRequestAction = (key) => { 
  console.log(key)
  return({
    type: DELETE_RECORD_REQUEST,
    data: key,
  });
};
export const DeleteRecordSuccessAction = (data) => { 
  return({
    type: DELETE_RECORD_SUCCESS,
    data
  });
};
export const DeleteRecordFailureAction = (error) => { 
  return({
    type: DELETE_RECORD_FAILURE,
    error: error,
  });
};
// 업데이트하는 Actions
export const UpdateRecordRequestAction = (key, object, routineName) => { 
  return({
    type: UPDATE_RECORD_REQUEST,
    data: 
    {
      object, 
      key,
      routineName
    }
  });
};
export const UpdateRecordSuccessAction = (data) => { 
  return({
    type: UPDATE_RECORD_SUCCESS,
    data
  });
};
export const UpdateRecordFailureAction = (error) => { 
  return({
    type: UPDATE_RECORD_FAILURE,
    error: error,
  });
};

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
        const maxKey = Object.keys(draft.userRecord).reduce((accu, now) => accu < parseInt(now) ? now : accu);
        draft.userRecord[parseInt(maxKey)+1] = {...action.data, key:parseInt(maxKey)+1};
        localStorage.setItem("userRecord", JSON.stringify(draft.userRecord));
        draft.id = 1;
        break;
      }
      case ADD_RECORD_FAILURE: {
        draft.isRecordAdding = false;
        draft.addRecordErrorReason = action.error;
        break;
      }
      case ADD_RECOMMEND_REQUEST: {
        draft.recommendAdded = false;
        draft.isRecommendAdding = true;
        draft.addRecommendErrorReason = '';
        break;
      }
      case ADD_RECOMMEND_SUCCESS: {
        draft.recommendAdded = true;
        draft.isRecommendAdding = false;
        const maxKey = Object.keys(draft.userRecord).reduce((accu, now) => accu < parseInt(now) ? now : accu);
        draft.userRecord[parseInt(maxKey)+1] = {...action.data, key:parseInt(maxKey)+1};
        localStorage.setItem("userRecord", JSON.stringify(draft.userRecord));
        break;
      }
      case ADD_RECOMMEND_FAILURE: {
        draft.isRecommendAdding = false;
        draft.addRecommendErrorReason = action.error;
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
        console.log(action.data)
        draft.recordDeleted = true;
        draft.isRecordDeleting = false;
        delete draft.userRecord[action.data];
        localStorage.setItem("userRecord", JSON.stringify(draft.userRecord));
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
        draft.userRecord[action.data.key].trainings = action.data.object;
        draft.userRecord[action.data.key].routineName = action.data.routineName;
        localStorage.setItem("userRecord", JSON.stringify(draft.userRecord));
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
      default:{
        break;
      }
    }
  });
};

export default reducer;
