import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../GlobalState";
import "./file.css";
import { PermIdentity, Storefront, BarChart } from "@material-ui/icons";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import StoreIcon from "@material-ui/icons/Store";
import CategoryIcon from "@material-ui/icons/Category";
import PeopleIcon from "@material-ui/icons/People";
import ReportIcon from "@material-ui/icons/Report";

import { Link } from "react-router-dom";
import axios from "axios";

const File = () => {
  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLoginAdmin");

    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
              <li className="sidebarListItem">
                <StoreIcon className="sidebarIcon" />
                ຂາຍໜ້າຮ້ານ
              </li>
            </Link>
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                ຜູ້ໃຊ້
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                ສິນຄ້າ
              </li>
            </Link>
            <Link to="/category" className="link">
              <li className="sidebarListItem">
                <CategoryIcon className="sidebarIcon" />
                ປະເພດສິນຄ້າ
              </li>
            </Link>
            <Link to="/history" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                ລາຍການສັ່ງຊື້ອອນລາຍ
              </li>
            </Link>
            <Link to="/offline_history" className="link">
              <li className="sidebarListItem">
                <BarChart className="sidebarIcon" />
                ລາຍການສັ່ງຊື້ໜ້າຮ້ານ
              </li>
            </Link>
            <Link to="/supplier" className="link">
              <li className="sidebarListItem">
                <PeopleIcon className="sidebarIcon" />
                ຜູ້ສະໜອງ
              </li>
            </Link>
            <Link to="/report" className="link">
              <li className="sidebarListItem">
                <ReportIcon className="sidebarIcon" />
                ລາຍງານ
              </li>
            </Link>
            <li className="sidebarListItem" onClick={logoutUser}>
              <ExitToAppIcon className="sidebarIcon" />
              ອອກຈາກລະບົບ
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default File;
