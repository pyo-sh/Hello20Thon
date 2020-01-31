import produce from "immer";
/*
    routine: {{}},
    memo: {{}},
    weight: {0},
    reason: {""}
}
*/
const dummyMemo = {
  "Wed Jan 01 2020": [
    {
      key : 1,
      contents : "아무거나 입니다."
    },
    {
      key : 2,
      contents : "오늘도 운동 열심히 했따!"
    },
    {
      key : 3,
      contents : "오늘도 열심히 할거다"
    }
  ],
"Thu Jan 02 2020": [
  {
    key : 1,
    contents : "ㅋㅋㅋㅋㅋ"
  },
  {
    key : 2,
    contents : "ㅋㅋㅇㄻㅇㄹ"
  },
  {
    key : 3,
    contents : "ㅋㅋㅋㅇㄻ"
  }
  ],
}
const dummyRecord = {
  "Wed Jan 01 2020": [
      {
        key: 0,
        name: "하체 뿜뿜 나만의 운동법",
        trainings: [
          {
            id: 0,
            area: "quads",
            posture: "lunge",
            count: 12,
            done: true,
          },
          {
            id: 1,
            area: "quads",
            posture: "turning-kick",
            count: 5,
            done: false,
          },
          {
            id: 2,
            area: "quads",
            posture: "climber",
            count: 100,
            done: false,
          }
        ],
      },
    ],

  "Thu Jan 02 2020": [
      {
        key: 1,
        name: "어깨 불쑥 어깨깡패 운동법",
        trainings: [

        ],
      },
    ],

  "Fri Jan 03 2020": [
      {
        key: 2,
        name: "뒷태 미남 등 폭발 운동법",
        trainings: [

        ],
      },
    ],

  "Sat Jan 04 2020": [
      {
        key: 3,
        name: "오늘은 조졌다, 삼두이두복근",
        trainings: [

        ],
      },
    ],
  };
// State
export const initialState = {
  routine: dummyRecord,            // 날짜에 대한 모든 기록
  memo: dummyMemo,
  weight: {},
  reason: {},
  routineAdded: false,              // 루틴이 더해졌는지
  isRoutineAdding: false,           // 루틴을 추가하는 중
  addRoutineErrorReason: '',        // 루틴 추가 실패 요인
  memoAdded: false,                 // 메모가 더해졌는지
  isMemoAdding: false,              // 메모를 추가하는 중
  addMemoErrorReason: '',           // 메모 추가 실패 요인
  weightAdded: false,               // 몸무게가 더해졌는지
  isWeightAdding: false,            // 몸무게를 추가하는 중
  addWeightErrorReason: '',         // 몸무게 추가 실패 요인
  reasonAdded: false,               // 사유가 더해졌는지
  isReasonAdding: false,            // 사유를 추가하는 중
  addReasonErrorReason: '',         // 사유 추가 실패 요인
  nowPointingDate: "",              // 현재 유저가 가르키고있는 날짜
};

// Types
// routine
export const ADD_ROUTINE_REQUEST = 'ADD_ROUTINE_REQUEST';
export const ADD_ROUTINE_SUCCESS = 'ADD_ROUTINE_SUCCESS';
export const ADD_ROUTINE_FAILURE = 'ADD_ROUTINE_FAILURE';

export const DELETE_ROUTINE_REQUEST = 'DELETE_ROUTINE_REQUEST';
export const DELETE_ROUTINE_SUCCESS = 'DELETE_ROUTINE_SUCCESS';
export const DELETE_ROUTINE_FAILURE = 'DELETE_ROUTINE_FAILURE';

export const UPDATE_ROUTINE_REQUEST = 'UPDATE_ROUTINE_REQUEST';
export const UPDATE_ROUTINE_SUCCESS = 'UPDATE_ROUTINE_SUCCESS';
export const UPDATE_ROUTINE_FAILURE = 'UPDATE_ROUTINE_FAILURE';
// memo
export const ADD_MEMO_REQUEST = 'ADD_MEMO_REQUEST';
export const ADD_MEMO_SUCCESS = 'ADD_MEMO_SUCCESS';
export const ADD_MEMO_FAILURE = 'ADD_MEMO_FAILURE';

