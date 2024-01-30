import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Col,
  Form,
  Row,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";
import axios from "axios";
class EditProduct extends React.Component {
  constructor(props) {
    super(props);
    const queryParams = new URLSearchParams(window.location.search);
    const term = queryParams.get("id");
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeDesc = this.onChangeDesc.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Id: term,
      Name: "",
      Price: "",
      Description: "",
    };
  }
  componentDidMount() {
    axios
      .get("https://localhost:7245/api/Product/GetProductById/" + this.state.Id)
      .then((response) => {
        debugger;
        this.setState({
          Name: response.data.product_Name,
          Price: response.data.product_Price,
          Description: response.data.product_Desc,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onChangeName(e) {
    this.setState({
      Name: e.target.value,
    });
  }
  onChangeDesc(e) {
    this.setState({
      Description: e.target.value,
    });
  }
  onChangePrice(e) {
    this.setState({
      Price: e.target.value,
    });
  }
  onSubmit(e) {
    debugger;
    e.preventDefault();
    const obj = {
      product_Id: this.state.Id,
      product_Name: this.state.Name,
      product_Price: this.state.Price,
      product_Desc: this.state.Description,
    };
    axios
      .post("https://localhost:7245/api/Product/UpdateProduct", obj)
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "Success") {
            window.location="/product"
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
        <section className="d-flex align-items-center topMargin">
          <div className="container updateDiv">
            <div>
              <h4 align="center">Update Product</h4>
              <Container className="App">
                <Form className="form" onSubmit={this.onSubmit}>
                  <Col>
                    <FormGroup row>
                      <Label for="name" sm={2}>
                        Name
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="Name"
                          value={this.state.Name}
                          onChange={this.onChangeName}
                          placeholder="Enter Name"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="description" sm={2}>
                        Description
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="description"
                          value={this.state.Description}
                          onChange={this.onChangeDesc}
                          placeholder="Enter Description"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="Price" sm={2}>
                        Price
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="Price"
                          value={this.state.Price}
                          onChange={this.onChangePrice}
                          placeholder="Enter Price"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row>
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
                      <Col sm={3}></Col>
                    </FormGroup>
                  </Col>
                </Form>
              </Container>
            </div>
          </div>
        </section>
      </div>
    );
  }
}
export default EditProduct;
