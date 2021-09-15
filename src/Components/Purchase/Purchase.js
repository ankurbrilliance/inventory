import React, { useState, useEffect } from "react";
import "./Purchase.css";
import { Container, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from "axios";
import LoaderComp from "../Loader/LoaderComp";

const Purchase = ({ match }) => {
  const [item, setItem] = useState([]);

  useEffect(async () => {
    setTimeout(async () => {
      await Axios.get("http://65.0.129.68/api/v1/purchaseStock/get").then(
        (response) => {
          console.log(response);
          setItem(response.data.res);
        }
      );
    }, 1000);
  });
  return (
    <>
      <Container className="outer_container">
        <Container className="heading_container mt-4 d-flex">
          <h4 className="purchase_heading">Purchase Stocks</h4>

          <Link className="ms-auto" to={`${match}/purchase_order`}>
            <button className="purchase_button">
              <i className="fas fa-plus m-1"></i>Purchase
            </button>
          </Link>
        </Container>
        {item.length > 0 ? (
          <Container className="list_container mt-4">
            <>
              <Row>
                {item.map((val, ind) =>
                  val.products.map((v, i) => (
                    <Col
                      className="col-lg-6 col-md-8 col-sm-12 col-xl-6 mb-4"
                      key={v}
                    >
                      <Container
                        className="detail_container py-3 pl-0"
                        style={
                          Math.abs(ind % 2) == 1
                            ? { backgroundColor: "#cddde8" }
                            : { backgroundColor: "lightgrey" }
                        }
                      >
                        <div className="d-flex mb-2">
                          <Col className="content_heading col-lg-4">
                            Purchase Number
                          </Col>
                          <Col className="col-lg-1">
                            <b>-</b>
                          </Col>
                          <Col className="col-lg-7">{val.purchaseNumber} </Col>
                          <Col>{ind}</Col>
                        </div>
                        <div className="d-flex mb-2">
                          <Col className="content_heading col-lg-4">Vendor</Col>
                          <Col className="col-lg-1">
                            <b>-</b>
                          </Col>
                          <Col className="col-lg-7 ">{val.vendor}</Col>
                        </div>
                        <div className="d-flex mb-2">
                          <Col className="content_heading col-lg-4">
                            Delivery Date
                          </Col>
                          <Col className="col-lg-1">
                            <b>-</b>
                          </Col>
                          <Col className="col-lg-7 ">{val.deliveryDate} </Col>
                        </div>
                        <div className="d-flex mb-2">
                          <Col className="content_heading col-lg-4">
                            Quantity
                          </Col>
                          <Col className="col-lg-1">
                            <b>-</b>
                          </Col>
                          <Col className="col-lg-7 ">{val.quantity} </Col>
                        </div>
                        <div className="d-flex mb-2">
                          <Col className="content_heading col-lg-4">
                            Rate/tn
                          </Col>
                          <Col className="col-lg-1">
                            <b>-</b>
                          </Col>
                          <Col className="col=lg-7">{val.rate_TN}</Col>
                        </div>
                        <div className="d-flex mb-2">
                          <Col className="content_heading col-lg-4">Remark</Col>
                          <Col className="col-lg-1">
                            <b>-</b>
                          </Col>
                          <Col className="col-lg-7">{val.note} </Col>
                        </div>
                        <div className="d-flex w-100 container-fluid">
                          <button
                            className="ms-auto"
                            style={{
                              backgroundColor: "transparent",
                              border: "none",
                            }}
                          >
                            <Link
                              style={{
                                textDecoration: "none",
                                color: "#0e2434",
                              }}
                              to={`${match}/purchase/${val._id}`}
                            >
                              View More..
                            </Link>
                          </button>
                        </div>
                      </Container>
                    </Col>
                  ))
                )}
              </Row>
            </>
          </Container>
        ) : (
          <>
            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "grid",
                marginTop: "30%",
              }}
            >
              <LoaderComp type={"Circles"} height={100} color={"#0e2434"} />
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default Purchase;