export const DELETE_MEMO_REQUEST = 'DELETE_MEMO_REQUEST';
export const DELETE_MEMO_SUCCESS = 'DELETE_MEMO_SUCCESS';
export const DELETE_MEMO_FAILURE = 'DELETE_MEMO_FAILURE';

export const UPDATE_MEMO_REQUEST = 'UPDATE_MEMO_REQUEST';
export const UPDATE_MEMO_SUCCESS = 'UPDATE_MEMO_SUCCESS';
export const UPDATE_MEMO_FAILURE = 'UPDATE_MEMO_FAILURE';
// weight
export const ADD_WEIGHT_REQUEST = 'ADD_WEIGHT_REQUEST';
export const ADD_WEIGHT_SUCCESS = 'ADD_WEIGHT_SUCCESS';
export const ADD_WEIGHT_FAILURE = 'ADD_WEIGHT_FAILURE';

export const DELETE_WEIGHT_REQUEST = 'DELETE_WEIGHT_REQUEST';
export const DELETE_WEIGHT_SUCCESS = 'DELETE_WEIGHT_SUCCESS';
export const DELETE_WEIGHT_FAILURE = 'DELETE_WEIGHT_FAILURE';
// reason
export const ADD_REASON_REQUEST = 'ADD_REASON_REQUEST';
export const ADD_REASON_SUCCESS = 'ADD_REASON_SUCCESS';
export const ADD_REASON_FAILURE = 'ADD_REASON_FAILURE';

export const DELETE_REASON_REQUEST = 'DELETE_REASON_REQUEST';
export const DELETE_REASON_SUCCESS = 'DELETE_REASON_SUCCESS';
export const DELETE_REASON_FAILURE = 'DELETE_REASON_FAILURE';

export const UPDATE_REASON_REQUEST = 'UPDATE_REASON_REQUEST';
export const UPDATE_REASON_SUCCESS = 'UPDATE_REASON_SUCCESS';
export const UPDATE_REASON_FAILURE = 'UPDATE_REASON_FAILURE';
// 현재 날짜
export const SET_NOWPOINTINGDATE = 'SET_NOWPOINTINGDATE';

// Actions
// routine에 관한 actions
export const AddRoutineRequest = () => {
  return {
    type: ADD_ROUTINE_REQUEST,
  };
};
export const AddRoutineSuccess = () => {
  return {
    type: ADD_ROUTINE_SUCCESS,
  };
};
export const AddRoutineFailure = (error) => {
  return {
    type: ADD_ROUTINE_FAILURE,
    error: error,
  };
};

export const DeleteRoutineRequest = () => {
  return {
    type:DELETE_ROUTINE_REQUEST,
  };
};
export const DeleteRoutineSuccess = () => {
  return {
    type:DELETE_ROUTINE_SUCCESS,
  };
};
export const DeleteRoutineFailure = (error) => {
  return {
    type:DELETE_ROUTINE_FAILURE,
    error: error,
  };
};

export const UpdateRoutineRequest = () => {
  return {
    type: UPDATE_ROUTINE_REQUEST,
  };
};
export const UpdateRoutineSuccess = () => {
  return {
    type: UPDATE_ROUTINE_SUCCESS,
  };
};
export const UpdateRoutineFailure = (error) => {
  return {
    type: UPDATE_ROUTINE_FAILURE,
    error: error,
  };
};
// memo에 관한 actions
export const AddMemoRequest = (date, memoText) => {
  return {
    type: ADD_MEMO_REQUEST,
    data : {date, memoText}
  };
};
export const AddMemoSuccess = (data) => {
  return {
    type: ADD_MEMO_SUCCESS,
    data
  };
};
export const AddMemoFailure = (error) => {
  return {
    type: ADD_MEMO_FAILURE,
    error: error,
  };
};

export const DeleteMemoRequest = (date, key) => {
  return {
    type:DELETE_MEMO_REQUEST,
    data : {date, key}
  };
};
export const DeleteMemoSuccess = (data) => {
  return {
    type:DELETE_MEMO_SUCCESS,
    data
  };
};
export const DeleteMemoFailure = (error) => {
  return {
    type:DELETE_MEMO_FAILURE,
    error
  };
};

