import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.modaldetails.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.modaldetails.body}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>Close</Button>
        {/* <Button variant="primary" onClick={props.modaldetails.submit}>Submit</Button> */}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalComponent;

