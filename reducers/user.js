import produce from "immer";

export const initialState = {
  id: 0,
  userRecord: [],
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

// Actions
// 더하는 Actions
export const AddRecordRequestAction = () => { 
  return({
    type: ADD_RECORD_REQUEST,
  });
};
export const AddRecordSuccessAction = () => { 
  return({
    type: ADD_RECORD_SUCCESS,
  });
};
export const AddRecordFailureAction = () => { 
  return({
    type: ADD_RECORD_FAILURE,
  });
};
// 삭제하는 Actions
export const DeleteRecordRequestAction = () => { 
  return({
    type: DELETE_RECORD_REQUEST,
  });
};
export const DeleteRecordSuccessAction = () => { 
  return({
    type: DELETE_RECORD_SUCCESS,
  });
};
export const DeleteRecordFailureAction = () => { 
  return({
    type: DELETE_RECORD_FAILURE,
  });
};
// 업데이트하는 Actions
export const UpdateRecordRequestAction = () => { 
  return({
    type: UPDATE_RECORD_REQUEST,
  });
};
export const UpdateRecordSuccessAction = () => { 
  return({
    type: UPDATE_RECORD_SUCCESS,
  });
};
export const UpdateRecordFailureAction = () => { 
  return({
    type: UPDATE_RECORD_FAILURE,
  });
};


const reducer = (state = initialState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case ADD_RECORD_REQUEST: {
        break;
      }
      case ADD_RECORD_SUCCESS: {
        break;
      }
      case ADD_RECORD_FAILURE: {
        break;
      }
      case DELETE_RECORD_REQUEST: {
        break;
      }
      case DELETE_RECORD_SUCCESS: {
        break;
      }
      case DELETE_RECORD_FAILURE: {
        break;
      }
      case UPDATE_RECORD_REQUEST: {
        break;
      }
      case UPDATE_RECORD_SUCCESS: {
        break;
      }
      case UPDATE_RECORD_FAILURE: {
        break;
      }
      default:
        break;
    }
  });
};

export default reducer;
