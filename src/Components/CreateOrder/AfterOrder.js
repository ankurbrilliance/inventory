import React from "react";
import "./CreateOrder.css";
import { Container, Col, Row, Badge } from "react-bootstrap";

const AfterOrder = () => {
  return (
    <>
      <div className="afterOrder">
        <Container className="insideAfterOrder">
          <Row>
            <h4>
              <Badge style={{ backgroundColor: "#2D3E4D" }} bg="secondary">
                New
              </Badge>
            </h4>
          </Row>
          <Row>
            <Col>
              <p>Product No. - 84648456</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <select
                className="inputSelect"
                aria-label="Default select example"
              >
                <option selected>Company</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
            <Col>
              <select
                className="inputSelect"
                aria-label="Default select example"
              >
                <option selected>Grade</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
            <Col>
              <select
                className="inputSelect"
                aria-label="Default select example"
              >
                <option selected>Top Color</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <select
                className="inputSelect"
                aria-label="Default select example"
              >
                <option selected>Coating</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
            <Col>
              <select
                className="inputSelect"
                aria-label="Default select example"
              >
                <option selected>temper</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
            <Col>
              <select
                className="inputSelect"
                aria-label="Default select example"
              >
                <option selected>Guard</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </Col>
          </Row>
        </Container>
        <Container className="subInputs">
          <Container className="insideInputs">
            <Row>
              <Col className="m-2">
                <Row>
                  <label for="thickness">Thickness</label>
                  <input type="text" className="subfields" />
                </Row>
              </Col>
              <Col className="m-2">
                <Row>
                  <label for="length">Length</label>
                  <input type="text" className="subfields" />
                </Row>
              </Col>
              <Col className="m-2">
                <Row>
                  <label for="width">Width</label>
                  <input type="text" className="subfields" />
                </Row>
              </Col>
            </Row>
            <Row>
              <Col className="m-1">
                <Row>
                  <label for="thickness">Pcs.</label>
                  <input type="text" className="subfields" />
                </Row>
              </Col>
              <Col className="m-1">
                <Row>
                  <label for="length">Weight</label>
                  <input type="text" className="subfields" />
                </Row>
              </Col>
              <Col className="m-1"></Col>
            </Row>
          </Container>
        </Container>
        <Container className="justify-content-center">
          <Row>
            <Col className="m-3">
              <Row>
                <label for="thickness">Rate(GST%)</label>
                <input type="text" className="subfields" />
              </Row>
            </Col>
            <Col className="m-3">
              <Row>
                <label for="thickness">Rate(Basic)</label>
                <input type="text" className="subfields" />
              </Row>
            </Col>
            <Col className="m-3">
              <Row className="mt-3 ml-auto col-1">
                <button className="addButton">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default AfterOrder;
