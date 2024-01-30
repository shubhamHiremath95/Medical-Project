import React, { Component } from "react";
import axios from "axios";
import "../../css/style.css";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
export class ViewOrder extends Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("id");
    this.state = {
      Id: sessionStorage.getItem("uid"),
      orderId: term,
      departments: [],
      products: [],
      orderStatus: queryParams.get("status"),
    };
    this.approveOrder = this.approveOrder.bind(this);
    this.rejectOrder = this.rejectOrder.bind(this);
  }
  approveOrder() {
    axios
      .post(
        "https://localhost:7245/api/Order/updateOrder?id=" + this.state.orderId
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "Success") {
          window.location = "/orders";
        }
      });
  }
  rejectOrder() {
    axios
      .post(
        "https://localhost:7245/api/Order/rejectOrder?id=" + this.state.orderId
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "Success") {
          window.location = "/orders";
        }
      });
  }
  componentDidMount() {
    axios
      .get(
        "https://localhost:7245/api/Order/GetOrdersDetails/" +
          this.state.orderId
      )
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  deleteClick(id) {
    axios
      .post(
        "https://localhost:7245/api/Product/DeleteProduct?productId=" +
          parseInt(id)
      )
      .then((json) => {
        alert(json.data.message);
        if (json.data.status == "Success") {
          window.location = "/product";
        }
      });
  }
  render() {
    return (
      <div className="section-bg">
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center">
            <h1 className="logo me-auto">Medilab</h1>

            <nav id="navbar" className="navbar order-last order-lg-0">
              <ul>
                <li>
                  <a className="nav-link" href="/distributorhome">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/product">
                    Product
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/DistributorProfile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link active" href="/Orders">
                    Order
                  </a>
                </li>
                {/* <li>
                  <a className="nav-link" href="/Reports">
                    Report
                  </a>
                </li> */}
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>

            <a href="/" className="appointment-btn">
              Logout
            </a>
          </div>
        </header>
        <section className="d-flex align-items-center topMargin">
          <div className="container">
            <div>
              <h4 align="center">Order Details</h4>

              <table className="table table-striped" style={{ marginTop: 10 }}>
                <thead className="table-dark tblHeader">
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.product_id}</td>
                      <td>{item.product_name}</td>
                      <td>{item.quantity}</td>
                      <td>{item.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="row">
                <Col sm={3}></Col>
                <Col sm={2}>
                  <Button
                    type="button"
                    id="btn_Submit"
                    color="success"
                    onClick={this.approveOrder}
                    disabled={
                      this.state.orderStatus == "Pending" ? false : true
                    }
                  >
                    Approve
                  </Button>
                </Col>
                <Col sm={2}>
                  <Button
                    type="button"
                    id="btn_Submit"
                    color="success"
                    onClick={this.rejectOrder}
                    disabled={
                      this.state.orderStatus == "Pending" ? false : true
                    }
                  >
                    Reject
                  </Button>
                </Col>
                <Col sm={2}>
                  <Link to={"/orders"} className="btn btn-danger">
                    Cancel
                  </Link>
                </Col>
                <Col sm={3}></Col>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default ViewOrder;
