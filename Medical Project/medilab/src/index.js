import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.css";
import AdminLogin from "./component/AdminLogin";
import AdminHome from "./component/AdminHome";
import DistributorReg from "./component/Distributor/DistributorReg";
import DistributorHome from "./component/Distributor/DistributorHome";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DistributorLogin from "./component/Distributor/DistributorLogin";
import Product from "./component/Distributor/Product";
import EditProduct from "./component/Distributor/EditProduct";
import AddProduct from "./component/Distributor/AddProduct";
import DistributorProfile from "./component/Distributor/DistributorProfile";
import DistributorMaster from "./component/DistributorMaster";
import DistributorProducts from "./component/DistributorProducts";
import OrderMaster from "./component/OrderMaster";
import AddOrder from "./component/AddOrder";
import Orders from "./component/Distributor/Orders";
import ViewOrder from "./component/Distributor/vieworder";
import Pos from "./component/Pos";
import Reports from "./component/Reports";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="adminhome" element={<AdminHome />} />
        <Route path="distributorlogin" element={<DistributorLogin />} />
        <Route path="distributorreg" element={<DistributorReg />} />
        <Route path="distributorhome" element={<DistributorHome />} />
        <Route path="product" element={<Product />} />
        <Route path="editproduct" element={<EditProduct />} />
        <Route path="addproduct" element={<AddProduct /> }/>
        <Route path="distributorprofile" element={<DistributorProfile /> }/>
        <Route path="distributormaster" element={<DistributorMaster /> }/>
        <Route path="distributorproducts" element={<DistributorProducts/>}/>
        <Route path="ordermaster" element={<OrderMaster/>}/>
        <Route path="addorder" element={<AddOrder/>}/>
        <Route path="orders" element={<Orders/>}/>
        <Route path="vieworder" element={<ViewOrder/>}/>
        <Route path="pos" element={<Pos/>}/>
        <Route path="reports" element={<Reports/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);