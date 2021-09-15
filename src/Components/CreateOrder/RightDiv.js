import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import "./CreateOrder.css";

const RightDiv = () => {
  return (
    <>
      <h3>Orders</h3>
      <Container className="OrderListContainer">
        <div className="InsideOrderListContainer">
          <Row>
            <Col>
              <h6>OrderId - </h6>
            </Col>
            <Col>
              <h6>5616516</h6>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>First Name -</p>
            </Col>
            <Col>
              <p>paliwal hardware</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Address -</p>
            </Col>
            <Col>
              <p>10 a sheetal Nagar</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Phone No. -</p>
            </Col>
            <Col>
              <p>9825545665</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>weight -</p>
            </Col>
            <Col>
              <p>180kg</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Delivery Date -</p>
            </Col>
            <Col>
              <p>12-09-2021</p>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
};

export default RightDiv;
