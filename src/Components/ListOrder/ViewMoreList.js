import React, { useState, useEffect } from "react";
import "./ListOrder.css";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Badge } from "react-bootstrap";
import LoaderComp from "../Loader/LoaderComp";
const ViewMoreList = () => {
  const [order, setOrder] = useState({});
  const [product, setProduct] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(async () => {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
        await Axios.get(`http://65.0.129.68/api/v1/sales/get/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((response) => {
          console.log(response.data.res);
          if (response.status === 200) {
            const alldata = response?.data?.res;
            setOrder(() => {
              setOrder(alldata);
            });
            setProduct(() => {
              setProduct(response?.data?.res?.products);
            });
            console.log(order);
            console.log(product);
          }
        });
      }, 2000);
    };
    fetchData();
  }, [id, order, product]);
  return (
    <>
      <Container
        className="outest mt-4 mb-4 p-4"
        style={{
          border: "3px dotted grey",
          borderRadius: "30px",
        }}
      >
        <Container className="col-lg-8 mt-4 m-auto p-auto">
          <Row className="mt-1">
            <Col className="_head">
              <h5>Order Id</h5>
            </Col>
            <Col>-</Col>
            <Col className="_cont">
              <h5>{order?.orderId}</h5>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">Firm Name</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.firmName}</Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">Client Name</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.firmName}</Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">Contact No.</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.phone_no}</Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">City</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.city}</Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">Address</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.address}</Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">Deliver Date</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.deliveryDate}</Col>
          </Row>
          <Row className="mt-1">
            <Col className="_head">Note</Col>
            <Col>-</Col>
            <Col className="_cont">{order?.note}</Col>
          </Row>
        </Container>
        {product.length > 0 ? (
          <Container className="col-lg-7 mt-4">
            {product.map((val, ind) => (
              <div className="afterOrder" key={ind}>
                <Container className="insideAfterOrder">
                  <Row>
                    <div className="d-flex">
                      <h4>
                        <Badge
                          style={{ backgroundColor: "#2D3E4D" }}
                          bg="secondary"
                        >
                          {val?.select_product}
                        </Badge>
                      </h4>
                    </div>
                  </Row>

                  <Row>
                    <Col>
                      <label>Company</label>
                      <div className="inputSelect p-2">
                        <p>{val?.company}</p>
                      </div>
                    </Col>
                    <Col>
                      <Col>
                        <label>Grade</label>
                        <div className="inputSelect p-2">
                          <p>{val?.grade}</p>
                        </div>
                      </Col>
                    </Col>
                    <Col>
                      <Col>
                        <label>Top Color</label>
                        <div className="inputSelect p-2">
                          <p>{val?.topcolor}</p>
                        </div>
                      </Col>
                    </Col>
                  </Row>
                  <Row className="mt-3">
                    <Col>
                      <label>Coating</label>
                      <div className="inputSelect p-2">
                        <p>{val?.coatingnum}</p>
                      </div>
                    </Col>
                    <Col>
                      <label>Temper</label>
                      <div className="inputSelect p-2">
                        <p>{val?.temper}</p>
                      </div>
                    </Col>
                    <Col>
                      <label>Guard Film</label>
                      <div className="inputSelect p-2">
                        <p>{val?.guardfilm}</p>
                      </div>
                    </Col>
                  </Row>
                </Container>
                <Container className="subInputs">
                  <Container className="insideInputs">
                    <Row>
                      <Col className="m-2">
                        <Row>
                          <label>Thickness</label>
                          <div className="custom_input pl-2 pt-1">
                            <p>{val?.thickness}</p>
                          </div>
                        </Row>
                      </Col>
                      <Col className="m-2">
                        <Row>
                          <label>Length</label>
                          <div className="custom_input pl-2 pt-1">
                            <p>{val?.length}</p>
                          </div>
                        </Row>
                      </Col>
                      <Col className="m-2">
                        <Row>
                          <label>width</label>
                          <div className="custom_input pl-2 pt-1">
                            <p>{val?.width}</p>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="m-1">
                        <Row>
                          <label>Pcs</label>
                          <div className="custom_input pl-2 pt-1">
                            <p>{val?.pcs}</p>
                          </div>
                        </Row>
                      </Col>
                      <Col className="m-1">
                        <Row>
                          <label>Weight</label>
                          <div className="custom_input pl-2 pt-1">
                            <p>{val?.weight}</p>
                          </div>
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
                        <label for="thickness">Rate(Basic)</label>
                        <div className="custom_input pl-2 pt-1">
                          <p>{val?.rate}</p>
                        </div>
                      </Row>
                    </Col>
                    <Col className="m-3">
                      <Row>
                        <label for="thickness">Rate(GST%)</label>
                        <div className="custom_input pl-2 pt-1">
                          <p>{val?.gst}</p>
                        </div>
                      </Row>
                    </Col>
                    {/* <Col className="m-3">
                          <Row className="mt-3 ml-auto col-1">
                            <button
                              className="addButton"
                              onClick={handleClick}
                              type="submit"
                            >
                              <i class="fas fa-plus-circle"></i>
                            </button>
                          </Row>
                        </Col> */}
                  </Row>
                </Container>
              </div>
            ))}
          </Container>
        ) : (
          <Container
            className="col-lg-7 mt-4"
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              marginTop: "30%",
            }}
          >
            <LoaderComp type={"TailSpin"} height={60} color={"#0e2434"} />
          </Container>
        )}
      </Container>
    </>
  );
};

export default ViewMoreList;
