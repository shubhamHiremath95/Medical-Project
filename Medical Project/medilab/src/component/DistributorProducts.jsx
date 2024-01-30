import React, { Component } from "react";
import axios from "axios";
import "../css/style.css";
import { Link } from "react-router-dom";
export class DistributorProducts extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.state = {
      distributor: [],
      products: [],
      selectedDist: "",
      Id: 0,
      Name: "",
      EmailId: "",
      Distributor_Addr: "",
      GST_No: "",
      Telephone: "",
      Web_Addr: "",
      Contact_Person: "",
      Password: "",
    };
  }
  componentDidMount() {
    axios
      .get("https://localhost:7245/api/Distributor/GetDistributors")
      .then((response) => {
        debugger;
        this.setState({ distributor: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onChangeName(e) {
    this.setState({
      selectedDist: e.target.value,
      products: []
    });
    axios
      .get("https://localhost:7245/api/Product/GetProductByDid/" + e.target.value)
      .then((response) => {
        debugger;
        this.setState({ products: response.data });
      })
      .catch(function (error) {
        console.log(error);
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
                  <a className="nav-link active" href="/DistributorProducts">
                    Distributor Products
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/OrderMaster">
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
        <section id="main" className="d-flex align-items-center topMargin">
          <div className="container">
            <div>
              <h4 align="center">Distributor Product Master</h4>

              <div className="row">
                <div className="col-2">Distributor Name</div>
                <div className="col-3">
                  <select
                    className="form-select form-select-sm"
                    value={this.state.selectedDist}
                    onChange={this.onChangeName}
                  >
                    <option>Select Distributor</option>
                    {this.state.distributor.map((item) => (
                      <option value={item.id}> {item.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <table className="table table-striped" style={{ marginTop: 10 }}>
                <thead className="table-dark tblHeader">
                  <tr>
                    <th>Product Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Distributor Id</th>
                    <th>Distributor Name</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((item) => (
                    <tr key={item.product_Id}>
                      <td>{item.product_Name}</td>
                      <td>{item.product_Desc}</td>
                      <td>{item.product_Price}</td>
                      <td>{item.product_DId}</td>
                      <td>{item.department}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default DistributorProducts;
