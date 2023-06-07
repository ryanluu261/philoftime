import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Fade from 'react-bootstrap/Fade';

import { Link } from 'react-router-dom';

import { fetchPosts, clearCurrent } from '../actions/index';

function Posts(props) {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const posts = useSelector((reduxState) => reduxState.posts.all);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchPosts());
      dispatch(clearCurrent());
      setLoaded(true);
    };
    fetch();
  }, []);

  function renderPosts() {
    return posts.map((post) => {
      return (
        <Link to={`/posts/${post.id}`} key={post.id}>
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={post.cover_url} />
            <Card.Body>
              <Card.Title>{(post.title) ? post.title : 'Untitled' }</Card.Title>
              {post.tags}
            </Card.Body>
          </Card>
        </Link>
      );
    });
  }

  return (
    <Container>
      <h3>Posts</h3>
      <Fade in={loaded}>
        <div className="posts">
          {renderPosts()}
        </div>
      </Fade>
    </Container>

  );
}

export default Posts;
