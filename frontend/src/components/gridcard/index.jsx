import { useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import "./index.css";

function GridCardComponent(props) {
  const [modalShowUpdate, setModalShowUpdate] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    imageFile: null,
  });

  const onClickUpdate = (data) => {
    setModalShowUpdate(true);
    setFormData({ id: data.id, title: data.title, imageFile: data.image });
  };
  const onClickDelete = (data) => {
    setModalShowDelete(true);
    setFormData({ id: data.id, title: data.title, imageFile: data.image });
  };

  return (
    <>
      <div>
        <Row xs={1} md={4} className="g-4 grid-card-row">
          {props.data?.map((gal, idx) => (
            <Col key={idx} className="card-col">
              <Card className="card-parent">
                <Card.Img
                  variant="top"
                  src={
                    gal.image instanceof File
                      ? URL.createObjectURL(gal.image)
                      : `data:image/jpeg;base64,${gal.image}`
                  }
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{gal.title}</Card.Title>
                </Card.Body>

                <Card.Footer className="text-muted">
                  <Card.Link
                    href={`/wishlist/${gal.id}`}
                    className="card-icon"
                  >
                    <FaEye />
                  </Card.Link>
                  <Card.Link
                    href="#"
                    className="card-icon"
                    onClick={() => onClickUpdate(gal)}
                  >
                    <FaEdit />
                  </Card.Link>
                  <Card.Link
                    href="#"
                    className="card-icon"
                    onClick={() => onClickDelete(gal)}
                  >
                    <FaTrash />
                  </Card.Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        {props.modalcontent.update(
          { get: formData, set: setFormData },
          {
            get: modalShowUpdate,
            set: setModalShowUpdate,
          }
        )}
      </div>
      <div>
        {props.modalcontent.delete(formData, {
          get: modalShowDelete,
          set: setModalShowDelete,
        })}
      </div>
    </>
  );
}

export default GridCardComponent;
