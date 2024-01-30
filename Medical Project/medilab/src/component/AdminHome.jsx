import React, { Component } from "react";
class AdminHome extends Component {
  render() {
    return (
      <div className="section-bg">
        <header id="header" className="fixed-top">
          <div className="container d-flex align-items-center">
            <h1 className="logo me-auto">Medilab</h1>

            <nav id="navbar" className="navbar order-last order-lg-0">
              <ul>
                <li>
                  <a className="nav-link active" href="/adminhome">
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
        <section id="hero" className="d-flex align-items-center">
          <div className="container">
            <h1>Welcome to Medilab</h1>
            <h2>The pharmacy that knows you're not just a number.</h2>
          </div>
        </section>
      </div>
    );
  }
}
export default AdminHome;
