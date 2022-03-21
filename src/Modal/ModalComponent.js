import { Modal, Button } from "react-bootstrap";

const ModalComponent = (props) => {

    return (
        <>
        <Modal.Header>
          <Modal.Title>Modal heading</Modal.Title>
          <Button onClick={props.handleClose} closeButton>X</Button>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
        </>
    )
  };
  
  export default ModalComponent;