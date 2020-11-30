import { combineReducers } from 'redux';
import member from './members/memberReducer';
import event from './events/eventReducer';

export default combineReducers({
  member,
  event,
});
