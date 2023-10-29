import { useEffect, useState } from "react";
import {
  createGallery,
  getAllGallery,
} from "../../api/wishlist/WishListApiService";

import GridCardComponent from "../../components/gridcard";
import ModalComponent from "../../components/model";

import "./index.css";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function Gallery() {
  const [gallery, setGallery] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({ title: "", imageFile: null });

  const handleChange = (e) => {
    const { name } = e.target;
    let data =
      name === "imageFile"
        ? URL.createObjectURL(e.target.files[0])
        : e.target.value;

    setFormData((prevFormData) => ({ ...prevFormData, [name]: data }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await createGallery(formData.title, formData.imageFile);

      if (res.status == 201) {
        console.log("Success");
      }
    } catch (err) {
      console.error(err);
    }
  };

  function modalBody() {
    return (
      <Form>
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Cover Image</Form.Label>
          <Form.Control type="file" name="imageFile" onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <img src={formData.imageFile} />
      </Form>
    );
  }

  const modaldetails = {
    title: "Create Album",
    body: modalBody(),
    submit: handleSubmit(),
  };

  async function getGallery() {
    try {
      const res = await getAllGallery();

      // console.log("This is res: ", res);
      // console.log("this is res data: ", res.data[0].title);

      if (res.status == 200) {
        setGallery(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getGallery();
  }, []);

  return (
    <>
      <div className="header">
        <h1>Gallery</h1>
      </div>
      <div className="grid-container">
        <Button
          variant="primary"
          className="btn-add"
          onClick={() => setModalShow(true)}
        >
          Add
        </Button>
        <div>
          <GridCardComponent />
        </div>
      </div>
      <div>
        <ModalComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          modaldetails={modaldetails}
        />
      </div>
      <img src={formData.imageFile} />

      {/* <ul>
            {gallery?.map((gal, index) => (
                <li key={index}>{gal.title}</li>
            ))}
        </ul> */}
    </>
  );
}

export default Gallery;
