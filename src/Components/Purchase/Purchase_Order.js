import React, { useState } from "react";
import "./Purchase.css";
import { Container, Col, Row, Alert, Badge } from "react-bootstrap";
import Axios from "axios";
import { ConsoleWriter } from "istanbul-lib-report";
import LoaderComp from "../Loader/LoaderComp";

const Purchase_Order = () => {
  const [company, setCompany] = useState("");
  const [coating, setCoating] = useState(0);
  const [guard, setGuard] = useState("");
  const [color, setColor] = useState("");
  const [temper, setTemper] = useState("");
  const [grade, setGrade] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [newProducts, setNewProducts] = useState([]);
  const [failureAlert, setFailureAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [, setOrders] = useState([newProducts]);

  const [inputs, setInputs] = useState({
    vendor: "",
    firmName: "",
    clientName: "",
    email: "",
    phone_no: 0,
    address: "",
    city: "",
    note: "",
    deliveryDate: "",
    products: [],
  });

  const [num, setNum] = useState({
    thickness: 0,
    width: 0,
    length: 0,
    weight: 0,
    gst: 0,
    rate: 0,
    pcs: 0,
  });
  const finalProducts = inputs.products;
  const product = {
    selectProduct: selectProduct,
    company: company,
    topcolor: color,
    grade: grade,
    coatingnum: parseInt(coating),
    temper: temper,
    guardfilm: guard,
    thickness: parseInt(num.thickness),
    width: parseInt(num.width),
    length: parseInt(num.length),
    pcs: parseInt(num.pcs),
    weight: parseInt(num.weight),
    gst: parseInt(num.gst),
    rate: parseInt(num.rate),
  };
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  const yyyy = today.getFullYear();
  const todays = dd + "/" + mm + "/" + yyyy;

  const formData = {
    orderdate: todays,
    vendor: inputs.vendor,
    firmName: inputs.firmName,
    clientName: inputs.clientName,
    email: inputs.email,
    phone_no: inputs.phone_no,
    address: inputs.address,
    city: inputs.city,
    note: inputs.notes,
    deliveryDate: inputs.deliveryDate,
    products: inputs.products,
  };
  const addProducts = (e) => {
    e.preventDefault();
    inputs.products.push(product);
    // console.log(inputs.products);
    setNewProducts((input) => {
      setNewProducts(inputs.products);
    });
    console.log(inputs.products);
  };
  const onDeleteByIndex = (ind) => {
    const order = newProducts;
    order.splice(ind, 1);
    setNewProducts((input) => {
      setNewProducts(order);
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
    await Axios.post("http://65.0.129.68/api/v1/purchaseStock/create", formData)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setLoading(false);
          setSuccessAlert(true);
          e.target.reset();
        } else {
          setFailureAlert(true);
          setTimeout(() => {
            setFailureAlert(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setFailureAlert(true);
        setTimeout(() => {
          setFailureAlert(false);
        }, 3000);
      });
  };

  const handleNum = (e) => {
    e.preventDefault();
    setNum({ ...num, [e.target.name]: e.target.value });
  };
  const handleInput = (e) => {
    e.preventDefault();
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const output = newProducts ? (
    newProducts?.map((val, ind, arr) => (
      <Container key={ind}>
        <div className="afterOrder">
          <Container className="insideAfterOrder">
            <Row>
              <div className="d-flex">
                <h4>
                  <Badge style={{ backgroundColor: "#2D3E4D" }} bg="secondary">
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
      </Container>
    ))
  ) : (
    <h4>Add Some Products</h4>
  );
  return (
    <>
      <Container className="purchase_order_main">
        <h4 className="mt-4" style={{ color: "grey" }}>
          Purchase Order
        </h4>
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
              Purchase Stocks Created SuccessFully
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
              Something Went Worng Please fill the form correctly...
            </Alert>
          </div>
        </Row>
        <Row>
          <Col>
            <Container className="purchase_form_container d-grid p-2">
              <form autoComplete="off" onSubmit={handleSubmit}>
                <Row>
                  <>
                    <Container className="mt-4">
                      {/* Input */}
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Vendore
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Vendor Name"
                            type="text"
                            required
                            name="vendor"
                            onChange={handleInput}
                            value={inputs.vendor}
                          />
                        </Col>
                      </Row>
                      {/* Input */}
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Firm Name
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Firm Name"
                            type="text"
                            required
                            name="firmName"
                            onChange={handleInput}
                            value={inputs.firmName}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Client Name
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Client Name"
                            type="text"
                            required
                            name="clientName"
                            onChange={handleInput}
                            value={inputs.clientName}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Email
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Email"
                            type="text"
                            required
                            name="email"
                            onChange={handleInput}
                            value={inputs.email}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Phone
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Phone"
                            type="number"
                            required
                            name="phone_no"
                            onChange={handleInput}
                            value={inputs.phone_no}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          City
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="City"
                            type="text"
                            required
                            name="city"
                            onChange={handleInput}
                            value={inputs.city}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Address
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Address"
                            type="text"
                            required
                            name="address"
                            onChange={handleInput}
                            value={inputs.address}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Deliver Date
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Deliver Date"
                            type="text"
                            required
                            name="deliveryDate"
                            onChange={handleInput}
                            value={inputs.deliveryDate}
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Note
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Note"
                            type="text"
                            required
                            name="note"
                            onChange={handleInput}
                            value={inputs.note}
                          />
                        </Col>
                      </Row>
                    </Container>
                  </>
                  <Row>
                    <h4 style={{ color: "grey" }}> Add Products</h4>
                  </Row>
                  <>
                    <Container className="mt-4">
                      {/* Input */}
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Rate
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Rate"
                            type="number"
                            name="rate"
                            value={num.rate}
                            onChange={handleNum}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          GST
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="GST"
                            type="number"
                            name="gst"
                            value={num.gst}
                            onChange={handleNum}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Select Product
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
                            defaultValue={selectProduct}
                            onChange={(e) => setSelectProduct(e.target.value)}
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
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Select Company
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
                            defaultValue={company}
                            onChange={(e) => setCompany(e.target.value)}
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
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Coating
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
                            defaultValue={coating}
                            onChange={(e) => setCoating(e.target.value)}
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
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Guard Film
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
                            defaultValue={guard}
                            onChange={(e) => setGuard(e.target.value)}
                            required
                          >
                            <option selected>Guard Film</option>
                            <option value="">NA</option>
                            <option value="Without">Without</option>
                            <option value="SkyLine">Skyline</option>
                            <option value="Hindustan">Hindustan</option>
                            <option value="Asia">Asian</option>
                            <option value="Rangoli">Rangoli</option>
                          </select>
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Temper
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
                            defaultValue={temper}
                            onChange={(e) => setTemper(e.target.value)}
                            required
                          >
                            <option selected>Temper</option>
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
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Grade
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
                            defaultValue={grade}
                            onChange={(e) => setGrade(e.target.value)}
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
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Top Color
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <select
                            className="input_fields"
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
                      {/* Input */}
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Thickness
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Thickness"
                            type="number"
                            min="0"
                            name="thickness"
                            value={num.thickness}
                            onChange={handleNum}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Width
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Width"
                            type="number"
                            name="width"
                            min="0"
                            value={num.width}
                            onChange={handleNum}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Length
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Length"
                            type="number"
                            name="length"
                            min="0"
                            value={num.length}
                            onChange={handleNum}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Weight
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Weight"
                            type="number"
                            min="0"
                            name="weight"
                            value={num.weight}
                            onChange={handleNum}
                            required
                          />
                        </Col>
                      </Row>
                      <Row className="col-lg-12 col-md-12 col-sm-12 col-xl-12 mb-2">
                        <Col className="col-lg-4 col-xs-4 col-sm-4 col-md-4 col-xl-4">
                          Pcs
                        </Col>
                        <Col className="col-lg-1 col-xs-1 col-md-1 col-sm-1 col-xl-1">
                          -
                        </Col>
                        <Col className="col-lg-7 col-xs-7 col-md-7 col-sm-7 col-xl-7">
                          <input
                            className="input_fields"
                            placeholder="Pcs"
                            type="number"
                            min="0"
                            required
                            name="pcs"
                            value={num.pcs}
                            onChange={handleNum}
                          />
                        </Col>
                      </Row>
                      <Row
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                          width: "25%",
                          marginTop: "20px",
                          marginBottom: "50px",
                        }}
                      >
                        <button
                          onClick={addProducts}
                          style={{
                            border: "none",
                            backgroundColor: "#98520c",
                            borderRadius: "5px",
                            boxShadow: "0px 2px 6px light",
                            color: "white",
                            outlineStyle: "none",
                            padding: "10px",
                          }}
                        >
                          {loading ? <LoaderComp /> : "Add Product "}
                        </button>
                      </Row>
                    </Container>
                  </>
                </Row>
                <Row
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    width: "25%",
                  }}
                >
                  <button
                    className="me-auto"
                    type="submit"
                    style={{
                      border: "none",
                      backgroundColor: "#98520c",
                      borderRadius: "5px",
                      boxShadow: "0px 2px 6px light",
                      color: "white",
                      outlineStyle: "none",
                      padding: "10px",
                    }}
                  >
                    {loading ? <LoaderComp /> : "Purchase"}
                  </button>
                </Row>
              </form>
            </Container>
          </Col>
          <Col>
            <p>List Purchase</p>
            {output}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Purchase_Order;
