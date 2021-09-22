import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Axios from "axios";

const BillingMore = () => {
  const { id } = useParams();
  const [item, setItem] = useState([]);

  const fetchData = async () => {
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      await Axios.get(`http://65.0.129.68/api/v1/BillingManagement/get/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        const data = response.data.res;
        setItem(data);
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <>
      <Container
        style={{ backgroundColor: "grey" }}
        className="col-xl-6 col-lg-6 col-md-6 col-sm-6 p-auto"
      >
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3">firmName</Col>
            <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              Brilliance
            </Col>
          </Row>
          <Row>
            <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3">firmName</Col>
            <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              Brilliance
            </Col>
          </Row>
          <Row>
            <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3">firmName</Col>
            <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              Brilliance
            </Col>
          </Row>
          <Row>
            <Col className="col-xl-3 col-lg-3 col-md-3 col-sm-3">firmName</Col>
            <Col className="col-xl-1 col-lg-1 col-md-1 col-sm-1">-</Col>
            <Col className="col-xl-7 col-lg-7 col-md-7 col-sm-7">
              Brilliance
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default BillingMore;
