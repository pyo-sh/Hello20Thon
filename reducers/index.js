import { combineReducers } from 'redux';
import user from './user';
import youtube from './youtube';
const rootReducer = combineReducers({
    user,
    youtube
});

export default rootReducer;