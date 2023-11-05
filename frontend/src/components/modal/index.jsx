import { Button, Form, Modal } from "react-bootstrap";

function ModalComponent(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={props.submit}>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant={props.button.color} type="submit">
            {props.button.text}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ModalComponent;
