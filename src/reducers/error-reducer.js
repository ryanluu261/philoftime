import { ActionTypes } from '../actions/index';

export default (state = null, action = {}) => {
  switch (action.type) {
    case ActionTypes.ERROR_SET:
      return action.message;
    case ActionTypes.AUTH_ERROR:
      return action.message;
    case ActionTypes.ERROR_CLEAR:
      return null;
    default:
      return state;
  }
};