export const UpdateMemoRequest = (date, key, updateText) => {
  return {
    type: UPDATE_MEMO_REQUEST,
    data : {
      date, key, updateText
    }
  };
};
export const UpdateMemoSuccess = (data) => {
  return {
    type: UPDATE_MEMO_SUCCESS,
    data,
  };
};
export const UpdateMemoFailure = (error) => {
  return {
    type: UPDATE_MEMO_FAILURE,
    error: error,
  };
};
// weight에 관한 actions
export const AddWeightRequest = (date, weight) => {
  return {
    type: ADD_WEIGHT_REQUEST,
    date: date,
    weight: weight,
  };
};
export const AddWeightSuccess = (date, weight) => {
  return {
    type: ADD_WEIGHT_SUCCESS,
    date,
    weight
  };
};
export const AddWeightFailure = (error) => {
  return {
    type: ADD_WEIGHT_FAILURE,
    error: error,
  };
};

// reason에 관한 actions
export const AddReasonRequest = () => {
  return {
    type: ADD_REASON_REQUEST,
  };
};
export const AddReasonSuccess = () => {
  return {
    type: ADD_REASON_SUCCESS,
  };
};
export const AddReasonFailure = (error) => {
  return {
    type: ADD_REASON_FAILURE,
    error: error,
  };
};

export const DeleteReasonRequest = () => {
  return {
    type:DELETE_REASON_REQUEST,
  };
};
export const DeleteReasonSuccess = () => {
  return {
    type:DELETE_REASON_SUCCESS,
  };
};
export const DeleteReasonFailure = (error) => {
  return {
    type:DELETE_REASON_FAILURE,
    error: error,
  };
};

export const UpdateReasonRequest = () => {
  return {
    type: UPDATE_REASON_REQUEST,
  };
};
export const UpdateReasonSuccess = () => {
  return {
    type: UPDATE_REASON_SUCCESS,
  };
};
export const UpdateReasonFailure = (error) => {
  return {
    type: UPDATE_REASON_FAILURE,
    error: error,
  };
};

export const setNowPointingDate = (value) => {
  return({
    type: SET_NOWPOINTINGDATE,
    data: value,
  });
}

