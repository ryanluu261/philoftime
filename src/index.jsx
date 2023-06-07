import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { ActionTypes } from './actions';

import './style.scss';

import App from './components/app';

import rootReducer from './reducers';

const store = configureStore({
  reducer: rootReducer,
});

const token = localStorage.getItem('token');
const authorname = localStorage.getItem('authorname');
const email = localStorage.getItem('email');
if (token) {
  store.dispatch({ type: ActionTypes.AUTH_USER, authorname, email });
}

// const colors = {
//   brand: {
//     900: '#1a365d',
//     800: '#153e75',
//     700: '#2a69ac',
//   },
// };

// const theme = extendTheme({ colors });

// we now wrap App in a Provider
const root = createRoot(document.getElementById('main'));
root.render(
  <Provider store={store}>
    {/* <ChakraProvider theme={theme}> */}
    <App />
    {/* </ChakraProvider> */}
  </Provider>,
);
