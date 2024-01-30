import React, { Component } from "react";
import AdminHome from "../AdminHome";
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
class DistributorReg extends Component {
  constructor() {
    super();

    this.state = {
      Name: "",
      Distributor_Addr: "",
      EmailId: "",
      Password: "",
      GST_No: "",
      Telephone: "",
      Web_Addr: "",
      Contact_Person: "",
    };

    this.Name = this.Name.bind(this);
    this.Distributor_Addr = this.Distributor_Addr.bind(this);
    this.EmailId = this.EmailId.bind(this);
    this.Password = this.Password.bind(this);
    this.GST_No = this.GST_No.bind(this);
    this.Telephone = this.Telephone.bind(this);
    this.Web_Addr = this.Web_Addr.bind(this);
    this.Contact_Person = this.Contact_Person.bind(this);
    this.signup = this.signup.bind(this);
    this.validation=this.validation.bind(this);
  }

  Name(event) {
    this.setState({ Name: event.target.value });
  }
  Distributor_Addr(event) {
    this.setState({ Distributor_Addr: event.target.value });
  }
  EmailId(event) {
    this.setState({ EmailId: event.target.value });
  }
  Password(event) {
    this.setState({ Password: event.target.value });
  }
  GST_No(event) {
    this.setState({ GST_No: event.target.value });
  }
  Telephone(event) {
    this.setState({ Telephone: event.target.value });
  }
  Web_Addr(event) {
    this.setState({ Web_Addr: event.target.value });
  }
  Contact_Person(event) {
    this.setState({ Contact_Person: event.target.value });
  }

  signup(event) {
    debugger;
    if (this.validation()) { 
      event.preventDefault();
      fetch("https://localhost:7245/api/Distributor/Register", {
        method: "post",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        crossorigin: true,
        body: JSON.stringify({
          Name: this.state.Name,
          EmailId:this.state.EmailId,
          Distributor_Addr: this.state.Distributor_Addr,
          GST_No: this.state.GST_No,
          Telephone:this.state.Telephone,
          Web_Addr: this.state.Web_Addr,
          Contact_Person: this.state.Contact_Person,
          Password:this.state.Password
        }),
      })
        .then((Response) => Response.json())
        .then((result) => {
          console.log(result);
          if (result.status == "Exist") alert("User is already exist");
          else if (result.status == "Succuss") alert("User registered successfully");
          else alert("Something went wrong");
        });
    } 
  }
  
  validation() {
    debugger;
    if (this.state.Name == "") {
      alert("Please enter Name");
      return false;
    } else if (this.state.EmailId== "") {
      alert("Please enter Email Id");
      return false;
    } else if (!isEmail(this.state.EmailId)) {
      alert("Please enter valid Email Id");
      return false;
    } else if (this.state.Distributor_Addr == "") {
      alert("Please enter the Address");
      return false;
    } else if (this.state.Telephone == "") {
      alert("Please enter the Telephone Number");
      return false;
    } else if (this.state.Web_Addr == "") {
      alert("Please enter the Web Address");
      return false;
    } else if (this.state.Contact_Person == "") {
      alert("Please enter the Contact Person");
      return false;
    } else if (this.state.GST_No == "") {
      alert("Please enter the GST Number");
      return false;
    } else if (this.state.Password == "") {
      alert("Please enter the Password");
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="9" lg="7" xl="6">
              <CardGroup>
                <Card className="p-2">
                  <CardBody>
                    <Form>
                      <div className="row mb-2 pageheading">
                        <div className="col-sm-12">
                          <h1>
                            <center>Distributor Registration</center>
                          </h1>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Disrtibutor Name</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Name}
                            placeholder="Enter Disrtibutor Name"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Email Id</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.EmailId}
                            placeholder="Email Id"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Address</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Distributor_Addr}
                            placeholder="Address"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Telephone Number</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Telephone}
                            placeholder="Telephone Number"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Web Address</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Web_Addr}
                            placeholder="Web Address"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Contact Person</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.Contact_Person}
                            placeholder="Contact Person"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">GST No</label>
                        <div className="col-sm-8">
                          <Input
                            type="text"
                            onChange={this.GST_No}
                            placeholder="GST No"
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <label className="col-sm-4">Password</label>
                        <div className="col-sm-8">
                          <Input
                            type="password"
                            onChange={this.Password}
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <Button onClick={this.signup} color="success" block>
                        Register
                      </Button>
                      <a href="/DistributorLogin">Login here.</a>
                    </Form>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default DistributorReg;
