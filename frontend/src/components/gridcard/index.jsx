import { useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

import "./index.css";

import meow from "../../assets/meow.png";
import ModalComponent from "../modal";

function GridCardComponent(props) {
  const [modalShow, setModalShow] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    imageFile: null,
  });

  const onClickDelete = (data) => {
    setModalShow(true);
    setFormData({ id: data.id, title: data.title, imageFile: data.image });
  };

  return (
    <>
      <div>
        <Row xs={1} md={4} className="g-4 grid-card-row">
          {/* {Array.from({ length: 1 }).map((_, idx) => ( */}
          {props.data?.map((gal, idx) => (
            <Col key={idx} className="card-col">
              <Card className="card-parent">
                <Card.Img
                  variant="top"
                  src={`data:image/jpeg;base64,${gal.image}`}
                  className="card-img"
                />
                <Card.Body>
                  <Card.Title>{gal.title}</Card.Title>
                </Card.Body>

                <Card.Footer className="text-muted">
                <Card.Link
                    href="https://stackoverflow.com/questions/18913559/reactjs-anchor-tag-link"
                    className="card-icon"
                  >
                    <FaEye />
                  </Card.Link>
                  <Card.Link href="#" className="card-icon">
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
        <ModalComponent
          show={modalShow}
          onHide={() => setModalShow(false)}
          title="Delete Confirmation"
          body={props.modalcontent.delete(formData.title)}
          submit={props.handler.delete(formData.id, setModalShow)}
          button={{
            color: "danger",
            text: "Delete",
          }}
        />
      </div>
    </>
  );
}

export default GridCardComponent;
