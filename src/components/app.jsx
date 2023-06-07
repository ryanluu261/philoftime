import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import NavBar from './navbar';
import Post from './post';
import Posts from './posts';
import New from './new';
import SignIn from './signin';
import SignUp from './signup';
import RequireAuth from './requireAuth';
import ErrorAlert from './erroralert';

function App(props) {
  return (
    <Router>
      <div>
        <NavBar />
        <ErrorAlert />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts/new" element={<RequireAuth> <New /></RequireAuth>} />
          <Route path="/posts/:postID" element={<Post />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<div>path not found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
