import React, {useState} from "react";

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
        <div className="modal-body">
          <p>Please enter your Unix-Password.</p>
          <input type={'password'} onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => props.send(props.serviceName, password)}>Send</button>
          <button type="button" className="btn btn-secondary" onClick={() => props.closeModal()}>Close</button>
        </div>
      </div>
    </div>
  </div>
}

export default Modal;