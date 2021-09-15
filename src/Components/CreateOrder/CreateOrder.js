import React, { useState, useEffect } from "react";
import RightDiv from "./RightDiv";
import "./CreateOrder";
import "./CreateOrder.css";
import {
  Modal,
  Button,
  Container,
  Col,
  Row,
  Badge,
  Form,
  Alert,
} from "react-bootstrap";
import Axios from "axios";
const CreateOrder = () => {
  const [date, setDate] = useState("");
  const [checked, setChecked] = useState("");
  const [check, setCheck] = useState(false);
  const [company, setCompany] = useState("");
  const [guard, setGuard] = useState("");
  const [color, setColor] = useState("");
  const [temper, setTemper] = useState("");
  const [grade, setGrade] = useState("");
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show1, setShow1] = useState(false);
  const [rate, setRate] = useState("");
  const [gst, setGst] = useState("");
  const [coating, setCoating] = useState(0);
  const handleClose = () => setShow(false);
  const handleClose1 = () => setShow1(false);
  const handleClose2 = () => setShow2(false);
  const [newProduct, setNewProduct] = useState([]);
  const [checkedValue, setCheckedValue] = useState("");
  const [failureAlert, setFailureAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const [value, setValue] = useState({
    feets: 0,
    inche: 0,
  });
  const [totalMM, setTotalMM] = useState(0);
  const updateHandler = (e) => {
    e.preventDefault();
    setValue({ ...value, [e.target.name]: e.target.value });
    const newFeet = parseInt(value.feets);
    const newInches = parseInt(value.inces);
    console.log("feet:", newFeet);
    console.log("inches:", newInches);
    let result = Number(
      value.feets.typeof === isNaN
        ? 0
        : value.feets * 304.8 + value.inche.typeof === isNaN
        ? 0
        : value.inche * 25.4
    );
    setTotalMM(result);
  };
  const datemili = new Date();
  const miliseconds = datemili.getTime();

  const [inputs, setInputs] = useState({
    firmName: "",
    clientName: "",
    orderId: miliseconds,
    address: "",
    city: "",
    phone_no: "",
    deliveryDate: "",
    products: newProduct,
  });
  const [desc, setDesc] = useState({
    thickness: 0,
    length: 0,
    width: 0,
    pcs: 0,
    weight: 0,
    checked: "",
  });
  const handleCheck = (e) => {
    e.preventDefault();
    setChecked(e.target.value);
    setCheckedValue((inputs) => {
      setCheckedValue({ ...inputs, checked });
    });
  };

  const inputPro = inputs.products;
  const prodctLength = inputPro.length;
  const productKey = miliseconds + "/" + `${checked}` + "/" + prodctLength;
  const product = {
    company: company,
    topcolor: color,
    selectProduct: checked,
    grade: grade,
    coatingnum: coating,
    temper: temper,
    guardfilm: guard,
    thickness: desc.thickness,
    width: desc.width,
    length: desc.length,
    pcs: desc.pcs,
    weight: desc.weight,
    gst: gst,
    rate: rate,
    productId: productKey,
  };

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const todays = dd + "/" + mm + "/" + yyyy;
  useEffect(() => {
    setDate(todays);
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const handleDesc = (e) => {
    e.preventDefault();
    setDesc({ ...desc, [e.target.name]: e.target.value });
  };
  const handleRate = (e) => {
    e.preventDefault();
    setRate(e.target.value);
    let sum = Number(rate) * 1.18;

    setGst(sum);
  };

  const formData = {
    firmName: inputs.firmName,
    clientName: inputs.clientName,
    address: inputs.address,
    orderId: inputs.orderId,
    city: inputs.city,
    phone_no: inputs.phone_no,
    deliveryDate: inputs.deliveryDate,
    products: newProduct,
  };

  const hadnleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      console.log(formData);
      await Axios.post("http://65.0.129.68/api/v1/sales/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        console.log(response);
        if (response.status === 201) {
          e.target.reset();
          setSuccessAlert(true);
          setTimeout(() => {
            setSuccessAlert(false);
          }, 8000);
        } else {
          setFailureAlert(true);
          setTimeout(() => {
            setFailureAlert(false);
          }, 8000);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onDeleteByIndex = (ind) => {
    const order = newProduct;
    order.splice(ind, 1);
    setNewProduct((input) => {
      setNewProduct(order);
    });
  };
  const handleClick = (e) => {
    e.preventDefault();
    inputs.products.push(product);
    console.log(inputs.products);
    setNewProduct(() => {
      setNewProduct(inputs.products);
    });
    console.log(newProduct);
  };

  return (
    <>
      <Container className="col-xl-10 col-lg-8 col-md-12 col-sm-12">
        {/* ++++++++++++++++++++++++++ Left Div +++++++++++++++++++++++++*/}
        <Row>
          <div>
            <Alert
              className=""
              show={successAlert}
              onClose={() => setSuccessAlert(false)}
              variant="success"
              dismissible
              style={{
                height: "auto",
                textAlign: "center",
              }}
            >
              User Created SuccessFully
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
              Something Went Worng Please try again later
            </Alert>
          </div>
        </Row>
        <Row>
          <Col className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
            <Container fluid className="col-xl-8 left_main_container d-block ">
              <Container className="inside_container">
                <form autoComplete="off" onSubmit={hadnleFormSubmit}>
                  <Row>
                    <h5>Create Order</h5>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Order-iD</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">{inputs.orderId}</Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Date</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">{date}</Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Client Name</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.clientName}
                        type="text"
                        name="clientName"
                      />
                    </Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Firm Name</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.firmName}
                        type="text"
                        name="firmName"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Address</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-7">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.address}
                        type="text"
                        name="address"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Phone</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-5">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.phone_no}
                        type="text"
                        name="phone_no"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">City</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-5">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.city}
                        type="text"
                        name="city"
                        required
                      />
                    </Col>
                  </Row>

                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Delivery Date</Col>
                    <Col className="col-lg-1">-</Col>
                    <Col className="col-lg-5">
                      <input
                        className="input_order"
                        onChange={handleChange}
                        value={inputs.deliveryDate}
                        type="text"
                        name="deliveryDate"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="inputRow">
                    <Col className="col-lg-4 label">Products</Col>
                    <Col className="col-lg-1">-</Col>
                    <Row>
                      <Container fluid className="productContainer">
                        <Row className="ms-3">
                          <Col>
                            <Form.Check
                              className="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GPC"
                              onChange={handleCheck}
                              name="checked"
                              value="GPC"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GPS"
                              onChange={handleCheck}
                              name="checked"
                              value="GPS"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="Acce."
                              onChange={handleCheck}
                              name="checked"
                              value="Acce."
                            />
                          </Col>
                        </Row>
                        <Row className="ms-3">
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GC"
                              onChange={handleCheck}
                              name="checked"
                              value="GC"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="HR"
                              onChange={handleCheck}
                              name="checked"
                              value="HR"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="CR"
                              onChange={handleCheck}
                              name="checked"
                              value="CR"
                            />
                          </Col>
                        </Row>
                        <Row className="ms-3">
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="Color Col"
                              onChange={handleCheck}
                              name="checked"
                              value="Color Col"
                            />
                          </Col>
                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="Profile Sheet"
                              onChange={handleCheck}
                              name="checked"
                              value="Profile Sheet"
                            />
                          </Col>

                          <Col>
                            <Form.Check
                              className="radio"
                              id="radio"
                              type="radio"
                              aria-label="option 1"
                              label="GP Roll"
                              onChange={handleCheck}
                              name="checked"
                              value="GP Roll"
                            />
                          </Col>
                        </Row>
                      </Container>
                    </Row>
                  </Row>
                  <Row>
                    {/* ++++++++++++AFTER ORder section ++++++++++++ */}
                    <Container>
                      <div className="afterOrder">
                        <Container className="insideAfterOrder">
                          <Row>
                            <h4>
                              <Badge
                                style={{ backgroundColor: "#2D3E4D" }}
                                bg="secondary"
                              >
                                {checked ? checked : "new"}
                              </Badge>
                            </h4>
                          </Row>
                          <Row>
                            <Col>
                              <p>Product No. - {productKey}</p>
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                defaultValue={company}
                                onChange={(e) => {
                                  setCompany(e.target.value);
                                }}
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
                                <option value="ASIAN Inventory">
                                  ASIAN Inventory
                                </option>
                              </select>
                            </Col>
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                defaultValue={grade}
                                onChange={(e) => {
                                  setGrade(e.target.value);
                                }}
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
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                defaultValue={color}
                                onChange={(e) => setColor(e.target.value)}
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
                          <Row className="mt-3">
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                onChange={(e) => setCoating(e.target.value)}
                                defaultValue={coating}
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
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                onChange={(e) => setTemper(e.target.value)}
                                defalutValue={temper}
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
                            <Col>
                              <select
                                className="inputSelect"
                                aria-label="Default select example"
                                onChange={(e) => setGuard(e.target.value)}
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
                          </Row>
                        </Container>
                        <Container className="subInputs">
                          <Container className="insideInputs">
                            <Row>
                              <Col className="m-2">
                                <Row>
                                  <label for="thickness">Thickness</label>
                                  <input
                                    type="number"
                                    name="thickness"
                                    placeHolder="Thickness"
                                    className="custom_input"
                                    onChange={handleDesc}
                                    value={desc.thickness}
                                    required
                                  />
                                </Row>
                              </Col>
                              <Col className="m-2">
                                <Row>
                                  <label>Length</label>
                                  <input
                                    type="number"
                                    name="length"
                                    placeHolder="Length"
                                    className="custom_input"
                                    onChange={handleDesc}
                                    value={desc.length}
                                    required
                                  />
                                </Row>
                              </Col>
                              <Col className="m-2">
                                <Row>
                                  <label for="thickness">Width</label>
                                  <input
                                    type="number"
                                    placeHolder="Width"
                                    className="custom_input"
                                    name="width"
                                    onChange={handleDesc}
                                    value={desc.width}
                                    required
                                  />
                                </Row>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="m-1">
                                <Row>
                                  <label for="pcs">Pcs.</label>
                                  <input
                                    type="text"
                                    name="pcs"
                                    value={desc.pcs}
                                    className="subfields"
                                    onChange={handleDesc}
                                    required
                                  />
                                </Row>
                              </Col>
                              <Col className="m-1">
                                <Row>
                                  <label for="length">Weight</label>
                                  <input
                                    type="number"
                                    name="weight"
                                    value={desc.weight}
                                    className="subfields"
                                    onChange={handleDesc}
                                    required
                                  />
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
                                <input
                                  name="rate"
                                  type="number"
                                  value={rate}
                                  onChange={handleRate}
                                  className="subfields"
                                  required
                                />
                              </Row>
                            </Col>
                            <Col className="m-3">
                              <Row>
                                <label for="thickness">Rate(GST%)</label>
                                <input
                                  name="gst"
                                  type="text"
                                  value={gst}
                                  onChange={handleRate}
                                  className="subfields"
                                  readOnly
                                />
                              </Row>
                            </Col>
                            <Col className="m-3">
                              <Row className="mt-3 ml-auto col-1">
                                <button
                                  className="addButton"
                                  onClick={handleClick}
                                >
                                  <i class="fas fa-plus-circle"></i>
                                </button>
                              </Row>
                            </Col>
                          </Row>
                        </Container>
                      </div>
                    </Container>
                  </Row>
                  <div
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex-end",
                      margin: "30px",
                    }}
                  >
                    <button
                      style={{
                        border: "none",
                        borderRadius: "5px",
                        backgroundColor: "#98520c",
                        color: "white",
                        padding: "10px",
                      }}
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </Container>
            </Container>
          </Col>

          {/* ++++++++++++++++++++++++++ Right Div +++++++++++++++++++++++++*/}

          <Col className="col-xl-4 col-lg-12 col-md-12 col-sm-12 right_container">
            <h3>Orders</h3>
            <Container
              fluid
              className="OrderListContainer col-xl-4 col-lg-12 col-md-12 col-sm-12 "
            >
              <div className="InsideOrderListContainer">
                <Row>
                  <Col>
                    <h6>OrderId</h6>
                  </Col>
                  <Col>
                    <h6>{inputs.orderId}</h6>
                  </Col>
                </Row>
                <Row>
                  <Row>
                    <Col>
                      <p>Client Name -</p>
                    </Col>
                    <Col>
                      <p>{inputs.clientName}</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p>First Name -</p>
                    </Col>
                    <Col>
                      <p>{inputs.firmName}</p>
                    </Col>
                  </Row>
                  <Col>
                    <p>Address -</p>
                  </Col>
                  <Col>
                    <p>{inputs.address}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Phone No. -</p>
                  </Col>
                  <Col>
                    <p>{inputs.phone_no}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>weight -</p>
                  </Col>
                  <Col>
                    <p>{desc.weight}</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p>Delivery Date -</p>
                  </Col>
                  <Col>
                    <p>{inputs.deliveryDate}</p>
                  </Col>
                </Row>
              </div>
            </Container>
            <Container
              className="overflow"
              style={{ height: "100vh", boxShadow: "0px 2px 6px solid grey" }}
            >
              {newProduct ? (
                newProduct.map((val, ind, arr) => (
                  <Container key={val.id}>
                    <div className="afterOrder">
                      <Container className="insideAfterOrder">
                        <Row>
                          <div className="d-flex">
                            <h4>
                              <Badge
                                style={{ backgroundColor: "#2D3E4D" }}
                                bg="secondary"
                              >
                                {val.selectProduct}
                              </Badge>
                            </h4>
                            <div className="ms-auto">
                              <button
                                onClick={() => onDeleteByIndex(arr)}
                                className="ms-auto"
                                style={{
                                  color: "red",
                                  backgroundColor: "none",
                                  border: "none",
                                }}
                              >
                                <i class="far fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        </Row>
                        {/* <Row>
                        <Col>
                          <p>Product No. - 84648456</p>
                        </Col>
                      </Row> */}
                        <Row>
                          <Col>
                            <label>Company</label>
                            <div className="inputSelect p-2">
                              <p>{val.company}</p>
                            </div>
                          </Col>
                          <Col>
                            <Col>
                              <label>Grade</label>
                              <div className="inputSelect p-2">
                                <p>{val.grade}</p>
                              </div>
                            </Col>
                          </Col>
                          <Col>
                            <Col>
                              <label>Top Color</label>
                              <div className="inputSelect p-2">
                                <p>{val.topcolor}</p>
                              </div>
                            </Col>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <label>Coating</label>
                            <div className="inputSelect p-2">
                              <p>{val.coatingnum}</p>
                            </div>
                          </Col>
                          <Col>
                            <label>Temper</label>
                            <div className="inputSelect p-2">
                              <p>{val.temper}</p>
                            </div>
                          </Col>
                          <Col>
                            <label>Guard</label>
                            <div className="inputSelect p-2">
                              <p>{val.guardfilm}</p>
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
                                  <p>{val.thickness}</p>
                                </div>
                              </Row>
                            </Col>
                            <Col className="m-2">
                              <Row>
                                <label>Length</label>
                                <div className="custom_input pl-2 pt-1">
                                  <p>{val.length}</p>
                                </div>
                              </Row>
                            </Col>
                            <Col className="m-2">
                              <Row>
                                <label>width</label>
                                <div className="custom_input pl-2 pt-1">
                                  <p>{val.width}</p>
                                </div>
                              </Row>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="m-1">
                              <Row>
                                <label>Pcs</label>
                                <div className="custom_input pl-2 pt-1">
                                  <p>{val.pcs}</p>
                                </div>
                              </Row>
                            </Col>
                            <Col className="m-1">
                              <Row>
                                <label>Weight</label>
                                <div className="custom_input pl-2 pt-1">
                                  <p>{val.weight}</p>
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
                                <p>{val.rate}</p>
                              </div>
                            </Row>
                          </Col>
                          <Col className="m-3">
                            <Row>
                              <label for="thickness">Rate(GST%)</label>
                              <div className="custom_input pl-2 pt-1">
                                <p>{val.gst}</p>
                              </div>
                            </Row>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </Container>
                ))
              ) : (
                <p>waiting For Products</p>
              )}
            </Container>

            {/*  */}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateOrder;
