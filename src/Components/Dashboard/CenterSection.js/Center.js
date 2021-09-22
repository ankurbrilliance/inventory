import React, { useState, useEffect } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import "./Center.css";
import Cards from "./Cards";
import ApexChart from "./BarGraph.js/ApexChart";
import { Link } from "react-router-dom";
import Axios from "axios";
import LoaderComp from "../../Loader/LoaderComp";
const Center = ({ match }) => {
  console.log(match);
  const [item, setItem] = useState({});
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
        await Axios.get("http://65.0.129.68/api/v1/total/getadmin", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }).then((response) => {
          setItem(response.data);
          setSales(response.data.totalsales);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZXdVc2VyIjp7Il9pZCI6IjYwM2IzNDM5MzViODI2MjBhMDg5ZTkwNyIsInVzZXJuYW1lIjoiYWRtaW4iLCJwYXNzd29yZCI6ImFkbWluIn0sImlhdCI6MTYxNTg5MTU2MSwiZXhwIjoxNjE1OTc3OTYxfQ.exU8x5APvJBqlVKtIHHSYrqXMNKu38GyusySo-ZxCp4";
      await Axios.get(
        "http://65.0.129.68/api/v1/BillingManagement/RecentWeeklyOrder",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      ).then((response) => {
        setLoading(true);
        setTimeout(() => {
          if (response.status === 201) {
            const recentOrder = response.data.output;
            setOrder(recentOrder);
            setLoading(false);
            console.log(order);
          } else {
            setLoading(true);
          }
        }, 1000);
      });
    };
    fetchData();
  }, [order]);

  let totalsales;
  totalsales = sales.map((val, ind) => {
    return <div key={ind}>{val.count}</div>;
  });

  return (
    <>
      <Container className="center_outest_Container">
        <Container className="container1">
          <Row>
            <div className="col-lg-8 ">
              <Row>
                <Cards name="Total Sales" value={totalsales} />
                {/* <Cards name="Total Purchase" value={0} />
                <Cards name="Average Purchase" value={0} /> */}
                <Cards name="Total Clients" value={item.totalClients} />
                <Cards name="Total Users" value={0} />
              </Row>
            </div>

            <Col className="col-lg-4">
              <Link to={`${match}/create_order`}>
                <button className="create-Button">+ Create Order</button>
              </Link>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <Container fluid className="second_container">
              <Row>
                <div className="Second_left col-lg-12 col-sm-12 col-md-12">
                  <Row>
                    <p>This week sales: 1000 tonn</p>
                  </Row>
                </div>
                <div
                  className="Second_right col-lg-12 col-xl-12 col-md-12 col-sm-12 container-fluid"
                  style={{ paddingTop: "30px" }}
                >
                  <ApexChart />
                </div>
              </Row>
            </Container>
          </Row>
        </Container>
        <Container>
          <Row>
            <div className="fixTableHead">
              <Table
                size="sm"
                className="table"
                style={{
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    margin: "auto",
                  }}
                >
                  <thead
                    style={{ textAlign: "center", justifyContent: "center" }}
                  >
                    Recent Orders
                  </thead>
                </div>

                <tbody>
                  <tr>
                    <td>
                      <b>#</b>
                    </td>
                    <td>
                      <b>Client</b>
                    </td>
                    <td>
                      <b>Order Id</b>
                    </td>
                    <td>
                      <b>Date</b>
                    </td>
                    <td>
                      <b>City</b>
                    </td>
                  </tr>

                  {order.length !== 0 ? (
                    order.map((val, ind) => (
                      <tr key={val._id} style={{ padding: "10px" }}>
                        <td>{ind + 1}</td>
                        <td>{val.clientName}</td>
                        <td>{val.orderId}</td>
                        <td>{val.deliveryDate}</td>
                        <td>{val.city}</td>
                      </tr>
                    ))
                  ) : (
                    <Container
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <LoaderComp
                        type={"TailSpin"}
                        height={40}
                        hidden={false}
                        color={"#0e2434"}
                      />
                    </Container>
                  )}
                </tbody>
              </Table>
            </div>
          </Row>
        </Container>
      </Container>
    </>
  );
};

export default Center;