// Reducer
const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_ROUTINE_REQUEST: {
        draft.routineAdded = false;
        draft.isRoutineAdding = true;
        draft.addRoutineErrorReason = '';
        break;
      }
      case ADD_ROUTINE_SUCCESS: {
        draft.routineAdded = true;
        draft.isRoutineAdding = false;
        break;
      }
      case ADD_ROUTINE_FAILURE: {
        draft.isRoutineAdding = false;
        draft.addRoutineErrorReason = action.error;
        break;
      }

      case DELETE_ROUTINE_REQUEST: {
        draft.routineDeleted = false;
        draft.isRoutineDeleting = true;
        draft.deleteRoutineErrorReason = '';
        break;
      }
      case DELETE_ROUTINE_SUCCESS: {
        draft.routineDeleted = true;
        draft.isRoutineDeleting = false;
        break;
      }
      case DELETE_ROUTINE_FAILURE: {
        draft.isRoutineDeleting = false;
        draft.deleteRoutineErrorReason = action.error;
        break;
      }

      case UPDATE_ROUTINE_REQUEST: {
        draft.routineUpdated = false;
        draft.isRoutineUpdating = true;
        draft.deleteRoutineErrorReason = '';
        break;
      }
      case UPDATE_ROUTINE_SUCCESS: {
        draft.routineUpdated = true;
        draft.isRoutineUpdating = false;
        break;
      }
      case UPDATE_ROUTINE_FAILURE: {
        draft.isRoutineUpdating = false;
        draft.updateRoutineErrorReason = action.error;
        break;
      }

      case ADD_MEMO_REQUEST: {  // memoAdde, isMemoAdding 같은거 하나도 안 씀. 정리 해야함
        draft.memoAdded = false;
        draft.isMemoAdding = true;
        draft.addMemoErrorReason = '';
        break;
      }
      case ADD_MEMO_SUCCESS: {
        draft.memoAdded = true;
        draft.isMemoAdding = false;
        if(draft.memo[action.data.date] && draft.memo[action.data.date].length > 0){
          const maxKey = draft.memo[action.data.date].reduce((acc, now) => acc < now.key ? now.key : acc);
          draft.memo[action.data.date].push({key: maxKey+1, contents : action.data.memoText})
        }else {
          draft.memo[action.data.date] = [{key: 0, contents : action.data.memoText}];
        }
        
        break;
      }
      case ADD_MEMO_FAILURE: {
        draft.isMemoAdding = false;
        draft.addMemoErrorReason = action.error;
        break;
      }

      case DELETE_MEMO_REQUEST: {
        draft.memoDeleted = false;
        draft.isMemoDeleting = true;
        draft.deleteMemoErrorReason = '';
        break;
      }
      case DELETE_MEMO_SUCCESS: {
        draft.memoDeleted = true;
        draft.isMemoDeleting = false;
        const index = draft.memo[action.data.date].findIndex(value => value.key === action.data.key);
        draft.memo[action.data.date].splice(index,1);
        break;
      }
      case DELETE_MEMO_FAILURE: {
        draft.isMemoDeleting = false;
        draft.deleteMemoErrorReason = action.error;
        break;
      }

      case UPDATE_MEMO_REQUEST: {
        draft.memoUpdated = false;
        draft.isMemoUpdating = true;
        draft.deleteMemoErrorReason = '';
        break;
      }
      case UPDATE_MEMO_SUCCESS: {
        draft.memoUpdated = true;
        draft.isMemoUpdating = false;
        const index = draft.memo[action.data.date].findIndex(value => value.key === action.data.key);
        draft.memo[action.data.date][index].contents = action.data.updateText;
        break;
      }
      case UPDATE_MEMO_FAILURE: {
        draft.isMemoUpdating = false;
        draft.updateMemoErrorReason = action.error;
        break;
      }

      case ADD_WEIGHT_REQUEST: {
        draft.weightAdded = false;
        draft.isWeightAdding = true;
        draft.addWeightErrorReason = '';
        break;
      }
      case ADD_WEIGHT_SUCCESS: {
        draft.weightAdded = true;
        draft.isWeightAdding = false;
        draft.weight[action.date] = action.weight;
        break;
      }
      case ADD_WEIGHT_FAILURE: {
        draft.isWeightAdding = false;
        draft.addWeightErrorReason = action.error;
        break;
      }
      
      case ADD_REASON_REQUEST: {
        draft.weightAdded = false;
        draft.isWeightAdding = true;
        draft.addWeightErrorReason = '';
        break;
      }
      case ADD_REASON_SUCCESS: {
        draft.reasonAdded = true;
        draft.isReasonAdding = false;
        break;
      }
      case ADD_REASON_FAILURE: {
        draft.isReasonAdding = false;
        draft.addReasonErrorReason = action.error;
        break;
      }

      case DELETE_REASON_REQUEST: {
        draft.reasonDeleted = false;
        draft.isReasonDeleting = true;
        draft.deleteReasonErrorReason = '';
        break;
      }
      case DELETE_REASON_SUCCESS: {
        draft.reasonDeleted = true;
        draft.isReasonDeleting = false;
        break;
      }
      case DELETE_REASON_FAILURE: {
        draft.isReasonDeleting = false;
        draft.deleteReasonErrorReason = action.error;
        break;
      }

      case UPDATE_REASON_REQUEST: {
        draft.reasonUpdated = false;
        draft.isReasonUpdating = true;
        draft.deleteReasonErrorReason = '';
        break;
      }
      case UPDATE_REASON_SUCCESS: {
        draft.reasonUpdated = true;
        draft.isReasonUpdating = false;
        break;
      }
      case UPDATE_REASON_FAILURE: {
        draft.isReasonUpdating = false;
        draft.updateReasonErrorReason = action.error;
        break;
      }
      // 현재 유저가 가리키고있는 시간
      case SET_NOWPOINTINGDATE: {
        draft.nowPointingDate = action.data;
        break;
      }
      default:{
        
      }
    }
  });
};

export default reducer;
