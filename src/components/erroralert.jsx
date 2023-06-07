import React from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import { clearError } from '../actions';

function ErrorAlert(props) {
  return (
    <div
      aria-live="polite"
      aria-atomic="true"
    >
      <Toast
        show={props.error}
        animation
        onClose={props.clearError}
        style={{
          position: 'fixed',
          zIndex: 9000,
          top: 50,
          right: 20,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">An Error Occured</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{props.error ? props.error : ''}</Toast.Body>
      </Toast>
    </div>

  );
}

function mapStateToProps(state) {
  return { error: state.error };
}

export default connect(mapStateToProps, { clearError })(ErrorAlert);
