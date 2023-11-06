import { useEffect, useState } from "react";
import { getAllGallery } from "../../api/wishlist/WishListApiService";

import GridCardComponent from "../../components/gridcard";

import "./index.css";

import { Button } from "react-bootstrap";
import Handler from "./handler";
import ModalContent from "./modalcontent";

function Gallery() {
  const [gallery, setGallery] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({ title: "", imageFile: null });
  const [preview, setPreview] = useState();

  const stateAccessor = {
    gallery: {
      get: gallery,
      set: setGallery,
    },
    modalshow: {
      get: modalShow,
      set: setModalShow,
    },
    formdata: {
      get: formData,
      set: setFormData,
    },
    preview: {
      get: preview,
      set: setPreview,
    },
  };

  const handler = Handler(stateAccessor);
  const modalcontent = ModalContent(stateAccessor, handler);

  async function getGallery() {
    try {
      const res = await getAllGallery();

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
        <div className="d-flex flex-row-reverse">
          <Button
            variant="primary"
            className="btn-add"
            onClick={() => setModalShow(true)}
          >
            Add
          </Button>
        </div>
        <div>
          <GridCardComponent
            data={gallery}
            modalcontent={modalcontent}
            handler={handler}
            state={stateAccessor}
          />
        </div>
      </div>
      <div>{modalcontent.create}</div>
    </>
  );
}

export default Gallery;
