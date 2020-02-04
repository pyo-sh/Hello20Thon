import { combineReducers } from 'redux';
import user from './user';
import youtube from './youtube';
import day from './day';

const rootReducer = combineReducers({
    user,
    youtube,
    day
});

export default rootReducer;