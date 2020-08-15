import React, {useState} from "react";
import PropTypes from 'prop-types';

function Modal(props) {
  const [password, setPassword] = useState('');

  return <div className="modal show" tabIndex="-1" role="dialog" style={{display: "block", paddingRight: "12px"}}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Enter Password</h5>
          <button type="button" className="close" onClick={() => props.closeModal()} aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <form onSubmit={() => props.send(props.serviceName, password)}>
          <div className="modal-body">
            <p>Please enter your Unix-Password.</p>
            <input type={'password'} onChange={(event) => setPassword(event.target.value)}/>
          </div>
          <div className="modal-footer">
            <input type="submit" className="btn btn-primary" value="Send"/>
            <button type="button" className="btn btn-secondary" onClick={() => props.closeModal()}>Close</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}

Modal.propTypes = {
  send: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  serviceName: PropTypes.string.isRequired,
}

export default Modal;