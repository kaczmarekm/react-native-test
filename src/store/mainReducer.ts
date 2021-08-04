import { combineReducers } from 'redux';

import { queueReducer } from '../queue/reducer';

export default combineReducers({
  queue: queueReducer,
});
