import React, { useContext, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

const ConfirmationModalContext = React.createContext({});

const useModalShow = () => {
  const [show, setShow] = useState(false);

  const handleOnHide = () => {
    setShow(false);
  };

  return {
    show,
    setShow,
    onHide: handleOnHide,
  };
};

const ConfirmationModalContextProvider = (props) => {
  const { setShow, show, onHide } = useModalShow();
  const [content, setContent] = useState({ title: "", message: "" });
  const resolver = useRef();

  const handleShow = (title, message) => {
    setContent({
      title,
      message,
    });
    setShow(true);
    return new Promise(function (resolve) {
      resolver.current = resolve;
    });
  };

  const modalContext = {
    showConfirmation: handleShow,
  };

  const handleOk = () => {
    resolver.current && resolver.current(true);
    onHide();
  };

  const handleCancel = () => {
    resolver.current && resolver.current(false);
    onHide();
  };

  return (
    <ConfirmationModalContext.Provider value={modalContext}>
      {props.children}

      {content && (
        <Modal
          show={show}
          onHide={onHide}
          centered
          dialogClassName={`modal-md`}
        >
          <Modal.Header>
            <label>{content.title}</label>
          </Modal.Header>
          <Modal.Body>
            <label>{content.message}</label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="light" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleOk}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </ConfirmationModalContext.Provider>
  );
};

const useConfirmationModalContext = () => useContext(ConfirmationModalContext);

export { useModalShow, useConfirmationModalContext };

export default ConfirmationModalContextProvider;
