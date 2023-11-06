import { Alert, Form } from "react-bootstrap";
import ModalComponent from "../../components/modal";

function ModalContent(state, handler) {
  const onHide = () => {
    state.modalshow.set(false);
    state.formdata.set({ title: "", imageFile: null });
  };

  const modalCreate = () => {
    return (
      <ModalComponent
        show={state.modalshow.get}
        onHide={() => onHide()}
        title="Create Album"
        body={
          <>
            <div className="d-flex justify-content-center">
              {state.preview.get && (
                <img
                  src={URL.createObjectURL(state.preview.get)}
                  className="img-preview"
                />
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
        }
        submit={handler.createsubmit}
        button={{
          color: "primary",
          text: "Submit",
        }}
      />
    );
  };

  const modalUpdate = (formdata, modalstate) => {
    const onHide = () => {
      modalstate.set(false);
      formdata.set({ title: "", imageFile: null });
      state.preview.set(null);
    };

    let image;

    if (state.preview.get) {
      image = URL.createObjectURL(state.preview.get);
    } else {
      image = `data:image/jpeg;base64,${formdata.get.imageFile}`;
    }

    return (
      <ModalComponent
        show={modalstate.get}
        onHide={() => onHide()}
        title="Update Album"
        body={
          <>
            <div className="d-flex justify-content-center">
              <img src={image} className="img-preview" />
            </div>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Cover Image</Form.Label>
              <Form.Control
                type="file"
                name="imageFile"
                onChange={handler.updatechange(formdata)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={formdata.get.title}
                onChange={handler.updatechange(formdata)}
              />
            </Form.Group>
          </>
        }
        submit={handler.updatesubmit(formdata, modalstate)}
        button={{
          color: "warning",
          text: "Update",
        }}
      />
    );
  };

  const modalDelete = (formdata, modalstate) => {
    const message = `Are you sure you want to delete the album '${formdata.title}'`;
    return (
      <>
        <ModalComponent
          show={modalstate.get}
          onHide={() => modalstate.set(false)}
          title="Delete Confirmation"
          body={<Alert variant={"danger"}>{message}</Alert>}
          submit={handler.delete(formdata.id, modalstate.set)}
          button={{
            color: "danger",
            text: "Delete",
          }}
        />
      </>
    );
  };

  return {
    create: modalCreate(),
    update: (formdata, modalstate) => modalUpdate(formdata, modalstate),
    delete: (formdata, modalstate) => modalDelete(formdata, modalstate),
  };
}

export default ModalContent;
