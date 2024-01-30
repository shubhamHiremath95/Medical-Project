import React, { Component } from "react";
import axios from "axios";
import "../css/style.css";
import { Link } from "react-router-dom";
export class DistributorMaster extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distributor:[],
      products: [],
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
  deleteClick(id) {
    axios
      .post(
        "https://localhost:7245/api/Distributor/DeleteDistributor?distId=" +
          parseInt(id)
      )
      .then((json) => {
        alert(json.data.message);
        if (json.data.status == "Success") {
          window.location = "/distributormaster";
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
                  <a className="nav-link" href="/adminhome">
                    Home
                  </a>
                </li>
                <li>
                  <a className="nav-link active" href="/DistributorMaster">
                    Distributors
                  </a>
                </li>
                <li>
                  <a className="nav-link" href="/DistributorProducts">
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
              <h4 align="center">Distributor Master</h4>
              
              <table className="table table-striped" style={{ marginTop: 10 }}>
                <thead className="table-dark tblHeader">
                  <tr>
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Distributor Address</th>
                    <th>GST No</th>
                    <th>Telephone Number</th>
                    <th>Web Address</th>
                    <th>Contact Person</th>
                    {/* <th colSpan="4">Action</th> */}
                  </tr>
                </thead>
                <tbody>
                  {this.state.distributor.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.emailId}</td>
                      <td>{item.distributor_Addr}</td>
                      <td>{item.gsT_No}</td>
                      <td>{item.telephone}</td>
                      <td>{item.web_Addr}</td>
                      <td>{item.contact_Person}</td>
                      {/* <td>
                        <button
                          type="button"
                          className="btn btn-light mr-1"
                          onClick={() => this.deleteClick(item.product_Id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-trash-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                          </svg>
                        </button>
                      </td> */}
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

export default DistributorMaster;
