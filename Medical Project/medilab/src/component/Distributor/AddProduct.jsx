import React, { Component } from "react";
import { Link } from "react-router-dom";
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
class AddProduct extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Description: "",
      Price: ""
    };

    this.Name = this.Name.bind(this);
    this.Description = this.Description.bind(this);
    this.Price = this.Price.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validation=this.validation.bind(this);
  }

  Name(event) {
    this.setState({ Name: event.target.value });
  }
  Description(event) {
    this.setState({ Description: event.target.value });
  }
  Price(event) {
    this.setState({ Price: event.target.value });
  }
  

  onSubmit(event) {
    debugger;
    if (this.validation()) { 
      event.preventDefault();
      fetch("https://localhost:7245/api/Product/SaveProduct", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify({
        product_Name: this.state.Name,
        product_Desc:this.state.Description,
        product_Price: this.state.Price,
        product_DId: sessionStorage.getItem("uid")
        }),
      })
        .then((Response) => Response.json())
        .then((result) => {
            alert(result.message);
            window.location="/product"
        });
    } 
  }
  
  validation() {
    debugger;
    if (this.state.Name == "") {
      alert("Please enter Name");
      return false;
    } else if (this.state.Description== "") {
      alert("Please enter Description");
      return false;
    } else if ((this.state.Price=="")) {
      alert("Please enter valid Email Id");
      return false;
    }
     else {
      return true;
    }
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
                  <a className="nav-link active" href="/product">
                    Product
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/DistributorProfile">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/Orders">
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
                            <center>Add Product</center>
                          </h1>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Product Name</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Name}
                            placeholder="Enter Product Name"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Product Description</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Description}
                            placeholder="Description"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Product Price </label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Price}
                            placeholder="Product Price"
                          />
                        </div>
                      </div>
                      <div className="row">
                        <Col sm={3}></Col>
                      <Col sm={3}>
                        <Button type="submit" color="success">
                          Submit
                        </Button>{" "}
                      </Col>
                      <Col sm={3}>
                        <Link to={"/product"} className="btn btn-danger">
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

export default AddProduct;
