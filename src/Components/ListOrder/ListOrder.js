import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ListOrder.css";
import Axios from "axios";
import LoaderComp from "../Loader/LoaderComp";

const ListOrder = ({ match }) => {
  const [item, setItem] = useState([]);

  useEffect(
    (e) => {
      setTimeout(async () => {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
        await Axios.get("http://65.0.129.68/api/v1/BillingManagement/all", {
          headers: { Authorization: `Bearer ${token}` },
        }).then((res) => {
          const response = res.data;
          const finalResponse = response.output.results;
          setItem(finalResponse);
          console.log(item);
        });
      }, 1000);
    },
    [item]
  );

  return (
    <>
      {item.length !== 0 ? (
        <Container>
          <>
            <Row style={{ marginTop: "20px" }}>
              <h4 style={{ color: "#7d8488" }}>Orders</h4>
            </Row>
            <Row>
              {item.map((val, index) =>
                val.products.map((v, ind) => (
                  <>
                    <Col>
                      <Container
                        className=" my-2 orderDiv col-xs-8 col-sm-8 col-md-6 col-lg-6 col-xl-6 p-3"
                        style={
                          Math.abs(ind % 2) == 1
                            ? { backgroundColor: "#cddde8" }
                            : { backgroundColor: "lightgrey" }
                        }
                      >
                        <Row>
                          <Col>
                            <Row style={{ fontSize: "15px" }}>
                              <Col className="col-lg-4 col-sm-4">
                                <h4 className="main_heading">OrderId</h4>
                              </Col>
                              <Col className="col-lg-1 col-sm-1">-</Col>
                              <Col className="col-lg-6 col-sm-6 main_content">
                                {val.orderId}
                              </Col>
                            </Row>
                          </Col>
                          <Col>
                            <Col
                              className="d-flex me-auto"
                              style={{ fontSize: "15px", align: "right" }}
                            >
                              <div className="ms-auto d-flex">
                                <p className="heading mr-1">
                                  <b>Deliver Date</b>
                                </p>
                                <p>-</p>
                                <p>{val.deliveryDate}</p>
                              </div>
                            </Col>
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col className="col-lg-4 col-sm-4">
                            <h6 className="heading">
                              Client Name <i class="fas fa-user-tie"></i>
                            </h6>
                          </Col>
                          <Col className="col-lg-1 col-sm-1">-</Col>
                          <Col className="col-lg-6 col-sm-6 content">
                            {val.clientName}
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col className="col-lg-4 col-sm-4">
                            <h6 className="heading">Address</h6>
                          </Col>
                          <Col className="col-lg-1 col-sm-1">-</Col>
                          <Col className="col-lg-6 col-sm-6 content">
                            {val.address}
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col className="col-lg-4 col-sm-4">
                            <h6 className="heading">ProductId</h6>
                          </Col>
                          <Col className="col-lg-1 col-sm-1">-</Col>
                          <Col className="col-lg-6 col-sm-6  content">
                            {v.productId}
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col className="col-lg-4 col-sm-4">
                            <h6 className="heading">Products</h6>
                          </Col>
                          <Col className="col-lg-1 col-sm-1">-</Col>
                          <Col className="col-lg-6 col-sm-6 content">
                            {v.selectProduct}
                            {JSON.stringify(v.select_product)}
                          </Col>
                        </Row>
                        <Row className="pt-1">
                          <Col className="col-lg-4 col-sm-4">
                            <h6 className="heading">Weight</h6>
                          </Col>
                          <Col className="col-lg-1 col-sm-1">-</Col>
                          <Col className="col-lg-6 col-sm-6 content">
                            {v.weight}
                          </Col>
                        </Row>
                        <Row>
                          <button
                            className="ms-auto"
                            style={{
                              width: "auto",
                              marginRight: "10px",
                              border: "none",
                              backgroundColor: "transparent",
                            }}
                          >
                            <Link
                              style={{ color: "#0e2434" }}
                              to={`${match}/listOrder/${val._id}`}
                              style={{
                                textDecoration: "none",
                                color: "#0e2434",
                                fontSize: "14px",
                              }}
                            >
                              View More..
                            </Link>
                          </button>
                        </Row>
                      </Container>
                    </Col>
                  </>
                ))
              )}
            </Row>
          </>
        </Container>
      ) : (
        <Container
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "grid",
            marginTop: "20%",
          }}
        >
          <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
        </Container>
      )}
    </>
  );
};

export default ListOrder;
