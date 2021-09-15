import React, { useState, useEffect } from "react";
import { Container, Col, Row, Badge, Form } from "react-bootstrap";
import "./CreateOrder.css";
import { Modal, Button } from "react-bootstrap";
import "./Thickness.css";
import Axios from "axios";

const LeftDiv = () => {
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
  const [inputs, setInputs] = useState({
    firmName: "",
    clientName: "",
    address: "",
    city: "",
    phone_no: "",
    deliveryDate: "",
    products: [],
  });
  const [desc, setDesc] = useState({
    thickness: 0,
    length: 0,
    width: 0,
    pcs: 0,
    weight: 0,
  });
  const handleCheck = (e) => {
    e.preventDefault();
    setChecked(e.target.value);
  };
  const product = {
    selectProduct: checked,
    company: company,
    topcolor: color,
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
  };
  const formData = new FormData();
  formData.append("firmName", inputs.firmName);
  formData.append("clientName", inputs.clientName);
  formData.append("address", inputs.address);
  formData.append("city", inputs.city);
  formData.append("phone_no", inputs.phone_no);
  formData.append("deliveryDate", inputs.deliveryDate);
  formData.append("products", newProduct);

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

  const hadnleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";

      await Axios.post("http://65.0.129.68/api/v1/sales/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }).then((response) => {
        console.log(response);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    inputs.products.push(product);
    console.log(inputs.products);
    setNewProduct(inputs.products);
  };
  return (
    <>
      {/* <Modal show={show}>
        <Modal.Header className="modal_header">
          <Modal.Title>Convertor</Modal.Title>
          {JSON.stringify(totalMM)}
          <span className="ms-auto">
            <button
              onClick={handleClose}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="far fa-times-circle ml-4"></i>
            </button>
          </span>
        </Modal.Header>

        <Modal.Body className="modal_body">
          <div className="d-flex container">
            <div className="row">
              <div className="col-md-3">
                <label> Feet</label>
                <input
                  className="modals_input pl-4"
                  type="number"
                  placeholder="Feet"
                  min="0"
                  defaultValue="0"
                  name="feets"
                  value={value.feets}
                  onChange={updateHandler}
                  pattern="[0-9]*"
                />
              </div>

              <div className="col-md-3">
                <label>Inch</label>
                <input
                  className="modals_input pl-4"
                  type="number"
                  defaultValue="0"
                  placeholder="Inches"
                  min="0"
                  name="inche"
                  value={value.inche}
                  onChange={updateHandler}
                  pattern="[0-9]*"
                />
              </div>
              <div className="col-md-1 pt-4">
                <p>=</p>
              </div>
              <div className="col-md-3">
                <label>MM</label>
                <input
                  className="modals_input"
                  type="number"
                  value={totalMM}
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal_footer">
          <Button className="modal_button">Ok</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show1}>
        <Modal.Header className="modal_header">
          <Modal.Title>Convertor</Modal.Title>
          {JSON.stringify(totalMM)}
          <span className="ms-auto">
            <button
              onClick={handleClose1}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="far fa-times-circle ml-4"></i>
            </button>
          </span>
        </Modal.Header>

        <Modal.Body className="modal_body">
          <div className="d-flex container">
            <div className="row">
              <div className="col-md-3">
                <label> Feet</label>
                <input
                  className="modals_input pl-4"
                  type="number"
                  min="0"
                  placeholder="feet"
                />
              </div>

              <div className="col-md-3">
                <label>Inch</label>
                <input
                  className="modals_input pl-4"
                  type="number"
                  min="0"
                  placeholder="inches"
                />
              </div>
              <div className="col-md-1 pt-4">
                <p>=</p>
              </div>
              <div className="col-md-3">
                <label>MM</label>
                <input
                  className="modals_input"
                  type="text"
                  placeholder="Thickness"
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal_footer">
          <Button className="modal_button">Ok</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2}>
        <Modal.Header className="modal_header">
          <Modal.Title>Convertor</Modal.Title>
          <span className="ms-auto">
            <button
              onClick={handleClose2}
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              <i className="far fa-times-circle ml-4"></i>
            </button>
          </span>
        </Modal.Header>

        <Modal.Body className="modal_body">
          <div className="d-flex container">
            <div className="row">
              <div className="col-md-3">
                <label> Feet</label>
                <input
                  className="modals_input pl-4"
                  type="number"
                  min="0"
                  placeholder="feet"
                />
              </div>

              <div className="col-md-3">
                <label>Inch</label>
                <input
                  className="modals_input pl-4"
                  type="number"
                  min="0"
                  placeholder="inches"
                />
              </div>
              <div className="col-md-1 pt-4">
                <p>=</p>
              </div>
              <div className="col-md-3">
                <label>MM</label>
                <input
                  className="modals_input"
                  type="text"
                  placeholder="Thickness"
                />
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="modal_footer">
          <Button className="modal_button">Ok</Button>
        </Modal.Footer>
      </Modal> */}
      <Container
        fluid
        className="col-lg-10 col-md-10 col-sm-12 left_main_container "
      >
        <Container className="inside_container">
          <form autoComplete="off" onSubmit={hadnleFormSubmit}>
            <Row>
              <h5>Create Order</h5>
            </Row>
            <Row className="inputRow">
              <Col className="col-lg-3 label">Order-iD</Col>
              <Col className="col-lg-1">-</Col>
              <Col className="col-lg-5">546544564</Col>
            </Row>
            <Row className="inputRow">
              <Col className="col-lg-3 label">Date</Col>
              <Col className="col-lg-1">-</Col>
              <Col className="col-lg-5">{date}</Col>
            </Row>
            <Row className="inputRow">
              <Col className="col-lg-3 label">Client Name</Col>
              <Col className="col-lg-1">-</Col>
              <Col className="col-lg-6">
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
              <Col className="col-lg-3 label">Firm Name</Col>
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
              <Col className="col-lg-3 label">Address</Col>
              <Col className="col-lg-1">-</Col>
              <Col className="col-lg-8">
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
              <Col className="col-lg-3 label">Phone No.</Col>
              <Col className="col-lg-1">-</Col>
              <Col className="col-lg-3">
                <input
                  className="input_order"
                  onChange={handleChange}
                  value={inputs.phone_no}
                  type="text"
                  name="phone_no"
                  required
                />
              </Col>
              <Col className="col-lg-1 label">City</Col>
              <Col className="col-lg-1">-</Col>
              <Col className="col-lg-3">
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
              <Col className="col-lg-3 label">Delivery Date</Col>
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
              <Col className="col-lg-3 label">Products</Col>
              <Col className="col-lg-1">-</Col>
              <Row>
                <Container className="productContainer conatiner">
                  <div>
                    <Container className="checkbox">
                      <Row>
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
                            label="GP Roll"
                            onChange={handleCheck}
                            name="checked"
                            value="GP Roll"
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
                      <Row>
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
                            label="Acce."
                            onChange={handleCheck}
                            name="checked"
                            value="Acce."
                          />
                        </Col>
                      </Row>
                    </Container>
                  </div>
                </Container>
              </Row>
            </Row>
            <Row>
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
                        <p>Product No. - 84648456</p>
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
                            type="submit"
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
          </form>
        </Container>
      </Container>
      {/* hello */}
    </>
  );
};

export default LeftDiv;
