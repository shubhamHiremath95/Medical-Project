import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
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
const isEmail = (email) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
class AddOrder extends Component {
  constructor() {
    super();

    this.state = {
      distributor: [],
      products: [],
      selectedDist: "",
      selectedDistName: "",
      selectedProd: "",
      orderData: [],
      quantity: "",
      productTempData: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onProductChange = this.onProductChange.bind(this);
    //this.addProduct = this.addProduct.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.generateOrder = this.generateOrder.bind(this);
    // this.validation = this.validation.bind(this);
  }
  generateOrder() {
    if (this.validation()) {
      fetch("https://localhost:7245/api/Order/SaveOrder", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify({
          order_date: new Date().toLocaleString(),
          distributor_id: this.state.selectedDist,
          distributor_name: this.state.selectedDistName,
          order_status: "Pending",
          orderDetails: this.state.orderData,
        }),
      })
        .then((Response) => Response.json())
        .then((result) => {
          alert(result.message);
          window.location = "/ordermaster";
        });
    }
  }
  onSubmit(event) {
    if (this.validation()) {
      event.preventDefault();
      debugger;
      const tempData = {
        product_id: this.state.productTempData.product_Id,
        product_name: this.state.productTempData.product_Name,
        quantity: this.state.quantity,
        total_price: (
          parseInt(this.state.productTempData.product_Price) *
          parseInt(this.state.quantity)
        ).toString(),
      };
      let { orderData } = this.state;
      orderData.push(tempData);
      this.setState({ orderData: orderData, quantity: "", selectedProd: "" });
    }
  }
  validation() {
    return true;
  }
  componentDidMount() {
    axios
      .get("https://localhost:7245/api/Distributor/GetDistributors")
      .then((response) => {
        this.setState({ distributor: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onChangeName(e) {
    this.setState({
      selectedDist: e.target.value,
      selectedDistName: e.target.value,
      products: [],
      orderData: [],
      quantity: "",
    });
    axios
      .get(
        "https://localhost:7245/api/Product/GetProductByDid/" + e.target.value
      )
      .then((response) => {
        debugger;
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onProductChange(e) {
    this.setState({
      selectedProd: e.target.value,
      productTempData: [],
      quantity: "",
    });
    axios
      .get(
        "https://localhost:7245/api/Product/GetProductById/" + e.target.value
      )
      .then((response) => {
        this.setState({ productTempData: response.data, quantity: "" });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
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
                  <a className="nav-link" href="/adminhome">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/DistributorMaster">
                    Distributors
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/DistributorProducts">
                    Distributor Products
                  </a>
                </li>
                <li>
                  <a className="nav-link active" href="/OrderMaster">
                    Orders
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/Reports">
                    Reports
                  </a>
                </li>
              </ul>
              <i className="bi bi-list mobile-nav-toggle"></i>
            </nav>

            <a href="/" className="appointment-btn">
              Logout
            </a>
          </div>
        </header>
        <div className="d-flex align-items-center topMargin">
          <Container>
            <Row className="justify-content-center">
              <Col md="9" lg="7" xl="6">
                <CardGroup>
                  <Card className="p-2">
                    <CardBody>
                      <Form className="form" onSubmit={this.onSubmit}>
                        <div className="row mb-2 pageheading">
                          <div className="col-sm-12">
                            <h1>
                              <center>Generate Order</center>
                            </h1>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-4">Distributor Name</label>
                          <div className="col-sm-8">
                            <select
                              className="form-select form-select-sm"
                              value={this.state.selectedDist}
                              onChange={this.onChangeName}
                            >
                              <option>Select Distributor</option>
                              {this.state.distributor.map((item) => (
                                <option value={item.id} key={item.id}>
                                  {item.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-4">Product Name</label>
                          <div className="col-sm-8">
                            <select
                              className="form-select form-select-sm"
                              value={this.state.selectedProd}
                              onChange={this.onProductChange}
                            >
                              <option>Select Product</option>
                              {this.state.products.map((item) => (
                                <option
                                  value={item.product_Id}
                                  key={item.product_Id}
                                >
                                  {item.product_Name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label className="col-sm-4">Total Quantity </label>
                          <div className="col-sm-8">
                            <Input
                              name="quantity"
                              type="text"
                              value={this.state.quantity}
                              onChange={this.handleChange}
                              placeholder="Total Quantity"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <Col sm={3}></Col>
                          <Col sm={6}>
                            <center>
                              <Button type="submit" color="success">
                                Add
                              </Button>
                            </center>
                          </Col>
                          <Col sm={3}></Col>
                        </div>
                        <div className="row">
                          <Col sm={12}>
                            <table
                              className="table table-striped"
                              style={{ marginTop: 10 }}
                            >
                              <thead className="table-dark tblHeader">
                                <tr>
                                  <th>Product Id</th>
                                  <th>Product Name</th>
                                  <th>Product Quantity</th>
                                  <th>Total Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.orderData.map((item) => (
                                  <tr key={item.product_id}>
                                    <td>{item.product_id}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.total_price}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </Col>
                        </div>
                        <div className="row">
                          <Col sm={3}></Col>
                          <Col sm={4}>
                            <Button
                              type="button"
                              id="btn_Submit"
                              color="success"
                              onClick={this.generateOrder}
                            >
                              Generate Order
                            </Button>
                          </Col>
                          <Col sm={3}>
                            <Link
                              to={"/ordermaster"}
                              className="btn btn-danger"
                            >
                              Cancel
                            </Link>
                          </Col>
                        </div>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

export default AddOrder;
