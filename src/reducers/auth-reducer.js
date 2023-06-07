/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { ActionTypes } from '../actions';

const initialState = { authenticated: false, authorname: '', email: '' };

const AuthReducer = produce((draftState, action = {}) => {
  switch (action.type) {
    case ActionTypes.AUTH_USER:
      draftState.authenticated = true;
      draftState.authorname = action.authorname;
      draftState.email = action.email;
      break;
    case ActionTypes.DEAUTH_USER:
      draftState.authenticated = false;
      draftState.authorname = '';
      draftState.email = '';
      break;
    case ActionTypes.AUTH_ERROR:
      draftState.authenticated = false;
      draftState.authorname = '';
      draftState.email = '';
      break;
    default:
      break;
  }
}, initialState);

export default AuthReducer;
