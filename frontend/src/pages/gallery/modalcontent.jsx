import { Alert, Form } from "react-bootstrap";

function ModalContent(state, handler) {
  const modalCreate = () => {
    return (
      <>
        <div className="d-flex justify-content-center">
          {state.formdata.get.imageFile && (
            <img src={state.preview.get} className="img-preview" />
          )}
        </div>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control
            type="file"
            name="imageFile"
            onChange={handler.createchange}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={state.formdata.get.title}
            onChange={handler.createchange}
          />
        </Form.Group>
      </>
    );
  };

  const modalDelete = (title) => {
    const message = `Are you sure you want to delete the album '${title}'`;
    return <Alert variant={"danger"}>{message}</Alert>;
  };

  return {
    create: modalCreate(),
    delete: (title) => modalDelete(title),
  };
}

export default ModalContent;
