import React, { Component } from "react";
import axios from "axios";
import "../../css/style.css";
import { Link } from "react-router-dom";
export class Product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      departments: [],
      products: [],
      product_Name: "",
      product_Id: "",
      product_Desc: "",
      product_Price: "",
      product_DId: "",
      Department: "",
    };
  }

  componentDidMount() {
    axios
      .get("https://localhost:7245/api/Product/GetProducts")
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
          <div className="container">
            <div>
              <h4 align="center">Product Master</h4>
              <Link to={"/addproduct"} className="btn btn-success btnAdd">Add</Link>
              <table className="table table-striped" style={{ marginTop: 10 }}>
                <thead className="table-dark tblHeader">
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Price</th>
                    <th>Distributor Id</th>
                    <th>Distributor Name</th>
                    <th colSpan="4">Action</th>
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
                      <td>
                        <Link
                          to={"/editproduct?id=" + item.product_Id}
                          className="btn btn-success"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-pencil-square"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path
                              fillRule="evenodd"
                              d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                            />
                          </svg>
                        </Link>
                      </td>
                      <td>
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
export default Product;
