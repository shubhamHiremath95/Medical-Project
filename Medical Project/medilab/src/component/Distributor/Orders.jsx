import React, { Component } from "react";
import axios from "axios";
import "../../css/style.css";
import { Link } from "react-router-dom";
export class Orders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: sessionStorage.getItem("uid"),
      departments: [],
      products: [],
    };
  }

  componentDidMount() {
    axios
      .get("https://localhost:7245/api/Order/GetOrdersById/" + this.state.Id)
      .then((response) => {
        debugger;
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
              <h4 align="center">Orders Master</h4>
              
              <table className="table table-striped" style={{ marginTop: 10 }}>
                <thead className="table-dark tblHeader">
                  <tr>
                    <th>Order Id</th>
                    <th>Order Date</th>
                    <th>Distributor Id</th>
                    <th>Distributor Name</th>
                    <th>Order Status</th>
                    <th colSpan="2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.products.map((item) => (
                    <tr key={item.id}>
                      <td>{item.order_id}</td>
                      <td>{item.order_date}</td>
                      <td>{item.distributor_id}</td>
                      <td>{item.distributor_name}</td>
                      <td>{item.order_status}</td>
                      <td>
                        <Link
                          to={"/vieworder?id=" + item.order_id+"&status="+item.order_status}
                          className="btn btn-success"
                        >
                          View
                        </Link>
                      </td>
                      
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
export default Orders;
