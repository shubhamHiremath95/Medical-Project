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
  Button,
} from "reactstrap";
import axios from "axios";
class DistributorProfile extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      Id: sessionStorage.getItem("uid"),
      name: "",
      emailId: "",
      distributor_Addr: "",
      gsT_No: "",
      telephone: "",
      web_Addr: "",
      contact_Person: "",
      password: "",
      status:""
    };
  }
  componentDidMount() {
    axios
      .get(
        "https://localhost:7245/api/Distributor/GetDistById/" + this.state.Id
      )
      .then((response) => {
        debugger;
        this.setState({
          name: response.data.name,
          emailId: response.data.emailId,
          distributor_Addr: response.data.distributor_Addr,
          gsT_No: response.data.gsT_No,
          telephone: response.data.telephone,
          web_Addr: response.data.web_Addr,
          contact_Person: response.data.contact_Person,
          password: response.data.password,
          status:"active"
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
  onSubmit(e) {
    debugger;
    e.preventDefault();
    const obj = {
      id: this.state.Id,
      name: this.state.name,
      emailId: this.state.emailId,
      distributor_Addr: this.state.distributor_Addr,
      gsT_No: this.state.gsT_No,
      telephone: this.state.telephone,
      web_Addr: this.state.web_Addr,
      contact_Person: this.state.contact_Person,
      password: this.state.password,
      status:"active"
    };
    axios
      .post("https://localhost:7245/api/Distributor/UpdateDistributor", obj)
      .then((res) => {
        alert(res.data.message);
        if (res.data.status == "Success") {
          alert("Profile updated successfully");
        }
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
                  <a className="nav-link active" href="/DistributorProfile">
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
              <h4 align="center">Distributor Details</h4>
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
                          name="name"
                          value={this.state.name}
                          onChange={this.onChangeName}
                          placeholder="Enter Name"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="emailId" sm={2}>
                        Email Id
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="emailId"
                          value={this.state.emailId}
                          onChange={this.handleChange}
                          placeholder="Enter Email Id"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="distributor_Addr" sm={2}>
                        Distributor Address
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="distributor_Addr"
                          value={this.state.distributor_Addr}
                          onChange={this.handleChange}
                          placeholder="Distributor Address"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="gsT_No" sm={2}>
                        GST Number
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="gsT_No"
                          value={this.state.gsT_No}
                          onChange={this.handleChange}
                          placeholder="GST Number"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="telephone" sm={2}>
                        Telephone Number
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="telephone"
                          value={this.state.telephone}
                          onChange={this.handleChange}
                          placeholder="Telephone Number"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="web_Addr" sm={2}>
                        Web Address
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="web_Addr"
                          value={this.state.web_Addr}
                          onChange={this.handleChange}
                          placeholder="Web Address"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="contact_Person" sm={2}>
                        Contact Person
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="text"
                          name="contact_Person"
                          value={this.state.contact_Person}
                          onChange={this.handleChange}
                          placeholder="Contact Person"
                        />
                      </Col>
                    </FormGroup>
                    <FormGroup row>
                      <Label for="password" sm={2}>
                        Password
                      </Label>
                      <Col sm={10}>
                        <Input
                          type="password"
                          name="password"
                          value={this.state.password}
                          onChange={this.handleChange}
                          placeholder="Password"
                        />
                      </Col>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup row>
                      <Col sm={3}></Col>
                      <Col sm={6}>
                        <Button type="submit" color="success">
                          Submit
                        </Button>{" "}
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
export default DistributorProfile;
