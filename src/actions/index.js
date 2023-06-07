import axios from 'axios';

// keys for actiontypes
export const ActionTypes = {
  FETCH_POSTS: 'FETCH_POSTS',
  CREATE_POST: 'CREATE_POST',
  FETCH_POST: 'FETCH_POST',
  DELETE_POST: 'DELETE_POST',
  UPDATE_POST: 'UPDATE_POST',
  CLEAR_CURRENT: 'CLEAR_CURRENT',
  AUTH_USER: 'AUTH_USER',
  DEAUTH_USER: 'DEAUTH_USER',
  AUTH_ERROR: 'AUTH_ERROR',
  ERROR_SET: 'ERROR_SET',
  ERROR_CLEAR: 'ERROR_CLEAR',
};

const ROOT_URL = 'http://localhost:9090/api';
// const ROOT_URL = 'http://platform.cs52.me/api';

const API_KEY = '?key=dmouth';
const ERROR_TIMEOUT = 5000;

export function clearError() {
  return {
    type: ActionTypes.ERROR_CLEAR,
  };
}

export function newError(message) {
  return (dispatch) => {
    setTimeout(() => { dispatch(clearError()); }, ERROR_TIMEOUT);
    dispatch({
      type: ActionTypes.ERROR_SET,
      message,
    });
  };
}

export function authError(message) {
  return (dispatch) => {
    setTimeout(() => { dispatch(clearError()); }, ERROR_TIMEOUT);
    dispatch({
      type: ActionTypes.AUTH_ERROR,
      message,
    });
  };
}

export function fetchPosts() {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts${API_KEY}`);
      dispatch({ type: ActionTypes.FETCH_POSTS, payload: response.data });
    } catch (error) {
      dispatch(newError(`failed to fetch posts: ${error}`));
    }
  };
}

export function createPost(props, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/posts${API_KEY}`, props, { headers: { authorization: localStorage.getItem('token') } });
      console.log(`created: ${response}`);
      // dispatch({ type: ActionTypes.CREATE_POST, payload: response.data });
      navigate('/');
    } catch (error) {
      dispatch(newError(`failed to create post: ${error}`));
    }
  };
}

export function updatePost(post) {
  return (dispatch) => {
    axios.put(`${ROOT_URL}/posts/${post.id}${API_KEY}`, post, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        dispatch({ type: ActionTypes.UPDATE_POST, payload: response.data });
      })
      .catch((error) => {
        dispatch(newError(`failed to update post: ${error}`));
      });
  };
}

export function clearCurrent() {
  return { type: ActionTypes.CLEAR_CURRENT };
}

export function fetchPost(id) {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);
      dispatch({ type: ActionTypes.FETCH_POST, payload: response.data });
    } catch (error) {
      dispatch(newError(`failed to fetch post: ${error}`));
    }
  };
}

export function deletePost(id, navigate) {
  return (dispatch) => {
    axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`, { headers: { authorization: localStorage.getItem('token') } })
      .then((response) => {
        console.log(`deleted: ${response}`);
        // dispatch({ type: ActionTypes.DELETE_POST, payload: response.data });
        navigate('/');
      })
      .catch((error) => {
        dispatch(newError(`failed to delete post: ${error}`));
      });
  };
}

export function signinUser(fields, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/signin`, fields);
      dispatch({ type: ActionTypes.AUTH_USER, authorname: response.data.authorname, email: response.data.email });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('authorname', response.data.authorname);
      localStorage.setItem('email', response.data.email);
      navigate('/');
    } catch (error) {
      dispatch(authError(`Sign In Failed: ${error}`));
    }
  };
}

export function signupUser(fields, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.post(`${ROOT_URL}/signup`, fields);
      dispatch({ type: ActionTypes.AUTH_USER, authorname: response.data.authorname, email: response.data.email });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('authorname', response.data.authorname);
      localStorage.setItem('email', response.data.email);
      navigate('/');
    } catch (error) {
      dispatch(authError(`Sign Up Failed: ${error}`));
    }
  };
}

export function signoutUser(navigate) {
  return (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('authorname');
    localStorage.removeItem('email');
    dispatch({ type: ActionTypes.DEAUTH_USER });
    navigate('/');
  };
}
