/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Fade from 'react-bootstrap/Fade';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { fetchPost, deletePost, updatePost } from '../actions/index';

const initialEditingState = {
  title: false,
  tags: false,
  content: false,
  cover_url: false,
};

function Post(props) {
  const [loaded, setLoaded] = useState(false);
  const [editLine, setEditLine] = useState('');
  const [editField, setEditField] = useState('');
  const [editing, setEditing] = useState(initialEditingState);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const current = useSelector((reduxState) => reduxState.posts.current);
  const email = useSelector((reduxState) => reduxState.auth.email);

  useEffect(() => {
    const fetch = async () => {
      await dispatch(fetchPost(params.postID));
      setLoaded(true);
    };
    fetch();
  }, []);

  const onDeleteClick = () => {
    dispatch(deletePost(params.postID, navigate));
  };

  const onEditClick = (event) => {
    if (email !== current?.author?.email) {
      return;
    }
    const section = event.currentTarget.dataset.id;
    console.log(section);
    setEditLine(current[section]);
    // to dynamically set fieldnames use bracket notation
    setEditing((prevState) => ({ ...prevState, [section]: !prevState[section] }));
  };

  const onEditChange = (event) => {
    const section = event.currentTarget.dataset.id;
    const { value } = event.currentTarget;
    setEditLine(value);
    setEditField(section);
  };

  const onBlur = (event) => {
    event.stopPropagation();
    const newPost = { ...current };
    newPost[editField] = editLine;
    dispatch(updatePost(newPost));
    setEditLine('');
    setEditField('');
    setEditing(initialEditingState);
  };

  const renderPost = () => {
    let title, tags, content, cover;

    const defaultInputProps = {
      value: editLine,
      onBlur,
      onChange: onEditChange,
      ref: ((input) => {
        if (input) {
          input.focus();
        }
      }),
    };

    if (editing.title) {
      title = <input {...defaultInputProps} data-id="title" />;
    } else {
      title = <h4 onClick={onEditClick} data-id="title" className="card-title">{current.title}</h4>;
    }

    if (editing.tags) {
      tags = <input {...defaultInputProps} data-id="tags" />;
    } else {
      tags = <p onClick={onEditClick} data-id="tags" className="card-text"><small className="text-muted"> {current.tags}</small></p>;
    }

    if (editing.content) {
      content = (
        <div>
          <textarea {...defaultInputProps} rows={6} data-id="content" /><br />
          <i>markdown allowed</i>
        </div>
      );
    } else {
      content = (
        <div onClick={onEditClick} data-id="content">
          <ReactMarkdown className="card-text" children={current.content} />
        </div>
      );
    }
    if (editing.cover_url) {
      cover = <input {...defaultInputProps} data-id="cover" />;
    } else {
      cover = <Card.Img onClick={onEditClick} data-id="cover_url" variant="top" src={current.cover_url} />;
    }

    return (
      <Card style={{ width: '90%' }}>
        {cover}
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {tags}
          {content}
          author: {(current.author) ? current.author.email : ''}
        </Card.Body>
      </Card>
    );
  };

  if (!current) {
    return <div />;
  } else {
    return (
      <Fade in={loaded}>
        <Container>
          <ButtonToolbar>
            <Link to="/"><Button key="signin-button" variant="link" type="submit"><FontAwesomeIcon icon={faArrowCircleLeft} /></Button></Link>
            {(current?.author && (email === current?.author?.email))
              ? <Button onClick={onDeleteClick} key="signup-button" variant="link" type="submit"><FontAwesomeIcon icon={faTrashAlt} /></Button>
              : ''}
          </ButtonToolbar>
          {renderPost()}
        </Container>
      </Fade>
    );
  }
}

export default Post;
