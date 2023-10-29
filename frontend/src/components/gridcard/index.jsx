import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";


import "./index.css";

import meow from "../../assets/meow.png";

function GridCardComponent() {
  return (
    <div>
      <Row xs={1} md={4} className="g-4 grid-card-row">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Col key={idx} className="card-col">
            <Card as="a" href="https://stackoverflow.com/questions/18913559/reactjs-anchor-tag-link" className="card-parent">
              <Card.Img variant="top" src={meow} className="card-img" />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                {/* <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text> */}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GridCardComponent;
