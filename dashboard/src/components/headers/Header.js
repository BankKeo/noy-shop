import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";

import { Language, Settings } from "@material-ui/icons";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { Link } from "react-router-dom";

function Header() {
  const state = useContext(GlobalState);
  // const [isLogged] = state.userAPI.isLogged;
  // const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  // const [menu, setMenu] = useState(false);

  // const logoutUser = async () => {
  //   await axios.get("/user/logout");

  //   localStorage.removeItem("firstLogin");

  //   window.location.href = "/";
  // };

  // const adminRouter = () => {
  //   return (
  //     <>
  //       <li>
  //         <Link to="/create_product">Create Product</Link>
  //       </li>
  //       <li>
  //         <Link to="/category">Categories</Link>
  //       </li>
  //     </>
  //   );
  // };

  // const loggedRouter = () => {
  //   return (
  //     <>
  //       <li>
  //         <Link to="/history">History</Link>
  //       </li>
  //       <li>
  //         <Link to="/" onClick={logoutUser}>
  //           Logout
  //         </Link>
  //       </li>
  //     </>
  //   );
  // };

  // const styleMenu = {
  //   left: menu ? 0 : "-100%",
  // };

  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">
            <Link to="/">Admin</Link>
          </span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <Link to="/cart">
              <ShoppingCartIcon />
              <span className="topIconBadge">{cart.length}</span>
            </Link>
          </div>
          <div className="topbarIconContainer">
            <Language />
            {/* <span className="topIconBadge"></span> */}
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
        </div>
      </div>
    </div>
    // <header>
    //   <div className="menu" onClick={() => setMenu(!menu)}>
    //     <img src={Menu} alt="" width="30" />
    //   </div>

    //   <div className="logo">
    //     <h1>
    //       <Link to="/">{isAdmin ? "Admin" : "NOY SHOP"}</Link>
    //     </h1>
    //   </div>

    //   <ul style={styleMenu}>
    //     <li>
    //       <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
    //     </li>

    //     {isAdmin && adminRouter()}

    //     {isLogged ? (
    //       loggedRouter()
    //     ) : (
    //       <li>
    //         <Link to="/login">Login ✥ Register</Link>
    //       </li>
    //     )}

    //     <li onClick={() => setMenu(!menu)}>
    //       <img src={Close} alt="" width="30" className="menu" />
    //     </li>
    //   </ul>

    //   {isAdmin ? (
    //     ""
    //   ) : (
    //     <div className="cart-icon">
    //       <span>{cart.length}</span>
    //       <Link to="/cart">
    //         <img src={Cart} alt="" width="30" />
    //       </Link>
    //     </div>
    //   )}
    // </header>
  );
}

export default Header;
