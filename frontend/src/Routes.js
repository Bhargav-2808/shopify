import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import CreateCustomer from "./Pages/Customer/CreateCustomer";
import Customer from "./Pages/Customer/Customer";
import EditCustomer from "./Pages/Customer/EditCustomer";
import CreateProduct from "./Pages/Product/CreateProduct";
import EditProduct from "./Pages/Product/EditProduct";
import Product from "./Pages/Product/Product";
import Shop from "./Pages/Shop/Shop";

const Routes = () => {
  return (
    <Router>
      <Route path="/dashboard" element={<Shop />} />
      <Route path="/customer" element={<Customer />} />
      <Route path="/createcustomer" element={<CreateCustomer />} />
      <Route path="/createproduct" element={<CreateProduct />} />
      <Route path="/customer/:id" element={<EditCustomer />} />
      <Route path="/product" element={<Product />} />
      <Route path="/product/:id" element={<EditProduct />} />
    </Router>
  );
};

export default Routes;
