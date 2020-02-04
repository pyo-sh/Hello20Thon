import produce from "immer";

// State
export const initialState = {
  routine: {},
  memo: {},
  weight: {},
  reason: {},
  routineAdded: false,              // 루틴이 더해졌는지
  isRoutineAdding: false,           // 루틴을 추가하는 중
  addRoutineErrorReason: '',        // 루틴 추가 실패 요인
  routineDeleted: false,            // 루틴이 삭제됐는지
  isRoutineDeleting: false,         // 루틴을 삭제하는중
  deleteRoutineErrorReason: '',     // 루틴 삭제 실패 요인
  trainingToggled: false,           // 운동 확인 토글 됐는지
  isTrainingToggling: false,        // 운동 확인을 토글 하는중
  togglingTrainingErrorReason: '',  // 운동 확인 토글 실패 요인
  routineNameUpdated: false,        // 루틴이름이 업데이트 됐는지
  isRoutineNameUpdating: false,     // 루틴이름을 업데이트 하는중
  updateRoutineNameErrorReason: '', // 루틴이름 업데이트 실패 요인
  trainingCountUpdated: false,        // 운동횟수가 업데이트 됐는지
  isTrainingCountUpdating: false,     // 운동횟수를 업데이트 하는중
  updateTrainingCountErrorReason: '', // 운동횟수 업데이트 실패 요인
  memoAdded: false,                 // 메모가 더해졌는지
  isMemoAdding: false,              // 메모를 추가하는 중
  addMemoErrorReason: '',           // 메모 추가 실패 요인
  memoDeleted: false,               // 메모가 삭제됐는지
  isMemoDeleting: false,            // 메모를 삭제하는중
  deleteMemoErrorReason: '',        // 메모 삭제 실패 요인
  memoUpdated: false,               // 메모가 업데이트 됐는지
  isMemoUpdating: false,            // 메모를 업데이트 하는중
  updateMemoErrorReason: '',        // 메모 업데이트 실패 요인
  weightAdded: false,               // 몸무게가 더해졌는지
  isWeightAdding: false,            // 몸무게를 추가하는 중
  addWeightErrorReason: '',         // 몸무게 추가 실패 요인
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

export const TOGGLE_TRAINING_REQUEST = 'TOGGLE_TRAINING_REQUEST';
export const TOGGLE_TRAINING_SUCCESS = 'TOGGLE_TRAINING_SUCCESS';
export const TOGGLE_TRAINING_FAILURE = 'TOGGLE_TRAINING_FAILURE';

export const UPDATE_ROUTINENAME_REQUEST = 'UPDATE_ROUTINENAME_REQUEST';
export const UPDATE_ROUTINENAME_SUCCESS = 'UPDATE_ROUTINENAME_SUCCESS';
export const UPDATE_ROUTINENAME_FAILURE = 'UPDATE_ROUTINENAME_FAILURE';

export const UPDATE_TRAININGCOUNT_REQUEST = 'UPDATE_TRAININGCOUNT_REQUEST';
export const UPDATE_TRAININGCOUNT_SUCCESS = 'UPDATE_TRAININGCOUNT_SUCCESS';
export const UPDATE_TRAININGCOUNT_FAILURE = 'UPDATE_TRAININGCOUNT_FAILURE';

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
// 현재 날짜
export const SET_NOWPOINTINGDATE = 'SET_NOWPOINTINGDATE';

export const SET_ROUTINE_MEMO = "SET_ROUTINE_MEMO";

// Actions
// 로컬스토리지에 루틴과 메모 있을 경우 세팅
export const setRoutineMemo = ({routine, memo}) => {
  return {
    type :SET_ROUTINE_MEMO,
    data : {
      routine,
      memo
    }
  }
}
// routine에 관한 actions
export const AddRoutineRequest = (date, object) => {
  return {
    type: ADD_ROUTINE_REQUEST,
    data: {
      date,
      object,
    }
  };
};
export const AddRoutineSuccess = (data) => {
  return {
    type: ADD_ROUTINE_SUCCESS,
    data,
  };
};
export const AddRoutineFailure = (error) => {
  return {
    type: ADD_ROUTINE_FAILURE,
    error: error,
  };
};

export const DeleteRoutineRequest = (date, index) => {
  return {
    type: DELETE_ROUTINE_REQUEST,
    data: {
      date,
      index
    }
  };
};
export const DeleteRoutineSuccess = (data) => {
  return {
    type:DELETE_ROUTINE_SUCCESS,
    data,
  };
};
export const DeleteRoutineFailure = (error) => {
  return {
    type:DELETE_ROUTINE_FAILURE,
    error: error,
  };
};

export const ToggleTrainingRequest = (date, routineIndex, trainingIndex, result) => {
  return {
    type: TOGGLE_TRAINING_REQUEST,
    data: {
      date,
      routineIndex,
      trainingIndex,
      result
    }
  };
};
export const ToggleTrainingSuccess = (data) => {
  return {
    type: TOGGLE_TRAINING_SUCCESS,
    data
  };
};
export const ToggleTrainingFailure = (error) => {
  return {
    type: TOGGLE_TRAINING_FAILURE,
    error: error
  };
};

export const UpdateRoutineNameRequest = (date, routineIndex, routineName) => {
  return {
    type: UPDATE_ROUTINENAME_REQUEST,
    data: {
      date,
      routineIndex,
      routineName
    }
  };
};
export const UpdateRoutineNameSuccess = (data) => {
  return {
    type: UPDATE_ROUTINENAME_SUCCESS,
    data
  };
};
export const UpdateRoutineNameFailure = (error) => {
  return {
    type: UPDATE_ROUTINENAME_FAILURE,
    error: error
  };
};

export const UpdateTrainingCountRequest = (date, routineIndex, trainingIndex, count) => {
  return {
    type: UPDATE_TRAININGCOUNT_REQUEST,
    data: {
      date,
      routineIndex,
      trainingIndex,
      count
    }
  };
};
export const UpdateTrainingCountSuccess = (data) => {
  return {
    type: UPDATE_TRAININGCOUNT_SUCCESS,
    data
  };
};
export const UpdateTrainingCountFailure = (error) => {
  return {
    type: UPDATE_TRAININGCOUNT_FAILURE,
    error: error
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
    data:{
      date,
      weight
    }
  };
};
export const AddWeightSuccess = (data) => {
  return {
    type: ADD_WEIGHT_SUCCESS,
    data
  };
};
export const AddWeightFailure = (error) => {
  return {
    type: ADD_WEIGHT_FAILURE,
    error: error,
  };
};
// 현재 날짜에 대한 Actions
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
      case SET_ROUTINE_MEMO : {
        draft.routine = action.data.routine;
        draft.memo = action.data.memo;
        break;
      }
      case ADD_ROUTINE_REQUEST: {
        draft.routineAdded = false;
        draft.isRoutineAdding = true;
        draft.addRoutineErrorReason = '';
        break;
      }
      case ADD_ROUTINE_SUCCESS: {
        draft.routineAdded = true;
        draft.isRoutineAdding = false;
        if(draft.routine[action.data.date]) draft.routine[action.data.date].push(action.data.object);
        else  draft.routine[action.data.date] = [action.data.object];
        localStorage.setItem("routine", JSON.stringify(draft.routine));
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
        // 마지막 삭제라면 아예 없앤다. {} 객체마저도 삭제
        if(draft.routine[action.data.date].length === 1)
          delete draft.routine[action.data.date];
        // index와 같은 index를 만나면 삭제
        else
          draft.routine[action.data.date].splice(action.data.index, 1);
        localStorage.setItem("routine", JSON.stringify(draft.routine));
        break;
      }
      case DELETE_ROUTINE_FAILURE: {
        draft.isRoutineDeleting = false;
        draft.deleteRoutineErrorReason = action.error;
        break;
      }

      case TOGGLE_TRAINING_REQUEST: {
        draft.trainingToggled = false;
        draft.isTrainingToggling = true;
        draft.togglingTrainingErrorReason = ''
        break;
      };
      case TOGGLE_TRAINING_SUCCESS: {
        draft.trainingToggled = true;
        draft.isTrainingToggling = false;
        draft.routine[action.data.date][action.data.routineIndex].trainings[action.data.trainingIndex].done = action.data.result;
        localStorage.setItem("routine", JSON.stringify(draft.routine));
        break;
      };
      case TOGGLE_TRAINING_FAILURE: {
        draft.isTrainingToggling = false;
        draft.togglingTrainingErrorReason = action.error;
        break;
      };

      case UPDATE_ROUTINENAME_REQUEST: {
        draft.routineNameUpdated = false;
        draft.isRoutineNameUpdating = true;
        draft.updateRoutineNameErrorReason = '';
        break;
      }
      case UPDATE_ROUTINENAME_SUCCESS: {
        draft.routineNameUpdated = true;
        draft.isRoutineNameUpdating = false;
        draft.routine[action.data.date][action.data.routineIndex].routineName = action.data.routineName;
        localStorage.setItem("routine", JSON.stringify(draft.routine));
        break;
      }
      case UPDATE_ROUTINENAME_FAILURE: {
        draft.isRoutineNameUpdating = false;
        draft.updateRoutineNameErrorReason = action.error;
        break;
      }

      case UPDATE_TRAININGCOUNT_REQUEST: {
        draft.trainingCountUpdated = false;
        draft.isTrainingCountUpdating = true;
        draft.updateTrainingCountErrorReason = '';
        break;
      }
      case UPDATE_TRAININGCOUNT_SUCCESS: {
        draft.trainingCountUpdated = true;
        draft.isTrainingCountUpdating = false;
        draft.routine[action.data.date][action.data.routineIndex].trainings[action.data.trainingIndex].count = action.data.count;
        localStorage.setItem("routine", JSON.stringify(draft.routine));
        break;
      }
      case UPDATE_TRAININGCOUNT_FAILURE: {
        draft.isTrainingCountUpdating = false;
        draft.updateTrainingCountErrorReason = action.error;
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
        localStorage.setItem("memo", JSON.stringify(draft.memo));
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
        // 마지막 메모 삭제라면 전체 삭제
        if(draft.memo[action.data.date].length === 1)
          delete draft.memo[action.data.date];
        // 마지막이 아니라 index를 찾아서 삭제해야 한다면
        else{
          const index = draft.memo[action.data.date].findIndex(value => value.key === action.data.key);
          draft.memo[action.data.date].splice(index,1);
        }
        localStorage.setItem("memo", JSON.stringify(draft.memo));
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
        localStorage.setItem("memo", JSON.stringify(draft.memo));
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
        draft.weight[action.data.date] = action.data.weight;
        localStorage.setItem("weight", JSON.stringify(draft.weight));
        break;
      }
      case ADD_WEIGHT_FAILURE: {
        draft.isWeightAdding = false;
        draft.addWeightErrorReason = action.error;
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
