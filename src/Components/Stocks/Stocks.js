import React, { useState, useEffect, useRef } from "react";
import "./Stocks.css";
import { Container, Col, Row, Modal, Alert } from "react-bootstrap";
import Axios from "axios";
import LoaderComp from "../Loader/LoaderComp";
import EditModal from "./EditModal";

const Stocks = ({ match }) => {
  const [item, setItem] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputElement = useRef("");
  const [lgShow, setLgShow] = useState(false);
  const [lgEditShow, setLgEditShow] = useState(false);
  const [failureAlert, setFailureAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalValue, setModalValue] = useState("");
  const [items, setItems] = useState({
    product: "",
    company: "",
    temper: "",
    grade: "",
    topcolor: "",
    thickness: 0,
    width: 0,
    length: 0,
    coating: 0,
    weight: 0,
    pcs: 0,
    guardfilm: "",
    // grade: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setItems({ ...items, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      product: items.product,
      company: items.company,
      temper: items.temper,
      grade: items.grade,
      topcolor: items.topcolor,
      thickness: parseInt(items.thickness),
      width: parseInt(items.width),
      length: parseInt(items.length),
      coating: parseInt(items.coating),
      weight: parseInt(items.weight),
      pcs: parseInt(items.pcs),
      guardfilm: items.guardfilm,
      density: 0.00000784,
    };
    setLoading(true);
    setTimeout(async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      await Axios.post("http://65.0.129.68/api/v1/Stock_M/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then((response) => {
          if (response.status === 201) {
            setLoading(false);
            setSuccessAlert(true);
            e.target.reset();
            setTimeout(() => {
              setSuccessAlert(false);
            }, 3000);
          } else {
            setLoading(false);
            setFailureAlert(true);
            setTimeout(() => {
              setFailureAlert(false);
            }, 3000);
          }
        })
        .catch((err) => {
          setLoading(false);
          setFailureAlert(true);
          setTimeout(() => {
            setFailureAlert(false);
          }, 3000);
        });
    }, 3000);
  };

  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };
  const onDelete = async (id) => {
    console.log(id);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
    await Axios.delete(`http://65.0.129.68/api/v1/Stock_M/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newItemsList = item.filter((items) => {
        // console.log(Object.values(item));
        return Object.values(items)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newItemsList);
    } else {
      setSearchResults(item);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      Axios.get("http://65.0.129.68/api/v1/Stock_M/get", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        setItem(response.data.res);
        // console.log(item);s
      });
    };
    fetchData();
  }, [item]);
  const ChangeEditShow = (value) => {
    setModalValue(value);
    setLgEditShow(true);
  };

  return (
    <>
      {/* ADDUSER MODEL START  */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create Stocks
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handleSubmit}>
          <Modal.Body>
            <Container
              fluid
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "block",
              }}
            >
              <Row>
                <div>
                  <Alert
                    show={successAlert}
                    onClose={() => setSuccessAlert(false)}
                    variant="success"
                    dismissible
                    style={{
                      height: "auto",
                      textAlign: "center",
                    }}
                  >
                    Stocks Created SuccessFully
                  </Alert>
                </div>
                <div>
                  <Alert
                    show={failureAlert}
                    onClose={() => setFailureAlert(false)}
                    dismissible
                    variant="danger"
                    style={{
                      height: "auto",
                      textAlign: "center",
                    }}
                  >
                    Please Fill the form Correctly...
                  </Alert>
                </div>
              </Row>
              <Container className="d-flex-grow">
                <Row className="mb-3">
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="product"
                      value={items.product}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      <option selected>Product</option>
                      <option value="GPC">GPC</option>
                      <option value="GPS">GPS</option>
                      <option value="GP ROLL">GP ROLL</option>
                      <option value="GC">GC</option>
                      <option value="HR">HR</option>
                      <option value="CR">CR</option>
                      <option value="Color">Color</option>
                      <option value="Profile Sheet">Profile Sheet</option>
                      <option value="Acce">Acce.</option>
                    </select>
                  </Col>
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="company"
                      value={items.company}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      <option selected>Company</option>
                      <option value="NA">NA</option>
                      <option value="NSAIL">NSAIL</option>
                      <option value="JSW">JSW</option>
                      <option value="UTTAM">UTTAM</option>
                      <option value="AMNS">AMNS</option>
                      <option value="ESSAR">ESSAR</option>
                      <option value="SAIL">SAIL</option>
                      <option value="TATA">TATA</option>
                      <option value="ASIAN Inventory">ASIAN Inventory</option>
                    </select>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className="mb-3">
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="grade"
                      value={items.grade}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      <option selected>Grade</option>
                      <option value="">NA</option>
                      <option value="PRIME">PRIME</option>
                      <option value="SECOND">SECOND</option>
                      <option value="DEFECTIVE">DEFECTIVE</option>
                      <option value="TEST">TEST</option>
                    </select>
                  </Col>
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="topcolor"
                      value={items.topcolor}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      <option selected>Top Color</option>
                      <option value="REG">REG</option>
                      <option value="SP">SP</option>
                      <option value="TL">TL</option>
                      <option value="BLUE">BLUE</option>
                      <option value="WHITE">WHITE</option>
                      <option value="SECO RED">SECO RED</option>
                      <option value="BRICK RED">BRICK RED</option>
                      <option value="YEllOW">YEllOW</option>
                      <option value="DARK GREY">DARK GREY</option>
                      <option value="LIGHT GREY">LIGHT GREY</option>
                      <option value="ENVIR GREEN">ENVIR GREEN</option>
                      <option value="ROYAL BLUE">ROYAL BLUE</option>
                    </select>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row className="mb-3">
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="coating"
                      value={items.coating}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      <option selected>Coating</option>
                      <option value="">NA</option>
                      <option value="70">70</option>
                      <option value="80">80</option>
                      <option value="90">90</option>
                      <option value="120">120</option>
                      <option value="150">150</option>
                      <option value="180">180</option>
                      <option value="275">275</option>
                    </select>
                  </Col>
                  <Col className="col-lg-6 col-xl-6 col-sm-5 col-md-6">
                    <select
                      name="temper"
                      value={items.temper}
                      onChange={handleChange}
                      className="w-100"
                      required
                    >
                      <option selected>temper</option>
                      <option value="Full Hard">Full Hard</option>
                      <option value="Semi Hard">Semi Hard</option>
                      <option value="Soft">Soft</option>
                      <option value="Extra Soft">Extra Soft</option>
                      <option value="DD">DD</option>
                      <option value="EDD">EDD</option>
                      <option value="2062">2062</option>
                      <option value="1079">1079</option>
                    </select>
                  </Col>
                </Row>
              </Container>
              <Container>
                <Row>
                  <Col>
                    <label>Thickness</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.thickness}
                        onChange={handleChange}
                        placeholder="Thickness"
                        min="0"
                        type="number"
                        name="thickness"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                  <Col>
                    <label>Width</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.width}
                        onChange={handleChange}
                        placeholder="width"
                        min="0"
                        type="number"
                        name="width"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                  <Col>
                    <label>length</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.length}
                        onChange={handleChange}
                        name="length"
                        placeholder="length"
                        min="0"
                        type="number"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                </Row>
              </Container>
              <Container className="mt-3">
                <Row>
                  <Col>
                    <label>Pcs</label>
                    <Container className="measure_conatiner ">
                      <input
                        value={items.pcs}
                        onChange={handleChange}
                        name="pcs"
                        placeholder="Pcs"
                        min="0"
                        type="number"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                  <Col>
                    <label>Guard Film</label>
                    <select
                      aria-label="Default select example"
                      name="guardfilm"
                      onChange={handleChange}
                      value={items.guardfilm}
                      className="w-100"
                      required
                    >
                      <option selected>Guard</option>
                      <option value="">NA</option>
                      <option value="Without">Without</option>
                      <option value="SkyLine">Skyline</option>
                      <option value="Hindustan">Hindustan</option>
                      <option value="Asia">Asian</option>
                      <option value="Rangoli">Rangoli</option>
                    </select>
                  </Col>
                  <Col>
                    <label>Weight</label>
                    <Container className="measure_conatiner">
                      <input
                        value={items.weight}
                        onChange={handleChange}
                        name="weight"
                        placeholder="Weight"
                        min="0"
                        type="number"
                        required
                      />
                      <span className="py-2">mm</span>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Container
              style={{
                justifyContent: "center",
                alignItems: "center",
                display: "grid",
              }}
            >
              <Row>
                <Col>
                  <button className="model_button" type="submit">
                    {loading ? (
                      <LoaderComp
                        type={"Oval"}
                        height={40}
                        color={"#0e2434"}
                        hidden={true}
                      />
                    ) : (
                      "Create Stocks"
                    )}
                  </button>
                </Col>
              </Row>
            </Container>
          </Modal.Footer>
        </form>
      </Modal>
      {/* ADD USERMODEL END */}
      <EditModal
        setLgEditShow={setLgEditShow}
        id={modalValue}
        lgEditShow={lgEditShow}
      />

      {/* EDIT MODEL STARTS */}
      {/* EDIT MODEL ENDS */}

      {/* STCOKS MAIN CONTAINER START */}
      <Container fluid className="outer_most_container">
        {/* Heading Section */}
        <Container className="d-flex">
          <Container
            className="heading_section d-flex"
            style={{ justifyContent: "left", display: "grid" }}
          >
            <h3 className="">Stocks</h3>
            <span className="mt-2 mx-3 ">Total weight:10,000 tonn</span>
          </Container>
          <Container
            className=""
            style={{
              justifyContent: "right",
              display: "grid",
            }}
          >
            <button
              className="addStock_button"
              value="Submit"
              onClick={() => setLgShow(true)}
            >
              Add Stock
            </button>
          </Container>
        </Container>

        <Container className="searchContainer py-2 col-lg-4 mt-4 col-md-8">
          <input
            className="me-auto searchInput"
            ref={inputElement}
            type="text"
            placeholder="Search by compnay,product"
            value={searchTerm}
            onChange={getSearchTerm}
          />
          <i className="fas fa-search"></i>
        </Container>
        <Container>
          <table className="table col-lg-12 col-sm-12 col-xs-12 col-md-12">
            <thead style={{ backgroundColor: "#cddde8" }}>
              <tr>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Company
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Thickness
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Width
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Length
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Grade
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Top color
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Coating
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Temper
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Guardfilm
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Batch
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Weight
                </th>
                <th
                  style={{
                    color: "cornflowerblue",
                    borderRight: "1px solid lightgray",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {searchResults.length > 1 || item.length > 1
                ? (searchTerm.length < 1 ? item : searchResults).map(
                    (val, index) => (
                      <tr key={index}>
                        <td
                          style={{
                            backgroundColor: "#f5fafd",
                          }}
                        >
                          {val.product}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          {val.company}
                        </td>
                        <td style={{ backgroundColor: "#f5fafd" }}>
                          {val.thickness}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          {val.width}
                        </td>
                        <td style={{ backgroundColor: "#f5fafd" }}>
                          {val.length}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          {val.grade}
                        </td>
                        <td style={{ backgroundColor: "#f5fafd" }}>
                          {val.topcolor}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          {val.coating}
                        </td>
                        <td style={{ backgroundColor: "#f5fafd" }}>
                          {val.temper}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          {val.guardfilm}
                        </td>
                        <td style={{ backgroundColor: "#f5fafd" }}>
                          {val.batch_number}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          {val.weight}
                        </td>
                        <td style={{ backgroundColor: "#f2f2f2" }}>
                          <div className="d-flex">
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                                color: "red",
                                marginRight: "10px",
                              }}
                              onClick={() => {
                                onDelete(val.id);
                              }}
                            >
                              <i className="far fa-trash-alt"></i>
                            </button>
                            <button
                              style={{
                                border: "none",
                                backgroundColor: "transparent",
                                color: "blue",
                              }}
                              onClick={() => ChangeEditShow(val._id)}
                            >
                              <i className="far fa-edit"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                : "No orders Found"}
            </tbody>
          </table>
        </Container>
      </Container>
      {/* STOCKS MAIN CONTAINER END */}
    </>
  );
};

export default Stocks;
