import React from "react";

const Modal = ({ hideModal, children, title }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={hideModal}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{title}</p>
        </header>
        {children}
      </div>
    </div>
  );
};

export default Modal;
