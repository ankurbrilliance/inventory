import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./CreateOrder.css";

const Checkbox = () => {
  return (
    <div>
      <Container className="checkbox">
        <Row>
          <Col>
            <Form.Check
              className="radio"
              type="radio"
              aria-label="option 1"
              label="GPC"
            />
          </Col>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="GPS"
            />
          </Col>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="GP Roll"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="GC"
            />
          </Col>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="HR"
            />
          </Col>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="CR"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="Color Col"
            />
          </Col>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="Profile Sheet"
            />
          </Col>
          <Col>
            <Form.Check
              className="radio"
              id="radio"
              type="radio"
              aria-label="option 1"
              label="Acce."
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Checkbox;
