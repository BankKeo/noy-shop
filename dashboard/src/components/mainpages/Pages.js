import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";
import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";
import OfflineHistory from "../mainpages/offlineHistory/OfflineHistory";
import Supplier from "../mainpages/supplier/Supplier";

import { GlobalState } from "../../GlobalState";
import Home from "./home/Home";
import OfflineHistoryDetail from "./offlineHistory/OfflineHistoryDetail";
import User from "./user/User";
import Report from "./report/Report";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/users" exact component={User} />
      <Route path="/products" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />

      <Route path="/login" exact component={Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />

      <Route path="/category" exact component={Categories} />
      <Route path="/supplier" exact component={Supplier} />
      <Route path="/create_product" exact component={CreateProduct} />
      <Route path="/edit_product/:id" exact component={CreateProduct} />

      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : NotFound}
      />

      <Route path="/offline_history" exact component={OfflineHistory} />

      <Route
        path="/offline_history/:id"
        exact
        component={OfflineHistoryDetail}
      />

      <Route path="/cart" exact component={Cart} />

      <Route path="/report" exact component={Report} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
