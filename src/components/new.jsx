/* eslint-disable camelcase */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { createPost } from '../actions';

function New(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [cover_url, setCoverUrl] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(createPost({
      title, tags, content, cover_url,
    }, navigate));
  };

  return (
    <Container id="newpost">
      <h3>Create A New Post</h3>

      <Form onSubmit={onSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control onChange={(e) => { setTitle(e.target.value); }} value={title} type="text" />
        </Form.Group>

        <Form.Group controlId="tags">
          <Form.Label>Tags</Form.Label>
          <Form.Control onChange={(e) => { setTags(e.target.value); }} value={tags} type="text" />
        </Form.Group>

        <Form.Group controlId="content">
          <Form.Label>Content</Form.Label>
          <Form.Control onChange={(e) => { setContent(e.target.value); }} value={content} as="textarea" rows="6" />
        </Form.Group>

        <Form.Group controlId="cover_url">
          <Form.Label>Cover Image URL</Form.Label>
          <Form.Control onChange={(e) => { setCoverUrl(e.target.value); }} value={cover_url} type="text" />
        </Form.Group>

        <ButtonToolbar>
          <Button variant="link" type="button">
            <Link to="/">
              <FontAwesomeIcon icon={faTrashAlt} />
            </Link>
          </Button>
          <Button variant="link" type="submit">
            <FontAwesomeIcon icon={faSave} />
          </Button>
        </ButtonToolbar>
      </Form>
    </Container>

  );
}

export default New;
